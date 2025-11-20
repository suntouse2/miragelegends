'use client'

import { useEffect } from 'react'
import { useWebApp } from '../hooks/useWebApp'
import { useRouter } from 'next/navigation'

export default function BackButton({ onClick }: { onClick?: () => void }) {
	const webApp = useWebApp()
	const router = useRouter()
	useEffect(() => {
		if (!webApp?.BackButton) return

		const handler = () => (onClick ? onClick() : router.back())
		webApp.BackButton.show()
		webApp.BackButton.onClick(handler)

		return () => {
			webApp.BackButton.hide()
			webApp.BackButton.offClick(handler)
		}
	}, [webApp, router, onClick])

	return null
}
