import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TrustCredibiltyTable from "../../components/tables/BasicTables/trustTab";

export default function TrustCredTables() {
  return (
    <>
      <PageMeta
        title="Trust Credibilty List"
        description="Trust Credibilty List"
      />
      <PageBreadcrumb pageTitle="Trust Credibilty List" />
      <div className="space-y-6">
        <ComponentCard title="Trust Credibilty ">
          <TrustCredibiltyTable />
        </ComponentCard>
      </div>
    </>
  );
}
