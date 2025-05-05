import DepartmentTable from "@/components/dashboard/master-data/department-table";

export default function ManageDepartmentPage() {
  return (
    <section className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">Manage Departments</h1>
      <DepartmentTable />
    </section>
  );
}
