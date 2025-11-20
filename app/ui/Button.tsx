import { ButtonHTMLAttributes } from 'react'

type Props = {
	className?: string
	children: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
	className = '',
	children,

	...rest
}: Props) {
	return (
		<button
			className={`${className} font-semibold text-sm border px-3 py-2 rounded-2xl border-white/10 bg-transparent hover:bg-white/10 transition-colors disabled:!bg-white/10 disabled:!text-white/60 disabled:!cursor-not-allowed'`}
			{...rest}
		>
			{children}
		</button>
	)
}
