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

export default function MajorsPage({ params }: { params: { departmentId: string } }) {
  // This would normally come from an API or database
  const departments = [
    { id: "1", name: "Computer Science" },
    { id: "2", name: "Food Technology" },
    { id: "3", name: "Animal Science" },
    { id: "4", name: "Plant Science" },
    { id: "5", name: "Electrical Technology" },
    { id: "6", name: "Mechanical Technology" },
  ]

  const majors = [
    { id: 1, departmentId: "1", name: "បរិញ្ញាបត្រ", englishName: "Bachelor's Degree in Computer Science" },
    { id: 2, departmentId: "1", name: "បរិញ្ញាទូទៅ", englishName: "General Computer Science" },
    { id: 3, departmentId: "2", name: "បរិញ្ញាទូទៅ", englishName: "General Food Technology" },
    { id: 4, departmentId: "3", name: "បរិញ្ញាទូទៅ", englishName: "General Animal Science" },
  ]

  const department = departments.find((d) => d.id === params.departmentId) || { name: "Unknown Department" }
  const departmentMajors = majors.filter((m) => m.departmentId === params.departmentId)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Major list</h1>
          <p className="text-muted-foreground">Institute Management System</p>
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Major list</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mb-4">
        <Link href="/departments">
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> BACK
          </Button>
        </Link>
      </div>

      <div className="mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
        <ListFilter className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-medium">Major list in Department: {department.name}</h2>
      </div>

      <div className="space-y-4">
        {departmentMajors.map((major) => (
          <Link key={major.id} href={`/departments/${params.departmentId}/majors/${major.id}/classes`}>
            <Card className="hover:bg-gray-50">
              <CardContent className="p-6">
                <div className="border-l-4 border-green-600 pl-4">
                  <h3 className="text-xl font-medium">{department.name}</h3>
                  <p className="text-muted-foreground">
                    Major: <span className="font-medium">{major.name}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {departmentMajors.length === 0 && (
          <div className="rounded-md bg-amber-50 p-4 text-amber-800">No majors found for this department.</div>
        )}
      </div>
    </div>
  )
}
