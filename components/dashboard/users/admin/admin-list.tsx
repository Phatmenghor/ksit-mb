"use client";

import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { Column, CustomTable } from "@/components/shared/layout/TableSection";
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
import { Pencil, Trash2, Plus, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import AdminModalForm from "./AdminModalForm";
import { AdminFormData } from "@/model/user/staff/schema";
import { UpdateStaffRequest } from "@/model/user/staff/update.Request.staff";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";

export default function AdminsList() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<AllStaffModel | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState<AdminFormData | undefined>(
    undefined
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedAdmin, setSelectedAdmin] = useState<StaffModel | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const loadData = useCallback(
    async (
      data: RequestAllStuff = {
        pageNo: 1,
        pageSize: 10,
        roles: [RoleEnum.ADMIN],
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
          console.error("Failed to fetch admin:");
        }
      } catch (error) {
        toast.error("An error occurred while loading admins");
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

  const columns: Column<StaffModel>[] = [
    {
      key: "admin#",
      header: "#",
      render: (_: any, index: number) => index + 1,
    },

    {
      key: "fullname(kh)",
      header: "Fullname (KH)",
      render: (admin: StaffModel) =>
        `${admin?.khmerFirstName || ""} ${admin?.khmerLastName || ""}`,
    },
    {
      key: "fullname(en)",
      header: "Fullname (EN)",
      render: (admin: StaffModel) =>
        `${admin.englishFirstName || ""} ${admin.englishLastName || ""}`,
    },
    {
      key: "username",
      header: "Username",
    },
    {
      key: "status",
      header: "Status",
      render: (admin: any) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            admin.status === StatusEnum.ACTIVE
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {admin.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (admin: any) => (
        <>
          <Button
            variant="ghost"
            onClick={() => {}}
            className={iconColor}
            size="sm"
          >
            <RotateCcw />
          </Button>
          <Button
            variant="ghost"
            className={iconColor}
            onClick={() => handleOpenEditModal(admin)}
            size="sm"
          >
            <Pencil />
          </Button>
          <Button
            variant="ghost"
            className={iconColor}
            size="sm"
            onClick={() => {
              setSelectedAdmin(admin);
              setIsDeleteDialogOpen(true);
            }}
          >
            <Trash2 />
          </Button>
        </>
      ),
    },
  ];

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
      fullname: `${adminData.khmerFirstName ?? ""} ${
        adminData.khmerLastName ?? ""
      }`,
      confirmPassword: "",
    });
    setModalMode("edit");
    setIsModalOpen(true);
  };

  async function handleSubmit(formData: AdminFormData) {
    setIsSubmitting(true);
    try {
      console.log("##Submitting data to api:", formData);

      const [firstName = "", ...rest] = formData.fullname.split(" ");
      const lastName = rest.join(" ");

      const basePayload = {
        username: formData.username,
        email: formData.email,
        khmerFirstName: firstName,
        khmerLastName: lastName,
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
              const updatedContent = prevData.content.map((cls) =>
                cls.id === formData.id && response ? response : cls
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

      const response = await updateStaffService(selectedAdmin.id, {
        status: StatusEnum.INACTIVE,
      });

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
        title="Admins"
        searchValue={searchQuery}
        searchPlaceholder="Search..."
        onSearchChange={handleSearchChange}
        buttonText="Add New"
        openModal={handleOpenAddModal}
        buttonIcon={<Plus className="mr-2 h-2 w-2" />}
      />

      <CustomTable
        isLoading={isLoading}
        columns={columns}
        data={data?.content ?? []}
      />

      <AdminModalForm
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
        onDelete={handleDeleteAdmin}
        title="Delete Admin"
        description={`Are you sure you want to delete the admin: ${selectedAdmin?.username}?`}
        itemName={selectedAdmin?.username}
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
