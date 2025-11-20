// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetcher<T = any>(url: string, options?: RequestInit): Promise<T> {
	const res = await fetch(url, {
		credentials: 'include',
		...options,
	})
	if (!res.ok) {
		const error = new Error(`Fetch error: ${res.status}`) as Error & {
			status?: number
		}
		error.status = res.status
		throw error
	}
	return res.json()
}
