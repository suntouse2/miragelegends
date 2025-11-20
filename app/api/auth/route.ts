import { NextResponse } from 'next/server'
import { isValid, parse } from '@telegram-apps/init-data-node'
import { ApiError } from '@/app/error/ApiError'
import userService from '@/services/userService'
import { createSession } from '@/lib/session'
import { withErrorHandling } from '@/lib/mapError'

const botToken = process.env.TELEGRAM_BOT_TOKEN!

export const POST = withErrorHandling(async req => {
	const { initData } = await req.json()

	if (!initData) throw ApiError.badRequest('Missing initData')

	if (!isValid(initData, botToken)) throw ApiError.unauthorized('Invalid initData')

	const { user: tgUser } = parse(initData)
	if (!tgUser) throw ApiError.badRequest('invalid parsed initData')

	const { first_name, last_name, id, photo_url } = tgUser

	const tgId = String(id)
	let user = await userService.getUserByTgId(tgId)

	if (!user) {
		user = await userService.createUser({
			tgId,
			first_name,
			last_name,
			photo_url,
		})
	}

	const token = createSession(user.id)

	const response = NextResponse.json({ success: true })
	response.cookies.set('session', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: 60 * 60 * 24 * 30,
	})

	return response
})
