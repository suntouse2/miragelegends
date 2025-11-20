import { MouseEventHandler, ReactElement } from 'react'
import Card from './Card'

export default function RoundedButton({
	onClick,
	icon,
	title,
	isActive,
}: {
	onClick?: MouseEventHandler<HTMLButtonElement>
	icon: ReactElement
	title: string
	isActive?: boolean
}) {
	return (
		<button
			onClick={onClick}
			className={`flex flex-col w-14 h-21 gap-2 font-semibold items-center transition-all ${
				isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'
			}`}
		>
			<Card
				className={`p-3 rounded-full flex justify-center items-center transition-colors duration-300 ${
					isActive ? 'bg-white text-black' : 'hover:!bg-white hover:!text-black'
				}`}
			>
				{icon}
			</Card>
			<span className='font-montserrat max-w-[100px] text-center text-xs'>{title}</span>
		</button>
	)
}
