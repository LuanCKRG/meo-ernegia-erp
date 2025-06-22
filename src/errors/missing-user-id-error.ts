class MissingUserIdError extends Error {
	constructor(message = "ID do usuário não retornado após cadastro.") {
		super(message)
		this.name = "MissingUserIdError"
	}
}

export { MissingUserIdError }
