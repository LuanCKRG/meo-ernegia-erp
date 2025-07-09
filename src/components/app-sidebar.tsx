"use client"

import { AudioWaveform, Command, Frame, GalleryVerticalEnd, Handshake, Map as MapIcon, PieChart, Users } from "lucide-react"
import Image from "next/image"

import { NavMain } from "@/components/nav-main"
// biome-ignore lint/correctness/noUnusedImports: <Futuramente podemos usar>
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// This is sample data.
const data = {
	user: {
		name: "Luan Vitor",
		email: "luancamposck@gmail.com",
		avatar: "/avatars/shadcn.jpg"
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise"
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup"
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free"
		}
	],
	navMain: [
		{
			title: "Parceiros",
			url: "#",
			icon: Handshake,
			isActive: true,
			items: [
				{
					title: "Visão Geral",
					url: "/dashboard/partners"
				},
				{
					title: "Adicionar",
					url: "/dashboard/partners/add"
				},
				{
					title: "Importar",
					url: "#"
				}
			]
		},
		{
			title: "Vendedores",
			url: "#",
			icon: Users,
			items: [
				{
					title: "Visão Geral",
					url: "/dashboard/sellers"
				},
				{
					title: "Adicionar",
					url: "/dashboard/sellers/add"
				},
				{
					title: "Importar",
					url: "#"
				}
			]
		}
		// {
		// 	title: "Documentation",
		// 	url: "#",
		// 	icon: BookOpen,
		// 	items: [
		// 		{
		// 			title: "Introduction",
		// 			url: "#"
		// 		},
		// 		{
		// 			title: "Get Started",
		// 			url: "#"
		// 		},
		// 		{
		// 			title: "Tutorials",
		// 			url: "#"
		// 		},
		// 		{
		// 			title: "Changelog",
		// 			url: "#"
		// 		}
		// 	]
		// },
		// {
		// 	title: "Settings",
		// 	url: "#",
		// 	icon: Settings2,
		// 	items: [
		// 		{
		// 			title: "General",
		// 			url: "#"
		// 		},
		// 		{
		// 			title: "Team",
		// 			url: "#"
		// 		},
		// 		{
		// 			title: "Billing",
		// 			url: "#"
		// 		},
		// 		{
		// 			title: "Limits",
		// 			url: "#"
		// 		}
		// 	]
		// }
	],
	projects: [
		{
			name: "Vendedores",
			url: "/dashboard/sellers",
			icon: Frame
		},
		{
			name: "Parceiros",
			url: "/dashboard/partners",
			icon: PieChart
		},
		{
			name: "Travel",
			url: "#",
			icon: MapIcon
		}
	]
}

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<Image className="mx-auto" src="/logo.png" alt="MEO Ernegia" width={200} height={150} />
			</SidebarHeader>

			<SidebarContent>
				<NavMain items={data.navMain} />
				{/* <NavProjects tabs={data.projects} /> */}
			</SidebarContent>

			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}

export { AppSidebar }
