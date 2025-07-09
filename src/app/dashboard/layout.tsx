import { AppSidebar } from "@/components/app-sidebar"
import { SidebarBreadcrumb } from "@/components/sidebar-breadcrumb"
import { SidebarProvider } from "@/components/ui/sidebar"

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<SidebarProvider>
			<div className="flex min-h-screen max-w-full w-full">
				<AppSidebar className="w-64 flex-none" />

				<div className="flex-1 min-w-0 overflow-auto flex flex-col">
					<div>
						<SidebarBreadcrumb />
						<main className="container mx-auto flex flex-1 flex-col justify-center gap-8 p-4 pt-0">{children}</main>
					</div>
				</div>
			</div>
		</SidebarProvider>
	)
}

export default RootLayout
