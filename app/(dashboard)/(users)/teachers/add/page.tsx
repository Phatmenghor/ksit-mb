"use client";
import { useState } from "react";
import { ZodStaffModelType, ZodStaffModelBase } from "@/model/user/schema";
import { addStaffService } from "@/service/user/user.service";
import { removeEmptyStringsAndNulls } from "@/utils/api-related/RemoveString";
import { Mode, RoleEnum, StatusEnum } from "@/constants/constant";
import { toast } from "sonner";
import TeacherForm from "@/components/dashboard/users/teachers/form/TeacherForm";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/constants/routes";

export default function AddTeacherPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: ZodStaffModelType) => {
    setLoading(true);
    try {
      const cleanData = removeEmptyStringsAndNulls(
        ZodStaffModelBase.parse(data)
      );
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
      mode={Mode.ADD}
      title="Add Teacher"
      onSubmit={onSubmit}
      loading={loading}
      back={ROUTE.DASHBOARD}
      onDiscard={() => {
        router.back();
      }}
    />
  );
}
