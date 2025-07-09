import { z } from "zod"

export const registerSellerSchema = z.object({
	fullName: z.string().min(3, { message: "O nome completo deve ter no mínimo 3 caracteres." }),
	cpf: z.string().length(14, { message: "CPF inválido. Use o formato 000.000.000-00." }),
	email: z.string().email({ message: "Por favor, insira um email válido." })
})

export type RegisterSellerData = z.infer<typeof registerSellerSchema>
