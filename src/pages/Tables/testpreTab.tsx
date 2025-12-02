import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import Testpre from "../../components/tables/BasicTables/Testpre";

export default function Testpres() {
  return (
    <>
      <PageMeta
        title="faq"
        description="faq"
      />
      <PageBreadcrumb pageTitle="Testpre" />
      <div className="space-y-6">
        <ComponentCard title="Testpre ">
          <Testpre />
        </ComponentCard>
      </div>
    </>
  );
}
