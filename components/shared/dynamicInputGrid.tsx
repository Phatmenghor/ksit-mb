"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";

type FieldType = "text" | "date";

interface FieldConfig {
  name: string;
  type: FieldType;
  placeholder: string;
}

interface Props {
  labels: string[];
  fields: FieldConfig[];
  defaultRows?: number;
  namePrefix: string; // e.g., 'teacherProfessionalRanks'
}

export default function DynamicInputGrid({
  labels,
  fields,
  defaultRows = 1,
  namePrefix,
}: Props) {
  const { control, register } = useFormContext();

  const { fields: arrayFields, append } = useFieldArray({
    control,
    name: namePrefix,
  });

  // Auto-initialize rows if none present
  if (arrayFields.length === 0) {
    for (let i = 0; i < defaultRows; i++) {
      append(Object.fromEntries(fields.map((f) => [f.name, ""])));
    }
  }

  return (
    <div className="border p-4 rounded-md shadow-sm space-y-4 overflow-x-auto">
      {/* Header */}
      <div
        className="grid gap-4 font-bold text-sm min-w-full"
        style={{
          gridTemplateColumns: `repeat(${fields.length}, minmax(200px, 1fr))`,
        }}
      >
        {labels.map((label, idx) => (
          <div key={idx} className="whitespace-nowrap">
            {label}
          </div>
        ))}
      </div>

      {/* Input Rows */}
      {arrayFields.map((fieldRow, rowIndex) => (
        <div
          key={fieldRow.id} // <-- unique and stable key
          className="grid gap-4 items-center min-w-full"
          style={{
            gridTemplateColumns: `repeat(${fields.length}, minmax(200px, 1fr))`,
          }}
        >
          {fields.map((field) => (
            <div key={`${field.name}-${rowIndex}`} className="relative">
              <Input
                type={field.type}
                placeholder={field.placeholder}
                {...register(`${namePrefix}.${rowIndex}.${field.name}`)}
                className="bg-gray-100 pr-10"
              />
              {field.type === "date" && (
                <CalendarIcon className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Add Row */}
      <div className="flex items-center gap-4 mt-4">
        <span className="text-sm font-medium w-24 border border-gray-300 px-4 rounded-md py-2">
          {arrayFields.length}
        </span>
        <Button
          type="button"
          onClick={() =>
            append(Object.fromEntries(fields.map((f) => [f.name, ""])))
          }
          className="bg-black text-white"
        >
          Add Row
        </Button>
      </div>
    </div>
  );
}
