import Dashboard from "@/components/dashboard/index/dashboard";

export default function DashboardPage() {
  return (
    <main>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Institute Management System</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Dashboard />
          </div>
        </div>
      </div>
    </main>
  );
}
