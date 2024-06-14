import { HttpStatusCode } from "./types"

type ErrorDataShape = {
	message: string
}

export class HttpError extends Error {
	statusCode: HttpStatusCode
	data: ErrorDataShape

	constructor(statusCode: HttpStatusCode, data: ErrorDataShape) {
		super(data.message)
		this.statusCode = statusCode
		this.data = data
	}
}
