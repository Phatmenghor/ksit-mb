"use client";
import CollapsibleCard from "@/components/shared/collapsibleCard";
import DynamicInputGrid from "@/components/shared/dynamicInputGrid";
import { Mode } from "@/constants/constant";
import { ZodStaffModelType } from "@/model/user/staff/schema";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function PraiseCriticismForm({ mode }: { mode: Mode }) {
  const {
    control,
    formState: { isSubmitting, isDirty },
  } = useFormContext<ZodStaffModelType>();

  useFieldArray({
    control: control,
    name: "teacherPraiseOrCriticisms",
  });

  const isReadOnly = mode === Mode.VIEW;

  return (
    <CollapsibleCard title="ការសរសើរ​ / ស្តីបន្ទោស">
      <DynamicInputGrid
        isSubmitting={isSubmitting || isReadOnly}
        labels={[
          "ប្រភេទនៃការសរសើរ/ការស្តីបន្ទោស/ទទួលអធិការកិច្ច​",
          "ផ្តល់ដោយ",
          "កាលបរិច្ឆេទទទួល",
        ]}
        fields={[
          {
            name: "typePraiseOrCriticism",
            type: "text",
            placeholder: "ប្រភេទ",
          },
          {
            name: "giveBy",
            type: "text",
            placeholder: "ផ្តល់ដោយ", // Textarea not yet supported directly
          },
          {
            name: "dateAccepted",
            type: "date",
            placeholder: "កាលបរិច្ឆេទទទួល",
          },
        ]}
        defaultRows={2}
        namePrefix="teacherPraiseOrCriticisms"
      />
    </CollapsibleCard>
  );
}
