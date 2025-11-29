import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import FaqTab from "../../components/tables/BasicTables/faqTab";

export default function FaqTables() {
  return (
    <>
      <PageMeta
        title="faq"
        description="faq"
      />
      <PageBreadcrumb pageTitle="Faq" />
      <div className="space-y-6">
        <ComponentCard title="Faq">
          <FaqTab />
        </ComponentCard>
      </div>
    </>
  );
}
