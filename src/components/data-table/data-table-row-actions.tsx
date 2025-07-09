"use client"

import type { Row } from "@tanstack/react-table"
import { CheckCircle, Eye, MoreHorizontal, Pencil, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { formatCnpj } from "@/lib/utils"
import type { Partner } from "@/types/partners"

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

const PartnerDetails = ({ partner }: { partner: Partner }) => {
	return (
		<div className="grid gap-4">
			<div className="space-y-2">
				<h4 className="font-medium leading-none">{partner.legal_business_name}</h4>
				<p className="text-sm text-muted-foreground">Detalhes completos do parceiro.</p>
			</div>
			<Separator />
			<div className="grid gap-2 text-sm">
				<h5 className="font-semibold">Dados da Empresa</h5>
				<div className="grid grid-cols-[100px_1fr] items-center">
					<span className="font-medium text-muted-foreground">CNPJ</span>
					<span>{formatCnpj(partner.cnpj)}</span>
				</div>
				<Separator />
				<h5 className="font-semibold pt-2">Contato</h5>
				<div className="grid grid-cols-[100px_1fr] items-center">
					<span className="font-medium text-muted-foreground">Responsável</span>
					<span>{partner.contact_name}</span>
				</div>
				<div className="grid grid-cols-[100px_1fr] items-center">
					<span className="font-medium text-muted-foreground">Celular</span>
					<span>{partner.contact_mobile}</span>
				</div>
				<div className="grid grid-cols-[100px_1fr] items-center">
					<span className="font-medium text-muted-foreground">Email</span>
					<span>{partner.contact_email}</span>
				</div>
				<Separator />
				<h5 className="font-semibold pt-2">Endereço</h5>
				<div className="grid grid-cols-[100px_1fr] items-center">
					<span className="font-medium text-muted-foreground">CEP</span>
					<span>{partner.cep}</span>
				</div>
				<div className="grid grid-cols-[100px_1fr] items-center">
					<span className="font-medium text-muted-foreground">Logradouro</span>
					<span>
						{partner.street}, {partner.number}
					</span>
				</div>
				{partner.complement && (
					<div className="grid grid-cols-[100px_1fr] items-center">
						<span className="font-medium text-muted-foreground">Complemento</span>
						<span>{partner.complement}</span>
					</div>
				)}
				<div className="grid grid-cols-[100px_1fr] items-center">
					<span className="font-medium text-muted-foreground">Bairro</span>
					<span>{partner.neighborhood}</span>
				</div>
				<div className="grid grid-cols-[100px_1fr] items-center">
					<span className="font-medium text-muted-foreground">Cidade/UF</span>
					<span>
						{partner.city}/{partner.state}
					</span>
				</div>
			</div>
		</div>
	)
}

export const DataTableRowActions = <TData,>({ row }: DataTableRowActionsProps<TData>) => {
	const partner = row.original as Partner

	return (
		<div className="flex items-center justify-end gap-2">
			<Popover>
				<PopoverTrigger asChild>
					<Button aria-haspopup="true" size="icon" variant="ghost">
						<Eye />
						<span className="sr-only">Ver detalhes</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-96">
					<PartnerDetails partner={partner} />
				</PopoverContent>
			</Popover>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button aria-haspopup="true" size="icon" variant="ghost">
						<MoreHorizontal />
						<span className="sr-only">Toggle menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" side="left">
					<DropdownMenuLabel>Ações</DropdownMenuLabel>
					<DropdownMenuItem>
						<Pencil />
						Editar
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<CheckCircle />
						Aprovar
					</DropdownMenuItem>
					<DropdownMenuItem className="text-destructive focus:text-destructive">
						<XCircle />
						Rejeitar
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
