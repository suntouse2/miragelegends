'use client'

import Link from 'next/link'
import { JSX } from 'react'
import { motion } from 'framer-motion'

type Props = {
	tabs: {
		href: string
		label: string
		icon: JSX.Element
		active: boolean
	}[]
}

export default function MobileNav({ tabs }: Props) {
	const base =
		'flex flex-col items-center !text-accent-100 justify-center text-xs transition'
	const active = 'text-emerald-400'
	const inactive = '!text-white opacity-50 hover:text-emerald-400'

	return (
		<motion.nav
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{
				type: 'spring',
				stiffness: 80,
				damping: 15,
				duration: 0.5,
			}}
			className='fixed bottom-2 left-3 right-3  bg-white/5 rounded-full backdrop-blur-md  flex justify-around border border-white/10 items-center p-2 py-3 z-4'
		>
			{tabs.map((t, i) => (
				<Link key={i} href={t.href} className={`${base} ${t.active ? active : inactive}`}>
					{t.icon}
					<span className='text-[10px] font-medium mt-1'>{t.label}</span>
				</Link>
			))}
		</motion.nav>
	)
}
