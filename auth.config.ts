import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/recommended');
            return isOnDashboard
                ? isLoggedIn
                : isLoggedIn
                  ? Response.redirect(new URL('/recommended', nextUrl))
                  : false;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
