import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import About from "../../components/tables/BasicTables/aboutTable";

export default function AboutTables() {
  return (
    <>
      <PageMeta
        title="about"
        description="about"
      />
      <PageBreadcrumb pageTitle="About" />
      <div className="space-y-6">
        <ComponentCard title="About">
          <About />
        </ComponentCard>
      </div>
    </>
  );
}
