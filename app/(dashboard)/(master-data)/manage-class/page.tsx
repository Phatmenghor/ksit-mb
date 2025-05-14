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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Filter, Pencil, Plus, Search, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClassFormData } from "@/model/class/class-model";
import { useState } from "react";

import { ROUTE } from "@/constants/routes";
import { Input } from "@/components/ui/input";

import { YearSelector } from "@/components/shared/year-selector";
import { ClassFormModal } from "@/components/dashboard/master-data/manage-class/class-form-modal";

export default function ManageClassPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [initialData, setInitialData] = useState<ClassFormData | undefined>(
    undefined
  );

  const handleOpenAddModal = () => {
    setModalMode("add");
    setInitialData(undefined);
    setIsModalOpen(true);
  };

  async function handleSubmit() {}
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
                <BreadcrumbPage>Manage class</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h3 className="text-xl font-bold">Manage Class</h3>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search class..."
                className="pl-8 w-full"
                // value={searchQuery}
                // onChange={handleSearchChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <YearSelector value={selectedYear} onChange={setSelectedYear} />

              <Button
                onClick={handleOpenAddModal}
                className="bg-green-900 text-white hover:bg-green-950"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </div>
          </div>
          {/* <div className="mb-4 flex items-center gap-2">
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
          </div> */}
        </CardContent>
      </Card>

      <div className="overflow-hidden mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Class code</TableHead>
              <TableHead>Major</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Year level</TableHead>
              <TableHead>Academy year</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {classes.map((classItem) => (
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
                  <div>
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
            ))} */}
          </TableBody>
        </Table>
      </div>
      <ClassFormModal
        isOpen={isModalOpen}
        mode={modalMode}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        // initialData={initialData}
      />
    </div>
  );
}
