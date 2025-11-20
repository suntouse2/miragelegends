'use server'

import { cookies } from 'next/headers'
import { verifySession } from '@/lib/session'
import userService from '@/services/userService'

export async function getUserStateAction() {
	const token = (await cookies()).get('session')?.value
	if (!token) return null

	const userId = verifySession(token)
	if (!userId) return null

	const user = await userService.getUser(userId)
	return user ?? null
}
