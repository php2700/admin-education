import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TestImonial from "../../components/tables/BasicTables/testImo";

export default function TestImoTables() {
  return (
    <>
      <PageMeta
        title="about"
        description="about"
      />
      <PageBreadcrumb pageTitle="TestImonial" />
      <div className="space-y-6">
        <ComponentCard title="TestImonial">
          <TestImonial />
        </ComponentCard>
      </div>
    </>
  );
}
