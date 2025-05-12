"use client";

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

import { Filter, Pencil, Plus, Search, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SemesterFormData } from "@/model/semester/semester-model";
import { SemesterModal } from "./semester-form-modal";
import { Input } from "@/components/ui/input";
import { ROUTE } from "@/constants/routes";

export default function ManageSemster() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [initialData, setInitialData] = useState<SemesterFormData | undefined>(
    undefined
  );

  const [semsters, setSemesters] = useState<SemesterFormData[]>([
    {
      id: 1,
      Semester: 1,
      startSemester: "2025-01-01",
      endSemester: "2025-06-01",
      academicYear: "2025",
      status: "active",
    },
    {
      id: 2,
      Semester: 2,
      startSemester: "2025-07-01",
      endSemester: "2025-12-01",
      academicYear: "2025",
      status: "active",
    },
    {
      id: 3,
      Semester: 1,
      startSemester: "2025-01-01",
      endSemester: "2025-06-01",
      academicYear: "2025",
      status: "inactive",
    },
    {
      id: 4,
      Semester: 2,
      startSemester: "2025-07-01",
      endSemester: "2025-12-01",
      academicYear: "2025",
      status: "inactive",
    },
    {
      id: 5,
      Semester: 1,
      startSemester: "2025-01-01",
      endSemester: "2025-06-01",
      academicYear: "2025",
      status: "active",
    },
  ]);

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
                <BreadcrumbPage>Manage semester</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h3 className="text-xl font-bold">Manage Semster</h3>
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
          <div className="mb-4 flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by Academy year:</span>
            <Select defaultValue="2025">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Academy Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="overflow-hidden mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Start Semester</TableHead>
              <TableHead>Finish Semester</TableHead>
              <TableHead>Academy year</TableHead>
              <TableHead>status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {semsters.map((semesterItem) => (
              <TableRow key={semesterItem.id}>
                <TableCell>{semesterItem.id}</TableCell>
                <TableCell>
                  <span className="rounded bg-amber-100 px-2 py-1 text-amber-800">
                    {semesterItem.Semester}
                  </span>
                </TableCell>
                <TableCell>{semesterItem.startSemester}</TableCell>
                <TableCell>{semesterItem.endSemester}</TableCell>
                <TableCell>{semesterItem.academicYear}</TableCell>
                <TableCell>{semesterItem.status}</TableCell>
                <TableCell>
                  <div>
                    <Button
                      onClick={() => handleOpenEditModal(semesterItem)}
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
      <SemesterModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={initialData}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
