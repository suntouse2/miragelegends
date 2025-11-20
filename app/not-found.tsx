import Header from './components/Header'
import Image from 'next/image'

export default function NotFound() {
	return (
		<>
			<Header />

			<main className='flex flex-col items-center justify-center min-h-[70vh] text-center px-4 relative pt-30 tablet:pt-20 pb-10'>
				<Image src={'/toples.webp'} className='z-0' fill alt='yan toples' />
				<h1 className='text-6xl mt-10 sm:text-7xl font-extrabold text-white drop-shadow mb-4'>
					404
				</h1>
				<h2 className='text-2xl z-[1] sm:text-3xl font-bold text-white/80 mb-3'>
					Страница не найдена
				</h2>
				<p className='text-sm z-[1] font-semibold text-white/50 max-w-md mb-6'>
					Такой страницы больше не существует или ты просто ошибся адресом.
				</p>
			</main>
		</>
	)
}
