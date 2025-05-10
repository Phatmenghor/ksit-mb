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
import { MajorFormData } from "@/model/major/major-model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departments } from "@/constants/constant";
import { Separator } from "@/components/ui/separator";

interface MajorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MajorFormData) => void;
  initialData?: MajorFormData;
  mode: "add" | "edit";
}

const requriedElements = <span className="text-red-500">*</span>;

export function MajorModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: MajorModalProps) {
  const [formData, setFormData] = useState<MajorFormData>({
    majorCode: "",
    major: "",
    department: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof MajorFormData, string>>
  >({});

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData(initialData);
    } else {
      setFormData({
        majorCode: "",
        major: "",
        department: "",
      });
    }
    setErrors({});
  }, [initialData, isOpen, mode]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof MajorFormData, string>> = {};

    if (!formData.majorCode.trim())
      newErrors.majorCode = "Major code is required";
    if (!formData.major.trim()) newErrors.major = "Major name is required";
    if (!formData.department.trim())
      newErrors.department = "Department is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof MajorFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      toast({
        title: `Major ${mode === "add" ? "added" : "updated"} successfully`,
        description: `${formData.majorCode} - ${formData.major} has been ${
          mode === "add" ? "added" : "updated"
        }.`,
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md p-6 rounded-md shadow-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {mode === "add" ? " Add Major" : " Edit Major"}
          </DialogTitle>
        </DialogHeader>

        <Separator className="mx-6 my-2 w-full" />

        <div className="grid gap-4 mt-1">
          <div className="grid gap-2">
            <Label>Major Code {requriedElements}</Label>
            <Input
              value={formData.majorCode}
              placeholder="Enter major code"
              onChange={(e) => handleChange("majorCode", e.target.value)}
              className={`py-2 px-2 text-sm ${
                errors.majorCode ? "border-red-500" : ""
              }`}
            />
            {errors.majorCode && (
              <p className="text-sm text-red-500">{errors.majorCode}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Major Name {requriedElements}</Label>
            <Input
              value={formData.major}
              placeholder="Enter major name"
              onChange={(e) => handleChange("major", e.target.value)}
              className={`py-2 px-2 text-sm ${
                errors.major ? "border-red-500" : ""
              }`}
            />
            {errors.major && (
              <p className="text-sm text-red-500">{errors.major}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="department">Department {requriedElements}</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => handleChange("department", value)}
            >
              <SelectTrigger
                className={errors.department ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select departmnet" />
              </SelectTrigger>
              <SelectContent side="bottom" position="popper">
                {departments.map((major) => (
                  <SelectItem key={major.value} value={major.value}>
                    {major.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.department && (
              <p className="text-sm text-red-500">{errors.department}</p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={onClose}>
            Discard
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-green-900 hover:bg-green-950"
          >
            {mode === "add" ? "Save" : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
