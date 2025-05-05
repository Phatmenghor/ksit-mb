import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function DepartmentsTable() {
  const departments = [
    {
      id: 1,
      code: "401",
      name: "Computer Science",
      totalMajors: 2,
      logo: "/placeholder.svg?height=40&width=40",
      createdAt: "25-01-2024",
    },
    {
      id: 2,
      code: "240",
      name: "Food Technology",
      totalMajors: 1,
      logo: "/placeholder.svg?height=40&width=40",
      createdAt: "25-01-2024",
    },
    {
      id: 3,
      code: "220",
      name: "Animal Science",
      totalMajors: 1,
      logo: "/placeholder.svg?height=40&width=40",
      createdAt: "25-01-2024",
    },
    {
      id: 4,
      code: "201",
      name: "Plant Science",
      totalMajors: 1,
      logo: "/placeholder.svg?height=40&width=40",
      createdAt: "25-01-2024",
    },
    {
      id: 5,
      code: "301",
      name: "Electrical Technology",
      totalMajors: 1,
      logo: "/placeholder.svg?height=40&width=40",
      createdAt: "25-01-2024",
    },
    {
      id: 6,
      code: "Meca2312",
      name: "Mechanical Technology",
      totalMajors: 0,
      logo: "/placeholder.svg?height=40&width=40",
      createdAt: "25-01-2024",
    },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-medium">Manage Department</h3>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            ADD NEW
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Department Code</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Total Majors</TableHead>
              <TableHead>Create Date</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((dept, index) => (
              <TableRow key={dept.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <span className="rounded bg-blue-100 px-2 py-1 text-blue-800">
                    {dept.code}
                  </span>
                </TableCell>
                <TableCell>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={dept.logo} alt={dept.name} />
                  </Avatar>
                </TableCell>
                <TableCell>{dept.name}</TableCell>
                <TableCell>{dept.totalMajors}</TableCell>
                <TableCell>{dept.createdAt}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-gray-200"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-red-500 text-white hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
