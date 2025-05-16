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
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { ROUTE } from "@/constants/routes";
import { YearSelector } from "@/components/shared/year-selector";
import { AllMajorFilterModel } from "@/model/master-data/major/type-major-model";
import {
  createClassService,
  deleteClassService,
  getAllClassService,
  updateClassService,
} from "@/service/master-data/class.service";
import { Constants } from "@/constants/text-string";
import {
  AllClassModel,
  ClassModel,
} from "@/model/master-data/class/all-class-model";
import { toast } from "sonner";
import { classTableHeader } from "@/constants/table/master-data";
import PaginationPage from "@/components/shared/pagination-page";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import {
  ClassFormData,
  ClassFormModal,
} from "@/components/dashboard/master-data/manage-class/class-form-modal";
import { DegreeEnum } from "@/constants/constant";
import Loading from "@/components/shared/loading";
import { MajorModel } from "@/model/master-data/major/all-major-model";
import { useDebounce } from "@/utils/debounce/debounce";

export default function ManageClassPage() {
  // State management
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassModel | null>(null);
  const [allClassData, setAllClassData] = useState<AllClassModel | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [initialData, setInitialData] = useState<ClassFormData | undefined>(
    undefined
  );

  // Debounce search query to prevent excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Load class data with error handling and loading states
  const loadClass = useCallback(
    async (param: AllMajorFilterModel = {}) => {
      setIsLoading(true);
      try {
        const response = await getAllClassService({
          search: debouncedSearchQuery,
          status: Constants.ACTIVE,
          academyYear: selectedYear,
          ...param,
        });

        if (response) {
          setAllClassData(response);
        } else {
          toast.error("Failed to fetch class data");
        }
      } catch (error) {
        console.error("Error fetching class data:", error);
        toast.error("An error occurred while loading class data");
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedSearchQuery, selectedYear]
  );

  // Load data on component mount and when dependencies change
  useEffect(() => {
    loadClass();
  }, [loadClass, debouncedSearchQuery, selectedYear]);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Modal handlers
  const handleOpenAddModal = () => {
    setModalMode("add");
    setInitialData(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (classData: ClassModel) => {
    setSelectedClass(classData);

    const formData: ClassFormData = {
      id: classData.id,
      academyYear: Number(classData.academyYear),
      code: classData.code,
      degree: classData.degree as DegreeEnum,
      status: Constants.ACTIVE,
      yearLevel: classData.yearLevel,
      majorId: classData.major.id,
      // Pass the major model directly to the form
      selectedMajor: classData.major,
    };

    console.log("Setting form data with selected major:", formData);

    // We need to set this first so the form can properly initialize
    setInitialData(formData);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  // Delete class handler with optimistic UI update
  async function handleDeleteClass() {
    if (!selectedClass) return;

    setIsSubmitting(true);
    try {
      // Store original data for rollback in case of error
      const originalData = allClassData;

      // Optimistic UI update
      setAllClassData((prevData) => {
        if (!prevData) return null;
        const updatedContent = prevData.content.filter(
          (item) => item.id !== selectedClass.id
        );
        return {
          ...prevData,
          content: updatedContent,
          totalElements: prevData.totalElements - 1,
        };
      });

      const response = await deleteClassService(selectedClass.id);

      if (response) {
        toast.success(`Class ${selectedClass.code} deleted successfully`);
      } else {
        // Rollback if delete failed
        setAllClassData(originalData);
        toast.error("Failed to delete class");
      }
    } catch (error) {
      console.error("Error deleting class:", error);
      toast.error("An error occurred while deleting the class");
      // Reload data on error to ensure UI is in sync
      loadClass({});
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
    }
  }

  // Handle form submission for create/update
  async function handleSubmit(formData: ClassFormData) {
    setIsSubmitting(true);

    try {
      const classData = {
        code: formData.code.trim(),
        academyYear: formData.academyYear,
        degree: formData.degree,
        majorId: formData.majorId,
        status: formData.status,
        yearLevel: formData.yearLevel,
      };

      let response: ClassModel | null = null;

      if (modalMode === "add") {
        try {
          response = await createClassService(classData);

          if (response) {
            setAllClassData((prevData) => {
              if (!prevData) return null;
              return {
                ...prevData,
                content: [response!, ...prevData.content],
                totalElements: prevData.totalElements + 1,
              };
            });

            toast.success(`Class ${response.code} added successfully`);
            setIsModalOpen(false);
          }
        } catch (error: any) {
          toast.error(error.message || "Failed to add class");
        }
      } else if (modalMode === "edit" && formData.id) {
        try {
          response = await updateClassService(formData.id, classData);

          if (response) {
            setAllClassData((prevData) => {
              if (!prevData) return null;
              const updatedContent = prevData.content.map((cls) =>
                cls.id === formData.id && response ? response : cls
              );
              return {
                ...prevData,
                content: updatedContent,
              };
            });

            toast.success(`Class ${response.code} updated successfully`);
            setIsModalOpen(false);
          }
        } catch (error: any) {
          toast.error(error.message || "Failed to update class");
        }
      }
    } catch (error: any) {
      console.error("Error submitting class form:", error);
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle year change
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card>
        <CardContent className="p-6 space-y-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={ROUTE.DASHBOARD}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Manage Class</BreadcrumbPage>
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
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <YearSelector value={selectedYear} onChange={handleYearChange} />

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

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <Loading />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {classTableHeader.map((header, index) => (
                  <TableHead key={index} className={header.className}>
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {allClassData?.content.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={classTableHeader.length}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No classes found
                  </TableCell>
                </TableRow>
              ) : (
                allClassData?.content.map((cls, index) => {
                  const indexDisplay =
                    ((allClassData.pageNo || 1) - 1) *
                      (allClassData.pageSize || 10) +
                    index +
                    1;
                  return (
                    <TableRow key={cls.id}>
                      <TableCell>{indexDisplay}</TableCell>
                      <TableCell>
                        <span className="rounded bg-gray-100 px-2 py-1 font-medium">
                          {cls.code}
                        </span>
                      </TableCell>
                      <TableCell>{cls.major.name}</TableCell>
                      <TableCell>{cls.degree}</TableCell>
                      <TableCell>{cls.yearLevel}</TableCell>
                      <TableCell>{cls.academyYear}</TableCell>
                      <TableCell>
                        <div className="flex justify-start space-x-2">
                          <Button
                            onClick={() => handleOpenEditModal(cls)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedClass(cls);
                              setIsDeleteDialogOpen(true);
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-red-500 text-white hover:bg-red-600"
                            disabled={isSubmitting}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && allClassData && allClassData.totalPages > 1 && (
        <div className="mt-4 flex justify-end">
          <PaginationPage
            currentPage={allClassData.pageNo}
            totalPages={allClassData.totalPages}
            onPageChange={(page: number) => loadClass({ pageNo: page })}
          />
        </div>
      )}

      {/* Modals */}
      <ClassFormModal
        isOpen={isModalOpen}
        mode={modalMode}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={initialData}
        isSubmitting={isSubmitting}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteClass}
        title="Delete Class"
        description={`Are you sure you want to delete the class: ${selectedClass?.code}?`}
        itemName={selectedClass?.code}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
