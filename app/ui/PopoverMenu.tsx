'use client'

import { useState } from 'react'
import {
	useFloating,
	offset,
	flip,
	shift,
	autoUpdate,
	useClick,
	useDismiss,
	useRole,
	useInteractions,
	FloatingPortal,
} from '@floating-ui/react'

type Props = {
	trigger: React.ReactNode
	children: React.ReactNode
	className?: string
}

export default function PopoverMenu({ trigger, children, className }: Props) {
	const [open, setOpen] = useState(false)
	const { refs, floatingStyles, context } = useFloating({
		open,
		onOpenChange: setOpen,
		middleware: [offset(4), flip(), shift()],
		whileElementsMounted: autoUpdate,
		placement: 'bottom',
	})

	const click = useClick(context)
	const dismiss = useDismiss(context)
	const role = useRole(context)
	const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])

	return (
		<>
			<div
				role='button'
				aria-label='Открыть меню'
				ref={refs.setReference}
				{...getReferenceProps()}
				className='cursor-pointer'
			>
				{trigger}
			</div>
			{open && (
				<FloatingPortal>
					<div
						ref={refs.setFloating}
						style={floatingStyles}
						{...getFloatingProps()}
						className={`z-50 rounded-2xl border border-white/10 bg-bg/80 backdrop-blur-sm p-3 text-sm shadow-xl ${className}`}
					>
						{children}
					</div>
				</FloatingPortal>
			)}
		</>
	)
}
