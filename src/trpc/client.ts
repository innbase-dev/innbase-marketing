'use client';

import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from './router-types';

/**
 * tRPC is the approved internal transport standard for this app (REST
 * is reserved for genuinely external endpoints -- see
 * src/trpc/trpc.ts and the REST controllers' docblocks on the
 * backend). This replaces web/lib/api/client.ts for every call the
 * frontend makes to its own backend.
 *
 * The browser targets a same-origin Next.js BFF. Only that server
 * boundary can read the HttpOnly session cookie and translate it into
 * the API's Bearer-only contract.
 */
export const trpc = createTRPCReact<AppRouter>();

export function makeTrpcClient() {
    return trpc.createClient({
        links: [
            httpBatchLink({
                url: '/api/trpc'
            })
        ]
    });
}
