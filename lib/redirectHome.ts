import { NextResponse } from 'next/server'

export function redirectHome(req: Request) {
	const { origin } = new URL(req.url)

	return NextResponse.redirect(`${origin}/`)
}
