import { NextResponse } from 'next/server'
import { getUserStateAction } from '@/app/actions/getUserStateAction'
import { ApiError } from '@/app/error/ApiError'
import { withErrorHandling } from '@/lib/mapError'
import { orderService } from '@/services/orderService'

export const GET = withErrorHandling(async () => {
	const user = await getUserStateAction()
	if (!user) throw ApiError.unauthorized()
	const orders = await orderService.getUserOrders(user.id)
	return NextResponse.json(orders)
})
