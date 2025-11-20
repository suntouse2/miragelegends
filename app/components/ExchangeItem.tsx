import { ProductCategory, Game, GameCredentials } from '@prisma/client'
import { motion } from 'framer-motion'
import Card from '../ui/Card'
import Image from 'next/image'
import Button from '../ui/Button'

type Pc = ProductCategory & { game: Game & { credentials: GameCredentials[] } }

export default function ExchangeItem({
	c,
	onClick,
}: {
	c: Pc
	onClick: (c: Pc) => void
}) {
	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.25 }}
			key={c.id}
		>
			<Card className='flex mb-2 items-center justify-between p-3 px-4 md:p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition'>
				<div className='flex flex-col gap-2'>
					<div className='flex font-semibold items-center gap-1'>
						<span className='text-xs'>{c.game.title} </span>
					</div>
					<div className='flex  items-center gap-1'>
						1 <Image priority src={c.coinSrc} alt='coin' width={30} height={30} /> = 100{' '}
						<Image priority src={'/dhcoin.svg'} alt='coin' width={20} height={20} />
					</div>
				</div>
				<Button onClick={() => onClick(c)}>Обменять</Button>
			</Card>
		</motion.div>
	)
}
