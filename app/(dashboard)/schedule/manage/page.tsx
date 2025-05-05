import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ArrowLeft, ListFilter } from "lucide-react"
import Link from "next/link"

export default function ManageSchedulePage() {
  // This would normally come from an API or database
  const departments = [
    { id: 1, name: "Computer Science" },
    { id: 2, name: "Food Technology" },
    { id: 3, name: "Animal Science" },
    { id: 4, name: "Plant Science" },
    { id: 5, name: "Electrical Technology" },
    { id: 6, name: "Mechanical Technology" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Schedule</h1>
          <p className="text-muted-foreground">Institute Management System</p>
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Schedule</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mb-4">
        <Link href="/dashboard">
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> BACK
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {departments.map((department) => (
          <Link key={department.id} href={`/schedule/manage/departments/${department.id}`}>
            <Card className="hover:bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ListFilter className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-medium">{department.name}</h3>
                  </div>
                  <Button variant="outline" size="sm">
                    View Majors
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
