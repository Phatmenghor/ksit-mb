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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

export default function TeachersList() {
  const teachers = [
    {
      id: "T001",
      name: "Dr. John Smith",
      department: "Computer Science",
      position: "Professor",
      email: "john.smith@example.com",
      status: "Active",
    },
    {
      id: "T002",
      name: "Dr. Jane Johnson",
      department: "Food Technology",
      position: "Associate Professor",
      email: "jane.johnson@example.com",
      status: "Active",
    },
    {
      id: "T003",
      name: "Dr. Robert Williams",
      department: "Electrical Technology",
      position: "Assistant Professor",
      email: "robert.williams@example.com",
      status: "Active",
    },
    {
      id: "T004",
      name: "Dr. Emily Brown",
      department: "Animal Science",
      position: "Lecturer",
      email: "emily.brown@example.com",
      status: "Active",
    },
    {
      id: "T005",
      name: "Dr. Michael Davis",
      department: "Mechanical Technology",
      position: "Professor",
      email: "michael.davis@example.com",
      status: "Inactive",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Teachers List</CardTitle>
          <CardDescription>View and manage all teaching staff</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search teachers..."
              className="w-64 pl-8"
            />
          </div>
          <Link href="/users/teachers/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Teacher
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
              <TableHead>Position</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">{teacher.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={`/placeholder.svg?height=32&width=32`}
                        alt={teacher.name}
                      />
                      <AvatarFallback>
                        {teacher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>{teacher.name}</div>
                  </div>
                </TableCell>
                <TableCell>{teacher.department}</TableCell>
                <TableCell>{teacher.position}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      teacher.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {teacher.status}
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
