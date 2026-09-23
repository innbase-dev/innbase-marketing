/**
 * =====================================================================
 * TEMPORARY STAND-IN, READ BEFORE EDITING:
 *
 * In this app's real monorepo, `AppRouter` should be a TYPE-ONLY import
 * straight from the backend package (e.g.
 * `import type { AppRouter } from '@innbase/api/trpc'`, adjust to
 * whatever the real workspace alias ends up being -- see
 * src/trpc/routers/app.router.ts on the backend for the export this
 * should point at) so procedure signatures can never drift out of sync
 * with what the backend actually serves. This integration was done
 * against two standalone zips (web/ and src/), not a checked-out
 * monorepo, so there was no workspace package for `web` to import
 * from.
 *
 * A plain hand-written object type (`{ sales: { checkout: {...} } }`)
 * is NOT enough here -- `createTRPCReact<TRouter>()` needs a genuine
 * tRPC router type (built from `initTRPC`/`.input()`/`.mutation()`),
 * not just a same-shaped object, or the query/mutation hooks it
 * generates won't type-check correctly. So this mirror is built with
 * the SAME tRPC builder API the backend router uses -- it is never
 * actually served (no listen(), no real context), it exists purely so
 * `typeof mirrorRouter` is a real `AnyRouter` with the right procedure
 * signatures for `AppRouter` below to alias.
 *
 * Whoever changes an input/output shape on the backend router
 * (src/trpc/routers/*.ts) must mirror it here until this moves into
 * the real monorepo -- at which point, delete this file and switch the
 * one import in client.ts.
 * =====================================================================
 */
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import type { SalesWorkspaceView } from '../../features/commerce/sales/types';
import type {
    InventoryDashboardView,
    InventoryItemDetailView,
    InventoryMovementTimelinePage,
    InventoryWorkspaceView,
    InvestigationWorkspaceView,
    OperationalIntelligenceRow
} from '../../features/inventory/shared/types';
import type { TaskWorkspaceView } from '../../features/dashboard/tasks/types/task-projection';
import type { TaskSummary } from '../../features/dashboard/tasks/types/task-projection';
import type { SettingsWorkspaceData } from '../../features/settings/queries/useSettingsWorkspace';
import type { BusinessProfileWorkspaceData } from '../../features/hotel/queries/useBusinessProfileWorkspace';
import type { OnboardingProgressData } from '../../features/onboarding/queries/useOnboardingProgress';
import type { LastReceiptForSaleResult, DocumentContentResolution } from '../../features/commerce/sales/types/receipt';

const t = initTRPC.create();

const locationSchema = z.object({
    id: z.string(),
    type: z.enum(['HOTEL', 'STORE', 'SHELF', 'BIN', 'WASTE', 'VENDOR', 'UNKNOWN']),
    name: z.string()
});

/**
 * Mirrors workspaceInput in src/trpc/routers/sales.router.ts exactly.
 * `cart` is REQUIRED here at the call site even though the backend zod
 * schema defaults it -- omitting it from this mirror (as the previous
 * version did) was the actual bug: GetSalesWorkspaceQueryHandler prices
 * the cart (subtotal/VAT/city tax/total) and that pricing is part of
 * this query's cache key, so a mirror without `cart` silently promised
 * an endpoint that didn't match the one being called. Every caller
 * (queries/salesWorkspace.ts, queries/useRefundPreviewQuery.ts) already
 * sends `cart` -- this mirror was simply stale.
 */
const salesWorkspaceInput = z.object({
    tenantId: z.string().default('t-1'),
    shiftId: z.string().default('shift-1'),
    cart: z.array(z.object({ sku: z.string(), quantity: z.number().int().positive() })).default([]),
    searchQuery: z.string().optional(),
    activeCat: z.string().optional()
});

// OFF-1/OFF-2: mirrors the two fields sales.router.ts added to
// checkoutInput/refundInput on the backend -- optional on the wire,
// defaulted server-side by buildOperationalContext when absent.
const offlineOriginFields = {
    occurredAt: z.string().datetime().optional(),
    deviceId: z.string().optional()
};

// OFF-6: mirrors kernel/contracts/offline-operation.schema.ts exactly.
// Duplicated here for the same reason every other schema in this file
// is duplicated rather than imported -- see the file-level docblock.
const operationalContextSchema = z.object({
    tenantId: z.string(),
    hotelId: z.string(),
    userId: z.string(),
    role: z.string(),
    shiftId: z.string(),
    workstationId: z.string(),
    requestId: z.string(),
    correlationId: z.string(),
    idempotencyKey: z.string(),
    occurredAt: z.string().datetime().optional(),
    deviceId: z.string().optional()
});

// OFF-5: mirrors recordOfflineSalePayloadSchema in sales.router.ts.
const recordOfflineSalePayloadSchema = z.object({
    cart: z.array(
        z.object({
            sku: z.string(),
            quantity: z.number().int().positive(),
            price: z.number().nonnegative()
        })
    ),
    totalPaid: z.number().nonnegative(),
    paymentMethod: z.string()
});

const offlineOperationInputSchema = z
    .object({
        operationId: z.string().min(1),
        payload: recordOfflineSalePayloadSchema,
        occurredAt: z.string().datetime(),
        operationalContext: operationalContextSchema
    })
    .refine((op) => op.occurredAt === op.operationalContext.occurredAt, {
        message: 'occurredAt must match operationalContext.occurredAt',
        path: ['occurredAt']
    });

const replayOfflineBatchInput = z.object({
    operations: z.array(offlineOperationInputSchema)
});

// Mirrors ReplayItemResult/ReplayBatchResult in
// src/sales/transport/replay-offline-sales-batch.ts exactly.
export interface ReplayItemResult {
    operationId: string;
    result: 'succeeded' | 'rejected' | 'needsReview';
    reason?: string;
    transactionId?: number;
    investigationId?: string;
}

export interface ReplayBatchResult {
    succeeded: ReplayItemResult[];
    rejected: ReplayItemResult[];
    needsReview: ReplayItemResult[];
}

const salesRouterMirror = t.router({
    checkout: t.procedure
        .input(
            z.object({
                idempotencyKey: z.string().optional(),
                assigneeId: z.string(),
                paymentMethod: z.string(),
                totalAmount: z.number(),
                cartItems: z.array(z.object({ sku: z.string(), quantity: z.number(), unitPrice: z.number() })),
                ...offlineOriginFields
            })
        )
        // SALES-PARITY-01 (S-08): checkout's own response now also carries
        // receiptDocumentId, as a same-response convenience only -- see
        // the real router's docblock. It is NOT the durable lookup path;
        // that's documentsRouterMirror below.
        .mutation(({ input }) => ({ success: true as const, transactionId: 0 as number, receiptDocumentId: '' as string, __unused: input })),

    refund: t.procedure
        .input(
            z.object({
                assigneeId: z.string().optional(),
                txnId: z.number(),
                refundCart: z.record(z.string(), z.number()),
                reason: z.string(),
                pin: z.string(),
                idempotencyKey: z.string().optional(),
                ...offlineOriginFields
            })
        )
        .mutation(({ input }) => ({ success: true, approvedTotal: 0 as number, __unused: input })),

    workspace: t.procedure
        .input(salesWorkspaceInput)
        // GetSalesWorkspaceQueryHandler genuinely does not return
        // recentTransactions/assignees/refundsToday/aiMessage/
        // isIdentityCaptureRequired/hasAlcohol yet -- see
        // queries/salesWorkspace.ts's docblock for why each is deferred.
        // `Partial<SalesWorkspaceView>` says exactly that: everything it
        // DOES return (subtotal/taxVat/taxCity/total/readinessScore/
        // readinessStatus/visibleProducts/categories/metadata) is typed
        // precisely, and the rest is honestly optional rather than
        // promised. `withDefaults()` in the query hook is what fills the
        // structural gaps for the UI -- this mirror does not fill them.
        .query(({ input }) => ({ __unused: input }) as unknown as Partial<SalesWorkspaceView>),

    // OFF-5: mirrors salesRouter.replayOfflineBatch exactly.
    replayOfflineBatch: t.procedure
        .input(replayOfflineBatchInput)
        .mutation(({ input }) => ({ __unused: input }) as unknown as ReplayBatchResult)
});

/**
 * Tenant scope required by every Inventory projection read. Mirrors
 * `tenantScopeInput` in src/trpc/routers/inventory.router.ts.
 */
const tenantScopeSchema = z.object({
    tenantId: z.string(),
    hotelId: z.string()
});

/**
 * NOTE: `itemId`, not `sku`. Receive/Transfer/AdjustStockCommand are all
 * keyed by itemId (src/inventory/commands/inventory.commands.ts). This
 * mirror previously said `sku`, matching a backend router that also said
 * `sku` and therefore did not type-check against its own commands --
 * corrected on both sides in INN-22.
 */
const inventoryRouterMirror = t.router({
    receive: t.procedure
        .input(
            z.object({
                userId: z.string().optional(),
                itemId: z.string(),
                quantity: z.number(),
                toLocation: locationSchema,
                reason: z.string().optional(),
                idempotencyKey: z.string().optional()
            })
        )
        .mutation(({ input }) => ({ success: true, movementsGenerated: 0 as number, __unused: input })),

    transfer: t.procedure
        .input(
            z.object({
                userId: z.string().optional(),
                itemId: z.string(),
                quantity: z.number(),
                fromLocation: locationSchema,
                toLocation: locationSchema,
                idempotencyKey: z.string().optional()
            })
        )
        .mutation(({ input }) => ({ success: true, movementsGenerated: 0 as number, __unused: input })),

    adjust: t.procedure
        .input(
            z.object({
                userId: z.string().optional(),
                itemId: z.string(),
                quantityDelta: z.number(),
                location: locationSchema,
                reason: z.string(),
                idempotencyKey: z.string().optional()
            })
        )
        .mutation(({ input }) => ({ success: true, movementsGenerated: 0 as number, __unused: input })),

    // ---- Reads (INN-22) ----
    //
    // Output types are declared as the projections' real published
    // shapes (see web/features/inventory/shared/types.ts), NOT as loose
    // `unknown` records: these projections have stable, documented
    // contracts, and typing them here is what makes DTO drift a compile
    // error instead of a runtime surprise. Where a projection can
    // legitimately return null (not yet materialized), the type says
    // `| null` rather than hiding it.

    workspace: t.procedure
        .input(
            z.object({
                skus: z.array(z.string()).optional(),
                search: z.string().optional(),
                category: z.string().optional(),
                status: z.string().optional(),
                locationId: z.string().optional(),
                sort: z.string().optional(),
                order: z.string().optional(),
                page: z.number().optional(),
                pageSize: z.number().optional()
            })
        )
        .query(({ input }) => ({ __unused: input }) as unknown as InventoryWorkspaceView),

    dashboard: t.procedure
        .input(tenantScopeSchema)
        .query(({ input }) => ({ __unused: input }) as unknown as InventoryDashboardView | null),

    movementTimeline: t.procedure
        .input(
            tenantScopeSchema.extend({
                itemId: z.string().optional(),
                locationId: z.string().optional(),
                movementType: z.string().optional(),
                actor: z.string().optional(),
                correlationId: z.string().optional(),
                dateFrom: z.string().optional(),
                dateTo: z.string().optional(),
                cursor: z.string().optional(),
                limit: z.number().optional(),
                order: z.string().optional()
            })
        )
        .query(({ input }) => ({ __unused: input }) as unknown as InventoryMovementTimelinePage),

    itemDetail: t.procedure
        .input(z.object({ tenantId: z.string(), itemId: z.string() }))
        .query(({ input }) => ({ __unused: input }) as unknown as InventoryItemDetailView),

    operationalIntelligenceForItem: t.procedure
        .input(tenantScopeSchema.extend({ inventoryItemId: z.string() }))
        .query(({ input }) => ({ __unused: input }) as unknown as OperationalIntelligenceRow[]),

    operationalIntelligenceByType: t.procedure
        .input(
            tenantScopeSchema.extend({
                intelligenceType: z.enum(['FAST_MOVER', 'DEAD_STOCK', 'OVERSTOCK', 'SUSPICIOUS_ADJUSTMENT'])
            })
        )
        .query(({ input }) => ({ __unused: input }) as unknown as OperationalIntelligenceRow[])
});

const investigationLifecycleSchema = z.object({
    investigationId: z.string(),
    userId: z.string().optional(),
    idempotencyKey: z.string().optional()
});

const investigationRouterMirror = t.router({
    list: t.procedure
        .input(tenantScopeSchema)
        .query(({ input }) => ({ __unused: input }) as unknown as InvestigationWorkspaceView[]),

    byId: t.procedure
        .input(tenantScopeSchema.extend({ investigationId: z.string() }))
        .query(({ input }) => ({ __unused: input }) as unknown as InvestigationWorkspaceView | null),

    create: t.procedure
        .input(
            z.object({
                inventoryItemId: z.string(),
                assignedUserId: z.string().nullable().optional(),
                notes: z.string().nullable().optional(),
                userId: z.string().optional(),
                idempotencyKey: z.string().optional()
            })
        )
        .mutation(({ input }) => ({ __unused: input }) as Record<string, unknown>),

    assign: t.procedure
        .input(investigationLifecycleSchema.extend({ assignedUserId: z.string() }))
        .mutation(({ input }) => ({ __unused: input }) as Record<string, unknown>),

    start: t.procedure
        .input(investigationLifecycleSchema)
        .mutation(({ input }) => ({ __unused: input }) as Record<string, unknown>),

    pause: t.procedure
        .input(investigationLifecycleSchema)
        .mutation(({ input }) => ({ __unused: input }) as Record<string, unknown>),

    resume: t.procedure
        .input(investigationLifecycleSchema)
        .mutation(({ input }) => ({ __unused: input }) as Record<string, unknown>),

    close: t.procedure
        .input(investigationLifecycleSchema)
        .mutation(({ input }) => ({ __unused: input }) as Record<string, unknown>)
});

const taskPrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
const taskStatusSchema = z.enum(['OPEN', 'COMPLETED', 'CANCELLED']);

const listFiltersSchema = z.object({
    status: z.union([taskStatusSchema, z.array(taskStatusSchema)]).optional(),
    priority: z.union([taskPrioritySchema, z.array(taskPrioritySchema)]).optional(),
    assignedUserId: z.string().nullable().optional(),
    sourceType: z.string().optional(),
    dueBefore: z.string().optional(),
    dueAfter: z.string().optional(),
    search: z.string().optional()
});

const taskRouterMirror = t.router({
    getTaskWorkspace: t.procedure
        .input(z.object({ taskId: z.string() }))
        .query(({ input }) => ({ __unused: input }) as unknown as TaskWorkspaceView),

    listTaskWorkspace: t.procedure
        .input(z.object({
            filters: listFiltersSchema.optional(),
            sort: z.object({
                by: z.enum(['createdAt', 'dueAt', 'priority', 'title']),
                order: z.enum(['asc', 'desc'])
            }).optional(),
            pagination: z.object({
                cursor: z.string().optional(),
                limit: z.number().int().min(1).max(100).optional()
            }).optional()
        }).optional())
        .query(({ input }) => ({ __unused: input }) as unknown as { items: TaskWorkspaceView[], nextCursor: string | null }),

    getTaskSummary: t.procedure
        .input(z.object({
            filters: listFiltersSchema.optional()
        }).optional())
        .query(({ input }) => ({ __unused: input }) as unknown as TaskSummary),

    createTask: t.procedure
        .input(z.object({
            title: z.string().min(1).max(200),
            description: z.string().nullable().optional(),
            priority: taskPrioritySchema,
            assignedUserId: z.string().nullable().optional(),
            dueAt: z.string().nullable().optional(),
            sourceType: z.string().nullable().optional(),
            sourceId: z.string().nullable().optional(),
            idempotencyKey: z.string().optional()
        }))
        .mutation(({ input }) => ({ __unused: input }) as Record<string, unknown>),

    updateTask: t.procedure
        .input(z.object({
            taskId: z.string(),
            fields: z.object({
                title: z.string().min(1).max(200).optional(),
                description: z.string().nullable().optional(),
                priority: taskPrioritySchema.optional(),
                dueAt: z.string().nullable().optional(),
            }),
            idempotencyKey: z.string().optional()
        }))
        .mutation(({ input }) => ({ __unused: input }) as Record<string, unknown>),

    assignTask: t.procedure
        .input(z.object({
            taskId: z.string(),
            assignedUserId: z.string(),
            idempotencyKey: z.string().optional()
        }))
        .mutation(({ input }) => ({ __unused: input }) as Record<string, unknown>),

    unassignTask: t.procedure
        .input(z.object({
            taskId: z.string(),
            idempotencyKey: z.string().optional()
        }))
        .mutation(({ input }) => ({ __unused: input }) as Record<string, unknown>),

    completeTask: t.procedure
        .input(z.object({
            taskId: z.string(),
            idempotencyKey: z.string().optional()
        }))
        .mutation(({ input }) => ({ __unused: input }) as Record<string, unknown>),

    reopenTask: t.procedure
        .input(z.object({
            taskId: z.string(),
            idempotencyKey: z.string().optional()
        }))
        .mutation(({ input }) => ({ __unused: input }) as Record<string, unknown>),

    cancelTask: t.procedure
        .input(z.object({
            taskId: z.string(),
            idempotencyKey: z.string().optional()
        }))
        .mutation(({ input }) => ({ __unused: input }) as Record<string, unknown>)
});

const settingsRouterMirror = t.router({
    getSettingsWorkspace: t.procedure
        .query(() => ({}) as unknown as SettingsWorkspaceData),
});

/**
 * Mirrors businessAddressInput / configureBusinessProfileInput in
 * src/trpc/routers/property.router.ts exactly (SETTINGS-04
 * integration). `hotelId` is NOT part of the wire input on either
 * side -- it comes from OperationalContext, built server-side from
 * the (currently placeholder) actor, same as every other router.
 */
const businessAddressSchema = z.object({
    line1: z.string(),
    line2: z.string().nullable().optional(),
    city: z.string(),
    state: z.string().nullable().optional(),
    postalCode: z.string().nullable().optional(),
    country: z.string()
});

const configureBusinessProfileInput = z.object({
    businessName: z.string(),
    legalName: z.string().nullable().optional(),
    displayName: z.string().nullable().optional(),
    address: businessAddressSchema,
    phone: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    timezone: z.string(),
    currency: z.string(),
    idempotencyKey: z.string().optional(),
    actorUserId: z.string().optional()
});

const workspaceInput = z.object({
    actorUserId: z.string().optional()
});

const propertyRouterMirror = t.router({
    getBusinessProfileWorkspace: t.procedure
        .input(workspaceInput)
        .query(({ input }) => ({ __unused: input }) as unknown as BusinessProfileWorkspaceData | null),
    configureBusinessProfile: t.procedure
        .input(configureBusinessProfileInput)
        .mutation(({ input }) => ({ __unused: input }) as unknown as { success: true; hotelId: string; version: number })
});

const onboardingRouterMirror = t.router({
    getOnboardingProgressView: t.procedure
        .query(() => ({}) as unknown as OnboardingProgressData),
});

/**
 * SALES-PARITY-01 (S-09). Mirrors src/trpc/routers/documents.router.ts
 * exactly.
 */
const documentsRouterMirror = t.router({
    getLastReceiptForSale: t.procedure
        .query(() => ({}) as unknown as LastReceiptForSaleResult),

    getReceiptContent: t.procedure
        .input(z.object({ documentId: z.string().min(1) }))
        .query(({ input }) => ({ __unused: input }) as unknown as DocumentContentResolution)
});

const authLoginInput = z.object({
    identifier: z.string(),
    organizationId: z.string().uuid().optional(),
    organizationAccessCode: z.string().optional(),
    credential: z.object({
        strategy: z.literal('PASSWORD'),
        secret: z.string()
    }),
    idempotencyKey: z.string().optional(),
    deviceMetadata: z.record(z.unknown()).optional()
});

const authRouterMirror = t.router({
    login: t.procedure
        .input(authLoginInput)
        .mutation(({ input }) => ({
            token: '' as string,
            session: { id: '', expiresAt: '' },
            identity: { id: '', organizationId: '' },
            issuedAt: '',
            __unused: input
        })),
    session: t.procedure.query(() => ({
        identity: { id: '', organizationId: '' },
        session: { id: '', expiresAt: '' }
    })),
    logout: t.procedure.mutation(() => ({
        sessionId: '',
        revoked: true as const,
        issuedAt: ''
    }))
});

const mirrorRouter = t.router({
    auth: authRouterMirror,
    sales: salesRouterMirror,
    inventory: inventoryRouterMirror,
    investigation: investigationRouterMirror,
    task: taskRouterMirror,
    settings: settingsRouterMirror,
    property: propertyRouterMirror,
    onboarding: onboardingRouterMirror,
    documents: documentsRouterMirror,
});

export type AppRouter = typeof mirrorRouter;
