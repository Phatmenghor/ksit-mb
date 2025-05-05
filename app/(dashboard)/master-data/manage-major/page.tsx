import MajorTable from "@/components/dashboard/master-data/major-table";

export default function ManageMajorPage() {
  return (
    <section className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">Manage Majors</h1>
      <MajorTable />
    </section>
  );
}
