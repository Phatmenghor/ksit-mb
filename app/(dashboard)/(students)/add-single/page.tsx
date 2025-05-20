"use client";

import { ROUTE } from "@/constants/routes";
import { AddStudentFormData } from "@/model/user/student/add-edit.student.zod";
import { Mode } from "@/constants/constant";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { addStudentService } from "@/service/user/student.service";
import StudentForm from "@/components/dashboard/users/student/form/StudentForm";
import { clean, cleanRequired } from "@/utils/map-helper/student";
import { AddStudentData } from "@/model/user/student/add-edit.student.model";

export default function AddSingleStudentPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: AddStudentFormData) => {
    setLoading(true);
    try {
      const payload: AddStudentData = {
        username: cleanRequired(data.username)!,
        password: cleanRequired(data.password)!,
        classId: data.classId ?? undefined,
        email: cleanRequired(data.email),
        khmerFirstName: clean(data.khmerFirstName)!,
        khmerLastName: clean(data.khmerLastName)!,
        englishFirstName: clean(data.englishFirstName)!,
        englishLastName: clean(data.englishLastName)!,
        gender: clean(data.gender)!,
        profileUrl: clean(data.profileUrl)!,
        dateOfBirth: clean(data.dateOfBirth)!,
        phoneNumber: clean(data.phoneNumber)!,
        currentAddress: clean(data.currentAddress)!,
        nationality: clean(data.nationality)!,
        ethnicity: clean(data.ethnicity)!,
        placeOfBirth: clean(data.placeOfBirth)!,
        memberSiblings: clean(data.memberSiblings)!,
        numberOfSiblings: clean(data.numberOfSiblings)!,
        status: clean(data.status)!,

        studentStudiesHistories: data.studentStudiesHistories?.map(
          (s: any) => ({
            id: s.id,
            typeStudies: clean(s.typeStudies),
            schoolName: clean(s.schoolName),
            location: clean(s.location),
            fromYear: clean(s.fromYear),
            endYear: clean(s.endYear),
            obtainedCertificate: clean(s.obtainedCertificate),
            overallGrade: clean(s.overallGrade),
          })
        ),

        studentParents: data.studentParents?.map((p: any) => ({
          id: p.id,
          name: clean(p.name),
          age: clean(p.age),
          job: clean(p.job),
          phone: clean(p.phone),
          address: clean(p.address),
          parentType: clean(p.parentType),
        })),

        studentSiblings: data.studentSiblings?.map((s: any) => ({
          id: s.id,
          name: clean(s.name),
          gender: clean(s.gender),
          dateOfBirth: clean(s.dateOfBirth),
          occupation: clean(s.occupation),
          phoneNumber: clean(s.phoneNumber),
        })),
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
