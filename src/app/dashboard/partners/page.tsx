import { getAllPartners } from "@/actions/partners/get-all-partners"
import { DashboardPageHeaderContainer, DashboardPageHeaderWrapper, DashboardPageSubTitle, DashboardPageTitle } from "@/components/dashboard-pages-header"
import { AddPartnerDialog } from "@/components/dialogs/add-partner-dialog"
import { PartnersTable } from "@/components/partners-table"

const PartnersPage = async () => {
	const partners = await getAllPartners()

	return (
		<>
			<DashboardPageHeaderContainer>
				<DashboardPageHeaderWrapper>
					<DashboardPageTitle>Parceiros</DashboardPageTitle>
					<DashboardPageSubTitle>Gerencie os parceiros cadastrados no sistema.</DashboardPageSubTitle>
				</DashboardPageHeaderWrapper>

				<AddPartnerDialog />
			</DashboardPageHeaderContainer>

			<PartnersTable partners={partners} />
		</>
	)
}

export default PartnersPage
