import axios, { AxiosError } from 'axios'
import crypto from 'crypto'
import z from 'zod'
import { ApiError } from '@/app/error/ApiError'
import { OrderStatus } from '@prisma/client'

const PARTNER_ID = 11563
const PROJECT_ID = 802399
const API_KEY = 'agj2pz7i4wvmcd05tfq3h1unko96xr'
const BASE_URL = 'https://api.1payment.com/init_payment'

const TIMEOUT = 15000

const CreateRespSchema = z.object({
	order_id: z.string(),
	status: z.union([z.number(), z.string()]),
	status_description: z.string(),
	status_code: z.number().optional(),
	redirect_url: z.string().url().optional(),
})

function makeSign(params: Record<string, string | number | undefined>) {
	const clean: Record<string, string | number> = {}
	for (const [k, v] of Object.entries(params)) {
		if (v !== undefined && k !== 'sign') clean[k] = v
	}
	const sortedKeys = Object.keys(clean).sort()
	const paramString = sortedKeys.map(k => `${k}=${clean[k]}`).join('&')
	const base = `init_payment${paramString}${API_KEY}`

	return crypto.createHash('md5').update(base).digest('hex')
}

export const paymentService = {
	timeout: TIMEOUT,

	async getPaymentUrl(
		orderId: string,
		amount: number,
		email: string
	): Promise<{ id: string; redirect: string | null }> {
		const params: Record<string, string | number | undefined> = {
			partner_id: PARTNER_ID,
			payment_type: 'sbp',
			project_id: PROJECT_ID,
			amount,
			description: 'Оплата доната',
			email,
			user_data: orderId,
		}

		const sign = makeSign(params)
		params.sign = sign

		let resp
		try {
			resp = await axios.get(BASE_URL, {
				timeout: this.timeout,
				params,
			})
		} catch (e) {
			if (e instanceof AxiosError) {
				console.error(e.response?.data)
				console.error(e.toJSON())
			}
			throw ApiError.internal('Не удалось создать платёж.')
		}

		const data = await CreateRespSchema.parseAsync(resp.data)

		return {
			id: data.order_id,
			redirect: data.redirect_url ?? null,
		}
	},
	async parseCallback(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		req: Request
	): Promise<null | { id: string | number; status: OrderStatus; uuid?: string }> {
		return null
	},
}
