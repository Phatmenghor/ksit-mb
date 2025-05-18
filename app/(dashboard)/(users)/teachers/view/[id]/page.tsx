"use client";
import TeacherForm from "@/components/dashboard/users/teachers/form/TeacherForm";
import { Mode } from "@/constants/constant";
import { ROUTE } from "@/constants/routes";
import { ZodStaffModelType } from "@/model/user/schema";
import { getStuffByIdService } from "@/service/user/user.service";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ViewPage() {
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

  return (
    <TeacherForm
      mode={Mode.VIEW}
      onSubmit={async () => {}}
      title="View Teacher"
      initialValues={initialValues}
      loading={loading}
      back={ROUTE.DASHBOARD}
      onDiscard={() => {
        router.back();
      }}
    />
  );
}
