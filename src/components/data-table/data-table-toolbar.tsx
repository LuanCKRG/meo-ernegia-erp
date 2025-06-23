"use client"

import type { Table } from "@tanstack/react-table"
import { SlidersHorizontal, X } from "lucide-react"
import * as React from "react"

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-media-query"
import type { Partner } from "@/types/partners"

interface DataTableToolbarProps<TData> {
	table: Table<TData>
}

const columnDisplayNames: Record<string, string> = {
	kdi: "KDI",
	legal_business_name: "Razão Social",
	cnpj: "CNPJ",
	contact_name: "Responsável",
	contact_mobile: "Celular",
	created_at: "Data da Solicitação",
	status: "Status",
	active: "Ativo",
	city: "Cidade",
	state: "Estado"
}

const statusTranslations: Record<string, string> = {
	approved: "Aprovado",
	pending: "Aguardando aprovação",
	rejected: "Rejeitado"
}

export const DataTableToolbar = <TData,>({ table }: DataTableToolbarProps<TData>) => {
	const isFiltered = table.getState().columnFilters.length > 0
	const partners = table.getCoreRowModel().rows.map((row) => row.original) as Partner[]

	const isDesktop = useMediaQuery("(min-width: 768px)")
	const [isSheetOpen, setIsSheetOpen] = React.useState(false)

	React.useEffect(() => {
		if (isDesktop) {
			setIsSheetOpen(false)
		}
	}, [isDesktop])

	const states = Array.from(new Set(partners.map((p) => p.state))).map((s) => ({ label: s, value: s }))
	const cities = Array.from(new Set(partners.map((p) => p.city))).map((c) => ({ label: c, value: c }))
	const statuses = Array.from(new Set(partners.map((p) => p.status))).map((s) => ({ label: statusTranslations[s] ?? s, value: s }))
	const activeStatuses = [
		{ label: "Ativo", value: "true" },
		{ label: "Inativo", value: "false" }
	]

	const facetedFilters = (
		<>
			{table.getColumn("state") && <DataTableFacetedFilter column={table.getColumn("state")} title="Estado" options={states} />}
			{table.getColumn("city") && <DataTableFacetedFilter column={table.getColumn("city")} title="Cidade" options={cities} />}
			{table.getColumn("status") && <DataTableFacetedFilter column={table.getColumn("status")} title="Status" options={statuses} />}
			{table.getColumn("active") && <DataTableFacetedFilter column={table.getColumn("active")} title="Ativo" options={activeStatuses} />}
		</>
	)

	return (
		<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
			<div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center">
				<Input
					placeholder="Filtrar por nome..."
					value={(table.getColumn("legal_business_name")?.getFilterValue() as string) ?? ""}
					onChange={(event) => table.getColumn("legal_business_name")?.setFilterValue(event.target.value)}
					className="h-8 w-full md:w-[150px] lg:w-[250px]"
				/>
				<div className="hidden items-center space-x-2 md:flex">{facetedFilters}</div>
			</div>

			<div className="flex flex-col gap-2 md:w-auto md:flex-row">
				<div className="flex w-full items-center gap-2 md:w-auto">
					<div className="flex md:hidden">
						<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
							<SheetTrigger asChild>
								<Button variant="outline" size="sm" className="h-8 w-full">
									<SlidersHorizontal className="mr-2 h-4 w-4" />
									Filtros
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="pt-12">
								<SheetHeader className="text-left">
									<SheetTitle>Filtros</SheetTitle>
								</SheetHeader>
								<div className="flex flex-col gap-4 py-4">{facetedFilters}</div>
							</SheetContent>
						</Sheet>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm" className="h-8 flex w-full md:w-auto shrink">
								<SlidersHorizontal className="mr-2 h-4 w-4" />
								Colunas
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-[150px]">
							<DropdownMenuLabel>Alternar colunas</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{table
								.getAllColumns()
								.filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) => column.toggleVisibility(!!value)}
										>
											{columnDisplayNames[column.id] ?? column.id}
										</DropdownMenuCheckboxItem>
									)
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{isFiltered && (
					<Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 w-full px-2 md:w-auto lg:px-3">
						Limpar
						<X className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
		</div>
	)
}
