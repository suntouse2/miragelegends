'use client'

import { useEffect, useState } from 'react'
import type WebApp from '@twa-dev/sdk'

export function useWebApp() {
	const [webApp, setWebApp] = useState<typeof WebApp | null>(null)

	useEffect(() => {
		if (typeof window === 'undefined') return

		import('@twa-dev/sdk')
			.then(mod => {
				mod.default.ready()
				setWebApp(mod.default)
			})
			.catch(err => {
				console.error('Telegram WebApp SDK error:', err)
			})
	}, [])

	return webApp
}
