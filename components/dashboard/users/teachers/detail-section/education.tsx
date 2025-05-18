"use client";
import { Separator } from "@/components/ui/separator";
import React from "react";
import TeachingDetailForm from "./teaching-detail-form";
import CollapsibleCard from "@/components/shared/collapsibleCard";
import DynamicInputGrid from "@/components/shared/dynamicInputGrid";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ZodStaffModelType } from "@/model/user/schema";
import { Mode } from "@/constants/constant";

export default function EducationForm({ mode }: { mode: Mode }) {
  const {
    control,
    formState: { isSubmitting, isDirty },
  } = useFormContext<ZodStaffModelType>();

  useFieldArray({
    control: control,
    name: "teachersProfessionalRanks",
  });

  const isReadOnly = mode === Mode.VIEW;

  return (
    <CollapsibleCard title="ឋានៈវិជ្ជាជីវៈគ្រូបង្រៀន">
      <div className="space-y-6">
        <DynamicInputGrid
          labels={[
            "ប្រភេទឋានៈវិជ្ជាជីវៈ",
            "បរិយាយ",
            "ប្រកាសលេខ",
            "កាលបរិច្ឆេទទទួល",
          ]}
          isSubmitting={isSubmitting || isReadOnly}
          fields={[
            {
              name: "typeOfProfessionalRank",
              type: "text",
              placeholder: "ប្រភេទឋានៈវិជ្ជាជីវៈ",
            },
            { name: "description", type: "text", placeholder: "បរិយាយ" },
            {
              name: "announcementNumber",
              type: "text",
              placeholder: "ប្រកាសលេខ",
            },
            { name: "dateAccepted", type: "date", placeholder: "mm/dd/yyyy" },
          ]}
          defaultRows={2}
          namePrefix="teachersProfessionalRanks"
        />

        <Separator />

        <TeachingDetailForm mode={mode} />
      </div>
    </CollapsibleCard>
  );
}
