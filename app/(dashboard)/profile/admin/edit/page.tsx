"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import {
  getStaffByTokenService,
  updateStaffService,
} from "@/service/user/user.service";
import { AdminFormData } from "@/model/user/staff/staff.schema";
import { EditStaffModel } from "@/model/user/staff/staff.request.model";
import { cleanField } from "@/utils/map-helper/student";
import AdminForm from "@/components/dashboard/users/admin/AdminProfileForm";

export type ExtendedAdminFormData = AdminFormData & {
  profileUrl?: string;
};

export default function EditAdminProfilePage() {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] =
    useState<ExtendedAdminFormData | null>(null);
  const [staffId, setStaffId] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStaffByTokenService();

        setStaffId(response.id);

        const payload: AdminFormData = {
          id: response?.id ?? 0,
          username: response?.username ?? "",
          email: response?.email ?? "",
          first_name: response?.englishFirstName ?? "",
          last_name: response?.englishLastName ?? "",
          status: response?.status ?? "",
          roles: response?.roles ?? [],
          selectedStaff: response,
        };

        setInitialValues(payload);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Failed to load profile data");
      }
    };

    fetchData();
  }, []); // Remove staffId from dependency array to avoid infinite loop

  const onSubmit = async (data: ExtendedAdminFormData) => {
    if (staffId == null) {
      toast.error("ID is missing");
      return;
    }

    setLoading(true);
    try {
      const payload: EditStaffModel = {
        email: cleanField(data.email),
        khmerFirstName: cleanField(data.first_name),
        khmerLastName: cleanField(data.last_name),
        englishFirstName: cleanField(data.first_name),
        englishLastName: cleanField(data.last_name),
        profileUrl: data.profileUrl,
      };

      await updateStaffService(staffId, payload);

      toast.success("Profile updated successfully");
      setLoading(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (!initialValues) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <AdminForm
        initialData={initialValues}
        onSubmit={onSubmit}
        onCancel={handleCancel}
        isSubmitting={loading}
      />
    </div>
  );
}
