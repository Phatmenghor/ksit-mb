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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Pencil, Plus, Trash2 } from "lucide-react";

export default function ManageRoom() {
  const classes = [
    {
      id: 1,
      classCode: "25401",
      major: "បរិញ្ញាបត្រ",
      degree: "Associate Degree",
      yearLevel: "3532",
      academyYear: "2025",
    },
    {
      id: 2,
      classCode: "25403",
      major: "បរិញ្ញាបត្រ",
      degree: "Bachelor's Degree",
      yearLevel: "3532",
      academyYear: "2025",
    },
    {
      id: 3,
      classCode: "252401",
      major: "បរិញ្ញាទូទៅ",
      degree: "Associate Degree",
      yearLevel: "3532",
      academyYear: "2025",
    },
    {
      id: 4,
      classCode: "252403",
      major: "បរិញ្ញាទូទៅ",
      degree: "Bachelor's Degree",
      yearLevel: "3532",
      academyYear: "2025",
    },
    {
      id: 5,
      classCode: "254010",
      major: "បរិញ្ញាបត្រ",
      degree: "Associate Degree",
      yearLevel: "3532",
      academyYear: "2025",
    },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">Manage Room</h3>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              ADD NEW
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Room</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell>{classItem.id}</TableCell>
                  <TableCell>
                    <span className="rounded bg-amber-100 px-2 py-1 text-amber-800">
                      {classItem.classCode}
                    </span>
                  </TableCell>

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
    </div>
  );
}
