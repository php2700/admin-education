import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BlogTab from "../../components/tables/BasicTables/blogTable";

export default function BlogTables() {
  return (
    <>
      <PageMeta
        title="Blog"
        description="Blog"
      />
      <PageBreadcrumb pageTitle="Blog List " />
      <div className="space-y-6">
        <ComponentCard title="Blog List">
          <BlogTab />
        </ComponentCard>
      </div>
    </>
  );
}
