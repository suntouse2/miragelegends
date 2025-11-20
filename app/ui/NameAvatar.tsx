import Image from 'next/image'

export default function NameAvatar({
	first_name,
	last_name,
	photo_url,
}: {
	first_name: string
	last_name: string
	photo_url?: string | null
}) {
	return (
		<div className='w-10 h-10 overflow-hidden flex justify-center items-center rounded-full bg-accent-300 border border-accent-300 font-semibold'>
			{photo_url ? (
				<Image alt='user avatar' width={40} height={40} src={photo_url} />
			) : (
				<>
					{first_name[0]}
					{last_name[0]}
				</>
			)}
		</div>
	)
}
