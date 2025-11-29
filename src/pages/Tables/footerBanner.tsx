import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import FooterBannerTable from "../../components/tables/BasicTables/footerBannerTab";

export default function FooterBannerTables() {
  return (
    <>
      <PageMeta
        title="Footer Banner"
        description="Footer Banner"
      />
      <PageBreadcrumb pageTitle="Footer Banner" />
      <div className="space-y-6">
        <ComponentCard title="Footer Banner">
          <FooterBannerTable />
        </ComponentCard>
      </div>
    </>
  );
}
