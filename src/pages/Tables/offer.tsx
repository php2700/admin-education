import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import OfferTable from "../../components/tables/BasicTables/offerTable";

export default function OfferTables() {
  return (
    <>
      <PageMeta
        title="Offer List"
        description="Offer List"
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
