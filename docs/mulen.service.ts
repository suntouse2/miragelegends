/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from 'axios'
import crypto from 'crypto'
import z from 'zod'
import { ApiError } from '@/app/error/ApiError'
import { OrderStatus } from '@prisma/client'

const SHOP_ID = 160
const SECRET_KEY = '9e70c3b9af964b82ee1ec42d7ffacb7d106b757fde88a8cfb2be5480e42373ed'
const API_KEY = 'jnrP4juNs8JKq70FRwVeDC5O2sCHCl57hTCtJrCPa0ddee8f'
const BASE_URL = 'https://mulenpay.ru/api/v2/payments'

const TIMEOUT = 15000

const CreateRespSchema = z.object({
	success: z.boolean(),
	id: z.union([z.number(), z.string()]),
	paymentUrl: z.string().url(),
})

function makeSign(currency: string, amount: number | string) {
	const amt = typeof amount === 'number' ? amount : String(amount)
	return crypto
		.createHash('sha1')
		.update(`${currency}${amt}${SHOP_ID}${SECRET_KEY}`)
		.digest('hex')
}

export const paymentService = {
	timeout: TIMEOUT,

	async getPaymentUrl(
		orderId: string,
		amount: number,
		description: string,
		backUrl: string,
		email: string
	): Promise<{ id: string | number; redirect: string }> {
		const currency = 'rub'
		const uuid = orderId
		const sign = makeSign(currency, amount)

		const payload = {
			currency,
			amount,
			uuid,
			shopId: SHOP_ID,
			description: 'Оплата доната',
			language: 'ru',
			items: [] as Array<unknown>,
			sign,
		}

		const resp = await axios
			.post(BASE_URL, payload, {
				timeout: this.timeout,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${API_KEY}`,
				},
			})
			.catch(e => {
				if (e instanceof AxiosError) {
					console.error(e.response?.data)
					console.error(e.toJSON())
				}
				throw ApiError.internal('Не удалось создать платёж в UrlPay.')
			})

		const data = await CreateRespSchema.parseAsync(resp.data)

		if (!data.success || !data.paymentUrl) {
			throw ApiError.internal('UrlPay вернул некорректный ответ.')
		}

		return {
			id: data.id,
			redirect: data.paymentUrl,
		}
	},

	async parseCallback(
		req: Request
	): Promise<null | { id: string | number; status: OrderStatus; uuid?: string }> {
		return null
	},
}
