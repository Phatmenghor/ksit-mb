"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SemesterFormData } from "@/model/semester/semester-model";
import { years } from "@/constants/constant";

interface SemesterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SemesterFormData) => void;
  initialData?: SemesterFormData;
  mode: "add" | "edit";
}

export function SemesterModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: SemesterModalProps) {
  const [formData, setFormData] = useState<SemesterFormData>({
    Semester: 1,
    startSemester: "",
    endSemester: "",
    academicYear: "",
    status: "active",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SemesterFormData, string>>
  >({});

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData(initialData);
    } else {
      setFormData({
        Semester: 1,
        startSemester: "",
        endSemester: "",
        academicYear: "",
        status: "active",
      });
    }
    setErrors({});
  }, [initialData, isOpen, mode]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SemesterFormData, string>> = {};

    if (!formData.startSemester.trim())
      newErrors.startSemester = "Start date is required";
    if (!formData.endSemester.trim())
      newErrors.endSemester = "End date is required";
    if (!formData.academicYear.trim())
      newErrors.academicYear = "Academic year is required";
    if (!formData.status) newErrors.status = "Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    field: keyof SemesterFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      toast({
        title: `Semester ${mode === "add" ? "added" : "updated"} successfully`,
        description: `Semester ${formData.Semester} for ${
          formData.academicYear
        } has been ${mode === "add" ? "added" : "updated"}.`,
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl rounded-md px-8 py-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {mode === "add" ? "Add Semester" : "Edit Semester"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 mt-4">
          {/* Semester Number */}
          <div className="grid gap-1">
            <Label htmlFor="semester">
              Semester Number <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.Semester.toString()}
              onValueChange={(value) =>
                handleChange("Semester", parseInt(value))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select semester number" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Start Date */}
          <div className="grid gap-1">
            <Label htmlFor="startSemester">
              Start Date <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              id="startSemester"
              value={formData.startSemester}
              onChange={(e) => handleChange("startSemester", e.target.value)}
              className={errors.startSemester ? "border-red-500" : ""}
              placeholder="Select start date"
            />
            {errors.startSemester && (
              <p className="text-sm text-red-500">{errors.startSemester}</p>
            )}
          </div>

          {/* End Date */}
          <div className="grid gap-1">
            <Label htmlFor="endSemester">
              End Date <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              id="endSemester"
              value={formData.endSemester}
              onChange={(e) => handleChange("endSemester", e.target.value)}
              className={errors.endSemester ? "border-red-500" : ""}
              placeholder="Select end date"
            />
            {errors.endSemester && (
              <p className="text-sm text-red-500">{errors.endSemester}</p>
            )}
          </div>

          {/* Academic Year */}
          <div className="grid gap-1">
            <Label htmlFor="academicYear">
              Academic Year <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.academicYear}
              onValueChange={(value) => handleChange("academicYear", value)}
            >
              <SelectTrigger
                className={errors.academicYear ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select academic year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.academicYear && (
              <p className="text-sm text-red-500">{errors.academicYear}</p>
            )}
          </div>

          {/* Status */}
          <div className="grid gap-1">
            <Label htmlFor="status">
              Status <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Discard
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Save" : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
