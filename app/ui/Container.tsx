type Props = {
	children?: React.ReactNode
	className?: string
}

export default function Container({ children, className = '' }: Props) {
	return (
		<div className={`w-full max-w-6xl !mx-auto !px-6 md:!px-4  ${className}`}>
			{children}
		</div>
	)
}
