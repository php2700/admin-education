import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import KangarooTable from "../../components/tables/BasicTables/kangarooTab";

export default function KangarooTab() {
  return (
    <>
      <PageMeta
        title="kangaroo"
        description="kangaroo"
      />
      <PageBreadcrumb pageTitle="kangaroo  " />
      <div className="space-y-6">
        <ComponentCard title="kangaroo ">
          <KangarooTable />
        </ComponentCard>
      </div>
    </>
  );
}
