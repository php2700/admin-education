import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import Pricing from "../../components/tables/BasicTables/pricingTab";

export default function PricingTables() {
  return (
    <>
      <PageMeta
        title="Pricing"
        description="Pricing"
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
