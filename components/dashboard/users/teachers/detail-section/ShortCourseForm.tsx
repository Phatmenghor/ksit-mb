"use client";
import CollapsibleCard from "@/components/shared/collapsibleCard";
import DynamicInputGrid from "@/components/shared/dynamicInputGrid";
import { Mode } from "@/constants/constant";
import { ZodStaffModelType } from "@/model/user/schema";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function ShortCourseForm({ mode }: { mode: Mode }) {
  const {
    control,
    formState: { isSubmitting, isDirty },
  } = useFormContext<ZodStaffModelType>();
  useFieldArray({
    control: control,
    name: "teacherShortCourses",
  });
  const isReadOnly = mode === Mode.VIEW;

  return (
    <CollapsibleCard title="វគ្គខ្លីៗ">
      <DynamicInputGrid
        isSubmitting={isSubmitting || isReadOnly}
        labels={[
          "ផ្នែក",
          "ឈ្មោះជំនាញ",
          "ផ្នែក",
          "ថ្ងៃចាប់ផ្តើម",
          "ថ្ងៃបញ្ចប់",
          "រយៈពេល",
          "រៀបចំដោយ",
          "គាំទ្រដោយ",
        ]}
        fields={[
          {
            name: "skill",
            type: "text",
            placeholder: "ផ្នែក",
          },
          {
            name: "skillName",
            type: "text",
            placeholder: "ឈ្មោះជំនាញ",
          },
          {
            name: "startDate",
            type: "text",
            placeholder: "ផ្នែក",
          },
          {
            name: "endDate",
            type: "date",
            placeholder: "ថ្ងៃចាប់ផ្តើម",
          },
          {
            name: "endDate",
            type: "date",
            key: "ShortCourseEndDate",
            placeholder: "ថ្ងៃបញ្ចប់",
          },
          {
            name: "duration",
            type: "text",
            placeholder: "រយៈពេល",
          },
          {
            name: "preparedBy",
            type: "text",
            placeholder: "រៀបចំដោយ",
          },
          {
            name: "supportBy",
            type: "text",
            placeholder: "គាំទ្រដោយ",
          },
        ]}
        namePrefix="teacherShortCourses"
        defaultRows={2}
      />
    </CollapsibleCard>
  );
}
