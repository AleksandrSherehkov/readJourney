// pages/_middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { GetTokenParams, getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const secret = process.env.AUTH_SECRET;
    if (!secret) {
        throw new Error('AUTH_SECRET is not set');
    }

    const token = await getToken({
        req,
        secret,
    } as unknown as GetTokenParams<false>);

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
