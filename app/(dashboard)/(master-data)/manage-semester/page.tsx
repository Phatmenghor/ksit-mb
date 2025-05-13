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
import { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { ROUTE } from "@/constants/routes";
import { format, parseISO } from "date-fns";
import { SemesterFormModal } from "@/components/dashboard/master-data/manage-semester/semester-form-modal";
import { YearSelector } from "@/components/shared/year-selector";
import { SemesterEnum } from "@/constants/constant";
import { toast } from "sonner";
import { SemetsterModel } from "@/model/master-data/semester/semester-model";

// Type-safe sample semester data
const sampleSemesters: SemetsterModel[] = [
  {
    id: 1,
    semester: SemesterEnum.SEMESTER_1,
    startDate: "2025-01-15",
    endDate: "2025-05-30",
    academyYear: 2025,
    status: "ACTIVE",
  },
  {
    id: 2,
    semester: SemesterEnum.SEMESTER_2,
    startDate: "2025-06-15",
    endDate: "2025-12-15",
    academyYear: 2025,
    status: "ACTIVE",
  },
  {
    id: 3,
    semester: SemesterEnum.SEMESTER_1,
    startDate: "2024-01-10",
    endDate: "2024-05-25",
    academyYear: 2024,
    status: "INACTIVE",
  },
];

export default function ManageSemester() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [initialData, setInitialData] = useState<SemetsterModel | undefined>(
    undefined
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [semesters, setSemesters] = useState<SemetsterModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  // Load semesters - in a real app, this would fetch from an API
  useEffect(() => {
    // Simulating data fetch
    setSemesters(sampleSemesters);
  }, []);

  const handleOpenAddModal = () => {
    setModalMode("add");
    setInitialData(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (semesterData: SemetsterModel) => {
    setModalMode("edit");
    setInitialData(semesterData);
    setIsModalOpen(true);
  };

  async function handleSubmit(formData: SemetsterModel) {
    setIsSubmitting(true);
    try {
      console.log("### ====Form submitted:", formData);

      // In a real app, you would call your API here
      // if (modalMode === "add") {
      //   await createSemester(formData);
      // } else {
      //   await updateSemester(formData);
      // }

      // Simulate API call with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local state to reflect changes (simulating API response)
      if (modalMode === "add") {
        // Add new semester with a generated ID
        const newSemester = {
          ...formData,
          id: Math.max(0, ...semesters.map((s) => s.id || 0)) + 1,
        };
        setSemesters([...semesters, newSemester]);
        toast.success("Semester added successfully");
      } else if (initialData?.id) {
        // Update existing semester
        setSemesters(
          semesters.map((semester) =>
            semester.id === initialData.id
              ? { ...formData, id: initialData.id }
              : semester
          )
        );
        toast.success("Semester updated successfully");
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting semester data:", error);
      toast.error("Failed to save semester");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Function to delete a semester
  const handleDeleteSemester = async (id: number) => {
    try {
      // In a real app, you would call your API here
      // await deleteSemester(id);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update local state
      setSemesters(semesters.filter((semester) => semester.id !== id));
      toast.success("Semester deleted successfully");
    } catch (error) {
      console.error("Error deleting semester:", error);
      toast.error("Failed to delete semester");
    }
  };

  // Format date for display in the table
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  // Function to display semester name
  const getSemesterName = (semester: SemesterEnum) => {
    return semester === SemesterEnum.SEMESTER_1 ? "Semester 1" : "Semester 2";
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
                <BreadcrumbPage>Manage Semester</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h3 className="text-xl font-bold">Manage Semester</h3>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search semester..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
        </CardContent>
      </Card>

      <div className="overflow-hidden mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Academy Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleSemesters.map((semesterItem, index) => (
              <TableRow key={semesterItem.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <span className="rounded bg-amber-100 px-2 py-1 text-amber-800">
                    {semesterItem.semester
                      ? getSemesterName(semesterItem.semester)
                      : "-"}
                  </span>
                </TableCell>
                <TableCell>{formatDate(semesterItem.startDate)}</TableCell>
                <TableCell>{formatDate(semesterItem.endDate)}</TableCell>
                <TableCell>{semesterItem.academyYear}</TableCell>
                <TableCell>
                  <span
                    className={`rounded px-2 py-1 ${
                      semesterItem.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {semesterItem.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
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
                      onClick={() => handleDeleteSemester(semesterItem.id!)}
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

      {/* The semester form modal */}
      <SemesterFormModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={initialData}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
