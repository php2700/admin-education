import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TutoringTabPrep from "../../components/tables/BasicTables/tutoringTable";

export default function TutoringTables() {
  return (
    <>
      <PageMeta
        title="Tutoring"
        description="Tutoring"
      />
      <PageBreadcrumb pageTitle="Tutoring " />
      <div className="space-y-6">
        <ComponentCard title="Tutoring">
          <TutoringTabPrep />
        </ComponentCard>
      </div>
    </>
  );
}
