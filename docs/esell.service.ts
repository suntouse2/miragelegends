// services/gateways/esellGateway.ts
import axios, { AxiosError } from 'axios'
import { ApiError } from '@/app/error/ApiError'
import z from 'zod'
import { OrderStatus } from '@prisma/client'

const CreateRespSchema = z.object({
	success: z.boolean(),
	id: z.number(),
	location: z.string().url(),
})

const DONATE_URL = 'E9PJrhUFeZCJPPrLjc9NA0fDVaFntWX3'

export const paymentService = {
	timeout: 15000,

	async getPaymentUrl(
		orderId: string,
		amount: number,
		description: string,
		backUrl: string,
		email: string
	) {
		const payload = {
			donate_url: DONATE_URL,
			amount,
			email,
			callbackUrl: backUrl,
			description,
			payload: orderId,
		}

		const url = `https://esell.su/api/generatePaymentUrl`

		const resp = await axios
			.post(url, payload, {
				timeout: this.timeout,
				headers: { 'Content-Type': 'application/json' },
			})
			.catch(e => {
				if (e instanceof AxiosError) {
					console.log(e.response?.data)
					console.log(e.toJSON())
				}
				throw ApiError.internal('Не удалось получить ссылку на оплату.')
			})

		const data = await CreateRespSchema.parseAsync(resp.data)

		return {
			id: data.id,
			redirect: data.location,
		}
	},

	async parseCallback(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		req: Request
	): Promise<null | { id: number | string; status: OrderStatus }> {
		return null
	},
}
