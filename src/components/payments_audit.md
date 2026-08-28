# OCPA Guardian Audit — `apps/api/src/payments`

**Auditor**: Innbase OCPA Architecture Guardian  
**Date**: 2026-08-25  
**Scope**: PAYMENTS-01 through PAYMENTS-05 vertical slices

---

## Architecture Score

```
88 / 100
```

## Verdict

```
CONDITIONAL PASS
```

The module is architecturally sound at its core. The pipeline is faithfully observed, boundaries are clean, and the aggregate is the sole owner of business invariants. However, **three findings require remediation** before this can be promoted to an unconditional PASS. None are fatal to operational truth; one is a live stub with an `allocate()` method signature that has no relationship to the actual payment architecture, and two are structural hygiene issues that will cause entropy if left unaddressed.

---

## Responsibility Analysis

### Correct Ownership ✓

| Layer | Owner | Evidence |
|---|---|---|
| Operational State | `state/*.state-builder.ts` — one per command | Read-only, repository-backed, never mutates. Correct. |
| Capability | `capabilities/*.capability.ts` — one per command | Pure synchronous functions. No I/O, no mutation. Correct. |
| Workflow | `workflows/*.workflow.ts` — one per command | Sequences only. Zero business decisions. Correct. |
| Aggregate | `settlement.aggregate.ts`, `external-transaction.aggregate.ts` | All invariants, all state transitions, all domain behavior. Correct. |
| Ledger | `settlement-ledger.repository.ts` | Append-only. Never read back. Correct. |
| Outbox | `settlement-outbox.repository.ts` | Written in same transaction as ledger. Abstract, not concrete. Correct. |
| Repositories | `settlement.repository.ts`, `external-transaction.repository.ts`, `payment-idempotency.repository.ts` | Zero business rules. Read/write state only. Correct. |
| Idempotency | `payment-idempotency.repository.ts` | Payments-specific, not the generic kernel store. Correct. |
| Transport/Handler | `workflows/*.handler.ts` | Owns only the UnitOfWork boundary. Delegates entirely to Workflow. Correct. |

### Incorrect Ownership ✗

| Issue | File | Finding |
|---|---|---|
| **CRITICAL-1** | [`payment.service.ts`](file:///c:/Users/HP/innbase/apps/api/src/payments/services/payment.service.ts) | `PaymentService.allocate(amount, method, context)` is registered as `'PaymentPort'` and exported. This interface (`allocate(amount, method, ...)`) has no relationship to the actual payment architecture. There is no Settlement, no Workflow, no Capability, no Aggregate invocation. The stub silently succeeds. This port is exported and consumed by Sales. Any caller relying on it has no operational truth guarantee whatsoever. |
| **FINDING-2** | All 5 capability files | `CapabilityDecision` is independently re-declared in every capability file. This is not a boundary violation but a structural fragmentation: the contract of what a Capability returns is in five places simultaneously. A future change to `CapabilityDecision` (e.g. adding a `metadata` field per the doctrine's specification) requires five coordinated edits with no compile-time guarantee they remain consistent. |

### Missing Ownership

| Gap | Finding |
|---|---|
| **GAP-1** | `ExternalTransactionIntakeWorkflow` produces **no Ledger entry and no Outbox entry**. The workflow docblock explicitly states this is "deleted, not omitted by oversight." I accept the stated reasoning for PAYMENTS-05's scope, but this must be re-evaluated at PAYMENTS-06. An `ExternalTransaction` that is never written to the Ledger cannot be audited as an operational fact. The doctrine states: Ledger exists for audit, accounting, and operational truth. This is a deferred obligation, not a resolved one. |
| **GAP-2** | `SettlementRepository` and `SettlementLedgerRepository` are concrete `@Injectable()` classes, not `abstract class` interfaces. `SettlementOutboxRepository` and `ExternalTransactionRepository` ARE abstract. The asymmetry means the settlement read/write path has no enforced adapter contract, while the outbox and external-transaction paths do. |

---

## Boundary Violations

### None Detected at the Core Pipeline Level

The following **explicitly prohibited** patterns are **absent** from this codebase — confirmed:

- ❌ No aggregate that calls a repository
- ❌ No aggregate that publishes events directly to an event bus
- ❌ No workflow containing a business invariant
- ❌ No capability that mutates state
- ❌ No capability that calls a repository directly
- ❌ No query handler that calculates projections
- ❌ No cross-context direct import (the only cross-context reference is `OperationalContext` from `kernel/contracts`, which is a published contract, not a domain import)
- ❌ No command handler that orchestrates
- ❌ No nested CommandBus choreography (Sales uses `SettlementInitializationPort` directly, correctly)

### Boundary Concern — `payment.service.ts` (CRITICAL-1)

[`PaymentService`](file:///c:/Users/HP/innbase/apps/api/src/payments/services/payment.service.ts) implements `PaymentPort` and is exported as `'PaymentPort'`. Its signature accepts raw `amount: number` and `method: string`. This is a pre-OCPA interface that predates the Settlement architecture. It is not wired to any Workflow, Capability, Aggregate, Ledger, or Outbox. It is a silent no-op stub.

**The risk is not that the stub does nothing — the risk is that it is exported and a real caller may currently depend on it expecting operational truth to be produced.** The stub's `console.log` confirms it was never intended to be production code, but it is wired into the module's `exports` array.

---

## Knowledge Leaks

| Layer | What it knows that it should not |
|---|---|
| `CanAcceptCashPaymentCapability` | Recalculates `netAmount = cashTendered - changeReturned` — the same arithmetic the Aggregate will perform. This is intentional belt-and-suspenders per the docblock, and the Aggregate enforces it as the backstop. This is **acceptable** per Rule #0 (the duplication does reduce knowledge at the Workflow level). No remediation required. |
| Workflow `throw new Error(...)` on Capability denial | All four workflows throw a bare `new Error(...)` when the Capability returns `allowed: false`. This leaks the responsibility of error typing to the caller (the Handler or Port), who receives a generic `Error` and cannot distinguish a Capability denial from a runtime failure. A `CapabilityDeniedError` class (domain-typed, not generic) should be the throw here. |
| `DefaultRecordCashPaymentPort` / `DefaultSettlementInitializationPort` | Both mint a random idempotency key when the caller supplies none. This is correct behavior documented in both docblocks. No leak. |

---

## Pipeline Compliance

| Stage | Status | Notes |
|---|---|---|
| ✅ **Authentication** | Pass | Handled upstream via `OperationalContext`. Payments does not re-verify. Correct. |
| ✅ **Authorization** | Pass | Capabilities check `tenantId` + `hotelId` context. Not full RBAC, but within scope. |
| ✅ **Operational State** | Pass | One state builder per command. Read-only. Assembled before Capability. |
| ✅ **Capability** | Pass | Pure, synchronous, no I/O, no mutation. Returns `CapabilityDecision`. |
| ✅ **Workflow** | Pass | Sequences only. Bounded retry loop is mechanical, not business logic. |
| ✅ **Aggregate** | Pass | All invariants, all transitions. Isolated from persistence and transport. |
| ✅ **Ledger** | Pass (with GAP-1) | Append-only, immutable. Present for all Settlement commands. Absent for PAYMENTS-05 by documented decision. |
| ✅ **Outbox** | Pass (with GAP-1) | Written in same transaction as Ledger and Settlement save. Absent for PAYMENTS-05. |
| ⚠️ **Projection** | Out of Scope | No projection builders exist yet. No projection store. This is expected for PAYMENTS-01–05. Must arrive before any query handler is written. |
| ⚠️ **Query** | Out of Scope | No query handlers exist. Correct for this stage. |

---

## Complexity Classification

| Command | Declared | Actual | Verdict |
|---|---|---|---|
| `InitializeSettlementCommand` | `@Complexity(2)` | Level 2 — Workflow, Ledger, single bounded context | ✅ Pass |
| `RecordCashPaymentCommand` | `@Complexity(2)` | Level 2 — Workflow, Ledger, version-conflict retry | ✅ Pass |
| `RecordPOSPaymentCommand` | `@Complexity(2)` | Level 2 — same pattern | ✅ Pass |
| `RecordBankTransferClaimCommand` | `@Complexity(2)` | Level 2 — same pattern | ✅ Pass |
| `ExternalTransactionIntakeWorkflow` | Not declared | Level 1 — no Ledger, no Workflow in the CommandBus sense | ⚠️ No `@Complexity` annotation exists (no handler exists either, so this is a gap in convention only) |

**All declared complexities match actual complexity.**

---

## Recommended Changes (Priority Order)

### 1. CRITICAL — Resolve or formally retire `PaymentPort` / `PaymentService`

**File**: [`payment.service.ts`](file:///c:/Users/HP/innbase/apps/api/src/payments/services/payment.service.ts), [`payment.port.ts`](file:///c:/Users/HP/innbase/apps/api/src/payments/contracts/payment.port.ts), [`payments.module.ts`](file:///c:/Users/HP/innbase/apps\api\src\payments\payments.module.ts) (line 93, 190)

The `PaymentPort.allocate(amount, method, context)` interface is incompatible with the OCPA architecture. It accepts raw `amount` and `method` strings with no connection to a Settlement, Workflow, Capability, or Aggregate. The stub implementation produces no operational truth.

**Required action (choose one):**
- **Option A (Preferred):** Remove `PaymentPort` and `PaymentService` entirely. If Sales still calls this port, replace that call with `SettlementInitializationPort` (which is already the correct published boundary for Sales → Payments). Remove the export from `payments.module.ts`.
- **Option B:** If `PaymentPort.allocate` is genuinely still needed by an external caller for a different purpose, the interface must be redesigned with `settlementId` and a typed payment method, and its implementation must route through the appropriate Workflow. The current `allocate(amount, method, context)` signature cannot produce operational truth.

Do not defer. This is a live exported stub with no operational truth guarantee.

---

### 2. HIGH — Extract `CapabilityDecision` to a single shared contract

**Files**: All 5 `capabilities/*.capability.ts` files

`CapabilityDecision` is declared five times identically. This is not a domain boundary — it is the contract of what every Capability in this bounded context returns. It belongs in a single location (e.g. `contracts/capability-decision.ts` or inline in `payment.port.ts`'s equivalent for capabilities).

The doctrine explicitly calls out `CapabilityDecision` as the canonical return type containing `allowed`, `reason`, and `metadata`. The current implementation lacks `metadata` on all five declarations. If `metadata` is ever added, it must be added in five places.

**Required action:** Define `CapabilityDecision` once in `contracts/capability-decision.ts`. Import it in all five capability files.

---

### 3. HIGH — Replace generic `throw new Error` on Capability denial with a typed error

**Files**: All four workflow files (lines ~115, ~108, ~125, ~111)

When the Capability denies an operation, all four workflows throw `new Error(...)`. Callers receive a generic `Error` instance and cannot distinguish a domain-level denial (expected, recoverable, loggable as a business event) from a runtime failure (unexpected, must page on-call).

**Required action:** Create a `CapabilityDeniedError` class in `errors/capability-denied.error.ts`. Throw it instead of bare `new Error`. This allows the transport layer (tRPC router / HTTP controller) to map it to a 4xx rather than 5xx.

---

### 4. MEDIUM — Normalize `SettlementRepository` and `SettlementLedgerRepository` to `abstract class`

**Files**: [`settlement.repository.ts`](file:///c:/Users/HP/innbase/apps/api/src/payments/repositories/settlement.repository.ts), [`settlement-ledger.repository.ts`](file:///c:/Users/HP/innbase/apps/api/src/payments/repositories/settlement-ledger.repository.ts)

`SettlementOutboxRepository` and `ExternalTransactionRepository` are correctly `abstract class`. The settlement read/write repository and ledger repository are concrete `@Injectable()` classes with commented-out SQL. This asymmetry means the Sqlite adapter in `kernel/testing/sqlite-settlement.repository.ts` extends them without a formal contract — it relies on structural compatibility, not declared interface.

**Required action:** Make both `abstract class` with `abstract` method signatures. The Sqlite adapters already extend them; no call-site changes needed.

---

### 5. LOW — Document the Ledger gap for `ExternalTransaction` as a formal TODO

**File**: [`external-transaction-intake.workflow.ts`](file:///c:/Users/HP/innbase/apps/api/src/payments/workflows/external-transaction-intake.workflow.ts), [`RECORD-EXTERNAL-TRANSACTION.md`](file:///c:/Users/HP/innbase/apps/api/src/payments/RECORD-EXTERNAL-TRANSACTION.md)

The absence of a Ledger entry for `ExternalTransaction` intake is acknowledged in the docblock. The Guardian accepts the reasoning for PAYMENTS-05's scope. However, this must be a formal tracked obligation — not just a code comment.

**Required action:** Add a `TODO(PAYMENTS-06)` entry in the relevant tracking system. The PAYMENTS-06 ticket must include a Ledger event definition for `ExternalTransactionObserved` (or equivalent) in the frozen Ledger Event Catalog before ExternalTransaction can be considered an operational truth asset.

---

## Doctrine Compliance

| Rule | Status | Finding |
|---|---|---|
| **Rule #0** (Everything exists to preserve Operational Truth; prefer simpler if it preserves truth) | ✅ PASS | The bounded retry loop, idempotency design, and per-command state builders all reduce real knowledge. No abstraction present solely to "follow clean architecture." The deliberate decision NOT to extract `LoadSettlementWithComponentsStateBuilder` is a correct application of Rule #0. |
| **Operational Truth** | ⚠️ CONDITIONAL PASS | Settlement, Cash, POS, Bank Transfer — all produce operational truth via Ledger + Outbox. ExternalTransaction does not yet (GAP-1). `PaymentPort` produces none (CRITICAL-1). |
| **Knowledge Reduction** | ✅ PASS | Every abstraction that exists — StateBuilder, Capability, Workflow, Aggregate — removes knowledge from its callers. No `SharedHelper`, no `AbstractHandler`, no `DomainUtils` present. |
| **Idempotency** | ✅ PASS | All four CommandBus commands acquire idempotency scope before any mutation. Fingerprint mismatch is detected and rejected. IN_PROGRESS concurrent execution is rejected. REPLAY returns the persisted original response. |
| **Transaction Boundaries** | ✅ PASS | Handler owns the UnitOfWork. Workflow participates. Repository, Ledger, and Outbox writes occur within the ambient transaction. No partial commits observed. |
| **Outbox Pattern** | ✅ PASS | No direct event bus publication. Events flow: Aggregate → Workflow → Ledger.append + Outbox.insert (same transaction) → relay (future concern). |
| **Domain Boundaries** | ✅ PASS | No cross-context domain imports. `OperationalContext` from `kernel/contracts` is a published contract, not a domain object. |
| **Folder Ownership** | ✅ PASS | Every folder has a single, obvious purpose: `aggregates/`, `capabilities/`, `commands/`, `state/`, `workflows/`, `repositories/`, `events/`, `contracts/`, `errors/`, `services/`. No `shared/`, `helpers/`, `utils/` dumping grounds. |

---

## Final Recommendation

```
CONDITIONAL PASS — Remediation required before promotion to production.
```

The architectural skeleton is correct and should not be touched. The OCPA pipeline is faithfully implemented for PAYMENTS-01 through PAYMENTS-04. The idempotency model is production-grade. The aggregate isolation is textbook.

**Block on:**
1. `PaymentPort` / `PaymentService` — must be resolved or retired (CRITICAL-1)
2. `CapabilityDecision` deduplication — must be unified (FINDING-2, HIGH)
3. Generic `throw new Error` on Capability denial — must be typed (HIGH)

**Do not block on (schedule for follow-up):**
4. `SettlementRepository` / `SettlementLedgerRepository` abstract normalization (MEDIUM)
5. ExternalTransaction Ledger obligation tracking (LOW — deferred to PAYMENTS-06 by explicit design decision)

The five-ticket implementation shows consistent discipline and genuine knowledge reduction at every layer. The issues above are structural hygiene failures that escaped review, not architectural regressions. Resolve them and this module will hold.
