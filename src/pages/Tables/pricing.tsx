import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import Pricing from "../../components/tables/BasicTables/pricingTab";

export default function PricingTables() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Pricing " />
      <div className="space-y-6">
        <ComponentCard title="Pricing List">
          <Pricing />
        </ComponentCard>
      </div>
    </>
  );
}
