import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: ["/api/communicate/flow-up"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
