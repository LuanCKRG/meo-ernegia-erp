// import { getAllPartners } from "@/actions/partners/get-all-partners"
// import { PartnersTable } from "@/components/partners-table"
import { DashboardPageHeaderContainer, DashboardPageHeaderWrapper, DashboardPageSubTitle, DashboardPageTitle } from "@/components/dashboard-pages-header"
import { AddSellerDialog } from "@/components/dialogs/add-seller-dialog"

const SellersPage = () => {
	// const partners = await getAllPartners()
	return (
		<>
			<DashboardPageHeaderContainer>
				<DashboardPageHeaderWrapper>
					<DashboardPageTitle>Vendedores</DashboardPageTitle>
					<DashboardPageSubTitle>Gerencie os vendedores cadastrados no sistema.</DashboardPageSubTitle>
				</DashboardPageHeaderWrapper>

				<AddSellerDialog />
			</DashboardPageHeaderContainer>
			{/* <SellersTable /> */}
		</>
	)
}

export default SellersPage
