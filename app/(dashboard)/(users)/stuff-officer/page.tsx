"use client";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import PaginationPage from "@/components/shared/pagination-page";
import { Button } from "@/components/ui/button";
import { RoleEnum, StatusEnum } from "@/constants/constant";
import { ROUTE } from "@/constants/routes";
import { AllStaffModel, StaffModel } from "@/model/user/staff/stuff.model";
import {
  AddStaffModel,
  RequestAllStuff,
} from "@/model/user/staff/Add.staff.model";
import {
  addStaffService,
  getAllStuffService,
  updateStaffService,
} from "@/service/user/user.service";
import { Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "../../permissions/loading";
import { StaffFormData } from "@/model/user/staff/schema";
import { StaffTableHeader } from "@/constants/table/user";
import StaffOfficerModalForm from "@/components/dashboard/users/stuff-officers/StaffOfficerFormModal";
import { UpdateStaffRequest } from "@/model/user/staff/update.Request.staff";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import ChangePasswordModal from "@/components/dashboard/users/shared/ChangePasswordModal";

export default function StuffOfficerListPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<AllStaffModel | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<StaffFormData | undefined>(
    undefined
  );
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStaff, setselectedStaff] = useState<StaffModel | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const loadData = useCallback(
    async (
      data: RequestAllStuff = {
        pageNo: 1,
        pageSize: 10,
        roles: [RoleEnum.STAFF],
        search: searchQuery,
        status: StatusEnum.ACTIVE,
      }
    ) => {
      setIsLoading(true);
      try {
        const response = await getAllStuffService(data);
        if (response) {
          setData(response);
        } else {
          console.error("Failed to fetch officer:");
        }
      } catch (error) {
        toast.error("An error occurred while loading officers");
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    loadData();
  }, [searchQuery, loadData]);
  const iconColor = "text-black";

  const handleOpenAddModal = () => {
    setModalMode("add");
    setInitialData(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (staffData: StaffModel) => {
    setselectedStaff(staffData);
    setInitialData({
      ...staffData,
      roles: staffData.roles ?? [RoleEnum.STAFF],
      first_name: staffData.khmerFirstName || "",
      last_name: staffData.khmerLastName || "",
      confirmPassword: "",
    });
    setModalMode("edit");
    setIsModalOpen(true);
  };

  async function handleSubmit(formData: StaffFormData) {
    setIsSubmitting(true);
    try {
      console.log("##Submitting data to api:", formData);

      const basePayload = {
        username: formData.username,
        email: formData.email,
        khmerFirstName: formData.first_name,
        khmerLastName: formData.last_name,
        englishFirstName: formData.first_name,
        englishLastName: formData.last_name,
        status: formData.status,
        roles: formData.roles,
      };
      const addPayload: Partial<AddStaffModel> = {
        ...basePayload,
        ...(formData.password ? { password: formData.password } : {}),
      };
      const updatePayload: Partial<UpdateStaffRequest> = {
        ...basePayload,
      };

      console.log("##ID:", formData.id);

      console.log("##update payload to api:", updatePayload);

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
            toast.success(`Staff ${response.username} added successfully`);
            setIsModalOpen(false);
          }
        } catch (error: any) {
          toast.error(error.message || "Failed to add staff");
        }
      } else if (modalMode === "edit" && formData.id) {
        try {
          let response = await updateStaffService(formData.id, updatePayload);
          console.log("##response from update api:", response);
          if (response) {
            setData((prevData) => {
              if (!prevData) return null;
              const updatedContent = prevData.content.map((staff) =>
                staff.id === formData.id && response ? response : staff
              );
              return {
                ...prevData,
                content: updatedContent,
              };
            });

            toast.success(`Staff ${response.username} updated successfully`);
            setIsModalOpen(false);
          }
        } catch (error: any) {
          toast.error(error.message || "Failed to update staff");
        }
      }
    } catch (error: any) {
      console.error("Error submitting staff form:", error);
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteStaff() {
    if (!selectedStaff) return;

    setIsSubmitting(true);
    try {
      const originalData = data;
      setData((prevData) => {
        if (!prevData) return null;
        const updatedContent = prevData.content.filter(
          (item) => item.id !== selectedStaff.id
        );
        return {
          ...prevData,
          content: updatedContent,
          totalElements: prevData.totalElements - 1,
        };
      });

      const response = await updateStaffService(selectedStaff.id, {
        status: StatusEnum.INACTIVE,
      });

      if (response) {
        toast.success(
          `staff ${selectedStaff.username ?? ""} deleted successfully`
        );
      } else {
        setData(originalData);
        toast.error("Failed to delete staff");
      }
    } catch (error) {
      console.error("Error deleting staff:", error);
      toast.error("An error occurred while deleting the staff");
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
          { label: "Stuff-Officer-List", href: ROUTE.USERS.STUFF_OFFICER },
        ]}
        back
        title="Stuff Officers"
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
                {StaffTableHeader.map((header, index) => (
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
                    No classes found
                  </TableCell>
                </TableRow>
              ) : (
                data?.content.map((staff, index) => {
                  const indexDisplay =
                    ((data.pageNo || 1) - 1) * (data.pageSize || 10) +
                    index +
                    1;
                  return (
                    <TableRow key={staff.id}>
                      <TableCell>{indexDisplay}</TableCell>
                      <TableCell>
                        {staff.khmerFirstName} {staff.khmerLastName}
                      </TableCell>
                      <TableCell>
                        {" "}
                        {staff.englishFirstName ?? ""}{" "}
                        {staff.englishLastName ?? ""}
                      </TableCell>
                      <TableCell>{staff.username}</TableCell>
                      <TableCell>{staff.status}</TableCell>
                      <TableCell>
                        <div className="flex justify-start space-x-2">
                          <Button
                            onClick={() => handleOpenEditModal(staff)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-black hover:text-gray-900"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            onClick={() => {
                              setIsChangePasswordDialogOpen(true);
                              setselectedStaff(staff);
                            }}
                            className={iconColor}
                            size="sm"
                          >
                            <RotateCcw />
                          </Button>
                          <Button
                            onClick={() => {
                              setselectedStaff(staff);
                              setIsDeleteDialogOpen(true);
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600"
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

      <StaffOfficerModalForm
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
          setselectedStaff(null);
        }}
        userId={selectedStaff?.id}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteStaff}
        title="Delete Staff"
        description={`Are you sure you want to delete the staff: ${selectedStaff?.username}?`}
        itemName={selectedStaff?.username}
        isSubmitting={isSubmitting}
      />

      {!isLoading && data && (
        <div className="mt-4 flex justify-end">
          <PaginationPage
            currentPage={data.pageNo}
            totalPages={data.totalPages}
            onPageChange={(page: number) => loadData({ pageNo: page })}
          />
        </div>
      )}
    </div>
  );
}
