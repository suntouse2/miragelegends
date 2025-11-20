import { Check, CircleAlert } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

export default function ToasterWrapper() {
	return (
		<Toaster
			toastOptions={{
				className: '!bg-bg/30 !rounded-full !px-4 !backdrop-blur-md !text-white',
				success: {
					icon: <Check size={15} className='text-emerald-500' />,
					className:
						'!bg-bg/90 !rounded-full text-[13px] !max-w-[500px] !text-nowrap !px-4 !backdrop-blur-md border border-emerald-500 !text-white',
				},
				error: {
					icon: <CircleAlert size={15} className='text-rose-500' />,
					className:
						'!bg-bg/90 !rounded-full text-[13px] !max-w-[500px] !text-nowrap !px-4 !backdrop-blur-md border border-red-500 !text-white',
				},
			}}
		/>
	)
}
