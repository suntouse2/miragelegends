import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export function createSession(userId: number): string {
	if (!JWT_SECRET) throw Error('Missing JWT_SECRET')
	return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' })
}

export function verifySession(token: string): number | null {
	try {
		if (!JWT_SECRET) throw Error('Missing JWT_SECRET')
		const payload = jwt.verify(token, JWT_SECRET) as { userId: number }
		return payload.userId
	} catch {
		return null
	}
}
