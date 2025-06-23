"use server"

import { createClient } from "@/lib/supabase/server"
import type { Partner } from "@/types/partners"

async function getAllPartners(): Promise<Partner[]> {
	try {
		const supabase = await createClient()

		const { data: partners, error } = await supabase.from("partners").select(`
			kdi,
			cnpj,
			legal_business_name,
			contact_name,
			contact_mobile,
			contact_email,
			cep,
			street,
			number,
			complement,
			neighborhood,
			city,
			state,
			status,
			active,
			created_at
		`)

		if (error) {
			console.error("Erro na consulta:", error)
			throw new Error("Erro ao buscar parceiro no banco de dados")
		}
		return partners
	} catch (error) {
		console.error("Erro ao buscar parceiro:", error)
		return []
	}
}

export { getAllPartners }
