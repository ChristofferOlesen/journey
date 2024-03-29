import { postRouter } from "~/server/api/routers/post";
import { customerRouter } from "~/server/api/routers/customer";

import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  customer: customerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
