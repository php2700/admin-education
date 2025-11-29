import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import Registration from "../../components/tables/BasicTables/registrationTab";

export default function RegistrationTables() {
  return (
    <>
      <PageMeta
        title="Registration"
        description="Registration"
      />
      <PageBreadcrumb pageTitle="Registration " />
      <div className="space-y-6">
        <ComponentCard title="Registration">
          <Registration />
        </ComponentCard>
      </div>
    </>
  );
}
