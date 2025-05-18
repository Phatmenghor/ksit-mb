"use client";
import { useState } from "react";
import { AddStaffModelType, AddStaffModelBase } from "@/model/user/schema";
import { addStaffService } from "@/service/user/user.service";
import { removeEmptyStrings } from "@/utils/api-related/RemoveString";
import { RoleEnum, StatusEnum } from "@/constants/constant";
import { toast } from "sonner";
import TeacherForm from "@/components/dashboard/users/teachers/form/TeacherForm";
import { useRouter } from "next/navigation";

export default function EditTeacherPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: AddStaffModelType) => {
    setLoading(true);
    try {
      const cleanData = removeEmptyStrings(AddStaffModelBase.parse(data));
      const payload = {
        ...cleanData,
        roles: [RoleEnum.TEACHER],
        status: StatusEnum.ACTIVE,
      };
      await addStaffService(payload);
      toast.success("Teacher created successfully");
    } catch (error) {
      console.error("Failed to create teacher:", error);
      toast.error("Failed to create teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TeacherForm
      title="Add Teacher"
      onSubmit={onSubmit}
      loading={loading}
      onDiscard={() => {
        router.back();
      }}
    />
  );
}
