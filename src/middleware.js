import { NextResponse } from "next/server";

/*
 * Middleware for handling CORS, authorization, and redirection based on routes.
 */
export async function middleware(request) {
    // Extract pathname from request for routing logic
    const { pathname } = request.nextUrl;

    // Define allowed paths that bypass authentication for API and UI routes
    const allowedPaths = ['/api/signIn', '/api/signUp', '/api/tokenverify', '/api/contacts'];
    const allowedPathsUI = ['/login', '/register'];

    // Set CORS headers to allow cross-origin requests from any source
    const headers = new Headers(request.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', '*');

    // Handle OPTIONS requests for preflight checks in CORS
    if (request.method === 'OPTIONS') {
        return NextResponse.json(null, { status: 200, headers: headers });
    }

    // Allow requests to specific paths without authorization
    if (allowedPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next({ request: { headers } });
    }

    // API route requiring Bearer token authorization
    else if (pathname.startsWith('/api')) {
        const authorizationHeader = request.headers.get('authorization');
        console.log(authorizationHeader); // Logging authorization header for debugging

        // If authorization header is missing or does not start with "Bearer", return 401
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return NextResponse.json({ status: 'Unauthorized' }, { status: 401, headers: headers });
        }

        try {
            // Verify token by making a request to the external authorization service
            const url = process.env.MIDDLEWARE_URL;
            const response = await fetch(url, {
                method: 'GET',
                headers: { authorization: authorizationHeader }
            });

            // Parse the response and continue if token is valid, otherwise return 401
            const data = await response.json();
            if (response.status === 200) {
                return NextResponse.next({ request: { headers } });
            } else {
                return NextResponse.json({ status: 'Unauthorized' }, { status: 401 });
            }
        } catch (error) {
            // Return 401 if token verification fails due to error
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    }

    // UI route requiring authentication, redirects to login if unauthenticated
    if (!allowedPathsUI.some(path => pathname.startsWith(path))) {
        const isAuthenticated = request.cookies.get('token'); // Check for token cookie
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login page if not authenticated
        }
    }
}

/*
 * Configure matcher to specify which routes should trigger this middleware.
 * Adjust these paths as per application requirements.
 */
export const config = {
    matcher: ['/api/:path*', '/user-dashboard/:path*', '/admin/dashboard'],
};
