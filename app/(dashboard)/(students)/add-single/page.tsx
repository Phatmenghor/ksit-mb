"use client";

import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { ROUTE } from "@/constants/routes";
import ProfileUploadCard from "@/components/dashboard/users/teachers/form/profileUploadCard";
import { FormProvider, useForm } from "react-hook-form";
import { StudentBasicForm } from "@/components/dashboard/student/add -single-student/GenerateDataForm";
import StudentPersonalDetailSection from "@/components/dashboard/student/add -single-student/StudentPersonalDetail";
import { StudentStudiesHistorySection } from "@/components/dashboard/student/add -single-student/studentStudiesHistories";
import StudentFamilyBackgroundSection from "@/components/dashboard/student/add -single-student/StudentFamilyBackground";
import {
  AddSingleStudentRequestType,
  defaultAddSingleStudentRequest,
} from "@/model/student/add.student.zod";

export default function AddSingleStudentPage() {
  const method = useForm<AddSingleStudentRequestType>({
    defaultValues: defaultAddSingleStudentRequest,
  });

  return (
    <div className="space-y-5">
      <CardHeaderSection
        title="Add New Student"
        backHref={ROUTE.STUDENTS.LIST}
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          { label: "Add Student", href: ROUTE.STUDENTS.ADD_SINGLE },
        ]}
      />
      <FormProvider {...method}>
        <form>
          <StudentBasicForm />

          <ProfileUploadCard />

          <StudentPersonalDetailSection />
          <StudentStudiesHistorySection />
          <StudentFamilyBackgroundSection />
        </form>
      </FormProvider>
    </div>
  );
}
