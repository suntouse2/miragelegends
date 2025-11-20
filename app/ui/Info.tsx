import { Info as InfoIcon } from 'lucide-react'
import Card from './Card'
import { PropsWithChildren } from 'react'

export default function Info({ children }: PropsWithChildren) {
	return (
		<Card className='p-4 mb-6 flex items-start gap-3 border border-white/10'>
			<InfoIcon size={18} className='text-blue-400 mt-1' />
			<div className='text-sm text-white/60'>{children}</div>
		</Card>
	)
}
