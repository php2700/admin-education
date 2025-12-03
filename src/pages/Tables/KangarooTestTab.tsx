import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import MathKangarooTestPrepAdmin from "../../components/tables/BasicTables/MathKangaroo";

export default function KangarooDetails() {
  return (
    <>
      <PageMeta
        title="Kangaroo Detail"
        description=" AMC Detail"
      />
      <PageBreadcrumb pageTitle="Kangaroo Detail " />
      <div className="space-y-6">
        <ComponentCard title="Kangaroo Detail">
          <MathKangarooTestPrepAdmin />
        </ComponentCard>
      </div>
    </>
  );
}