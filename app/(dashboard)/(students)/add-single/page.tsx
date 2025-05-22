"use client";

import { ROUTE } from "@/constants/routes";
import {
  AddSingleStudentRequestSchema,
  StudentFormData,
} from "@/model/user/student/add.student.zod";
import StudentForm from "@/components/dashboard/users/student/form/StudentForm";
import { Mode, RoleEnum, StatusEnum } from "@/constants/constant";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { removeEmptyStringsAndNulls } from "@/utils/api-related/RemoveString";
import { toast } from "sonner";
import { addStudentService } from "@/service/user/student.service";
import { AddSingleStudentRequest } from "@/model/user/student/add.student.model";

export default function AddSingleStudentPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: StudentFormData) => {
    setLoading(true);
    try {
      const cleanData = removeEmptyStringsAndNulls(
        AddSingleStudentRequestSchema.parse(data)
      );
      const payload = {
        ...cleanData,
        status: StatusEnum.ACTIVE,
      };
      await addStudentService(payload);
      toast.success("Student created successfully");
    } catch (error) {
      console.error("Failed to create student:", error);
      toast.error("Failed to create student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentForm
      mode={Mode.ADD}
      title="Add Student"
      onSubmit={onSubmit}
      loading={loading}
      back={ROUTE.DASHBOARD}
      onDiscard={() => {
        router.back();
      }}
    />
  );
}
