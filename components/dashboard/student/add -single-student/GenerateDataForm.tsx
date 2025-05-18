import ComboBoxClass from "@/components/shared/ComboBox/combobox-class";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ClassModel } from "@/model/master-data/class/all-class-model";
import { AddSingleStudentRequestType } from "@/model/student/add.student.zod";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

export function StudentBasicForm() {
  const [selectClass, setSelectedClass] = useState<ClassModel | null>(null);
  const {
    setValue,
    formState: { isSubmitting },
    control,
  } = useFormContext<AddSingleStudentRequestType>();

  const handleClassChange = (selectedClass: ClassModel | null) => {
    setSelectedClass(selectedClass);
    setValue("classId", selectedClass?.id as number, {
      shouldValidate: true,
    });
  };

  return (
    <Card>
      <CardContent className="p-6 w-full">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Generate data
        </h2>
        <Separator className="mb-3" />
        <div className="w-full space-y-3">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="user-name"
                className="block mb-2 text-sm font-medium"
              >
                Username <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <Input
                    id="user-name"
                    {...field}
                    placeholder="Username..."
                    disabled={isSubmitting}
                    className="bg-gray-100"
                  />
                )}
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input
                    id="password"
                    {...field}
                    type="password"
                    disabled={isSubmitting}
                    className="bg-gray-100"
                    placeholder="Password..."
                  />
                )}
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <FormField
                control={control}
                name="classId"
                render={({ field }) => (
                  <FormItem aria-disabled={isSubmitting} {...field}>
                    <FormLabel>
                      Class <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <ComboBoxClass
                        selectedClass={selectClass}
                        disabled={isSubmitting}
                        onChange={handleClassChange}
                        title="Select Class"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
