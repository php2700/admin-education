import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import Contact from "../../components/tables/BasicTables/contactTable";

export default function ContactText() {
  return (
    <>
      <PageMeta
        title="Contact"
        description="Contact"
      />
      <PageBreadcrumb pageTitle="Contact " />
      <div className="space-y-6">
        <ComponentCard title="Contact">
          <Contact />
        </ComponentCard>
      </div>
    </>
  );
}
