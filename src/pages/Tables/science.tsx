import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ScienceTable from "../../components/tables/BasicTables/scienceTable";

export default function ScienceTab() {
  return (
    <>
      <PageMeta
        title="Science"
        description="Science"
      />
      <PageBreadcrumb pageTitle="Science  " />
      <div className="space-y-6">
        <ComponentCard title="Science ">
          <ScienceTable />
        </ComponentCard>
      </div>
    </>
  );
}
