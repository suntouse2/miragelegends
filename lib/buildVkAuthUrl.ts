export default function buildVkAuthUrl({
	clientId,
	redirectUri,
	codeChallenge,
	scope = 'email phone',
}: {
	clientId: string
	redirectUri: string
	codeChallenge: string
	scope?: string
}) {
	const baseUrl = 'https://id.vk.com/authorize'
	const query = new URLSearchParams({
		response_type: 'code',
		client_id: clientId,
		redirect_uri: redirectUri,
		code_challenge: codeChallenge,
		code_challenge_method: 'S256',
		scope,
	})
	return `${baseUrl}?${query.toString()}`
}
