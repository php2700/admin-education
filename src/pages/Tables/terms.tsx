import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TermsServiceTab from "../../components/tables/BasicTables/termsandservice";

export default function TermsTabs() {
  return (
    <>
      <PageMeta
        title="faq"
        description="faq"
      />
      <PageBreadcrumb pageTitle="Terms Services" />
      <div className="space-y-6">
        <ComponentCard title="Terms Services">
          <TermsServiceTab />
        </ComponentCard>
      </div>
    </>
  );
}
