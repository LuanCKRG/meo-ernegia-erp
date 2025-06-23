"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { cn, formatCnpj } from "@/lib/utils"
import type { Partner } from "@/types/partners"
import { DataTable } from "@/components/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions"

const statusTranslations: Record<Partner["status"], string> = {
	approved: "Aprovado",
	pending: "Aguardando aprovação",
	rejected: "Rejeitado"
}

const StatusBadge = ({ status }: { status: Partner["status"] }) => {
	const variant = {
		approved: "default",
		pending: "secondary",
		rejected: "destructive"
	}[status] as "default" | "secondary" | "destructive"

	return (
		<Badge variant={variant} className="capitalize whitespace-nowrap">
			{statusTranslations[status]}
		</Badge>
	)
}

const columns: ColumnDef<Partner>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<div className="flex justify-center">
				<Checkbox
					checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className="flex justify-center">
				<Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
			</div>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: "kdi",
		header: ({ column }) => <DataTableColumnHeader column={column} title="KDI" />
	},
	{
		accessorKey: "legal_business_name",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Razão Social" />
	},
	{
		accessorKey: "cnpj",
		header: ({ column }) => <DataTableColumnHeader column={column} title="CNPJ" />,
		cell: ({ row }) => <div>{formatCnpj(row.getValue("cnpj"))}</div>
	},
	{
		accessorKey: "contact_name",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Responsável" />
	},
	{
		accessorKey: "contact_mobile",
		header: () => "Celular",
		cell: ({ row }) => <div className="w-[140px]">{row.getValue("contact_mobile")}</div>
	},
	{
		accessorKey: "created_at",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Data da Solicitação" />,
		cell: ({ row }) => {
			const date = new Date(row.getValue("created_at"))
			return <div className="font-medium">{format(date, "dd/MM/yyyy")}</div>
		}
	},
	{
		accessorKey: "active",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Ativo" />,
		cell: ({ row }) => {
			const isActive = row.original.active
			return (
				<div className="flex items-center gap-2">
					<div className={cn("h-2 w-2 rounded-full", isActive ? "bg-green-500" : "bg-slate-400")} />
					<span>{isActive ? "Ativo" : "Inativo"}</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(String(row.getValue(id)))
		}
	},
	{
		accessorKey: "status",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
		cell: ({ row }) => <StatusBadge status={row.original.status} />,
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		}
	},
	{
		accessorKey: "city",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Cidade" />,
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		}
	},
	{
		accessorKey: "state",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		}
	},
	{
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />,
		enableSorting: false,
		enableHiding: false
	}
]

const PartnersTable = ({ partners }: { partners: Partner[] }) => {
	return <DataTable columns={columns} data={partners} />
}

export { columns, PartnersTable }
