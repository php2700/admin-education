import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import SuccessTable from "../../components/tables/BasicTables/sucessTable";

export default function SuccessTables() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
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
