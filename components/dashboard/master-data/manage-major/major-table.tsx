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
import { MajorFormData } from "@/model/major-model";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useState } from "react";
import { MajorModal } from "./major-form-modal";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";

export default function MajorTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [initialData, setInitialData] = useState<any | undefined>(undefined);

  const [majors, setMajors] = useState<MajorFormData[]>([
    {
      id: 1,
      majorCode: "401",
      major: "បរិញ្ញាបត្រជំនាញ",
      department: "Computer Science",
    },
    {
      id: 2,
      majorCode: "501",
      major: "Business Computer",
      department: "ធនាគារ និងហិរញ្ញវត្ថុ",
    },
    {
      id: 3,
      majorCode: "5011",
      major: "Business Technology and Innovation",
      department: "ធនាគារ និងហិរញ្ញវត្ថុ",
    },
    {
      id: 4,
      majorCode: "2081",
      major: "វិទ្យាសាស្រ្តសត្វ (ជំនាញសត្វគោ)",
      department: "ហេដ្ឋារចនាសម្ព័ន្ធ សត្វចិញ្ចឹម",
    },
    {
      id: 5,
      majorCode: "240",
      major: "បរិញ្ញាបត្រអាហារ",
      department: "Food Technology",
    },
    {
      id: 6,
      majorCode: "224578",
      major: "វិទ្យាសាស្រ្តសត្វ",
      department: "Animal Science",
    },
    {
      id: 7,
      majorCode: "201",
      major: "វិទ្យាសាស្រ្តរុក្ខជាតិ",
      department: "Plant Science",
    },
    {
      id: 8,
      majorCode: "220",
      major: "បរិញ្ញាបត្រអគ្គីសនី",
      department: "Electrical Technology",
    },
  ]);

  const handleOpenAddModal = () => {
    setModalMode("add");
    setInitialData(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (majorData: MajorFormData) => {
    setModalMode("edit");
    setInitialData(majorData);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: MajorFormData) => {
    if (modalMode === "add") {
      setMajors([...majors, data]);
    } else {
      setMajors(majors.map((c) => (c.id === initialData?.id ? data : c)));
    }
  };

  return (
    <div>
      <Card>
        <CardContent className="p-6 space-y-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Manage major</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h3 className="text-xl font-bold">Manage Major</h3>
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
              className="bg-green-900 hover:bg-green-950"
            >
              <Plus className="mr-2 h-2 w-2" />
              Add New
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="overflow-hidden mt-6 rounded-lg border">
        <Table>
          <TableHeader className="bg-black">
            <TableRow className="divide-x divide-gray-200 hover:bg-transparent">
              <TableHead className="text-white">#</TableHead>
              <TableHead className="text-white">Major Code</TableHead>
              <TableHead className="text-white">Major</TableHead>
              <TableHead className="text-white">Department</TableHead>
              <TableHead className="text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {majors.map((major) => (
              <TableRow key={major.id} className="divide-x divide-gray-200">
                <TableCell>{major.id}</TableCell>
                <TableCell>
                  <span className="rounded bg-gray-100 px-2 py-1 text-gray-800">
                    {major.majorCode}
                  </span>
                </TableCell>
                <TableCell>{major.major}</TableCell>
                <TableCell>{major.department}</TableCell>
                <TableCell>
                  <div>
                    <Button
                      onClick={() => handleOpenEditModal(major)}
                      variant="ghost"
                      className="h-16 w-16 p-0 bg-transparent hover:bg-gray-100"
                    >
                      <Pencil className="h-10 w-10 text-black" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-16 w-16 p-0 bg-transparent hover:bg-gray-100"
                    >
                      <Trash2 className="h-10 w-10 text-black" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <MajorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={initialData}
        mode={modalMode}
      />
    </div>
  );
}
