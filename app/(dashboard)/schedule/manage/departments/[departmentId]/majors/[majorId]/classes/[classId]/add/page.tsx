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
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function AddSchedulePage({
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Add Schedule</h1>
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
              <BreadcrumbPage>Add Schedule</BreadcrumbPage>
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
        <CardHeader>
          <CardTitle>Add Schedule for Class {classItem.classCode}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="department" className="mb-2 block text-sm font-medium">
                  Department
                </label>
                <Input id="department" value={department.name} disabled />
              </div>
              <div>
                <label htmlFor="major" className="mb-2 block text-sm font-medium">
                  Major
                </label>
                <Input id="major" value={major.name} disabled />
              </div>
              <div>
                <label htmlFor="class" className="mb-2 block text-sm font-medium">
                  Class
                </label>
                <Input id="class" value={classItem.classCode} disabled />
              </div>
              <div>
                <label htmlFor="academyYear" className="mb-2 block text-sm font-medium">
                  Academy Year
                </label>
                <Input id="academyYear" value={classItem.academyYear} disabled />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="course" className="mb-2 block text-sm font-medium">
                  Course <span className="text-red-500">*</span>
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs101">CS101 - Introduction to Programming</SelectItem>
                    <SelectItem value="cs201">CS201 - Data Structures</SelectItem>
                    <SelectItem value="cs301">CS301 - Database Systems</SelectItem>
                    <SelectItem value="cs401">CS401 - Software Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="instructor" className="mb-2 block text-sm font-medium">
                  Instructor <span className="text-red-500">*</span>
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                    <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                    <SelectItem value="dr-williams">Dr. Williams</SelectItem>
                    <SelectItem value="dr-brown">Dr. Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="day" className="mb-2 block text-sm font-medium">
                    Day <span className="text-red-500">*</span>
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day.toLowerCase()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="timeSlot" className="mb-2 block text-sm font-medium">
                    Time Slot <span className="text-red-500">*</span>
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Time Slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((timeSlot) => (
                        <SelectItem key={timeSlot} value={timeSlot.replace(/\s/g, "")}>
                          {timeSlot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label htmlFor="room" className="mb-2 block text-sm font-medium">
                  Room <span className="text-red-500">*</span>
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Room" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a101">A101</SelectItem>
                    <SelectItem value="b202">B202</SelectItem>
                    <SelectItem value="c303">C303</SelectItem>
                    <SelectItem value="d404">D404</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="notes" className="mb-2 block text-sm font-medium">
                  Notes
                </label>
                <Textarea id="notes" placeholder="Additional notes..." />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                <Save className="mr-2 h-4 w-4" /> Save Schedule
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
