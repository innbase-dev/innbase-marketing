// Preferences are scoped to the verified Clerk user. Never import the old
// unscoped bank-details entry: it may belong to another account.
export function preferenceKey(userId, name) {
  return userId ? `innbase:referrals:${encodeURIComponent(userId)}:${name}` : null;
}

export function validBeneficiary(value) {
  return Boolean(value && typeof value.bankName === "string" && value.bankName.trim()
    && typeof value.accountName === "string" && value.accountName.trim()
    && typeof value.accountNumber === "string" && /^\d{10}$/.test(value.accountNumber));
}

export function parsePreference(raw, name) {
  try {
    const value = JSON.parse(raw);
    if (name === "beneficiary") return validBeneficiary(value) ? value : null;
    return Array.isArray(value) ? value.filter((id) => typeof id === "string") : [];
  } catch {
    return name === "beneficiary" ? null : [];
  }
}
