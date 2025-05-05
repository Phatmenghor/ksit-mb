import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react"

export default function SchedulePage() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const timeSlots = ["8:00 - 9:30", "9:45 - 11:15", "11:30 - 1:00", "2:00 - 3:30", "3:45 - 5:15"]

  const scheduleData = [
    { day: "Monday", time: "8:00 - 9:30", course: "CS101", room: "A101", instructor: "Dr. Smith" },
    { day: "Monday", time: "11:30 - 1:00", course: "FT201", room: "B202", instructor: "Dr. Johnson" },
    { day: "Tuesday", time: "9:45 - 11:15", course: "ET301", room: "C303", instructor: "Dr. Williams" },
    { day: "Wednesday", time: "2:00 - 3:30", course: "AS101", room: "D404", instructor: "Dr. Brown" },
    { day: "Thursday", time: "3:45 - 5:15", course: "MT201", room: "E505", instructor: "Dr. Davis" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Schedule</h1>
          <p className="text-muted-foreground">View and manage class schedules</p>
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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Weekly Schedule</CardTitle>
            <CardDescription>Academic Year 2023-2024, Semester 2</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Select defaultValue="computer-science">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="food-technology">Food Technology</SelectItem>
                  <SelectItem value="electrical-technology">Electrical Technology</SelectItem>
                  <SelectItem value="animal-science">Animal Science</SelectItem>
                  <SelectItem value="mechanical-technology">Mechanical Technology</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="year-3">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year-1">Year 1</SelectItem>
                  <SelectItem value="year-2">Year 2</SelectItem>
                  <SelectItem value="year-3">Year 3</SelectItem>
                  <SelectItem value="year-4">Year 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Class
            </Button>
          </div>
        </CardHeader>
        <CardContent>
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
                              <div className="font-medium text-blue-700">{scheduleItem.course}</div>
                              <div className="text-sm text-muted-foreground">Room: {scheduleItem.room}</div>
                              <div className="text-sm text-muted-foreground">{scheduleItem.instructor}</div>
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
