"use client";
import CollapsibleCard from "@/components/shared/collapsibleCard";
import DynamicInputGrid from "@/components/shared/dynamicInputGrid";
import React from "react";

export default function LanguageForm() {
  return (
    <CollapsibleCard title="ភាសាបរទេស">
      <DynamicInputGrid
        labels={["ភាសា", "ការអាន", "ការសរសេរ", "ការសន្ទនា"]}
        fields={[
          {
            name: "type",
            type: "text",
            placeholder: "ភាសា",
          },
          {
            name: "description",
            type: "text",
            placeholder: "ការអាន",
          },
          {
            name: "decreeNumber",
            type: "text",
            placeholder: "ការសរសេរ",
          },
          {
            name: "receivedDate",
            type: "text",
            placeholder: "ការសន្ទនា",
          },
        ]}
        defaultRows={2}
      />
    </CollapsibleCard>
  );
}
