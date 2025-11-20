import { getPromoStateAction } from '@/app/actions/getPromoStateAction'
import { getUserStateAction } from '@/app/actions/getUserStateAction'
import { ApiError } from '@/app/error/ApiError'
import { gameService } from '@/services/gameService'
import { orderService } from '@/services/orderService'
import { z } from 'zod'
import { withErrorHandling } from '@/helpers/mapError'
import { randomUUID } from 'crypto'
import { plategaGateway } from '@/services/gateways/plategaGateway'
import { NextResponse } from 'next/server'

const PostPaymentSchema = z.object({
	productId: z.string(),
	email: z.string(),
	paymentMethod: z.enum(['SBP', 'CARD']),
	userCredentials: z.array(
		z.object({
			key: z.string(),
			label: z.string(),
			value: z.union([z.string(), z.number()]),
		})
	),
})

export const POST = withErrorHandling(async req => {
	const body = await req.json()
	const promo = await getPromoStateAction()
	const data = await PostPaymentSchema.parseAsync(body)

	const product = await gameService.getProduct(data.productId)
	if (!product) throw ApiError.badRequest('Такого продукта нет')

	const discount = promo?.discount ?? 0
	const discountedPrice = Math.round(product.price * (1 - discount / 100))

	const user = await getUserStateAction()
	const uuid = randomUUID()

	const order = await orderService.createOrder({
		amount: discountedPrice,
		userId: user?.id,
		product: { ...product },
		paymentData: { plategaUuid: uuid },
		method: data.paymentMethod,
		userCredentials: data.userCredentials,
		email: data.email,
	})

	const BACK_URL = `${process.env.NEXT_PUBLIC_URL}/orders?publicKey=${order.publicKey}`
	const { transactionId } = await plategaGateway.createTransaction(
		order.id.toString(),
		uuid,
		discountedPrice,
		product.title,
		BACK_URL
	)
	const { qr } = await plategaGateway.getTransaction(transactionId)
	return NextResponse.json({ redirect_url: qr })
})
