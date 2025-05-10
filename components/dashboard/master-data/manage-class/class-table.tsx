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

import { Filter, Pencil, Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClassFormData } from "@/model/class-model";
import { useState } from "react";
import { ClassModal } from "./class-form-modal";

export default function ManageClass() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [initialData, setInitialData] = useState<ClassFormData | undefined>(
    undefined
  );
  const [classes, setClasses] = useState<ClassFormData[]>([
    {
      id: 0,
      classCode: "CS101",
      major: "Computer Science",
      degree: "Bachelor's Degree",
      yearLevel: "1",
      academicYear: "2024",
    },
    {
      id: 1,
      classCode: "25401",
      major: "បរិញ្ញាបត្រ",
      degree: "Associate Degree",
      yearLevel: "3532",
      academicYear: "2025",
    },
    {
      id: 2,
      classCode: "25403",
      major: "បរិញ្ញាបត្រ",
      degree: "Bachelor's Degree",
      yearLevel: "3532",
      academicYear: "2025",
    },
    {
      id: 3,
      classCode: "252401",
      major: "បរិញ្ញាទូទៅ",
      degree: "Associate Degree",
      yearLevel: "3532",
      academicYear: "2025",
    },
    {
      id: 4,
      classCode: "252403",
      major: "បរិញ្ញាទូទៅ",
      degree: "Bachelor's Degree",
      yearLevel: "3532",
      academicYear: "2025",
    },
    {
      id: 5,
      classCode: "254010",
      major: "បរិញ្ញាបត្រ",
      degree: "Associate Degree",
      yearLevel: "3532",
      academicYear: "2025",
    },
  ]);

  const handleOpenAddModal = () => {
    setModalMode("add");
    setInitialData(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (classData: ClassFormData) => {
    setModalMode("edit");
    setInitialData(classData);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: ClassFormData) => {
    if (modalMode === "add") {
      setClasses([...classes, data]);
    } else {
      setClasses(
        classes.map((c) => (c.classCode === initialData?.classCode ? data : c))
      );
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">Manage Class</h3>
          </div>
          <Button
            onClick={handleOpenAddModal}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            ADD NEW
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Class code</TableHead>
              <TableHead>Major</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Year level</TableHead>
              <TableHead>Academy year</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((classItem) => (
              <TableRow key={classItem.classCode}>
                <TableCell>{classItem.id}</TableCell>
                <TableCell>
                  <span className="rounded bg-amber-100 px-2 py-1 text-amber-800">
                    {classItem.classCode}
                  </span>
                </TableCell>
                <TableCell>{classItem.major}</TableCell>
                <TableCell>{classItem.degree}</TableCell>
                <TableCell>{classItem.yearLevel}</TableCell>
                <TableCell>{classItem.academicYear}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => handleOpenEditModal(classItem)}
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
        <ClassModal
          isOpen={isModalOpen}
          mode={modalMode}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={initialData}
        />
      </CardContent>
    </Card>
  );
}
