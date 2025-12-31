/** @format */
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

// Senior Practice: Define constants to avoid typos in logic
const ROUTE_AUTH_SIGN_IN = "/auth/sign-in";
const ROUTE_AUTH_SIGN_UP = "/auth/sign-up";
const ROUTE_DASHBOARD = "/dashboard";
const ROUTE_HOME = "/";

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;
	const userRole = "ADMIN";
	// req.auth?.user?.role;
	// "SUPER_ADMIN" | "ADMIN" | "USER"
	const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
	const isDashboardRoute = nextUrl.pathname.startsWith(ROUTE_DASHBOARD);
	const isAuthRoute = [ROUTE_AUTH_SIGN_IN, ROUTE_AUTH_SIGN_UP].includes(
		nextUrl.pathname,
	);

	// 1. Pass-through for NextAuth internal API calls
	if (isApiAuthRoute) return undefined;

	// 2. Handle Authentication Pages (Sign-in / Sign-up)
	if (isAuthRoute) {
		if (isLoggedIn) {
			// Logic: If already logged in, redirect based on role
			const destination = userRole === "ADMIN" ? ROUTE_DASHBOARD : ROUTE_HOME;
			return Response.redirect(new URL(destination, nextUrl));
		}
		return undefined;
	}

	// 3. Strict Protection Logic
	if (isDashboardRoute) {
		// Case A: Not logged in -> Go to sign-in with callback
		if (!isLoggedIn) {
			let callbackUrl = nextUrl.pathname;
			if (nextUrl.search) callbackUrl += nextUrl.search;

			const encodedCallbackUrl = encodeURIComponent(callbackUrl);
			return Response.redirect(
				new URL(
					`${ROUTE_AUTH_SIGN_IN}?callbackUrl=${encodedCallbackUrl}`,
					nextUrl,
				),
			);
		}

		// Case B: Logged in but NOT an Admin -> Access Denied (Go to Home)
		if (userRole !== "ADMIN") {
			return Response.redirect(new URL(ROUTE_HOME, nextUrl));
		}
	}

	// 4. Everything else (Home, Blogs, Public) is allowed
	return undefined;
});

export const config = {
	// Advanced matcher: excludes static files and optimizes performance
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
