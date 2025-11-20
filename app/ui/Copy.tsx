'use client'

import { Copy as CopyIcon, Check } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
	content: string
	className?: string
	notify: string
}

export default function Copy({ className, notify, content }: Props) {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(content)
			setCopied(true)
			toast.success(notify)
			setTimeout(() => setCopied(false), 1500)
		} catch (err) {
			console.error('Ошибка при копировании:', err)
		}
	}

	return (
		<button
			onClick={handleCopy}
			className={`flex items-center gap-1  text-white/50 hover:text-white transition-colors ${className}`}
			title='Скопировать'
		>
			{copied ? <Check size={16} className='!text-accent-100' /> : <CopyIcon size={16} />}
		</button>
	)
}
