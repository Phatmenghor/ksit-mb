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
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTE } from "@/constants/routes";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  DepartmentFormData,
  DepartmentFormModal,
} from "./department-form-modal";

export default function DepartmentsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [initialData, setInitialData] = useState<
    DepartmentFormData | undefined
  >(undefined);

  const [departments, setDepartments] = useState<DepartmentFormData[]>([
    {
      departmentCode: "401",
      department: "Computer Science",
      logo: null,
      status: "active",
    },
    {
      departmentCode: "240",
      department: "Food Technology",
      logo: null,
      status: "inactive",
    },
    {
      departmentCode: "220",
      department: "Animal Science",
      logo: null,
      status: "active",
    },
    {
      departmentCode: "201",
      department: "Plant Science",
      logo: null,
      status: "inactive",
    },
    {
      departmentCode: "301",
      department: "Electrical Technology",
      logo: null,
      status: "active",
    },
  ]);

  const handleOpenAddModal = () => {
    setModalMode("add");
    setInitialData(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (formData: DepartmentFormData) => {
    setModalMode("edit");
    setInitialData(formData);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: DepartmentFormData) => {
    if (modalMode === "add") {
      setDepartments([...departments, data]);
    } else {
      setDepartments(
        departments.map((c) =>
          c.departmentCode === initialData?.departmentCode ? data : c
        )
      );
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
                <BreadcrumbPage>Manage department</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h3 className="text-xl font-bold">Manage Department</h3>
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
              <TableHead>Department Code</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Create Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((dept, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <span className="rounded bg-blue-100 px-2 py-1 text-blue-800">
                    {dept.departmentCode}
                  </span>
                </TableCell>
                <TableCell>
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        dept.logo
                          ? URL.createObjectURL(dept.logo)
                          : "/placeholder.svg"
                      }
                      alt={dept.department}
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{dept.department}</TableCell>
                <TableCell>{dept.logo ? dept.logo.name : "No Logo"}</TableCell>
                <TableCell>
                  <div>
                    <Button
                      onClick={() => handleOpenEditModal(dept)}
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
      <DepartmentFormModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={initialData}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
