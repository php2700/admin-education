import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ScatTestPrepAdmin from "../../components/tables/BasicTables/CSAT";

export default function SCATtestDetails() {
  return (
    <>
      <PageMeta
        title="SCAT Detail"
        description=" SCAT Detail"
      />
      <PageBreadcrumb pageTitle="SCAT Detail " />
      <div className="space-y-6">
        <ComponentCard title="SCAT Detail">
          <ScatTestPrepAdmin />
        </ComponentCard>
      </div>
    </>
  );
}