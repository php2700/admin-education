import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TestPrepDetail from "../../components/tables/BasicTables/testDetails";

export default function TestPrepDetails() {
  return (
    <>
      <PageMeta
        title="SATTestDetail"
        description="SATTestDetail  "
      />
      <PageBreadcrumb pageTitle="SATTestDetail " />
      <div className="space-y-6">
        <ComponentCard title="SATTestDetail">
          <TestPrepDetail />
        </ComponentCard>
      </div>
    </>
  );
}
