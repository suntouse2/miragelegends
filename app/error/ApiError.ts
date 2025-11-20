/* eslint-disable @typescript-eslint/no-explicit-any */
export class ApiError extends Error {
	status: number
	meta?: any

	constructor(status: number, message: string, meta?: any) {
		super(message)
		this.status = status
		this.meta = meta
		this.name = 'ApiError'
		// (опционально) корректный прототип для instanceof
		Object.setPrototypeOf(this, ApiError.prototype)
	}

	static badRequest(message = 'Bad Request', meta?: any) {
		return new ApiError(400, message, meta)
	}
	static unauthorized(message = 'Unauthorized', meta?: any) {
		return new ApiError(401, message, meta)
	}
	static forbidden(message = 'Forbidden', meta?: any) {
		return new ApiError(403, message, meta)
	}
	static notFound(message = 'Not Found', meta?: any) {
		return new ApiError(404, message, meta)
	}
	static internal(message = 'Internal Server Error', meta?: any) {
		return new ApiError(500, message, meta)
	}
}
