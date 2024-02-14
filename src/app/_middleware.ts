// app/_middleware.ts

import { NextResponse } from 'next/server';

export default function middleware(request) {
    console.log('Cookies:', request.cookies);
    return NextResponse.next();
}
