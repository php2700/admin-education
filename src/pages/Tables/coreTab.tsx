import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import CommonCoreTable from "../../components/tables/BasicTables/commonCoreTab";

export default function CommonCoreElaTab() {
  return (
    <>
      <PageMeta
        title="Common Core Ela"
        description="Common Core Ela"
      />
      <PageBreadcrumb pageTitle="Common Core Ela  " />
      <div className="space-y-6">
        <ComponentCard title="Common Core Ela ">
          <CommonCoreTable />
        </ComponentCard>
      </div>
    </>
  );
}
