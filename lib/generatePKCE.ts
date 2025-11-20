import crypto from 'crypto'

export function generateCodeVerifier(): string {
	return crypto.randomBytes(32).toString('base64url')
}

export function generateCodeChallenge(verifier: string): string {
	const hash = crypto.createHash('sha256').update(verifier).digest()
	return Buffer.from(hash).toString('base64url')
}
