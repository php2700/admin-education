import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import AccuplacerTestPrepAdmin from "../../components/tables/BasicTables/Accuplacer";

export default function AccuplacerDetails() {
  return (
    <>
      <PageMeta
        title="Accuplacer Detail"
        description=" AMC Detail"
      />
      <PageBreadcrumb pageTitle="Accuplacer Detail " />
      <div className="space-y-6">
        <ComponentCard title="Accuplacer Detail">
          <AccuplacerTestPrepAdmin />
        </ComponentCard>
      </div>
    </>
  );
}