import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type DuplicateScheduleModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DuplicateScheduleModal({
  isOpen,
  onOpenChange,
}: DuplicateScheduleModalProps) {
  const [academicYear, setAcademicYear] = useState("");
  const [classValue, setClassValue] = useState("");
  const [academicYearOpen, setAcademicYearOpen] = useState(false);
  const [classOpen, setClassOpen] = useState(false);

  const academicYears = ["2023-2024", "2024-2025", "2025-2026"];
  const classes = ["Class A", "Class B", "Class C", "Class D"];

  const handleSave = () => {
    console.log("Saving:", { academicYear, classValue });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full p-6 rounded-lg shadow-lg">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Duplicate Schedule</DialogTitle>
          <Button
            onClick={() => onOpenChange(false)}
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </Button>
        </DialogHeader>

        {/* Content */}
        <div className="space-y-6 pt-2">
          {/* Academic Year Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Academic Year <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setAcademicYearOpen(!academicYearOpen)}
                className="w-full px-3 py-2 text-left bg-gray-50 border border-gray-300 rounded-md flex items-center justify-between"
              >
                <span
                  className={academicYear ? "text-gray-900" : "text-gray-500"}
                >
                  {academicYear || "Select"}
                </span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>
              {academicYearOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {academicYears.map((year) => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => {
                        setAcademicYear(year);
                        setAcademicYearOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50"
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Class Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Class <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setClassOpen(!classOpen)}
                className="w-full px-3 py-2 text-left bg-gray-50 border border-gray-300 rounded-md flex items-center justify-between"
              >
                <span
                  className={classValue ? "text-gray-900" : "text-gray-500"}
                >
                  {classValue || "Select"}
                </span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>
              {classOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {classes.map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => {
                        setClassValue(cls);
                        setClassOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50"
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="mt-6 gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Discard
          </Button>
          <Button
            className="bg-green-900 hover:bg-green-950 text-white"
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
