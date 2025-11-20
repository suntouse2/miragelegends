import prisma from '@/lib/prisma'
import { Product } from '@prisma/client'

export const gameService = {
	async getProduct(id: Product['id']) {
		const product = await prisma.product.findUnique({
			where: { id },
			include: { category: { include: { game: true } } },
		})
		return product
	},
	async getCategory(id: string) {
		const category = await prisma.productCategory.findUnique({
			where: { id },
			include: { game: true, products: true },
		})
		return category
	},
	async getGames() {
		return prisma.game.findMany({
			orderBy: { sort: 'asc' },
		})
	},

	async getCategories() {
		const categories = await prisma.productCategory.findMany({
			include: { game: { include: { credentials: true } }, products: true },
		})
		return categories
	},
	async getGameBySlug(slug: string) {
		const game = await prisma.game.findUnique({
			where: { slug },
			include: {
				categories: { include: { products: true } },
				credentials: true,
			},
		})
		return game
	},
}
