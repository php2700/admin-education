import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import WhyChoose from "../../components/tables/BasicTables/whyChoose";

export default function WhyChooseTables() {
  return (
    <>
      <PageMeta
        title="Why Choose List"
        description="Why Choose List"
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
