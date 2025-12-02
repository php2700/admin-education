import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ManagementAdmin from "../../components/tables/BasicTables/Management";

export default function Managements() {
  return (
    <>
      <PageMeta
        title="faq"
        description="faq"
      />
      <PageBreadcrumb pageTitle="Our-Management" />
      <div className="space-y-6">
        <ComponentCard title="Our-Management ">
          <ManagementAdmin />
        </ComponentCard>
      </div>
    </>
  );
}
