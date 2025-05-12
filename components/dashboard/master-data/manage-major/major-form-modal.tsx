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
import { Separator } from "@/components/ui/separator";
import { StatusEnum } from "@/constants/constant";
import { MajorFormData, MajorModel } from "@/model/major/major-model";
import { ComboboxSelectMajor } from "./major-comboBox-select";

interface nameModalProps {
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
}: nameModalProps) {
  const [formData, setFormData] = useState<MajorFormData>({
    code: "",
    name: "",
    departmentId: 0,
    status: StatusEnum.ACTIVE,
  });
  const [selectedDepartment, setSelectedDepartment] =
    useState<MajorModel | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof MajorFormData, string>>
  >({});

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData(initialData);
    } else {
      setFormData({
        code: "",
        name: "",
        departmentId: 0,
        status: StatusEnum.ACTIVE,
      });
    }
    setErrors({});
  }, [initialData, isOpen, mode]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof MajorFormData, string>> = {};

    if (!formData.code.trim()) newErrors.code = "name code is required";
    if (!formData.name.trim()) newErrors.name = "name name is required";

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
        title: `name ${mode === "add" ? "added" : "updated"} successfully`,
        description: `${formData.code} - ${formData.name} has been ${
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
            {mode === "add" ? " Add name" : " Edit name"}
          </DialogTitle>
        </DialogHeader>

        <Separator className="mx-6 my-2 w-full" />

        <div className="grid gap-4 mt-1">
          <div className="grid gap-2">
            <Label>name Code {requriedElements}</Label>
            <Input
              value={formData.code}
              placeholder="Enter name code"
              onChange={(e) => handleChange("code", e.target.value)}
              className={`py-2 px-2 text-sm ${
                errors.code ? "border-red-500" : ""
              }`}
            />
            {errors.code && (
              <p className="text-sm text-red-500">{errors.code}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Name {requriedElements}</Label>
            <Input
              value={formData.name}
              placeholder="Enter name name"
              onChange={(e) => handleChange("name", e.target.value)}
              className={`py-2 px-2 text-sm ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Department {requriedElements}</Label>
            <ComboboxSelectMajor
              dataSelect={selectedDepartment}
              onChangeSelected={(selected) =>
                handleChange("departmentId", selected.name || "")
              }
            />

            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Discard
          </Button>
          <Button
            type="submit"
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
