import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ElaTestPrepAdmin from "../../components/tables/BasicTables/ELAtest";

export default function ELAtestDetails() {
  return (
    <>
      <PageMeta
        title="ELA Detail"
        description=" ELA Detail"
      />
      <PageBreadcrumb pageTitle="ELA Detail " />
      <div className="space-y-6">
        <ComponentCard title="ELA Detail">
          <ElaTestPrepAdmin />
        </ComponentCard>
      </div>
    </>
  );
}