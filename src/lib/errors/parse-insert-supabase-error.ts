type ErrorCode = string

const defaultInsertErrorMessages: Record<ErrorCode, string> = {
	"23505": "Já existe um registro com esses dados.",
	"23502": "Campo obrigatório ausente.",
	"42501": "Permissão negada. Você não tem acesso para inserir esses dados.",
	"22P02": "Algum campo contém dados inválidos.",
	"400": "Erro nos dados enviados. Verifique o formulário."
}

function parseSupabaseInsertError(error: unknown, customMessages?: Partial<Record<ErrorCode, string>>): string {
	if (typeof error === "object" && error !== null && "code" in error) {
		const code = (error as { code?: string }).code
		const message = customMessages?.[code ?? ""] || defaultInsertErrorMessages[code ?? ""]
		return message || "Erro ao salvar os dados. Tente novamente."
	}

	return "Erro inesperado. Tente novamente mais tarde."
}

export { parseSupabaseInsertError }
