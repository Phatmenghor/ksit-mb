"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTE } from "@/constants/routes";
import { useState } from "react";

export default function ManageRoom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [initialData, setInitialData] = useState<SemesterFormData | undefined>(
    undefined
  );

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

  const handleOpenAddModal = () => {
    setModalMode("add");
    setInitialData(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (semesterData: SemesterFormData) => {
    setModalMode("edit");
    setInitialData(semesterData);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: SemesterFormData) => {
    if (modalMode === "add") {
      setSemesters([...semsters, data]);
    } else {
      setSemesters(semsters.map((c) => (c.id === initialData?.id ? data : c)));
    }
  };

  return (
    <div>
      <Card>
        <CardContent className="p-6 space-y-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={ROUTE.DASHBOARD}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Manage room</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h3 className="text-xl font-bold">Manage Room</h3>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search major..."
                className="pl-8 w-full"
              />
            </div>
            <Button
              onClick={handleOpenAddModal}
              className="bg-green-900 text-white hover:bg-green-950"
            >
              <Plus className="mr-2 h-2 w-2" />
              Add New
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="overflow-hidden mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Actions</TableHead>
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
                  <div>
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
      </div>
    </div>
  );
}
