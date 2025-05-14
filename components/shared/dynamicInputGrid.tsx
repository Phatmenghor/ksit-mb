import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

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
}

export default function DynamicInputGrid({
  labels,
  fields,
  defaultRows = 1,
}: Props) {
  const [rows, setRows] = useState<Record<string, string>[]>(
    Array.from({ length: defaultRows }, () =>
      Object.fromEntries(fields.map((f) => [f.name, ""]))
    )
  );

  const handleChange = (rowIndex: number, fieldName: string, value: string) => {
    const updated = [...rows];
    updated[rowIndex][fieldName] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([...rows, Object.fromEntries(fields.map((f) => [f.name, ""]))]);
  };

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
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-4 items-center min-w-full"
          style={{
            gridTemplateColumns: `repeat(${fields.length}, minmax(200px, 1fr))`,
          }}
        >
          {fields.map((field) => (
            <div key={field.name + rowIndex} className="relative">
              <Input
                type={field.type}
                placeholder={field.placeholder}
                value={row[field.name]}
                onChange={(e) =>
                  handleChange(rowIndex, field.name, e.target.value)
                }
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
          {rows.length}
        </span>
        <Button onClick={addRow} className="bg-black text-white">
          Add Row
        </Button>
      </div>
    </div>
  );
}
