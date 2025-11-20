import { NextResponse } from 'next/server'
import { getUserStateAction } from '@/app/actions/getUserStateAction'
import { withErrorHandling } from '@/lib/mapError'

export const GET = withErrorHandling(async () => {
	const user = await getUserStateAction()
	return NextResponse.json(user)
})
