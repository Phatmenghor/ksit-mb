"use client";
import CollapsibleCard from "@/components/shared/collapsibleCard";
import DynamicInputGrid from "@/components/shared/dynamicInputGrid";
import React from "react";

export default function ShortCourseForm() {
  return (
    <CollapsibleCard title="វគ្គខ្លីៗ">
      <DynamicInputGrid
        labels={[
          "ផ្នែក",
          "ឈ្មោះជំនាញ",
          "ផ្នែក",
          "ថ្ងៃចាប់ផ្តើម",
          "ថ្ងៃបញ្ចប់",
          "រយៈពេល",
          "គាំទ្រដោយ",
        ]}
        fields={[
          {
            name: "type",
            type: "text",
            placeholder: "ផ្នែក",
          },
          {
            name: "description",
            type: "text",
            placeholder: "ឈ្មោះជំនាញ",
          },
          {
            name: "decreeNumber",
            type: "text",
            placeholder: "ផ្នែក",
          },
          {
            name: "receivedDate",
            type: "date",
            placeholder: "ថ្ងៃចាប់ផ្តើម",
          },
          {
            name: "description",
            type: "date",
            placeholder: "ថ្ងៃបញ្ចប់",
          },
          {
            name: "description",
            type: "text",
            placeholder: "រយៈពេល",
          },
          {
            name: "description",
            type: "text",
            placeholder: "គាំទ្រដោយ",
          },
        ]}
        defaultRows={2}
      />
    </CollapsibleCard>
  );
}
