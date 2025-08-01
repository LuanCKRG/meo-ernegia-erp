export type ActionResponse<T = undefined> = {
	success: boolean
	message: string
	data?: T
}
