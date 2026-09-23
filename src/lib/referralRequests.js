// Keep one request in flight and reuse its idempotency key after a failed
// response. Both mutations support this field in the supplied API router.
export function createReferralRequest(send, makeKey = () => crypto.randomUUID()) {
  let pending;
  let attempt;
  return (payload) => {
    if (pending) return pending;
    const fingerprint = JSON.stringify(payload);
    if (attempt?.fingerprint !== fingerprint) attempt = { fingerprint, key: makeKey() };
    pending = Promise.resolve().then(() => send({ ...payload, idempotencyKey: attempt.key }))
      .then((result) => {
        if (result?.success !== true) throw new Error("We could not confirm your request. Please try again.");
        attempt = undefined;
        return result;
      })
      .finally(() => { pending = undefined; });
    return pending;
  };
}
