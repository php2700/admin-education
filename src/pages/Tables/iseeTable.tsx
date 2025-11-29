import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import AboutIseeTab from "../../components/tables/BasicTables/iseeTable";

export default function AboutIseeTables() {
  return (
    <>
      <PageMeta
        title="About Isee Test "
        description="About Isee Test "
      />
      <PageBreadcrumb pageTitle="About Isee Test  " />
      <div className="space-y-6">
        <ComponentCard title="About Isee Test ">
          <AboutIseeTab />
        </ComponentCard>
      </div>
    </>
  );
}
