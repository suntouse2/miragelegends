import { Game, Product, ProductCategory } from '@prisma/client'
import Image from 'next/image'
import Button from '../ui/Button'

type Props = {
	game: Game
	product: Product | null
	category: ProductCategory | null
	onBuy: () => void
}

export default function MiniReceipt({ game, category, product, onBuy }: Props) {
	if (product === null || category === null) return null

	return (
		<div className='flex justify-between w-full'>
			<div className='flex items-center gap-3'>
				<Image
					src={product.imageSrc ?? ''}
					alt={product.title}
					width={50}
					height={50}
					className='rounded-xl border border-white/10'
				/>
				<div>
					<p className='text-sm font-montserrat text-white/60 font-semibold'>
						{game.title}
					</p>
					<p className='flex gap-1 items-center text-sm font-bold text-white'>
						{product?.title}
						<Image src={category.coinSrc} alt={category.title} width={20} height={25} />
					</p>
				</div>
			</div>

			<Button
				onClick={onBuy}
				className='relative !bg-accent-100 rounded-xl text-black hover:!bg-accent-200 shadow-2xl  font-unbounded'
			>
				Купить за <br />
				{product.price} ₽
			</Button>
		</div>
	)
}
