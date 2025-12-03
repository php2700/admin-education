import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import StbTestPrepAdmin from "../../components/tables/BasicTables/STBT";

export default function STBTtestDetails() {
  return (
    <>
      <PageMeta
        title="STBT Detail"
        description=" STBT Detail"
      />
      <PageBreadcrumb pageTitle="STBT Detail " />
      <div className="space-y-6">
        <ComponentCard title="STBT Detail">
          <StbTestPrepAdmin />
        </ComponentCard>
      </div>
    </>
  );
}
