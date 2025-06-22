"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, UserPlus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { signUpPartner } from "@/actions/auth/sign-up-partner-action"
import { createPartner } from "@/actions/partners/create-partner-action"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { maskCelular, maskCep, maskCnpj } from "@/lib/utils/masks"
import { type RegisterPartnerData, registerPartnerSchema } from "@/lib/validations/partner"

const brazilianStates = [
	{ value: "AC", label: "Acre" },
	{ value: "AL", label: "Alagoas" },
	{ value: "AP", label: "Amapá" },
	{ value: "AM", label: "Amazonas" },
	{ value: "BA", label: "Bahia" },
	{ value: "CE", label: "Ceará" },
	{ value: "DF", label: "Distrito Federal" },
	{ value: "ES", label: "Espírito Santo" },
	{ value: "GO", label: "Goiás" },
	{ value: "MA", label: "Maranhão" },
	{ value: "MT", label: "Mato Grosso" },
	{ value: "MS", label: "Mato Grosso do Sul" },
	{ value: "MG", label: "Minas Gerais" },
	{ value: "PA", label: "Pará" },
	{ value: "PB", label: "Paraíba" },
	{ value: "PR", label: "Paraná" },
	{ value: "PE", label: "Pernambuco" },
	{ value: "PI", label: "Piauí" },
	{ value: "RJ", label: "Rio de Janeiro" },
	{ value: "RN", label: "Rio Grande do Norte" },
	{ value: "RS", label: "Rio Grande do Sul" },
	{ value: "RO", label: "Rondônia" },
	{ value: "RR", label: "Roraima" },
	{ value: "SC", label: "Santa Catarina" },
	{ value: "SP", label: "São Paulo" },
	{ value: "SE", label: "Sergipe" },
	{ value: "TO", label: "Tocantins" }
]

const RegistrationForm = () => {
	const [step, setStep] = useState(1)
	const [isFetchingCep, setIsFetchingCep] = useState(false)

	const registerPartnerForm = useForm<RegisterPartnerData>({
		resolver: zodResolver(registerPartnerSchema),
		defaultValues: {
			cnpj: "",
			legalBusinessName: "",
			contactName: "",
			contactMobile: "",
			contactEmail: "",
			cep: "",
			street: "",
			number: "",
			complement: "",
			neighborhood: "",
			city: "",
			state: "",
			confirmEmail: "",
			password: "",
			confirmPassword: ""
		}
	})

	const { control, handleSubmit, formState, setValue, setFocus, trigger, resetField } = registerPartnerForm

	async function handleCepBlur(e: React.FocusEvent<HTMLInputElement>) {
		const cep = e.target.value.replace(/\D/g, "")
		if (cep.length !== 8) {
			return
		}
		setIsFetchingCep(true)
		try {
			const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
			const data = await response.json()
			if (data.erro) {
				toast.error("CEP não encontrado", { description: "Por favor, verifique o CEP digitado." })
				resetField("street")
				resetField("neighborhood")
				resetField("city")
				resetField("state")
				return
			}
			setValue("street", data.logradouro, { shouldValidate: true })
			setValue("neighborhood", data.bairro, { shouldValidate: true })
			setValue("city", data.localidade, { shouldValidate: true })
			setValue("state", data.uf, { shouldValidate: true })
			setFocus("number")
		} catch (error) {
			console.error("Falha ao buscar CEP:", error)
			toast.error("Erro ao buscar CEP", { description: "Não foi possível buscar os dados do endereço. Tente novamente." })
		} finally {
			setIsFetchingCep(false)
		}
	}

	const prevStep = () => setStep((prev) => prev - 1)

	async function nextStep(currentStep: number) {
		let fieldsToValidate: (keyof RegisterPartnerData)[] = []
		if (currentStep === 1) {
			fieldsToValidate = ["cnpj", "legalBusinessName", "contactName", "contactMobile"]
		} else if (currentStep === 2) {
			fieldsToValidate = ["cep", "street", "number", "neighborhood", "city", "state"]
		}

		const output = await trigger(fieldsToValidate, { shouldFocus: true })
		if (output) {
			setStep(currentStep + 1)
		}
	}

	async function onSubmit(data: RegisterPartnerData) {
		const { success: signUpSuccess, message: signUpMessage, data: userData } = await signUpPartner(data)

		if (!signUpSuccess) {
			toast.error(signUpMessage)
			return
		}

		if (!userData?.userId) {
			toast.error("Não foi possível completar o cadastro. Tente novamente com outro e-mail.")
			return
		}

		const { success: createPartnerSuccess, message: createPartnerMessage } = await createPartner({ userId: userData.userId, partnerData: data })

		if (!createPartnerSuccess) {
			toast.error(createPartnerMessage)
			return
		}

		toast.success("Cadastro realizado com sucesso!")
	}

	const motionVariants = {
		initial: { opacity: 0, x: -50 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: 50 }
	}

	return (
		<Card className="w-full max-w-2xl shadow-2xl shadow-primary/20">
			<CardHeader>
				<Image className="mx-auto" src="/logo.png" alt="MEO Ernegia" width={300} height={200} />
				<CardTitle className="text-3xl text-center sr-only">MEO Ernegia</CardTitle>
				<CardDescription className="text-center">Siga os passos para se cadastrar como parceiro.</CardDescription>
				<div className="flex w-full items-start pt-6">
					<div className="flex flex-col items-center flex-1">
						<div
							className={cn(
								"w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg transition-all",
								step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
							)}
						>
							1
						</div>
						<p className={cn("mt-2 text-sm font-medium", step >= 1 ? "text-primary" : "text-muted-foreground")}>Empresa</p>
					</div>
					<div className={cn("flex-1 h-1 bg-border mt-4 transition-colors", step > 1 && "bg-primary")} />
					<div className="flex flex-col items-center flex-1">
						<div
							className={cn(
								"w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg transition-all",
								step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
							)}
						>
							2
						</div>
						<p className={cn("mt-2 text-sm font-medium", step >= 2 ? "text-primary" : "text-muted-foreground")}>Endereço</p>
					</div>
					<div className={cn("flex-1 h-1 bg-border mt-4 transition-colors", step > 2 && "bg-primary")} />
					<div className="flex flex-col items-center flex-1">
						<div
							className={cn(
								"w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg transition-all",
								step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
							)}
						>
							3
						</div>
						<p className={cn("mt-2 text-sm font-medium", step >= 3 ? "text-primary" : "text-muted-foreground")}>Cadastro</p>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<Form {...registerPartnerForm}>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<AnimatePresence mode="wait">
							<motion.div
								key={step}
								variants={motionVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
							>
								{step === 1 && (
									<div className="space-y-6">
										<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
											<FormField
												control={control}
												name="cnpj"
												render={({ field }) => (
													<FormItem>
														<FormLabel>CNPJ</FormLabel>
														<FormControl>
															<Input placeholder="00.000.000/0000-00" {...field} onChange={(e) => field.onChange(maskCnpj(e.target.value))} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={control}
												name="legalBusinessName"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Razão Social</FormLabel>
														<FormControl>
															<Input placeholder="Nome da sua empresa" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<FormField
											control={control}
											name="contactName"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Nome do Responsável</FormLabel>
													<FormControl>
														<Input placeholder="João da Silva" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={control}
											name="contactMobile"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Celular do Responsável</FormLabel>
													<FormControl>
														<Input placeholder="(11) 99999-9999" {...field} onChange={(e) => field.onChange(maskCelular(e.target.value))} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								)}

								{step === 2 && (
									<div className="space-y-6">
										<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
											<FormField
												control={control}
												name="cep"
												render={({ field }) => (
													<FormItem className="md:col-span-1">
														<FormLabel>CEP</FormLabel>
														<FormControl>
															<Input placeholder="00000-000" {...field} onChange={(e) => field.onChange(maskCep(e.target.value))} onBlur={handleCepBlur} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={control}
												name="street"
												render={({ field }) => (
													<FormItem className="md:col-span-2">
														<FormLabel>Rua</FormLabel>
														<FormControl>
															<Input placeholder="Avenida Paulista" {...field} disabled={isFetchingCep} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
											<FormField
												control={control}
												name="number"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Número</FormLabel>
														<FormControl>
															<Input placeholder="123" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={control}
												name="complement"
												render={({ field }) => (
													<FormItem className="md:col-span-2">
														<FormLabel>Complemento (Opcional)</FormLabel>
														<FormControl>
															<Input placeholder="Apto 101, Bloco B" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
											<FormField
												control={control}
												name="neighborhood"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Bairro</FormLabel>
														<FormControl>
															<Input placeholder="Bela Vista" {...field} disabled={isFetchingCep} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={control}
												name="city"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Cidade</FormLabel>
														<FormControl>
															<Input placeholder="São Paulo" {...field} disabled={isFetchingCep} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={control}
												name="state"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Estado</FormLabel>
														<Select onValueChange={field.onChange} defaultValue={field.value} value={field.value} disabled={isFetchingCep}>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="Selecione o estado" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{brazilianStates.map((state) => (
																	<SelectItem key={state.value} value={state.value}>
																		{state.label}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>
								)}

								{step === 3 && (
									<div className="space-y-6">
										<FormField
											control={control}
											name="contactEmail"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Email do Responsável</FormLabel>
													<FormControl>
														<Input placeholder="contato@suaempresa.com" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={control}
											name="confirmEmail"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Confirmar Email do Responsável</FormLabel>
													<FormControl>
														<Input type="email" placeholder="confirme.contato@suaempresa.com" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={control}
											name="password"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Senha</FormLabel>
													<FormControl>
														<Input type="password" placeholder="********" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={control}
											name="confirmPassword"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Confirmar Senha</FormLabel>
													<FormControl>
														<Input type="password" placeholder="********" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								)}
							</motion.div>
						</AnimatePresence>

						<div className="flex justify-between pt-4">
							{step === 1 && (
								<Button type="button" onClick={() => nextStep(1)} className="w-full">
									Próximo <ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							)}
							{step === 2 && (
								<>
									<Button type="button" variant="outline" onClick={prevStep}>
										<ArrowLeft className="mr-2 h-4 w-4" /> Voltar
									</Button>
									<Button type="button" onClick={() => nextStep(2)}>
										Próximo <ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								</>
							)}
							{step === 3 && (
								<>
									<Button type="button" variant="outline" onClick={prevStep}>
										<ArrowLeft className="mr-2 h-4 w-4" /> Voltar
									</Button>
									<Button type="submit" disabled={formState.isSubmitting}>
										<UserPlus className="mr-2 h-4 w-4" />
										Cadastrar
									</Button>
								</>
							)}
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

export { RegistrationForm }
