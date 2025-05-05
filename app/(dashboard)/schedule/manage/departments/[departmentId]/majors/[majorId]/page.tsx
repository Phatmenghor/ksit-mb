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
import { ArrowLeft, Filter, Plus, Eye } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ClassesSchedulePage({
  params,
}: {
  params: { departmentId: string; majorId: string }
}) {
  // This would normally come from an API or database
  const departments = [
    { id: "1", name: "Computer Science" },
    { id: "2", name: "Food Technology" },
  ]

  const majors = [
    { id: "1", departmentId: "1", name: "បរិញ្ញាបត្រ", englishName: "Bachelor's Degree in Computer Science" },
    { id: "2", departmentId: "1", name: "បរិញ្ញាទូទៅ", englishName: "General Computer Science" },
    { id: "3", departmentId: "2", name: "បរិញ្ញាទូទៅ", englishName: "General Food Technology" },
  ]

  const classes = [
    {
      id: 1,
      departmentId: "1",
      majorId: "1",
      classCode: "25401",
      degree: "Associate Degree",
      yearLevel: "4281",
      academyYear: "2025",
    },
    {
      id: 2,
      departmentId: "1",
      majorId: "1",
      classCode: "254013",
      degree: "Bachelor's Degree",
      yearLevel: "4281",
      academyYear: "2025",
    },
    {
      id: 3,
      departmentId: "1",
      majorId: "1",
      classCode: "254010",
      degree: "Associate Degree",
      yearLevel: "4281",
      academyYear: "2025",
    },
  ]

  const department = departments.find((d) => d.id === params.departmentId) || { name: "Unknown Department" }
  const major = majors.find((m) => m.id === params.majorId) || { name: "Unknown Major", englishName: "" }
  const departmentClasses = classes.filter(
    (c) => c.departmentId === params.departmentId && c.majorId === params.majorId,
  )

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
        <Link href={`/schedule/manage/departments/${params.departmentId}`}>
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> BACK
          </Button>
        </Link>
      </div>

      <div className="mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-medium">
          Class list - in Dep: {department.name} - Maj: {major.name}
        </h2>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm font-medium">Filter by Academy year:</span>
        <Select defaultValue="2025">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Year 2025" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">Year 2023</SelectItem>
            <SelectItem value="2024">Year 2024</SelectItem>
            <SelectItem value="2025">Year 2025</SelectItem>
            <SelectItem value="2026">Year 2026</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {departmentClasses.map((classItem) => (
          <Card key={classItem.id} className="hover:bg-gray-50">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <div className="font-medium">Class: {classItem.classCode}</div>
                  <div className="text-sm text-muted-foreground">Degree: {classItem.degree}</div>
                  <div className="text-sm text-muted-foreground">Year: {classItem.yearLevel}</div>
                  <div className="text-sm text-muted-foreground">Academy year: {classItem.academyYear}</div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/schedule/manage/departments/${params.departmentId}/majors/${params.majorId}/classes/${classItem.id}/add`}
                    className="flex-1"
                  >
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="mr-2 h-4 w-4" /> Add schedule
                    </Button>
                  </Link>
                  <Link
                    href={`/schedule/manage/departments/${params.departmentId}/majors/${params.majorId}/classes/${classItem.id}/view`}
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full">
                      <Eye className="mr-2 h-4 w-4" /> View schedule
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {departmentClasses.length === 0 && (
          <div className="rounded-md bg-amber-50 p-4 text-amber-800">No classes found for this major.</div>
        )}
      </div>
    </div>
  )
}
