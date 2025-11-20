import Link from 'next/link'
import { ButtonHTMLAttributes } from 'react'

type Props = {
	className?: string
	children: React.ReactNode
	href: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function ButtonLink({ className = '', href, children }: Props) {
	return (
		<Link
			href={href}
			className={`!font-semibold !text-sm border !px-3 !py-2 rounded-2xl border-white/10 bg-transparent hover:bg-white/10 transition-colors ${className}`}
		>
			{children}
		</Link>
	)
}
