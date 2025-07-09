"use client"

import { usePathname } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

// Mapeamento de rotas para labels
const routeLabels: Record<string, string> = {
	dashboard: "Dashboard",
	sellers: "Vendedores",
	partners: "Parceiros",
	products: "Produtos",
	orders: "Pedidos",
	customers: "Clientes",
	reports: "Relatórios",
	settings: "Configurações",
	add: "Adicionar",
	edit: "Editar",
	view: "Visualizar"
}

// Mapeamento de categorias principais (removido para simplificar)
const categoryLabels: Record<string, string> = {
	orders: "Vendas",
	reports: "Relatórios",
	settings: "Sistema"
}

// Mapeamento de ações baseadas no contexto
const getActionLabel = (action: string, context: string): string => {
	const contextMap: Record<string, Record<string, string>> = {
		sellers: {
			add: "Adicionar Vendedor",
			edit: "Editar Vendedor",
			view: "Visualizar Vendedor"
		},
		partners: {
			add: "Adicionar Parceiro",
			edit: "Editar Parceiro",
			view: "Visualizar Parceiro"
		},
		products: {
			add: "Adicionar Produto",
			edit: "Editar Produto",
			view: "Visualizar Produto"
		},
		customers: {
			add: "Adicionar Cliente",
			edit: "Editar Cliente",
			view: "Visualizar Cliente"
		},
		orders: {
			add: "Novo Pedido",
			edit: "Editar Pedido",
			view: "Visualizar Pedido"
		}
	}

	return contextMap[context]?.[action] || `${routeLabels[action] || action} ${routeLabels[context] || context}`
}

export const SidebarBreadcrumb = () => {
	const pathname = usePathname()

	// Remove o primeiro slash e divide a URL em segmentos
	const segments = pathname.replace(/^\//, "").split("/").filter(Boolean)

	// Se não estiver no dashboard, não mostra breadcrumb
	if (!segments.length || segments[0] !== "dashboard") {
		return null
	}

	// Remove 'dashboard' dos segmentos
	const pathSegments = segments.slice(1)

	// Se não há segmentos após dashboard, mostra apenas Dashboard
	if (pathSegments.length === 0) {
		return (
			<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbPage>Dashboard</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
		)
	}

	// Constrói os itens do breadcrumb
	const buildBreadcrumbItems = () => {
		const items = []
		const mainSection = pathSegments[0]
		const category = categoryLabels[mainSection]

		// Se há uma categoria, adiciona ela primeiro
		if (category) {
			items.push(
				<BreadcrumbItem key="category" className="hidden md:block">
					<BreadcrumbLink href="/dashboard">{category}</BreadcrumbLink>
				</BreadcrumbItem>
			)
			items.push(<BreadcrumbSeparator key="sep-category" className="hidden md:block" />)
		}

		// Adiciona a seção principal
		if (pathSegments.length === 1) {
			// Para seções como sellers/partners, mostra: Vendedores > Visão Geral
			items.push(
				<BreadcrumbItem key="main">
					<BreadcrumbLink href={`/dashboard/${mainSection}`}>{routeLabels[mainSection] || mainSection}</BreadcrumbLink>
				</BreadcrumbItem>
			)
			items.push(<BreadcrumbSeparator key="sep-overview" />)
			items.push(
				<BreadcrumbItem key="overview">
					<BreadcrumbPage>Visão Geral</BreadcrumbPage>
				</BreadcrumbItem>
			)
		} else {
			// Não é o último, usa BreadcrumbLink
			items.push(
				<BreadcrumbItem key="main">
					<BreadcrumbLink href={`/dashboard/${mainSection}`}>{routeLabels[mainSection] || mainSection}</BreadcrumbLink>
				</BreadcrumbItem>
			)
		}

		// Adiciona ações/subseções
		for (let i = 1; i < pathSegments.length; i++) {
			const segment = pathSegments[i]
			const isLast = i === pathSegments.length - 1

			items.push(<BreadcrumbSeparator key={`sep-${i}`} />)

			if (isLast) {
				// É o último item
				const label =
					i === 1 && (segment === "add" || segment === "edit" || segment === "view") ? getActionLabel(segment, mainSection) : routeLabels[segment] || segment

				items.push(
					<BreadcrumbItem key={`segment-${i}`}>
						<BreadcrumbPage>{label}</BreadcrumbPage>
					</BreadcrumbItem>
				)
			} else {
				// Não é o último item
				const pathToHere = `/dashboard/${pathSegments.slice(0, i + 1).join("/")}`
				items.push(
					<BreadcrumbItem key={`segment-${i}`}>
						<BreadcrumbLink href={pathToHere}>{routeLabels[segment] || segment}</BreadcrumbLink>
					</BreadcrumbItem>
				)
			}
		}

		return items
	}

	return (
		<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<Breadcrumb>
					<BreadcrumbList>{buildBreadcrumbItems()}</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	)
}
