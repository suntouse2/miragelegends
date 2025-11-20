import { JSX } from 'react'
import Link from 'next/link'
import Card from './Card'

type Props = {
	tabs: {
		href: string
		label: string
		icon: JSX.Element
		active: boolean
	}[]
}

export default function Sidebar({ tabs }: Props) {
	const base =
		'flex items-center h-[45px] gap-2 px-4 py-2 rounded-xl text-sm border border-white/0 !font-semibold transition group'
	const active =
		'bg-white/10 text-emerald-400 font-semibold border border-white/10 shadow-inner'

	const inactive = '!text-white/50 hover:bg-white/5 hover:border hover:border-white/5'

	return (
		<Card className='flex flex-col w-64 h-full  top-0 left-0 px-4 py-6 gap-2 shadow-lg rounded-3xl'>
			{tabs.map((tab, i) => (
				<Link
					key={i}
					href={tab.href}
					className={`${base} ${tab.active ? active : inactive}`}
				>
					<div className='group-hover:scale-105 transition-transform'>{tab.icon}</div>
					<span>{tab.label}</span>
				</Link>
			))}
		</Card>
	)
}
