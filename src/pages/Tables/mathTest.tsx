import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import MathTestPrep from "../../components/tables/BasicTables/mathTestTab";

export default function MathTestTables() {
  return (
    <>
      <PageMeta
        title="Math Test Prep"
        description="Math Test Prep"
      />
      <PageBreadcrumb pageTitle="Math Test Prep " />
      <div className="space-y-6">
        <ComponentCard title="Math Test Prep">
          <MathTestPrep />
        </ComponentCard>
      </div>
    </>
  );
}
