"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Constants } from "@/constants/text-string";
import { MajorModel } from "@/model/master-data/major/all-major-model";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DegreeEnum, YearLevelEnum } from "@/constants/constant";
import { ComboboxSelectMajor } from "@/components/shared/ComboBox/combobox-major";
import { YearSelector } from "@/components/shared/year-selector";

// Define the schema once in a shared location
export const classFormSchema = z.object({
  code: z.string().min(1, { message: "Class code is required" }),
  academyYear: z.number({
    required_error: "Academy year is required",
  }),
  degree: z.nativeEnum(DegreeEnum, {
    required_error: "degree is required",
  }),
  yearLevel: z.nativeEnum(YearLevelEnum, {
    required_error: "year level is required",
  }),
  majorId: z.number().min(1, { message: "Major is required" }),
  status: z.literal(Constants.ACTIVE),
});

// Export the type for use across your application
export type ClassFormData = z.infer<typeof classFormSchema> & {
  id?: number;
};

interface ClassFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClassFormData) => void;
  initialData?: ClassFormData;
  mode: "add" | "edit";
  isSubmitting?: boolean;
}

export function ClassFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
  isSubmitting = false,
}: ClassFormModalProps) {
  const [selectedMajor, setSelectedMajor] = useState<MajorModel | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const currentYear = new Date().getFullYear();

  const form = useForm<ClassFormData>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      code: "",
      academyYear: new Date().getFullYear(),
      degree: DegreeEnum.BACHELOR,
      yearLevel: YearLevelEnum.FIRST_YEAR,
      // majorId: 0,
      status: Constants.ACTIVE,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData && mode === "edit") {
        form.reset({
          code: initialData.code || "",
          academyYear: initialData.academyYear || currentYear,
          degree: initialData.degree || DegreeEnum.BACHELOR,
          yearLevel: initialData.yearLevel || YearLevelEnum.FIRST_YEAR,
          // majorId: initialData.majorId || 0,
          status: Constants.ACTIVE,
        });
      } else {
        form.reset({
          code: "",
          academyYear: currentYear,
          degree: DegreeEnum.BACHELOR,
          yearLevel: YearLevelEnum.FIRST_YEAR,
          // majorId: 0,
          status: Constants.ACTIVE,
        });
        setSelectedMajor(null);
      }
    }
  }, [isOpen, initialData, mode, form, currentYear]);

  const handleMajorChange = (cls: MajorModel) => {
    setSelectedMajor(cls);
    form.setValue("majorId", cls.id as number, {
      shouldValidate: true,
    });
  };

  const handleSubmit = async (data: ClassFormData) => {
    setIsUploading(true);
    try {
      const submitData: ClassFormData = {
        ...data,
        status: Constants.ACTIVE,
      };

      if (mode === "edit" && initialData?.id) {
        submitData.id = initialData.id;
      }

      onSubmit(submitData);
    } catch (error) {
      toast.error("An error occurred while saving class");
    } finally {
      setIsUploading(false);
    }
  };

  const handleYearChange = (year: number) => {
    form.setValue("academyYear", year, {
      shouldValidate: true,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add Class" : "Edit Class"}
          </DialogTitle>
          <DialogDescription>
            Fill in the information below to{" "}
            {mode === "add" ? "create" : "update"} a class.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Class Code <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter class code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="majorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Major <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <ComboboxSelectMajor
                      dataSelect={selectedMajor}
                      onChangeSelected={handleMajorChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Degree <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value as DegreeEnum)
                      }
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={DegreeEnum.BACHELOR}>
                          Bachelor
                        </SelectItem>
                        <SelectItem value={DegreeEnum.ASSOCIATE}>
                          Associate
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Year Level <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={YearLevelEnum.FIRST_YEAR}>
                          Year 1
                        </SelectItem>
                        <SelectItem value={YearLevelEnum.SECOND_YEAR}>
                          Year 2
                        </SelectItem>
                        <SelectItem value={YearLevelEnum.THIRD_YEAR}>
                          Year 3
                        </SelectItem>
                        <SelectItem value={YearLevelEnum.FOURTH_YEAR}>
                          Year 4
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="academyYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Academy Year <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <YearSelector
                      value={field.value}
                      onChange={handleYearChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6 sticky -bottom-8 z-10 bg-white py-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUploading || isSubmitting}
                className="bg-green-900 text-white hover:bg-green-950"
              >
                {isUploading || isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Saving...
                  </>
                ) : (
                  "Save Class"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
