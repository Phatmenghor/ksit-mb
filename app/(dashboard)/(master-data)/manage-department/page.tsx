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
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
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
import { useCallback, useEffect, useState } from "react";
import {
  DepartmentFormData,
  DepartmentModal,
} from "@/components/dashboard/master-data/manage-department/department-form-modal";
import {
  AllDepartmentModel,
  DepartmentModel,
} from "@/model/master-data/department/all-department-model";
import { toast } from "sonner";
import { departmentTableHeader } from "@/constants/table/master-data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AllDepartmentFilterModel } from "@/model/master-data/department/type-department-model";
import {
  getAllDepartmentService,
  createDepartmentService,
  updateDepartmentService,
} from "@/service/master-data/department.service";
import PaginationPage from "@/components/shared/pagination-page";
import { DateTimeFormatter } from "@/utils/date/date-time-format";
import { Constants } from "@/constants/text-string";
import Loading from "@/components/shared/loading";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";

export default function ManageDepartmentPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [department, setDepartment] = useState<DepartmentModel | null>(null);
  const [allDepartmentData, setAllDepartmentData] =
    useState<AllDepartmentModel | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState<
    DepartmentFormData | undefined
  >(undefined);

  // Fetch departments with filters
  const loadDepartments = useCallback(
    async (param: AllDepartmentFilterModel) => {
      setIsLoading(true);

      try {
        const response = await getAllDepartmentService({
          search: searchQuery,
          status: Constants.ACTIVE,
          ...param,
        });

        if (response) {
          setAllDepartmentData(response);
        } else {
          console.error("Failed to fetch departments:");
        }
      } catch (error) {
        toast.error("An error occurred while loading departments");
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    loadDepartments({});
  }, [searchQuery, loadDepartments]);

  const handleOpenAddModal = () => {
    setModalMode("add");
    setInitialData(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (dept: DepartmentModel) => {
    const formData: DepartmentFormData = {
      id: dept.id,
      code: dept.code,
      name: dept.name,
      urlLogo: dept.urlLogo,
      status: dept.status,
    };

    setModalMode("edit");
    setInitialData(formData);
    setIsModalOpen(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadDepartments({});
  };

  async function handleSubmit(formData: DepartmentFormData) {
    setIsSubmitting(true);

    try {
      const departmentData = {
        code: formData.code,
        name: formData.name,
        urlLogo: formData.urlLogo || "",
        status: formData.status,
      };

      let response: DepartmentModel | null = null;

      if (modalMode === "add") {
        try {
          response = await createDepartmentService(departmentData);

          if (response) {
            setAllDepartmentData((prevData) => {
              if (!prevData) return null;
              const updatedContent = response
                ? [response, ...prevData.content]
                : [...prevData.content];

              return {
                ...prevData,
                content: updatedContent,
                totalElements: prevData.totalElements + 1,
              } as AllDepartmentModel;
            });

            toast.success("Department added successfully");
            setIsModalOpen(false);
          }
        } catch (error: any) {
          // Display the specific error message from the API
          toast.error(error.message || "Failed to add department");
        }
      } else if (modalMode === "edit" && formData.id) {
        try {
          response = await updateDepartmentService(formData.id, departmentData);

          if (response) {
            setAllDepartmentData((prevData) => {
              if (!prevData) return null;
              const updatedContent = prevData.content.map((dept) =>
                dept.id === formData.id && response ? response : dept
              );

              return {
                ...prevData,
                content: updatedContent,
              } as AllDepartmentModel;
            });

            toast.success("Department updated successfully");
            setIsModalOpen(false);
          }
        } catch (error: any) {
          // Display the specific error message from the API
          toast.error(error.message || "Failed to update department");
        }
      }
    } catch (error: any) {
      // This catch block will handle any other errors not caught above
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteDepartment() {
    if (!department) return;

    setIsSubmitting(true);
    try {
      const response = await updateDepartmentService(department.id, {
        status: Constants.INACTIVE,
      });

      if (response) {
        setAllDepartmentData((prevData) => {
          if (!prevData) return null;

          const updatedContent = prevData.content.filter(
            (item) => item.id !== department.id
          );

          return {
            ...prevData,
            content: updatedContent,
            totalElements: prevData.totalElements - 1,
          };
        });

        toast.success("Department marked as inactive");
      } else {
        toast.error("Failed to delete department");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the department");
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
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
                <BreadcrumbPage>Manage Department</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h3 className="text-xl font-bold">Manage Department</h3>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col md:flex-row gap-4 w-full md:flex-1"
            >
              <div className="relative w-full md:w-1/2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search department..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </form>

            <Button
              onClick={handleOpenAddModal}
              className="bg-green-900 text-white hover:bg-green-950"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Add New
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="overflow-x-auto mt-4">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="rounded-md border">
            <Table className="border-none border-0">
              <TableHeader>
                <TableRow>
                  {departmentTableHeader.map((header, index) => (
                    <TableHead key={index} className={header.className}>
                      {header.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {allDepartmentData?.content.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No departments found
                    </TableCell>
                  </TableRow>
                ) : (
                  allDepartmentData?.content.map((dept, index) => (
                    <TableRow key={dept.id || index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <span className="rounded bg-blue-100 px-2 py-1 text-blue-800">
                          {dept.code}
                        </span>
                      </TableCell>
                      <TableCell>{dept.name}</TableCell>
                      <TableCell>
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={dept.urlLogo || "/placeholder.svg"}
                            alt={dept.name}
                          />
                        </Avatar>
                      </TableCell>
                      <TableCell>{DateTimeFormatter(dept.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex justify-end space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => handleOpenEditModal(dept)}
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                                  disabled={isSubmitting}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => {
                                    setDepartment(dept);
                                    setIsDeleteDialogOpen(true);
                                  }}
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 bg-red-500 text-white hover:bg-red-600"
                                  disabled={isSubmitting}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      {/* Pagination */}
      {!isLoading && allDepartmentData && (
        <div className="mt-4 flex justify-end">
          <PaginationPage
            currentPage={allDepartmentData.pageNo}
            totalPages={allDepartmentData.totalPages}
            onPageChange={(page: number) => loadDepartments({ pageNo: page })}
          />
        </div>
      )}
      {/* Department Edit/Add Modal */}
      <DepartmentModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={initialData}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteDepartment}
        title="Delete Department"
        description="Are you sure you want to delete the department:"
        itemName={department?.name}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
