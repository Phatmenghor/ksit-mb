"use client";
import {
  AddSingleStudentRequestSchema,
  AddSingleStudentRequestType,
} from "@/model/student/add.student.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import StudentStudiesHistorySection from "./studentStudiesHistories";
import StudentPersonalDetailSection from "./StudentPersonalDetail";
import StudentFamilyBackgroundSection from "./StudentFamilyBackground";

export default function StudentFormDetail() {
  const method = useForm<AddSingleStudentRequestType>({
    resolver: zodResolver(AddSingleStudentRequestSchema),
  });
  return (
    <FormProvider {...method}>
      <form className="space-y-5">
        <StudentPersonalDetailSection />
        <StudentStudiesHistorySection />
        <StudentFamilyBackgroundSection />
      </form>
    </FormProvider>
  );
}
