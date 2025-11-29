import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import SuccessTable from "../../components/tables/BasicTables/sucessTable";

export default function SuccessTables() {
  return (
    <>
      <PageMeta
        title="Success Story List"
        description="Success Story List"
      />
      <PageBreadcrumb pageTitle="Success Story List" />
      <div className="space-y-6">
        <ComponentCard title="Success Story ">
          <SuccessTable />
        </ComponentCard>
      </div>
    </>
  );
}
