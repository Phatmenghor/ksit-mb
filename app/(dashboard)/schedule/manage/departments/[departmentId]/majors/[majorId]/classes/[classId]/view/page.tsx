import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Edit, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function ViewSchedulePage({
  params,
}: {
  params: { departmentId: string; majorId: string; classId: string }
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
      id: "1",
      departmentId: "1",
      majorId: "1",
      classCode: "25401",
      degree: "Associate Degree",
      yearLevel: "4281",
      academyYear: "2025",
    },
    {
      id: "2",
      departmentId: "1",
      majorId: "1",
      classCode: "254013",
      degree: "Bachelor's Degree",
      yearLevel: "4281",
      academyYear: "2025",
    },
    {
      id: "3",
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
  const classItem = classes.find((c) => c.id === params.classId) || {
    classCode: "Unknown Class",
    degree: "",
    yearLevel: "",
    academyYear: "",
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const timeSlots = ["8:00 - 9:30", "9:45 - 11:15", "11:30 - 1:00", "2:00 - 3:30", "3:45 - 5:15"]

  const scheduleData = [
    {
      day: "Monday",
      time: "8:00 - 9:30",
      course: "CS101",
      courseName: "Introduction to Programming",
      room: "A101",
      instructor: "Dr. Smith",
    },
    {
      day: "Wednesday",
      time: "11:30 - 1:00",
      course: "CS201",
      courseName: "Data Structures",
      room: "B202",
      instructor: "Dr. Johnson",
    },
    {
      day: "Friday",
      time: "2:00 - 3:30",
      course: "CS301",
      courseName: "Database Systems",
      room: "C303",
      instructor: "Dr. Williams",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">View Schedule</h1>
          <p className="text-muted-foreground">Institute Management System</p>
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/schedule/manage">Schedule</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>View Schedule</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mb-4">
        <Link href={`/schedule/manage/departments/${params.departmentId}/majors/${params.majorId}`}>
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> BACK
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Schedule for Class {classItem.classCode}</CardTitle>
          <Link
            href={`/schedule/manage/departments/${params.departmentId}/majors/${params.majorId}/classes/${params.classId}/add`}
          >
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" /> Add Schedule
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Department:</span>
                <div>{department.name}</div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Major:</span>
                <div>{major.name}</div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Class:</span>
                <div>{classItem.classCode}</div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Academy Year:</span>
                <div>{classItem.academyYear}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Week
            </Button>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span className="font-medium">May 1 - May 7, 2023</span>
            </div>
            <Button variant="outline" size="sm">
              Next Week
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-muted font-medium text-left">Time / Day</th>
                  {days.map((day) => (
                    <th key={day} className="border p-2 bg-muted font-medium text-left">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time) => (
                  <tr key={time}>
                    <td className="border p-2 font-medium">{time}</td>
                    {days.map((day) => {
                      const scheduleItem = scheduleData.find((item) => item.day === day && item.time === time)
                      return (
                        <td key={`${day}-${time}`} className="border p-2 min-w-[150px]">
                          {scheduleItem ? (
                            <div className="p-1 bg-blue-50 rounded border border-blue-200">
                              <div className="font-medium text-blue-700">
                                {scheduleItem.course}: {scheduleItem.courseName}
                              </div>
                              <div className="text-sm text-muted-foreground">Room: {scheduleItem.room}</div>
                              <div className="text-sm text-muted-foreground">{scheduleItem.instructor}</div>
                              <div className="mt-1 flex gap-1">
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ) : null}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
