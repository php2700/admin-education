import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ShsatTestPrepAdmin from "../../components/tables/BasicTables/SHSATtest";

export default function SHSATtestDetails() {
  return (
    <>
      <PageMeta
        title="SHSAT Detail"
        description=" SHSAT Detail"
      />
      <PageBreadcrumb pageTitle="SHSAT Detail " />
      <div className="space-y-6">
        <ComponentCard title="SHSAT Detail">
          <ShsatTestPrepAdmin />
        </ComponentCard>
      </div>
    </>
  );
}