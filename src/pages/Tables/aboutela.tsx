import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import AboutElaTab from "../../components/tables/BasicTables/aboutElaTab";

export default function AboutElaTables() {
  return (
    <>
      <PageMeta
        title="About Ela"
        description="About Ela"
      />
      <PageBreadcrumb pageTitle="About Ela Test  " />
      <div className="space-y-6">
        <ComponentCard title="About Ela Test ">
          <AboutElaTab />
        </ComponentCard>
      </div>
    </>
  );
}
