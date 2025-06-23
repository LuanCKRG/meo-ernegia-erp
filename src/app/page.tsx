import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { getAllPartners } from "@/actions/partners/get-all-partners"
import { PartnersTable } from "@/components/partners-table"
import { Button } from "@/components/ui/button"

const Home = async () => {
	const partners = await getAllPartners()
	return (
		<main className="container mx-auto flex min-h-screen flex-col gap-8 p-4 md:p-8">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div className="text-center md:text-left">
					<h1 className="text-3xl font-bold tracking-tight text-foreground">Parceiros</h1>
					<p className="text-muted-foreground">Gerencie os parceiros cadastrados no sistema.</p>
				</div>
				<Link href="/register" passHref className="w-full md:w-auto">
					<Button className="w-full md:w-auto">
						<PlusCircle />
						Novo Cadastro
					</Button>
				</Link>
			</div>
			<PartnersTable partners={partners} />
		</main>
	)
}

export default Home
