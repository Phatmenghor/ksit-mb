"use client";
import ComboBoxClass from "@/components/shared/ComboBox/combobox-class";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { StatusEnum } from "@/constants/constant";
import { GenerateMultipleStudent } from "@/model/student/student.model";
import {
  generateMultipleStudentSchema,
  GenerateMultipleStudentSchema,
} from "@/model/student/student.zod.validate";
import { generateMultipleStudentService } from "@/service/student/student.service";
import { exportStudentsToExcel } from "@/utils/excel/Excel-Generate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function GenerateMultiStudentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<GenerateMultipleStudentSchema>({
    resolver: zodResolver(generateMultipleStudentSchema),
    defaultValues: {
      classId: undefined,
      quantity: "",
      status: StatusEnum.ACTIVE,
    },
  });

  const onSubmitStudent = async (data: GenerateMultipleStudentSchema) => {
    setIsLoading(true);
    try {
      if (!data.classId || !data.classId.id) {
        toast.error("Please select a valid class.");
        setIsLoading(false);
        return;
      }

      const payload: GenerateMultipleStudent = {
        classId: Number(data.classId.id),
        quantity: Number(data.quantity),
        status: StatusEnum.ACTIVE,
      };

      const response = await generateMultipleStudentService(payload);

      await exportStudentsToExcel(
        response?.data ?? [],
        "generated_students.xlsx"
      );
      toast.success("Student generated successfully");
    } catch (error) {
      toast.error("Failed to generate student");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitStudent)} className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-lg font-bold">
                Generate Multiple Students
              </h2>
              <Separator />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quantity */}
              <div>
                <label
                  htmlFor="quantity"
                  className="mb-2 block text-sm font-medium"
                >
                  Quantity <span className="text-red-500">*</span>
                </label>
                <Controller
                  control={control}
                  name="quantity"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="quantity"
                      type="number"
                      inputMode="numeric"
                      min={1}
                      disabled={isSubmitting}
                      placeholder="Enter number of students to generate"
                    />
                  )}
                />
                {errors.quantity?.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              {/* Class */}
              <div>
                <label
                  htmlFor="classId"
                  className="mb-2 block text-sm font-medium"
                >
                  Class <span className="text-red-500">*</span>
                </label>
                <Controller
                  control={control}
                  name="classId"
                  render={({ field }) => (
                    <ComboBoxClass
                      disabled={isSubmitting}
                      selectedClass={field.value as any} // Ensure field.value is a full ClassModel object
                      onChange={(selected) => field.onChange(selected)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Submit Actions */}
      <Card>
        <CardContent className="pt-4 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
            onClick={() => {
              // Optional: reset form or navigate
            }}
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Discard
          </Button>
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Generate
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
