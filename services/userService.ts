import { ApiError } from '@/app/error/ApiError'
import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

const userService = {
	async getUser(id: User['id']) {
		return prisma.user.findUnique({
			where: { id },
		})
	},
	async getUserByTgId(tgId: string) {
		return prisma.user.findUnique({
			where: {
				tgId: tgId,
			},
		})
	},
	async grantXp(userId: number, amount: number) {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { xp: true, level: true },
		})
		if (!user) throw new Error('User not found')

		let { xp, level } = user

		xp = xp + amount
		while (xp > level * 1000) {
			xp = 0
			level++
		}

		return prisma.user.update({
			where: { id: userId },
			data: { xp, level },
		})
	},
	async getUserReferrals(userId: User['id']) {
		const referrals = await prisma.user.findMany({ where: { referredById: userId } })
		return referrals
	},
	async createUser(data: Partial<User> & { ref?: User['id'] }) {
		if (!data.tgId) throw ApiError.badRequest('tgId is required')

		const user = await prisma.user.create({
			data: {
				first_name: data.first_name,
				last_name: data.last_name,
				tgId: data.tgId,
				photo_url: data.photo_url,
			},
		})
		if (data.ref) {
			const refUser = await prisma.user.findUnique({
				where: { id: data.ref },
				select: { id: true },
			})
			if (refUser) {
				await prisma.user.update({
					where: { id: user.id },
					data: { referredById: refUser.id },
				})
			}
		}

		return user
	},
	async deleteUser(id: User['id']) {
		return prisma.user.delete({ where: { id } })
	},
}

export default userService
