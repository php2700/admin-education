import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ActTestPrepAdmin from "../../components/tables/BasicTables/ACT";

export default function ACTtestDetails() {
  return (
    <>
      <PageMeta
        title="ACT Detail"
        description=" ACT Detail"
      />
      <PageBreadcrumb pageTitle="ACT Detail " />
      <div className="space-y-6">
        <ComponentCard title="ACT Detail">
          <ActTestPrepAdmin />
        </ComponentCard>
      </div>
    </>
  );
}