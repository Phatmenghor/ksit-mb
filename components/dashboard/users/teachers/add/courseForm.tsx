"use client";
import CollapsibleCard from "@/components/shared/collapsibleCard";
import DynamicInputGrid from "@/components/shared/dynamicInputGrid";
import React from "react";
import { useFormContext } from "react-hook-form";

export default function VocationalForm() {
  const {
    control,
    register,
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <CollapsibleCard title="វគ្គគរុកោសល្យ">
      <DynamicInputGrid
        labels={[
          "កម្រិតវិជ្ជាជីវៈ",
          "ឧកទេសទី១",
          "ឧកទេសទី២",
          "ប្រព័ន្ធបណ្តុះបពណ្តាល",
          "ថ្ងៃខែបានទទួល",
        ]}
        fields={[
          {
            name: "type",
            type: "text",
            placeholder: "កម្រិតវិជ្ជាជីវៈ",
          },
          {
            name: "description-1",
            type: "text",
            placeholder: "ឧកទេសទី១",
          },
          {
            name: "decreeNumber",
            type: "text",
            placeholder: "ឧកទេសទី២",
          },
          {
            name: "training-system",
            type: "text",
            placeholder: "ប្រព័ន្ធបណ្តុះបពណ្តាល",
          },
          {
            name: "receivedDate",
            type: "date",
            placeholder: "ថ្ងៃខែបានទទួល",
          },
        ]}
        namePrefix="VocationalSchema"
        defaultRows={2}
      />
    </CollapsibleCard>
  );
}
