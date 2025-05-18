"use client";
import CollapsibleCard from "@/components/shared/collapsibleCard";
import DynamicInputGrid from "@/components/shared/dynamicInputGrid";
import { Mode } from "@/constants/constant";
import { ZodStaffModelType } from "@/model/user/schema";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function LanguageForm({ mode }: { mode: Mode }) {
  const {
    control,
    formState: { isSubmitting, isDirty },
  } = useFormContext<ZodStaffModelType>();

  useFieldArray({
    control: control,
    name: "teacherLanguages",
  });

  const isReadOnly = mode === Mode.VIEW;

  return (
    <CollapsibleCard title="ភាសាបរទេស">
      <DynamicInputGrid
        isSubmitting={isSubmitting || isReadOnly}
        labels={["ភាសា", "ការអាន", "ការសរសេរ", "ការសន្ទនា"]}
        fields={[
          {
            name: "language",
            type: "text",
            placeholder: "ភាសា",
          },
          {
            name: "reading",
            type: "text",
            placeholder: "ការអាន",
          },
          {
            name: "writing",
            type: "text",
            placeholder: "ការសរសេរ",
          },
          {
            name: "speaking",
            type: "text",
            placeholder: "ការសន្ទនា",
          },
        ]}
        namePrefix="teacherLanguages"
        defaultRows={2}
      />
    </CollapsibleCard>
  );
}
