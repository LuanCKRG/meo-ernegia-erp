import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

function formatCnpj(cnpj: string): string {
	if (!cnpj || typeof cnpj !== "string") return ""

	const cleaned = cnpj.replace(/\D/g, "")

	if (cleaned.length !== 14) {
		return cnpj
	}

	return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
}

export { cn, formatCnpj }
