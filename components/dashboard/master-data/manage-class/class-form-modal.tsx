"use client";

import { useState, useEffect } from "react";
// Remove X import if it's not used elsewhere
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ClassFormData } from "@/model/class/class-model";
import { majors, degrees, years, yearLevels } from "@/constants/constant";

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClassFormData) => void;
  initialData?: ClassFormData;
  mode: "add" | "edit";
}

export function ClassModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: ClassModalProps) {
  const [formData, setFormData] = useState<ClassFormData>({
    classCode: "",
    major: "",
    degree: "",
    yearLevel: "",
    academicYear: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ClassFormData, string>>
  >({});

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData(initialData);
    } else {
      // Reset form when opening in add mode
      setFormData({
        classCode: "",
        major: "",
        degree: "",
        yearLevel: "",
        academicYear: "",
      });
    }
    // Reset errors when modal opens/closes
    setErrors({});
  }, [initialData, isOpen, mode]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ClassFormData, string>> = {};

    if (!formData.classCode.trim()) {
      newErrors.classCode = "Class code is required";
    }

    if (!formData.major) {
      newErrors.major = "Major is required";
    }

    if (!formData.degree) {
      newErrors.degree = "Degree is required";
    }

    if (!formData.yearLevel) {
      newErrors.yearLevel = "Year level is required";
    }

    if (!formData.academicYear) {
      newErrors.academicYear = "Academic year is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      toast({
        title: `Class ${mode === "add" ? "added" : "updated"} successfully`,
        description: `Class ${formData.classCode} has been ${
          mode === "add" ? "added" : "updated"
        }.`,
      });
      onClose();
    }
  };

  const handleChange = (field: keyof ClassFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Class" : "Edit Class"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="classCode">Class Code</Label>
            <Input
              id="classCode"
              value={formData.classCode}
              onChange={(e) => handleChange("classCode", e.target.value)}
              placeholder="Enter class code"
              className={errors.classCode ? "border-red-500" : ""}
            />
            {errors.classCode && (
              <p className="text-sm text-red-500">{errors.classCode}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="major">Major</Label>
            <Select
              value={formData.major}
              onValueChange={(value) => handleChange("major", value)}
            >
              <SelectTrigger className={errors.major ? "border-red-500" : ""}>
                <SelectValue placeholder="Select major" />
              </SelectTrigger>
              <SelectContent>
                {majors.map((major) => (
                  <SelectItem key={major.value} value={major.value}>
                    {major.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.major && (
              <p className="text-sm text-red-500">{errors.major}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="degree">Degree</Label>
            <Select
              value={formData.degree}
              onValueChange={(value) => handleChange("degree", value)}
            >
              <SelectTrigger className={errors.degree ? "border-red-500" : ""}>
                <SelectValue placeholder="Select degree" />
              </SelectTrigger>
              <SelectContent>
                {degrees.map((degree) => (
                  <SelectItem key={degree.value} value={degree.value}>
                    {degree.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.degree && (
              <p className="text-sm text-red-500">{errors.degree}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="yearLevel">Year Level</Label>
            <Select
              value={formData.yearLevel}
              onValueChange={(value) => handleChange("yearLevel", value)}
            >
              <SelectTrigger
                className={errors.yearLevel ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select year level" />
              </SelectTrigger>
              <SelectContent>
                {yearLevels.map((year) => (
                  <SelectItem key={year.value} value={year.value.toString()}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.yearLevel && (
              <p className="text-sm text-red-500">{errors.yearLevel}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="academicYear">Academic Year</Label>
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Add Class" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
