"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import TeachingDetailForm from "./teaching-detail-form";
import CollapsibleCard from "@/components/shared/collapsibleCard";
import DynamicInputGrid from "@/components/shared/dynamicInputGrid";

export default function EducationForm() {
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
          fields={[
            {
              name: "type",
              type: "text",
              placeholder: "ប្រភេទឋានៈវិជ្ជាជីវៈ",
            },
            {
              name: "description",
              type: "text",
              placeholder: "បរិយាយ", // Textarea not yet supported directly
            },
            {
              name: "decreeNumber",
              type: "text",
              placeholder: "ប្រកាសលេខ",
            },
            {
              name: "receivedDate",
              type: "date",
              placeholder: "mm/dd/yyyy",
            },
          ]}
          defaultRows={2}
        />

        <Separator />

        <TeachingDetailForm />
      </div>
    </CollapsibleCard>
  );
}
