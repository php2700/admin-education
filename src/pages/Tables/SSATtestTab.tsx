import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import SSATtestpage from "../../components/tables/BasicTables/SSATtest";

export default function SSATtestDetails() {
  return (
    <>
      <PageMeta
        title="SSAT Detail"
        description=" SSAT Detail"
      />
      <PageBreadcrumb pageTitle="SSAT Detail " />
      <div className="space-y-6">
        <ComponentCard title="SSAT Detail">
          <SSATtestpage />
        </ComponentCard>
      </div>
    </>
  );
}
