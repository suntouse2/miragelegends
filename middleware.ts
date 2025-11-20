import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const url = request.nextUrl
	const ref = url.searchParams.get('ref')
	const response = NextResponse.next()

	if (ref) response.cookies.set('ref', ref, { maxAge: 60 * 60 * 24 * 7, path: '/' })

	const protectedRoutes = ['/profile', '/deposit']

	if (protectedRoutes.some(route => url.pathname.startsWith(route))) {
		const hasAccess = request.cookies.get('session')?.value
		if (!hasAccess) {
			return NextResponse.redirect(new URL('/', request.url))
		}
	}

	return response
}
export const config = {
	matcher: ['/:path*'],
}
