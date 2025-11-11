import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import OfferTable from "../../components/tables/BasicTables/offerTable";

export default function OfferTables() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Offer List" />
      <div className="space-y-6">
        <ComponentCard title="Offer ">
          <OfferTable />
        </ComponentCard>
      </div>
    </>
  );
}
