import { DashboardPageHeaderContainer, DashboardPageHeaderWrapper, DashboardPageSubTitle, DashboardPageTitle } from "@/components/dashboard-pages-header"
import { RegisterSellerForm } from "@/components/forms/register-seller-form"

const AddPartnerPage = () => {
	return (
		<>
			<DashboardPageHeaderContainer>
				<DashboardPageHeaderWrapper>
					<DashboardPageTitle>Vendedores</DashboardPageTitle>
					<DashboardPageSubTitle>Adicione vendedores no sistema.</DashboardPageSubTitle>
				</DashboardPageHeaderWrapper>
			</DashboardPageHeaderContainer>

			<RegisterSellerForm className="max-w-3xl mx-auto w-full" />
		</>
	)
}

export default AddPartnerPage
