"use client";
import CollapsibleCard from "@/components/shared/collapsibleCard";
import DynamicInputGrid from "@/components/shared/dynamicInputGrid";

export default function CulturalLevelForm() {
  return (
    <CollapsibleCard title="កម្រិតវប្បធម៌">
      <DynamicInputGrid
        labels={["កម្រិតវប្បធម៌​", "ឈ្មោះជំនាញ", "កាលបរិច្ឆេទទទួល", "ប្រទេស"]}
        fields={[
          {
            name: "level",
            type: "text",
            placeholder: "កម្រិតវប្បធម៌​",
          },
          {
            name: "skillName",
            type: "text",
            placeholder: "ឈ្មោះជំនាញ", // Textarea not yet supported directly
          },
          {
            name: "getDate",
            type: "date",
            placeholder: "កាលបរិច្ឆេទទទួល",
          },
          {
            name: "country",
            type: "date",
            placeholder: "ប្រទេស",
          },
        ]}
        defaultRows={2}
      />
    </CollapsibleCard>
  );
}
