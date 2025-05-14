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
  labels: string[]; // Column headers
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
    <div className="border p-4 rounded-md shadow-sm space-y-4">
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 font-bold text-sm">
        {labels.map((label, idx) => (
          <div key={idx}>{label}</div>
        ))}
      </div>

      {/* Rows */}
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-4 items-center">
          {fields.map((field) => (
            <div key={field.name} className="relative">
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
        <span className="text-sm font-medium">{rows.length}</span>
        <Button onClick={addRow} className="bg-black text-white">
          Add Row
        </Button>
      </div>
    </div>
  );
}
