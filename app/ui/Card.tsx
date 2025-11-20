import { PropsWithChildren } from 'react'

type Props = {
	className?: string
} & PropsWithChildren

export default function Card({ children, className = '' }: Props) {
	return (
		<div
			className={`!font-semibold backdrop-blur-lg !text-sm border rounded-3xl border-white/10 bg-transparent ${className}`}
			style={{
				boxShadow: 'inset 0 0 3px rgba(255, 255, 255, 0.1)',
			}}
		>
			{children}
		</div>
	)
}
