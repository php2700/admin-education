import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import SbacTestPrepAdmin from "../../components/tables/BasicTables/SBACS";

export default function SBACtestDetails() {
  return (
    <>
      <PageMeta
        title="SBAC Detail"
        description=" SBAC Detail"
      />
      <PageBreadcrumb pageTitle="SBAC Detail " />
      <div className="space-y-6">
        <ComponentCard title="SBAC Detail">
          <SbacTestPrepAdmin />
        </ComponentCard>
      </div>
    </>
  );
}