import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import AmcTestPrepAdmin from "../../components/tables/BasicTables/AMC";

export default function AMCtestDetails() {
  return (
    <>
      <PageMeta
        title="AMC Detail"
        description=" AMC Detail"
      />
      <PageBreadcrumb pageTitle="AMC Detail " />
      <div className="space-y-6">
        <ComponentCard title="AMC Detail">
          <AmcTestPrepAdmin />
        </ComponentCard>
      </div>
    </>
  );
}