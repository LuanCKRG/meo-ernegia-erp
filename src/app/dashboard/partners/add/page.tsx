import { DashboardPageHeaderContainer, DashboardPageHeaderWrapper, DashboardPageSubTitle, DashboardPageTitle } from "@/components/dashboard-pages-header"
import { ResgisterPartnerForm } from "@/components/forms/register-partner-form"

const AddPartnerPage = () => {
	return (
		<>
			<DashboardPageHeaderContainer>
				<DashboardPageHeaderWrapper>
					<DashboardPageTitle>Parceiros</DashboardPageTitle>
					<DashboardPageSubTitle>Adicione parceiros no sistema.</DashboardPageSubTitle>
				</DashboardPageHeaderWrapper>
			</DashboardPageHeaderContainer>

			<ResgisterPartnerForm className="max-w-3xl mx-auto" />
		</>
	)
}

export default AddPartnerPage
