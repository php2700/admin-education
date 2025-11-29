import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import PlanTable from "../../components/tables/BasicTables/planTable";

export default function PlanTables() {
  return (
    <>
      <PageMeta
        title="Plan List"
        description="Plan List"
      />
      <PageBreadcrumb pageTitle="Plan List" />
      <div className="space-y-6">
        <ComponentCard title="Plan ">
          <PlanTable />
        </ComponentCard>
      </div>
    </>
  );
}
