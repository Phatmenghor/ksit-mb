"use client";
import CollapsibleCard from "@/components/shared/collapsibleCard";
import DynamicInputGrid from "@/components/shared/dynamicInputGrid";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function ShortCourseForm() {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();
  useFieldArray({
    control: control,
    name: "teacherShortCourses",
  });

  return (
    <CollapsibleCard title="វគ្គខ្លីៗ">
      <DynamicInputGrid
        isSubmitting={isSubmitting}
        labels={[
          "ផ្នែក",
          "ឈ្មោះជំនាញ",
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
