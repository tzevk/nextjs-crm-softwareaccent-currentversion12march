import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

export function middleware(req) {
    const token = req.cookies.get('session');

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
        const { role } = decoded;
        const pathname = req.nextUrl.pathname;

        if (pathname.startsWith('/admin') && role !== 'admin') {
            return NextResponse.redirect(new URL('/adminDash', req.url));
        }

        if (pathname.startsWith('/dashboard') && role !== 'user') {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        if (pathname.startsWith('/pm-dashboard') && role !== 'project manager') {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/admin', '/pm-dashboard', '/dashboard'], // Routes to protect
};