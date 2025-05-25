"use client";

import { ROUTE } from "@/constants/routes";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  editStudentService,
  getStudentByIdService,
} from "@/service/user/student.service";
import StudentForm from "@/components/dashboard/users/student/form/StudentForm";
import {
  EditStudentFormData,
  StudentFormSchema,
} from "@/model/user/student/student.schema";
import { EditStudentModel } from "@/model/user/student/student.request.model";
import { cleanField } from "@/utils/map-helper/student";

export default function EditSingleStudentPage() {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<EditStudentFormData>();
  const router = useRouter();

  const params = useParams();
  const studentId = params.id as string;

  // 1. Fetch teacher data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStudentByIdService(studentId);

        console.log("Fetched student data:", response);

        setInitialValues({
          ...response,
          classId: response.studentClass.id,
          studentParents: response.studentParent,
          studentStudiesHistories: response.studentStudiesHistory,
          studentSiblings: response.studentSibling,
          nationality: response.nationality,
        });
      } catch (error) {
        console.error(" Failed to fetch student by id:", error);
        toast.error("Failed to load student data");
      }
    };

    fetchData();
  }, [studentId]);

  const onSubmit = async (data: EditStudentFormData) => {
    setLoading(true);
    try {
      // Validate using Zod and get parsed data
      const parsed = StudentFormSchema.safeParse(data);

      if (!parsed.success) {
        toast.error("Invalid form data");
        console.error(parsed.error);
        return;
      }

      const formData = parsed.data;

      // Build payload matching EditStudentData
      const payload: EditStudentModel = {
        // optional strings
        email: cleanField(formData.email),
        khmerFirstName: cleanField(formData.khmerFirstName),
        khmerLastName: cleanField(formData.khmerLastName),
        englishFirstName: cleanField(formData.englishFirstName),
        englishLastName: cleanField(formData.englishLastName),
        gender: cleanField(formData.gender),
        profileUrl: cleanField(formData.profileUrl),
        dateOfBirth: cleanField(formData.dateOfBirth),
        phoneNumber: cleanField(formData.phoneNumber),
        currentAddress: cleanField(formData.currentAddress),
        nationality: cleanField(formData.nationality),
        ethnicity: cleanField(formData.ethnicity),
        placeOfBirth: cleanField(formData.placeOfBirth),
        memberSiblings: cleanField(formData.memberSiblings),
        numberOfSiblings: cleanField(formData.numberOfSiblings),

        // nested arrays
        studentStudiesHistories: (formData.studentStudiesHistories ?? []).map(
          (h) => ({
            ...h,
            id: h.id == null ? undefined : h.id,
            typeStudies: cleanField(h.typeStudies),
            schoolName: cleanField(h.schoolName),
            location: cleanField(h.location),
            fromYear: cleanField(h.fromYear),
            endYear: cleanField(h.endYear),
            obtainedCertificate: cleanField(h.obtainedCertificate),
            overallGrade: cleanField(h.overallGrade),
          })
        ),

        studentParents: (formData.studentParents ?? []).map((p) => ({
          ...p,
          id: p.id == null ? undefined : p.id,
          name: cleanField(p.name),
          age: cleanField(p.age),
          job: cleanField(p.job),
          phone: cleanField(p.phone),
          address: cleanField(p.address),
          parentType: cleanField(p.parentType),
        })),

        studentSiblings: (formData.studentSiblings ?? []).map((s) => ({
          ...s,
          id: s.id == null ? undefined : s.id,
          name: cleanField(s.name),
          occupation: cleanField(s.occupation),
          gender: cleanField(s.gender),
          dateOfBirth: cleanField(s.dateOfBirth),
          phoneNumber: cleanField(s.phoneNumber),
        })),

        // status remains as-is (assuming it’s a required enum)
        status: cleanField(formData.status),
      };

      await editStudentService(Number(studentId), payload);
      toast.success("Student updated successfully");
    } catch (error) {
      console.error("Failed to update student:", error);
      toast.error("Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <StudentForm
      initialValues={initialValues}
      mode="Edit"
      title="Edit Student"
      onSubmit={onSubmit}
      loading={loading}
      back={ROUTE.DASHBOARD}
      onDiscard={() => {
        router.back();
      }}
    />
  );
}
