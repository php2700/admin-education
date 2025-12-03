import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TestPrepDetail from "../../components/tables/BasicTables/testDetails";

export default function TestPrepDetails() {
  return (
    <>
      <PageMeta
        title="Test Pre Detail"
        description="Test Pre Detail"
      />
      <PageBreadcrumb pageTitle="Test Pre Detail " />
      <div className="space-y-6">
        <ComponentCard title="Test Pre Detail">
          <TestPrepDetail />
        </ComponentCard>
      </div>
    </>
  );
}
