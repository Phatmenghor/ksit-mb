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

import { useCallback, useEffect, useState } from "react";

import { ROUTE } from "@/constants/routes";
import { Input } from "@/components/ui/input";

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
import Loading from "../courses/loading";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import {
  ClassFormData,
  ClassFormModal,
} from "@/components/dashboard/master-data/manage-class/class-form-modal";
import { DegreeEnum, YearLevelEnum, yearLevels } from "@/constants/constant";

export default function ManageClassPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classes, setClasses] = useState<ClassModel | null>(null);
  const [allClassData, setAllClassData] = useState<AllClassModel | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [initialData, setInitialData] = useState<ClassFormData | undefined>(
    undefined
  );
  const loadClass = useCallback(
    async (param: AllMajorFilterModel) => {
      setIsLoading(true);
      try {
        const response = await getAllClassService({
          search: searchQuery,
          status: Constants.ACTIVE,
          ...param,
        });

        if (response) {
          setAllClassData(response);
        } else {
          console.error("Failed to fetch class:");
        }
      } catch (error) {
        toast.error("An error occurred while loading class");
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    loadClass({});
  }, [searchQuery, loadClass]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenAddModal = () => {
    setModalMode("add");
    setInitialData(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (classData: ClassModel) => {
    const formData: ClassFormData = {
      id: classData.id,
      academyYear: Number(classData.academyYear),
      code: classData.code,
      degree: classData.degree as DegreeEnum,
      status: Constants.ACTIVE,
      yearLevel: classData.yearLevel,
      majorId: classData.major.id,
    };
    setModalMode("edit");
    setInitialData(formData);
    setIsModalOpen(true);
  };

  async function handleDeleteClass() {
    if (!classes) return;

    setIsSubmitting(true);
    try {
      const response = await deleteClassService(classes.id);

      if (response) {
        setAllClassData((prevData) => {
          if (!prevData) return null;

          const updatedContent = prevData.content.filter(
            (item) => item.id !== classes.id
          );

          return {
            ...prevData,
            content: updatedContent,
            totalElements: prevData.totalElements - 1,
          };
        });

        toast.success("Class deleted successfully");
      } else {
        toast.error("Failed to delete class");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the class");
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
    }
  }

  async function handleSubmit(formData: ClassFormData) {
    setIsSubmitting(true);
    console.log("##", formData);
    // return;

    try {
      const majorData = {
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
          response = await createClassService(majorData);

          if (response) {
            setAllClassData((prevData) => {
              if (!prevData) return null;
              const updatedContent = response
                ? [response, ...prevData.content]
                : [...prevData.content];

              return {
                ...prevData,
                content: updatedContent,
                totalElements: prevData.totalElements + 1,
              } as AllClassModel;
            });

            toast.success("Major added successfully");
            setIsModalOpen(false);
          }
        } catch (error: any) {
          toast.error(error.message || "Failed to add room");
        }
      } else if (modalMode === "edit" && formData.id) {
        try {
          response = await updateClassService(formData.id, majorData);
          if (response) {
            setAllClassData((prevData) => {
              if (!prevData) return null;

              const updatedContent = prevData.content.map((dept) =>
                dept.id === formData.id && response ? response : dept
              );

              return {
                ...prevData,
                content: updatedContent,
              } as AllClassModel;
            });

            toast.success("Major updated successfully");
            setIsModalOpen(false);
          }
        } catch (error: any) {
          toast.error(error.message || "Failed to update major");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }
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
                value={searchQuery}
                onChange={handleSearchChange}
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

      <div className="overflow-x-auto mt-4">
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
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No Class found
                  </TableCell>
                </TableRow>
              ) : (
                allClassData?.content.map((cls, index) => {
                  const indexDisplay =
                    ((allClassData.pageNo || 1) - 1) * 10 + index + 1;
                  return (
                    <TableRow key={cls.id}>
                      <TableCell>{indexDisplay}</TableCell>
                      <TableCell>
                        <span className="rounded bg-gray-100 px-2 py-1">
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
                            className="h-8 w-8 bg-gray-200"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              setClasses(cls);
                              setIsDeleteDialogOpen(true);
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-red-500 text-white hover:bg-red-600"
                            disabled={isSubmitting}
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
      {!isLoading && allClassData && (
        <div className="mt-4 flex justify-end">
          <PaginationPage
            currentPage={allClassData.pageNo}
            totalPages={allClassData.totalPages}
            onPageChange={(page: number) => loadClass({ pageNo: page })}
          />
        </div>
      )}
      <ClassFormModal
        isOpen={isModalOpen}
        mode={modalMode}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={initialData}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteClass}
        title="Delete class"
        description="Are you sure you want to delete the class:"
        itemName={classes?.code}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
