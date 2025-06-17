// /middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

const protectedRoutes = ['/account', '/admin']

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const pathname = req.nextUrl.pathname

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Protection admin uniquement
    if (pathname.startsWith('/admin') && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return NextResponse.next()
}
