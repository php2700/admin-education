import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import K12Table from "../../components/tables/BasicTables/k-12Tab";

export default function K12Tab() {
  return (
    <>
      <PageMeta
        title="k-12"
        description="k-12"
      />
      <PageBreadcrumb pageTitle="k-12 " />
      <div className="space-y-6">
        <ComponentCard title="k-12">
          <K12Table />
        </ComponentCard>
      </div>
    </>
  );
}
