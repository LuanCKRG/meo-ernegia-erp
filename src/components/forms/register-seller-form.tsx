"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { maskCpf } from "@/lib/utils/masks"
import { type RegisterSellerData, registerSellerSchema } from "@/lib/validations/seller"

const RegisterSellerForm = ({ className }: { className?: string }) => {
	const form = useForm<RegisterSellerData>({
		resolver: zodResolver(registerSellerSchema),
		defaultValues: {
			fullName: "",
			cpf: "",
			email: ""
		}
	})

	function onSubmit(data: RegisterSellerData) {
		console.log(data)
		toast.success("Vendedor cadastrado com sucesso!")
		form.reset()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4 py-4", className)}>
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome Completo</FormLabel>
							<FormControl>
								<Input placeholder="João da Silva" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="cpf"
					render={({ field }) => (
						<FormItem>
							<FormLabel>CPF</FormLabel>
							<FormControl>
								<Input placeholder="000.000.000-00" {...field} onChange={(e) => field.onChange(maskCpf(e.target.value))} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" placeholder="joao.silva@exemplo.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					Cadastrar Vendedor
				</Button>
			</form>
		</Form>
	)
}

export { RegisterSellerForm }
