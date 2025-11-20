'use client'

import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

type Props = {
	children: ReactNode
	onClose: () => void
	isOpen: boolean
	className?: string
}

export default function Modal({ children, className, onClose, isOpen }: Props) {
	useEffect(() => {
		const closeOnEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}

		if (isOpen) {
			document.body.classList.add('overflow-hidden')
		} else {
			document.body.classList.remove('overflow-hidden')
		}

		document.addEventListener('keydown', closeOnEsc)
		return () => document.removeEventListener('keydown', closeOnEsc)
	}, [onClose, isOpen])

	if (!isOpen) return null

	return createPortal(
		<div
			onClick={onClose}
			className='fixed inset-0 z-50 flex items-center justify-center transition-opacity'
		>
			<div
				onClick={e => e.stopPropagation()}
				className={`bg-bg/80 backdrop-blur-lg  dark:bg-zinc-900 text-white p-6 rounded-xl shadow-xl w-full max-w-md mx-4 ${className}`}
			>
				{children}
			</div>
		</div>,
		document.body
	)
}
