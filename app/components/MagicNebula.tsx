'use client'

import { useEffect, useRef } from 'react'

export default function MagicNebula() {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')!
		const particles: {
			angle: number
			radius: number
			speed: number
			size: number
			opacity: number
		}[] = []
		const maxParticles = 120

		const resize = () => {
			canvas.width = canvas.clientWidth
			canvas.height = canvas.clientHeight
		}

		window.addEventListener('resize', resize)
		resize()

		// Центр
		const centerX = () => canvas.width / 2
		const centerY = () => canvas.height / 2

		// Инициализация частиц
		for (let i = 0; i < maxParticles; i++) {
			particles.push({
				angle: Math.random() * Math.PI * 2,
				radius: Math.random() * (canvas.width / 3),
				speed: Math.random() * 0.005 + 0.001,
				size: Math.random() * 1.5 + 0.5,
				opacity: Math.random() * 0.4 + 0.3,
			})
		}

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			// Мягкий фиолетовый фон
			const gradient = ctx.createRadialGradient(
				centerX(),
				centerY(),
				5,
				centerX(),
				centerY(),
				canvas.width / 2
			)
			gradient.addColorStop(0, 'rgba(168, 85, 247, 0.1)')
			gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
			ctx.fillStyle = gradient
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			// Частицы
			for (const p of particles) {
				const x = centerX() + Math.cos(p.angle) * p.radius
				const y = centerY() + Math.sin(p.angle) * p.radius

				ctx.beginPath()
				ctx.arc(x, y, p.size, 0, Math.PI * 2)
				ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
				ctx.fill()

				// Движение по окружности
				p.angle += p.speed

				// Небольшое дрожание радиуса
				p.radius += Math.sin(p.angle * 2) * 0.05
			}

			requestAnimationFrame(draw)
		}

		draw()
		return () => window.removeEventListener('resize', resize)
	}, [])

	return (
		<div className='relative w-16 h-16'>
			<canvas
				ref={canvasRef}
				className='w-full h-full rounded-full brightness-125 contrast-150 saturate-200'
			/>
			<div className='absolute inset-0 flex items-center justify-center'>
				<span className='text-white/70 text-lg font-bold drop-shadow-md'>?</span>
			</div>
		</div>
	)
}
