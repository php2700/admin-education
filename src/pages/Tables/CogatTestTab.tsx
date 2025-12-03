import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import CogatTestPrepAdmin from "../../components/tables/BasicTables/Cogat";

export default function COGATtestDetails() {
  return (
    <>
      <PageMeta
        title="COGAT Detail"
        description=" COGAT Detail"
      />
      <PageBreadcrumb pageTitle="COGAT Detail " />
      <div className="space-y-6">
        <ComponentCard title="COGAT Detail">
          <CogatTestPrepAdmin />
        </ComponentCard>
      </div>
    </>
  );
}