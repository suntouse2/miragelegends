import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		formats: ['image/webp', 'image/avif'],
		minimumCacheTTL: 60,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
}

export default nextConfig
