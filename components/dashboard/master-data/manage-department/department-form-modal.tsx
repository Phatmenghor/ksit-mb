"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export interface DepartmentFormData {
  departmentCode: string;
  department: string;
  logo: File | null;
  status: string;
}

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DepartmentFormData) => void;
  initialData?: DepartmentFormData;
  mode: "add" | "edit";
}

export function DepartmentModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: DepartmentModalProps) {
  const [formData, setFormData] = useState<DepartmentFormData>({
    departmentCode: "",
    department: "",
    logo: null,
    status: "active",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof DepartmentFormData, string>>
  >({});

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData(initialData);
    } else {
      setFormData({
        departmentCode: "",
        department: "",
        logo: null,
        status: "active",
      });
    }
    setErrors({});
  }, [initialData, isOpen, mode]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof DepartmentFormData, string>> = {};

    if (!formData.departmentCode.trim())
      newErrors.departmentCode = "Department code is required";
    if (!formData.department.trim())
      newErrors.department = "Department name is required";
    if (!formData.status) newErrors.status = "Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    field: keyof DepartmentFormData,
    value: string | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      toast({
        title: `Department ${
          mode === "add" ? "added" : "updated"
        } successfully`,
        description: `Department ${formData.department} has been ${
          mode === "add" ? "added" : "updated"
        }.`,
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add Department" : "Edit Department"}
          </DialogTitle>
          <DialogDescription>
            Fill in the information below to{" "}
            {mode === "add" ? "create" : "update"} a department.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Department Code */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Department code<span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.departmentCode}
              onChange={(e) => handleChange("departmentCode", e.target.value)}
              className={errors.departmentCode ? "border-red-500" : ""}
              placeholder="Department code..."
            />
            {errors.departmentCode && (
              <p className="text-sm text-red-500">{errors.departmentCode}</p>
            )}
          </div>

          {/* Department Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Department<span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.department}
              onChange={(e) => handleChange("department", e.target.value)}
              className={errors.department ? "border-red-500" : ""}
              placeholder="Department..."
            />
            {errors.department && (
              <p className="text-sm text-red-500">{errors.department}</p>
            )}
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Logo department<span className="text-red-500">*</span>
            </label>
            <div className="border border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center">
              <div className="text-center">
                {formData.logo ? (
                  <div className="relative w-24 h-24 mx-auto">
                    <img
                      src={URL.createObjectURL(formData.logo)}
                      alt="Department logo"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <button
                      onClick={() => handleChange("logo", null)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                )}
                <input
                  type="file"
                  id="logo"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleChange("logo", e.target.files[0]);
                    }
                  }}
                />
                <label
                  htmlFor="logo"
                  className="mt-2 cursor-pointer text-blue-500 text-sm block"
                >
                  Click to upload
                </label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Discard
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
