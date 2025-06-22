"use server"

import { parseSupabaseInsertError } from "@/lib/errors/parse-insert-supabase-error"
import { createClient } from "@/lib/supabase/server"
import type { RegisterPartnerData } from "@/lib/validations/partner"
import type { ActionResponse } from "@/types/action-response"
import type { Database } from "@/types/supabase"

const partnerInsertErrorMessages = {
	"23505": "Já existe um parceiro com esses dados. Verifique o CNPJ ou e-mail.",
	"23502": "Algum campo obrigatório do parceiro não foi preenchido."
}

interface CreateParterProps {
	userId: string
	partnerData: RegisterPartnerData
}

type CreatePartnerData = Database["public"]["Tables"]["partners"]["Insert"]

async function createPartner({ userId, partnerData }: CreateParterProps): Promise<ActionResponse> {
	const createPartnerData: CreatePartnerData = {
		user_id: userId,
		cep: partnerData.cep,
		city: partnerData.city,
		cnpj: partnerData.cnpj,
		complement: partnerData.complement,
		contact_email: partnerData.contactEmail,
		contact_mobile: partnerData.contactMobile,
		contact_name: partnerData.contactName,
		legal_business_name: partnerData.legalBusinessName,
		neighborhood: partnerData.neighborhood,
		number: partnerData.number,
		state: partnerData.state,
		street: partnerData.street
	}

	try {
		const supabase = await createClient()

		const { error: createPartnerError } = await supabase.from("partners").insert(createPartnerData)

		if (createPartnerError) throw createPartnerError

		return {
			success: true,
			message: "Cadastro realizado com sucesso!"
		}
	} catch (error) {
		console.error("Erro ao inserir parceiro:", error)

		return {
			success: false,
			message: parseSupabaseInsertError(error, partnerInsertErrorMessages)
		}
	}
}

export { createPartner }
