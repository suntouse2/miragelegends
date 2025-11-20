'use client'

import { JSX } from 'react'
import MobileNav from '../ui/MobileNav'
import { Cat, Rocket, Wallet } from 'lucide-react'
import { usePathname } from 'next/navigation'

const links: { href: string; label: string; icon: JSX.Element; exact?: boolean }[] = [
	{ href: '/', label: 'Донат', icon: <Rocket />, exact: true },
	{ href: '/pet', label: 'Питомец', icon: <Cat />, exact: true },
	{ href: '/profile/wallet', label: 'Кошелек', icon: <Wallet />, exact: false },
]
export default function Navigation() {
	const pathname = usePathname()

	const tabs = links.map(l => {
		const isActive = l.exact ? pathname === l.href : pathname.startsWith(l.href)

		return { ...l, active: isActive }
	})
	return <MobileNav tabs={tabs} />
}
