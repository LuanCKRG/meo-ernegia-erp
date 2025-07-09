"use client"

import { PlusCircle } from "lucide-react"
import { ResgisterPartnerForm } from "@/components/forms/register-partner-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const AddPartnerDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full md:w-auto">
					<PlusCircle />
					Adicionar Parceiro
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Adicionar Novo Parceiro</DialogTitle>
					<DialogDescription>Preencha as informações abaixo para cadastrar um novo parceiro.</DialogDescription>
				</DialogHeader>
				<ResgisterPartnerForm />
			</DialogContent>
		</Dialog>
	)
}

export { AddPartnerDialog }
