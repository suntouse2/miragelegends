'use client'

import { ReactElement, useState } from 'react'
import { Plus } from 'lucide-react'
import Card from './Card'

type Props = {
	questions: {
		title: string
		content: ReactElement
	}[]
}

export default function QuestionsList({ questions }: Props) {
	const [openedIndex, setOpenedIndex] = useState<number | null>(null)

	const toggle = (index: number) => {
		setOpenedIndex(prev => (prev === index ? null : index))
	}

	return (
		<div className='p-6 rounded-2xl bg-white/2 border border-white/5'>
			<ul className='space-y-3'>
				{questions.map((q, i) => {
					const isOpen = openedIndex === i
					return (
						<li key={i}>
							<Card
								key={i}
								className='rounded-2xl border border-white/10 overflow-hidden transition-colors'
							>
								<button
									onClick={() => toggle(i)}
									className='w-full gap-2 flex items-center justify-between px-4 py-4 text-left'
								>
									<h3 className='text-md md:text-lg font-semibold text-white'>
										{q.title}
									</h3>
									<div className='!w-10 min-w-10 min-h-10 max-w-10 max-h-10 !h-10 flex items-center justify-center rounded-full border border-white/10'>
										<Plus
											size={20}
											className={`text-white transition-transform duration-300 ${
												isOpen ? 'rotate-45' : ''
											}`}
										/>
									</div>
								</button>

								<div
									className={`grid  transition-[grid-template-rows] duration-300 ease-in-out py-0 px-4 ${
										isOpen ? 'grid-rows-[1fr] py-0' : 'grid-rows-[0fr] py-0'
									}`}
								>
									<div className='overflow-hidden textext-sm text-white/70 leading-relaxed'>
										<div className='pb-5'>{q.content}</div>
									</div>
								</div>
							</Card>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
