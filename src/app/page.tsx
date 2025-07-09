import Link from "next/link"

const Home = () => {
	return (
		<main className="flex flex-col gap-y-2">
			Links do projeto:
			<Link className="decoration-blue-400 underline text-blue-400" href="/dashboard">
				Dashboard
			</Link>
			<Link className="decoration-blue-400 underline text-blue-400" href="/register">
				Formulário que o parceiro vai preencher
			</Link>
		</main>
	)
}

export default Home
