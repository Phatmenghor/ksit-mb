"use client";

import { ROUTE } from "@/constants/routes";
import {
  EditStudentFormData,
  StudentFormSchema,
} from "@/model/user/student/add-edit.student.zod";
import { Mode } from "@/constants/constant";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  editStudentService,
  getStudentByIdService,
} from "@/service/user/student.service";
import StudentForm from "@/components/dashboard/users/student/form/StudentForm";
import { removeEmptyStringsAndNulls } from "@/utils/api-related/RemoveString";
import { EditStudentData } from "@/model/user/student/add-edit.student.model";

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
          id: Number(studentId),
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
      const payload: EditStudentData = {
        id: Number(studentId),
        username: formData.username,
        email: formData.email,
        khmerFirstName: formData.khmerFirstName,
        khmerLastName: formData.khmerLastName,
        englishFirstName: formData.englishFirstName,
        englishLastName: formData.englishLastName,
        gender: formData.gender,
        profileUrl: formData.profileUrl,
        dateOfBirth: formData.dateOfBirth,
        phoneNumber: formData.phoneNumber,
        currentAddress: formData.currentAddress,
        nationality: formData.nationality,
        ethnicity: formData.ethnicity,
        placeOfBirth: formData.placeOfBirth,
        memberSiblings: formData.memberSiblings,
        numberOfSiblings: formData.numberOfSiblings,
        classId: formData.classId,
        studentStudiesHistories: (formData.studentStudiesHistories || []).map(
          (history) => ({
            ...history,
            typeStudies: history.typeStudies ?? undefined,
            schoolName: history.schoolName ?? undefined,
            location: history.location ?? undefined,
            fromYear: history.fromYear ?? undefined,
            endYear: history.endYear ?? undefined,
            obtainedCertificate: history.obtainedCertificate ?? undefined,
            overallGrade: history.overallGrade ?? undefined,
          })
        ),
        studentParents: (formData.studentParents || []).map((parent) => ({
          ...parent,
          name: parent.name ?? undefined,
          age: parent.age ?? undefined,
          job: parent.job ?? undefined,
          phone: parent.phone ?? undefined,
          address: parent.address ?? undefined,
          parentType: parent.parentType ?? undefined,
          id: parent.id ?? undefined,
        })),
        studentSiblings: (formData.studentSiblings || []).map((sibling) => ({
          ...sibling,
          name: sibling.name ?? undefined,
          occupation: sibling.occupation ?? undefined,
          gender: sibling.gender ?? undefined,
          dateOfBirth: sibling.dateOfBirth ?? undefined,
          phoneNumber: sibling.phoneNumber ?? undefined,
          id: sibling.id ?? undefined,
        })),
        status: formData.status,
      };

      await editStudentService(payload);
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
      mode={Mode.EDIT}
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
