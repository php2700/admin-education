import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ISEETestPrepAdmin from "../../components/tables/BasicTables/ISEEtest";

export default function ISEEtestDetails() {
  return (
    <>
      <PageMeta
        title="ISEE Detail"
        description=" ISEE Detail"
      />
      <PageBreadcrumb pageTitle="ISEE Detail " />
      <div className="space-y-6">
        <ComponentCard title="ISEE Detail">
          <ISEETestPrepAdmin />
        </ComponentCard>
      </div>
    </>
  );
}