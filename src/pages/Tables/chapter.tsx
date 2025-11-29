import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ChapterTable from "../../components/tables/BasicTables/chapterTab";

export default function ChapterTables() {
  return (
    <>
      <PageMeta
        title="Chapter"
        description="Chapter"
      />
      <PageBreadcrumb pageTitle="chapter  " />
      <div className="space-y-6">
        <ComponentCard title="chapter ">
          <ChapterTable />
        </ComponentCard>
      </div>
    </>
  );
}
