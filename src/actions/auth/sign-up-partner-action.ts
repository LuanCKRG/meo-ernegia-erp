"use server"

import { isAuthApiError } from "@supabase/supabase-js"

import { MissingUserIdError } from "@/errors/missing-user-id-error"
import { createClient } from "@/lib/supabase/server"
import type { RegisterPartnerData } from "@/lib/validations/partner"
import type { ActionResponse } from "@/types/action-response"

const signUpErrorMessages: Record<string, string> = {
	user_already_exists: "Este e-mail já está cadastrado.",
	invalid_credentials: "Credenciais inválidas.",
	weak_password: "A senha é muito fraca. Use pelo menos 6 caracteres.",
	email_not_confirmed: "E-mail não confirmado. Verifique sua caixa de entrada.",
	session_expired: "Sessão expirada. Faça login novamente.",
	default: "Erro inesperado ao cadastrar parceiro. Tente novamente mais tarde."
}

async function signUpPartner(registerPartnerData: RegisterPartnerData): Promise<ActionResponse<{ userId: string }>> {
	try {
		const supabase = await createClient()

		const {
			data: { user },
			error: signUpError
		} = await supabase.auth.signUp({ email: registerPartnerData.contactEmail, password: registerPartnerData.password })

		if (signUpError) throw signUpError

		const userId = user?.id
		if (!userId) throw new MissingUserIdError()

		return {
			success: true,
			message: "Cadastro realizado com sucesso!",
			data: { userId }
		}
	} catch (error) {
		console.error("Erro ao cadastrar parceiro:", error)

		if (isAuthApiError(error)) {
			// Use o código do erro para mensagens específicas
			const errorCode = error.code || "default"
			const message = signUpErrorMessages[errorCode] || signUpErrorMessages.default

			return {
				success: false,
				message
			}
		}

		if (error instanceof MissingUserIdError) {
			return {
				success: false,
				message: "Não foi possível completar o cadastro. Tente novamente com outro e-mail."
			}
		}

		return {
			success: false,
			message: "Erro inesperado ao cadastrar parceiro. Tente novamente mais tarde."
		}
	}
}

export { signUpPartner }
