import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import LanguageTable from "../../components/tables/BasicTables/languageTab";

export default function LanguageTab() {
  return (
    <>
      <PageMeta
        title="Language"
        description="Language"
      />
      <PageBreadcrumb pageTitle="Language  " />
      <div className="space-y-6">
        <ComponentCard title="Language ">
          <LanguageTable />
        </ComponentCard>
      </div>
    </>
  );
}
