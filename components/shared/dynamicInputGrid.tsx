"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";
import React, { useEffect } from "react";

type FieldType = "text" | "date" | "select";

interface FieldConfig {
  name: string;
  type: FieldType;
  placeholder: string;
  key?: string; // Optional custom key for rendering
  options?: { label: string; value: string }[]; // only for select
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
  const { control, register, getValues } = useFormContext();

  const { fields: arrayFields, append } = useFieldArray({
    control,
    name: namePrefix,
  });

  // Initialize rows once on mount
  useEffect(() => {
    const current = getValues(namePrefix);
    if (!current || current.length === 0) {
      for (let i = 0; i < defaultRows; i++) {
        append(Object.fromEntries(fields.map((f) => [f.name, ""])));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="border p-4 rounded-md shadow-sm space-y-4 overflow-x-auto">
      {/* Header */}
      <div
        className="grid gap-4 font-bold text-sm"
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

      {/* Rows */}
      {arrayFields.map((fieldRow, rowIndex) => (
        <div
          key={fieldRow.id}
          className="grid gap-4 items-center"
          style={{
            gridTemplateColumns: `repeat(${fields.length}, minmax(200px, 1fr))`,
          }}
        >
          {fields.map((field, colIndex) => {
            const inputName = `${namePrefix}.${rowIndex}.${field.name}`;
            const key = field.key ?? `${field.name}-${rowIndex}`; // fallback to name + index
            return (
              <div key={key} className="relative">
                {field.type === "select" ? (
                  <select
                    {...register(inputName)}
                    className="bg-gray-100 pr-10 rounded-md w-full py-2 px-3 border border-gray-300"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {field.placeholder}
                    </option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(inputName)}
                    className="bg-gray-100 pr-10"
                  />
                )}

                {field.type === "date" && (
                  <CalendarIcon className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Add Row Button */}
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
          បន្ថែមជួរថ្មី
        </Button>
      </div>
    </div>
  );
}
