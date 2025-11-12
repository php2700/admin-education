import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BlogTab from "../../components/tables/BasicTables/blogTable";

export default function BlogTables() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
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
