'use client'

import { fetcher } from '@/lib/fetcher'
import { Game, Product } from '@prisma/client'
import { PackageOpen } from 'lucide-react'
import Image from 'next/image'
import useSWR from 'swr'
import Button from '../ui/Button'
import { useState } from 'react'
import Modal from '../ui/Modal'
import PopoverMenu from '../ui/PopoverMenu'

type ProductWithGame = Product & { game: Game }

export default function DropBar() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const today = new Date()
	const formattedDate = today.toLocaleDateString('ru-RU')

	const { data: productsData } = useSWR<{ products: ProductWithGame[] }>(
		'/api/drop/today',
		fetcher
	)

	if (!productsData)
		return (
			<div className='relative notify-wiggle flex items-center gap-2 cursor-pointer'>
				<span className='absolute top-0 right-0 w-2 h-2 bg-accent rounded-full z-10'></span>
				<PackageOpen color='white' className='opacity-50' />
			</div>
		)

	const products = productsData.products

	return (
		<PopoverMenu
			className='bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 rounded-xl border border-emerald-300  shadow-lg p-4 max-w-xs'
			trigger={
				<div className='relative notify-wiggle flex items-center gap-2 cursor-pointer'>
					<span className='absolute top-0 right-0 w-2 h-2 bg-accent-100 rounded-full z-10'></span>
					<PackageOpen color='white' className='opacity-50' />
				</div>
			}
		>
			<div className='text-white text-sm font-medium'>
				<h3 className='text-lg font-bold mb-1'>
					Сегоднешний <span className='text-emerald-400'>ДРОП!</span>
				</h3>
				<p className='text-xs font-semibold text-white/70 mb-4 leading-snug'>
					Дроп на дату {formattedDate} отображен ниже. Успей забрать бесплатно прямо
					сейчас!
				</p>

				<div className='flex gap-3 flex-wrap justify-start'>
					{products.map(p => (
						<div
							key={p.id}
							className='relative flex justify-center items-center w-[60px] h-[60px] rounded-lg'
						>
							<Image
								src={p.imageSrc ?? ''}
								width={40}
								height={40}
								alt={p.title}
								className='rounded-md z-10 relative'
							/>
							<Image
								src='/drop-cell.webp'
								alt='cell'
								fill
								className='absolute inset-0 object-contain pointer-events-none opacity-80 drop-shadow-[0_0_8px_rgba(0,255,200,0.2)]'
							/>
						</div>
					))}
				</div>

				<div className='mt-4'>
					<h4 className='text-sm font-bold text-white mb-2 border-b border-white/20 pb-1'>
						В наборе:
					</h4>
					<ul className='space-y-2 text-xs text-white/90'>
						{products.map(p => (
							<li key={p.id} className='flex flex-col'>
								<span className='text-white/60'>{p.game.title}</span>
								<span className='font-semibold text-white'>{p.title}</span>
							</li>
						))}
					</ul>
				</div>
				<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
					<div className='flex flex-col items-center text-center'>
						<div className='text-rose-500 mb-3'>
							<PackageOpen size={40} strokeWidth={1.5} />
						</div>
						<h2 className='text-lg font-bold text-white mb-2'>
							Забрать дроп не получится :(
						</h2>
						<p className='text-sm font-semibold text-white/70 mb-4'>
							Для получения дропов нужно совершить покупку на сумму более{' '}
							<span className='text-white font-semibold'>300₽</span> в нашем магазине.
						</p>
						<Button
							className='!bg-rose-500 hover:!bg-rose-600 text-white px-6 py-2 rounded-md font-semibold'
							onClick={() => setIsModalOpen(false)}
						>
							Понятно
						</Button>
					</div>
				</Modal>
				<Button
					onClick={() => setIsModalOpen(true)}
					className='mt-5 w-full !bg-transparent text-white/50 font-bold   border hover:bg-gray-700 border-emerald-300 transition'
				>
					Забрать ЛУТ
				</Button>
			</div>
		</PopoverMenu>
	)
}
