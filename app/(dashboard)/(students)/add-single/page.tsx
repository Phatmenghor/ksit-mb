"use client";

import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { ROUTE } from "@/constants/routes";
import { GenerateDataForm } from "@/components/dashboard/users/teachers/add/GenerateDataForm";
import ProfileUploadCard from "@/components/dashboard/users/teachers/add/profileUploadCard";
import StudentFormDetail from "@/components/dashboard/student/add -single-student/StudentFormDetail";
import { FormProvider } from "react-hook-form";

export default function AddSingleStudentPage() {
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

      <GenerateDataForm onGenerate={() => {}} />

      <ProfileUploadCard />

      <StudentFormDetail />
    </div>
  );
}
