"use client";
import CollapsibleCard from "@/components/shared/collapsibleCard";
import DynamicInputGrid from "@/components/shared/dynamicInputGrid";

export default function RateForm() {
  return (
    <CollapsibleCard title="ការសរសើរ​ / ស្តីបន្ទោស">
      <DynamicInputGrid
        labels={[
          "ប្រភេទនៃការសរសើរ/ការស្តីបន្ទោស/ទទួលអធិការកិច្ច​",
          "ផ្តល់ដោយ",
          "កាលបរិច្ឆេទទទួល",
        ]}
        fields={[
          {
            name: "type",
            type: "text",
            placeholder: "ប្រភេទ",
          },
          {
            name: "description",
            type: "text",
            placeholder: "ផ្តល់ដោយ", // Textarea not yet supported directly
          },
          {
            name: "decreeNumber",
            type: "date",
            placeholder: "កាលបរិច្ឆេទទទួល",
          },
        ]}
        defaultRows={2}
      />
    </CollapsibleCard>
  );
}
