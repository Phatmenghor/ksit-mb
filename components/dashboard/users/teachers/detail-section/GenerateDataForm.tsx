import { ComboboxSelectDepartment } from "@/components/shared/ComboBox/combobox-department";
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
import { Mode } from "@/constants/constant";
import { DepartmentModel } from "@/model/master-data/department/all-department-model";
import { ZodStaffModelType } from "@/model/user/schema";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

export function BasicInformationForm({ mode }: { mode: Mode }) {
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentModel | null>(null);
  const {
    setValue,
    formState: { isSubmitting, isDirty, errors },
    control,
  } = useFormContext<ZodStaffModelType>();

  const isReadOnly = mode === Mode.VIEW;

  const handleDepartmentChange = (department: DepartmentModel) => {
    if (isReadOnly) return;
    setSelectedDepartment(department);
    setValue("departmentId", department.id as number, {
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
                  <>
                    <Input
                      id="user-name"
                      {...field}
                      placeholder="Username..."
                      disabled={isReadOnly || isSubmitting || isDirty}
                      className="bg-gray-100"
                    />
                    {errors.username && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.username.message?.toString()}
                      </p>
                    )}
                  </>
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
                  <>
                    <Input
                      id="password"
                      {...field}
                      type="password"
                      disabled={isReadOnly || isSubmitting || isDirty}
                      className="bg-gray-100"
                      placeholder="Password..."
                    />
                    {errors.username && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.username.message?.toString()}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="identify-number"
                className="block mb-2 text-sm font-medium"
              >
                Identify number <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="identifyNumber"
                render={({ field }) => (
                  <>
                    <Input
                      id="identify-number"
                      {...field}
                      disabled={isReadOnly || isSubmitting || isDirty}
                      placeholder="-"
                      className="bg-gray-100"
                    />
                    {errors.username && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.username.message?.toString()}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <FormField
                control={control}
                name="departmentId"
                render={({ field }) => (
                  <>
                    <FormItem {...field}>
                      <FormLabel>
                        Department <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <ComboboxSelectDepartment
                          dataSelect={selectedDepartment}
                          onChangeSelected={handleDepartmentChange}
                          disabled={isSubmitting || isDirty || isReadOnly}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    {errors.username && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.username.message?.toString()}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
