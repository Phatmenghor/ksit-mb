"use client";
import { useEffect, useState } from "react";
import { ZodStaffModelBase, ZodStaffModelType } from "@/model/user/schema";
import {
  getStuffByIdService,
  updateStaffService,
} from "@/service/user/user.service";
import { removeEmptyStringsAndNulls } from "@/utils/api-related/RemoveString";
import { toast } from "sonner";
import TeacherForm from "@/components/dashboard/users/teachers/form/TeacherForm";
import { useParams, useRouter } from "next/navigation";
import { ROUTE } from "@/constants/routes";
import { Mode } from "@/constants/constant";

export default function EditTeacherPage() {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<ZodStaffModelType>();
  const router = useRouter();
  const params = useParams();
  const teacherId = params?.id as string;

  // 1. Fetch teacher data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStuffByIdService(teacherId);

        const transformedData: ZodStaffModelType = {
          ...response,
          teacherExperiences: response?.teacherExperience,
          teachersProfessionalRanks: response?.teachersProfessionalRank,
          teacherPraiseOrCriticisms: response?.teacherPraiseOrCriticism,
          teacherEducations: response?.teacherEducation,
          teacherVocationals: response?.teacherVocational,
          teacherShortCourses: response?.teacherShortCourse,
          teacherLanguages: response?.teacherLanguage,
          teacherFamilies: response?.teacherFamily,
        };
        setInitialValues(transformedData);
      } catch (error) {
        console.error(" Failed to fetch teacher:", error);
        toast.error("Failed to load teacher data");
      }
    };

    fetchData();
  }, [teacherId]);

  const onSubmit = async (data: ZodStaffModelType) => {
    setLoading(true);
    try {
      const cleanData = removeEmptyStringsAndNulls(
        ZodStaffModelBase.parse(data)
      );
      await updateStaffService(Number(teacherId), cleanData);

      toast.success("Teacher updated successfully");
    } catch (error) {
      console.error("Failed to update teacher:", error);
      toast.error("Failed to update teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TeacherForm
      mode={Mode.EDIT}
      title="Edit Teacher"
      onSubmit={onSubmit}
      initialValues={initialValues}
      loading={loading}
      back={ROUTE.DASHBOARD}
      onDiscard={() => {
        router.back();
      }}
    />
  );
}
