"use client";
import CollapsibleCard from "@/components/shared/collapsibleCard";
import DynamicInputGrid from "@/components/shared/dynamicInputGrid";
import React from "react";

export default function CourseForm() {
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
            name: "description",
            type: "text",
            placeholder: "ឧកទេសទី១",
          },
          {
            name: "decreeNumber",
            type: "text",
            placeholder: "ឧកទេសទី២",
          },
          {
            name: "receivedDate",
            type: "text",
            placeholder: "ប្រព័ន្ធបណ្តុះបពណ្តាល",
          },
          {
            name: "receivedDate",
            type: "date",
            placeholder: "ថ្ងៃខែបានទទួល",
          },
        ]}
        defaultRows={2}
      />
    </CollapsibleCard>
  );
}
