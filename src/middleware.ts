// pages/_middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    const { pathname } = req.nextUrl;

    if (token) {
        if (pathname === '/login' || pathname === '/register') {
            return NextResponse.redirect(new URL('/recommended', req.url));
        }

        return NextResponse.next();
    }

    if (pathname === '/login' || pathname === '/register') {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        '/recommended',
        '/library',
        '/reading',
    ],
};
