import { ComboboxSelectDepartment } from "@/components/shared/ComboBox/combobox-department";
import { Button } from "@/components/ui/button";
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
import { DepartmentModel } from "@/model/master-data/department/all-department-model";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

interface GenerateDataFormProps {
  onGenerate: SubmitHandler<any>; // or more specific type
}
export function GenerateDataForm({ onGenerate }: GenerateDataFormProps) {
  const methods = useForm();

  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentModel | null>(null);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = methods;

  const handleDepartmentChange = (department: DepartmentModel) => {
    setSelectedDepartment(department);
    methods.setValue("departmentId", department.id as number, {
      shouldValidate: true,
    });
  };

  const onSubmit = (data: any) => {
    onGenerate(data); // Pass data to parent or next step
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium"
                  >
                    Username <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="username"
                    {...register("username", { required: true })}
                    placeholder="Username..."
                    disabled={isSubmitting}
                    className="bg-gray-100"
                    required
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="password"
                    type="password"
                    disabled={isSubmitting}
                    {...register("password", { required: true })}
                    className="bg-gray-100"
                    placeholder="Password..."
                    required
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label
                    htmlFor="identify-number"
                    className="block mb-2 text-sm font-medium"
                  >
                    Identify number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="identify-number"
                    disabled={isSubmitting}
                    {...register("identifyNumber", { required: true })}
                    placeholder="-"
                    className="bg-gray-100"
                    required
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <FormField
                    control={control}
                    name="departmentId"
                    render={({ field }) => (
                      <FormItem aria-disabled={isSubmitting}>
                        <FormLabel>
                          Department <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <ComboboxSelectDepartment
                            dataSelect={selectedDepartment}
                            onChangeSelected={handleDepartmentChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="bg-yellow-600 w-full hover:bg-yellow-700"
                disabled={isSubmitting}
              >
                <Plus className="mr-2 h-4 w-4" /> Generate
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
}
