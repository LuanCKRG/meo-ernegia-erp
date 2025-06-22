"use server"

import { createClient } from "@/lib/supabase/server"
import type { ActionResponse } from "@/types/action-response"
import type { Database } from "@/types/supabase"

// Defina o tipo do parceiro
type Partner = Database["public"]["Tables"]["partners"]["Row"]

interface GetPartnerByCNPJProps {
	cnpj: string
}

async function getPartnerByCNPJ({ cnpj }: GetPartnerByCNPJProps): Promise<ActionResponse<Partner | null>> {
	try {
		const supabase = await createClient()

		const { data: partner, error } = await supabase.from("partners").select("*").eq("cnpj", cnpj).maybeSingle() // Usa maybeSingle para retornar null se não encontrar

		if (error) {
			console.error("Erro na consulta:", error)
			throw new Error("Erro ao buscar parceiro no banco de dados")
		}

		// Se encontrou o parceiro
		if (partner) {
			return {
				success: true,
				message: "Parceiro encontrado com sucesso",
				data: partner // Retorna os dados do parceiro
			}
		}

		// Se não encontrou
		return {
			success: true,
			message: "Não existe parceiro cadastrado com esse CNPJ",
			data: null
		}
	} catch (error) {
		console.error("Erro ao buscar parceiro:", error)

		return {
			success: false,
			message: error instanceof Error ? error.message : "Erro desconhecido ao buscar parceiro, tente novamente mais tarde",
			data: null
		}
	}
}

export { getPartnerByCNPJ }
