import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import WhyChoose from "../../components/tables/BasicTables/whyChoose";

export default function WhyChooseTables() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Why Choose List" />
      <div className="space-y-6">
        <ComponentCard title="Why Choose ">
          <WhyChoose />
        </ComponentCard>
      </div>
    </>
  );
}
