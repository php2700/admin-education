import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import PSATDetail from "../../components/tables/BasicTables/PSAT";

export default function PSATtestDetails() {
  return (
    <>
      <PageMeta
        title="PSAT Detail"
        description=" PSAT Detail"
      />
      <PageBreadcrumb pageTitle="PSAT Detail " />
      <div className="space-y-6">
        <ComponentCard title="PSAT Detail">
          <PSATDetail />
        </ComponentCard>
      </div>
    </>
  );
}