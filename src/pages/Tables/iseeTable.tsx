import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import AboutIseeTab from "../../components/tables/BasicTables/iseeTable";

export default function AboutIseeTables() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
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
