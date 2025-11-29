import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BannerTable from "../../components/tables/BasicTables/bannerTable";

export default function BannerTables() {
  return (
    <>
      <PageMeta
        title="Banner"
        description="Banner"
      />
      <PageBreadcrumb pageTitle="Banner" />
      <div className="space-y-6">
        <ComponentCard title="Banner">
          <BannerTable />
        </ComponentCard>
      </div>
    </>
  );
}
