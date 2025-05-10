import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROUTE } from "@/constants/routes";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

export default function Courses() {
  const courses = [
    {
      id: "CS101",
      name: "Introduction to Programming",
      department: "Computer Science",
      credits: 3,
      status: "Active",
    },
    {
      id: "FT201",
      name: "Food Processing",
      department: "Food Technology",
      credits: 4,
      status: "Active",
    },
    {
      id: "ET301",
      name: "Electrical Circuits",
      department: "Electrical Technology",
      credits: 3,
      status: "Active",
    },
    {
      id: "AS101",
      name: "Animal Physiology",
      department: "Animal Science",
      credits: 4,
      status: "Active",
    },
    {
      id: "MT201",
      name: "Mechanical Design",
      department: "Mechanical Technology",
      credits: 3,
      status: "Inactive",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Courses List</CardTitle>
          <CardDescription>View and manage all courses</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="w-64 pl-8"
            />
          </div>
          <Link href={ROUTE.COURSES.ADD}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.id}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.department}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      course.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {course.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
