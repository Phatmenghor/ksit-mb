"use client";
import CollapsibleCard from "@/components/shared/collapsibleCard";
import DynamicInputGrid from "@/components/shared/dynamicInputGrid";
import { Mode } from "@/constants/constant";
import { ZodStaffModelType } from "@/model/user/staff/schema";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function VocationalForm({ mode }: { mode: Mode }) {
  const {
    control,
    formState: { isSubmitting, isDirty },
  } = useFormContext<ZodStaffModelType>();

  useFieldArray({
    control: control,
    name: "teacherVocationals",
  });

  const isReadOnly = mode === Mode.VIEW;

  return (
    <CollapsibleCard title="វគ្គគរុកោសល្យ">
      <DynamicInputGrid
        isSubmitting={isSubmitting || isReadOnly}
        labels={[
          "កម្រិតវិជ្ជាជីវៈ",
          "ឧកទេសទី១",
          "ឧកទេសទី២",
          "ប្រព័ន្ធបណ្តុះបពណ្តាល",
          "ថ្ងៃខែបានទទួល",
        ]}
        fields={[
          {
            name: "culturalLevel",
            type: "text",
            placeholder: "កម្រិតវិជ្ជាជីវៈ",
          },
          {
            name: "skillOne",
            type: "text",
            placeholder: "ឧកទេសទី១",
          },
          {
            name: "skillTwo",
            type: "text",
            placeholder: "ឧកទេសទី២",
          },
          {
            name: "trainingSystem",
            type: "text",
            placeholder: "ប្រព័ន្ធបណ្តុះបពណ្តាល",
          },
          {
            name: "dateAccepted",
            type: "date",
            placeholder: "ថ្ងៃខែបានទទួល",
          },
        ]}
        namePrefix="teacherVocationals"
        defaultRows={2}
      />
    </CollapsibleCard>
  );
}
