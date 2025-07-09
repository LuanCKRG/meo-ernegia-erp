import { cn } from "@/lib/utils"

const DashboardPageHeaderContainer = ({ className, ...props }: React.ComponentProps<"div">) => (
	<div className={cn("flex flex-col gap-4 md:flex-row md:items-center md:justify-between", className)} {...props} />
)

const DashboardPageHeaderWrapper = ({ className, ...props }: React.ComponentProps<"div">) => (
	<div className={cn("text-center md:text-left", className)} {...props} />
)

const DashboardPageTitle = ({ className, ...props }: React.ComponentProps<"h1">) => (
	<h1 className={cn("text-3xl font-bold tracking-tight text-foreground", className)} {...props} />
)

const DashboardPageSubTitle = ({ className, ...props }: React.ComponentProps<"p">) => <p className={cn("text-muted-foreground", className)} {...props} />

// <AddSellerDialog />

export { DashboardPageHeaderContainer, DashboardPageHeaderWrapper, DashboardPageTitle, DashboardPageSubTitle }
