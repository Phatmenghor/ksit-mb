"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus, RotateCcw, View, Eye } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import PaginationPage from "@/components/shared/pagination-page";
import { RoleEnum, StatusEnum } from "@/constants/constant";
import { ROUTE } from "@/constants/routes";
import {
  addStaffService,
  deletedStaffService,
  getAllStaffService,
  updateStaffService,
} from "@/service/user/user.service";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import AdminModalForm from "@/components/dashboard/users/admin/AdminModalForm";
import { AdminTableHeader, StaffTableHeader } from "@/constants/table/user";
import ChangePasswordModal from "@/components/dashboard/users/shared/ChangePasswordModal";
import { useDebounce } from "@/utils/debounce/debounce";
import {
  AddStaffModel,
  EditStaffModel,
  StaffListRequest,
} from "@/model/user/staff/staff.request.model";
import { AdminFormData } from "@/model/user/staff/staff.schema";
import {
  AllStaffModel,
  StaffModel,
} from "@/model/user/staff/staff.respond.model";
import { cleanField, cleanRequiredField } from "@/utils/map-helper/student";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import Loading from "@/components/shared/loading";

export default function AdminsListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<AllStaffModel | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState<AdminFormData | undefined>(
    undefined
  );
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<StaffModel | null>(null);
  const [statusFilter, setStatusFilter] = useState("ACTIVE");

  const iconColor = "text-black";
  const route = useRouter();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const loadData = useCallback(
    async (param: StaffListRequest) => {
      setIsLoading(true);
      try {
        const response = await getAllStaffService({
          ...param,
          roles: [RoleEnum.ADMIN],
          search: searchQuery,
          status: statusFilter,
        });
        if (response) {
          setData(response);
        } else {
          console.error("Failed to fetch admin:");
        }
      } catch (error) {
        toast.error("An error occurred while loading admins");
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedSearchQuery, statusFilter]
  );

  useEffect(() => {
    loadData({});
  }, [debouncedSearchQuery, statusFilter, loadData]);

  const handleOpenAddModal = () => {
    setModalMode("add");
    setInitialData(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (adminData: StaffModel) => {
    setSelectedAdmin(adminData);
    setInitialData({
      ...adminData,
      roles: adminData.roles ?? [RoleEnum.ADMIN],
      first_name: adminData.khmerFirstName || "",
      last_name: adminData.khmerLastName || "",
      confirmPassword: "",
    });
    setModalMode("edit");
    setIsModalOpen(true);
  };

  async function handleSubmit(formData: AdminFormData) {
    setIsSubmitting(true);
    try {
      // Prepare common payload fields
      const basePayload = {
        username: cleanRequiredField(formData.username),
        email: cleanRequiredField(formData.email),
        khmerFirstName: cleanField(formData.first_name),
        khmerLastName: cleanField(formData.last_name),
        englishFirstName: cleanField(formData.first_name),
        englishLastName: cleanField(formData.last_name),
        status: cleanRequiredField(formData.status),
        roles: formData.roles,
      };

      const addPayload: AddStaffModel = {
        ...basePayload,
        roles: formData.roles ?? undefined,
        password: cleanRequiredField(formData.password),
      };

      const updatePayload: EditStaffModel = {
        ...basePayload,
        status: formData.status ?? undefined,
        roles: formData.roles ?? undefined,
      };

      if (modalMode === "add") {
        try {
          let response = await addStaffService(addPayload);

          if (response) {
            setData((prevData) => {
              if (!prevData) return null;
              return {
                ...prevData,
                content: [response!, ...prevData.content],
                totalElements: prevData.totalElements + 1,
              };
            });
            toast.success(`Admin ${response.username} added successfully`);
            setIsModalOpen(false);
          }
        } catch (error: any) {
          toast.error(error.message || "Failed to add admin");
        }
      } else if (modalMode === "edit" && formData.id) {
        try {
          let response = await updateStaffService(formData.id, updatePayload);
          console.log("##response from update api:", response);
          if (response) {
            setData((prevData) => {
              if (!prevData) return null;
              const updatedContent = prevData.content.map((admin) =>
                admin.id === formData.id && response ? response : admin
              );
              return {
                ...prevData,
                content: updatedContent,
              };
            });

            toast.success(`Admin ${response.username} updated successfully`);
            setIsModalOpen(false);
          }
        } catch (error: any) {
          toast.error(error.message || "Failed to update admin");
        }
      }
    } catch (error: any) {
      console.error("Error submitting admin form:", error);
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteAdmin() {
    if (!selectedAdmin) return;

    setIsSubmitting(true);
    try {
      const originalData = data;
      setData((prevData) => {
        if (!prevData) return null;
        const updatedContent = prevData.content.filter(
          (item) => item.id !== selectedAdmin.id
        );
        return {
          ...prevData,
          content: updatedContent,
          totalElements: prevData.totalElements - 1,
        };
      });

      const response = await deletedStaffService(selectedAdmin.id);

      if (response) {
        toast.success(
          `Admin ${selectedAdmin.username ?? ""} deleted successfully`
        );
      } else {
        setData(originalData);
        toast.error("Failed to delete admin");
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      toast.error("An error occurred while deleting the admin");
      loadData({});
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
    }
  }

  return (
    <div className="space-y-4">
      <CardHeaderSection
        breadcrumbs={[
          { label: "Home", href: ROUTE.DASHBOARD },
          { label: "Admin List", href: ROUTE.USERS.ADMIN },
        ]}
        searchValue={searchQuery}
        searchPlaceholder="Search..."
        onSearchChange={handleSearchChange}
        buttonText="Add New"
        openModal={handleOpenAddModal}
        buttonIcon={<Plus className="mr-2 h-2 w-2" />}
      />

      <div className="overflow-x-auto">
        {isLoading ? (
          <Loading />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {AdminTableHeader.map((header, index) => (
                  <TableHead key={index} className={header.className}>
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.content.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={StaffTableHeader.length}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No admin found
                  </TableCell>
                </TableRow>
              ) : (
                data?.content.map((admin, index) => {
                  const indexDisplay =
                    ((data.pageNo || 1) - 1) * (data.pageSize || 10) +
                    index +
                    1;
                  return (
                    <TableRow key={admin.id}>
                      <TableCell>{indexDisplay}</TableCell>
                      <TableCell>{admin.username.trim() || "---"}</TableCell>
                      <TableCell>
                        {`${admin.khmerFirstName || ""} ${
                          admin.khmerLastName || ""
                        }`.trim() || "---"}
                      </TableCell>
                      <TableCell>
                        {admin.englishFirstName || admin.englishLastName
                          ? `${admin.englishFirstName ?? ""} ${
                              admin.englishLastName ?? ""
                            }`.trim()
                          : "---"}
                      </TableCell>
                      <TableCell>{admin.gender || "---"}</TableCell>

                      <TableCell>
                        <div className="flex justify-start space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => {
                                    route.push(
                                      `${ROUTE.USERS.ADMIN_VIEW(
                                        String(admin.id)
                                      )}`
                                    );
                                  }}
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                                  disabled={isSubmitting}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Admin Detail</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => handleOpenEditModal(admin)}
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
                                  onClick={() =>
                                    setIsChangePasswordDialogOpen(true)
                                  }
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                                  disabled={isSubmitting}
                                >
                                  <RotateCcw className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Reset Password</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => {
                                    setSelectedAdmin(admin);
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
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {!isLoading && data && (
        <div className="mt-4 flex justify-end">
          <PaginationPage
            currentPage={data.pageNo}
            totalPages={data.totalPages}
            onPageChange={(page: number) => loadData({ pageNo: page })}
          />
        </div>
      )}

      <AdminModalForm
        isOpen={isModalOpen}
        mode={modalMode}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={initialData}
        isSubmitting={isSubmitting}
      />

      <ChangePasswordModal
        isOpen={isChangePasswordDialogOpen}
        onClose={() => {
          setIsChangePasswordDialogOpen(false);
          setSelectedAdmin(null);
        }}
        userId={selectedAdmin?.id}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteAdmin}
        title="Delete Admin"
        description={`Are you sure you want to delete the admin: ${selectedAdmin?.username}?`}
        itemName={selectedAdmin?.username}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
