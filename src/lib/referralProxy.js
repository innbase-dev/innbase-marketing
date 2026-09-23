// Same-origin transport for the six public-portal procedures only. Authentication
// is injected by the server route; this module never trusts browser identity headers.
const PROCEDURES = {
  "referrals.register": "POST",
  "referrals.portalWorkspace": "GET",
  "referrals.referralDetail": "GET",
  "referrals.referHotel": "POST",
  "referrals.requestWithdrawal": "POST",
  "referrals.resolveReferralToken": "GET",
};
const ERRORS = {
  400: [-32600, "BAD_REQUEST"], 401: [-32001, "UNAUTHORIZED"],
  403: [-32003, "FORBIDDEN"], 404: [-32004, "NOT_FOUND"],
  405: [-32005, "METHOD_NOT_SUPPORTED"], 413: [-32013, "PAYLOAD_TOO_LARGE"],
  415: [-32015, "UNSUPPORTED_MEDIA_TYPE"], 500: [-32603, "INTERNAL_SERVER_ERROR"],
  502: [-32603, "INTERNAL_SERVER_ERROR"], 503: [-32603, "INTERNAL_SERVER_ERROR"],
  504: [-32008, "TIMEOUT"],
};
const PRIVATE_HEADERS = { "cache-control": "private, no-store", vary: "Cookie, Authorization", "content-type": "application/json" };
const MAX_BODY_BYTES = 64 * 1024;

function failure(message, status, path) {
  const [code, name] = ERRORS[status];
  return Response.json({ error: { message, code, data: { code: name, httpStatus: status, path } } }, { status, headers: PRIVATE_HEADERS });
}

async function readBody(request) {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks = [];
  let bytes = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) { await reader.cancel(); return null; }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return Buffer.concat(chunks).toString("utf8");
}

export function createReferralProxy({ getIdentityHeaders, getBaseUrl, fetchUpstream = fetch, timeoutMs = 10_000 }) {
  return async (request, { params }) => {
    const { trpc: segments = [] } = await params;
    const path = segments.length === 1 ? segments[0] : "";
    const method = Object.hasOwn(PROCEDURES, path) ? PROCEDURES[path] : null;
    if (!method) return failure("This referral action does not exist.", 404, path);
    if (request.method !== method) return failure("This request method is not supported.", 405, path);
    const url = new URL(request.url);
    if (url.searchParams.has("batch")) return failure("Batch requests are not supported.", 400, path);
    if (method === "POST") {
      const origin = request.headers.get("origin");
      if (request.headers.get("sec-fetch-site") === "cross-site" || (origin && origin !== url.origin)) {
        return failure("This request must come from the referral portal.", 403, path);
      }
      if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
        return failure("Send this request as JSON.", 415, path);
      }
    }
    let identity = {};
    if (path !== "referrals.resolveReferralToken") {
      try { identity = await getIdentityHeaders(); }
      catch { return failure("We could not verify your session. Please try again.", 503, path); }
      if (!identity) return failure("Sign in to continue.", 401, path);
    }
    let base;
    try {
      base = new URL(getBaseUrl());
      if (!["http:", "https:"].includes(base.protocol) || base.username || base.password || base.search || base.hash || !["", "/"].includes(base.pathname)) throw new Error("Invalid origin");
    } catch { return failure("The referral service is not configured. Please contact support.", 503, path); }
    let body;
    if (method === "POST") {
      body = await readBody(request);
      if (body === null) return failure("This request is too large.", 413, path);
      try { if (body) JSON.parse(body); }
      catch { return failure("This request contains invalid JSON.", 400, path); }
    }
    try {
      const upstream = await fetchUpstream(`${base.origin}/trpc/${path}${url.search}`, {
        method, body, headers: { "content-type": "application/json", ...identity },
        cache: "no-store", redirect: "manual",
        signal: AbortSignal.any([request.signal, AbortSignal.timeout(timeoutMs)]),
      });
      if (upstream.status >= 300 && upstream.status < 400) return failure("The referral service returned an unexpected redirect.", 502, path);
      const responseBody = await upstream.text();
      try { JSON.parse(responseBody); }
      catch { return failure("The referral service returned an unreadable response. Please try again.", 502, path); }
      return new Response(responseBody, { status: upstream.status, headers: PRIVATE_HEADERS });
    } catch (error) {
      return failure(error.name === "TimeoutError" ? "The referral service took too long. Please try again." : "The referral service could not be reached. Please try again.", error.name === "TimeoutError" ? 504 : 502, path);
    }
  };
}
