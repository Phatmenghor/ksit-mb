"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ban, Loader2, Save } from "lucide-react";
import { CardHeaderSection } from "@/components/shared/layout/card-header-section";
import { ROUTE } from "@/constants/routes";
import { useEffect, useState } from "react";
import { StatusEnum } from "@/constants/constant";
import { StudentBasicForm } from "../add-single-student/student-base-form";
import StudentProfileUploadCard from "../add-single-student/student-profile-upload";
import StudentFormDetail from "./student-form-detail";
import {
  AddStudentSchema,
  EditStudentFormData,
  EditStudentSchema,
} from "@/model/user/student/student.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { initStudentFormData } from "@/model/user/student/student.request.model";

type Props = {
  initialValues?: EditStudentFormData;
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
  title: string;
  mode: "Add" | "Edit";
  onDiscard: () => void;
  back?: string;
};

export default function StudentForm({
  initialValues,
  onSubmit,
  loading,
  title,
  mode,
  onDiscard,
  back,
}: Props) {
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const methods = useForm({
    resolver: zodResolver(
      mode === "Add" ? AddStudentSchema : EditStudentSchema
    ),
    defaultValues: initStudentFormData,
    mode: "onChange",
  });

  const {
    setValue,
    reset,
    getValues,
    watch,
    formState: { isSubmitting, isDirty, isValid, errors },
    handleSubmit,
  } = methods;

  useEffect(() => {
    if (initialValues && mode === "Edit") {
      reset({
        ...initStudentFormData,
        ...Object.fromEntries(
          Object.entries(initialValues).map(([key, value]) => [
            key,
            value === null ? undefined : value,
          ])
        ),
      });
    } else {
      reset(initStudentFormData);
    }
    setIsFormDirty(false);
  }, [initialValues, methods, mode]);

  useEffect(() => {
    const subscription = watch(() => {
      setIsFormDirty(isDirty);
      setIsFormValid(Object.keys(errors).length === 0 && isValid);

      console.log("Dirty:", isDirty, "Valid:", isValid, "Errors:", errors);
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const handleClosePage = () => {
    if (isFormDirty) {
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to close?"
      );
      if (!confirmed) return;
    }
    if (onDiscard) {
      onDiscard();
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  if (!initialValues && mode === "Edit") {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">
          Loading student data...
        </span>
      </div>
    );
  }

  const canSubmitForm = () => {
    if (isSubmitting) return false;

    if (mode === "Edit") {
      return isValid;
    }

    if (mode === "Add") {
      return (
        isFormValid ||
        (!!getValues().username &&
          !!getValues().password &&
          !!getValues().classId)
      );
    }

    return isFormDirty && isFormValid;
  };

  return (
    <div className="space-y-6">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4"
          noValidate
        >
          <CardHeaderSection
            back
            title={title}
            backHref={back ?? ROUTE.STUDENTS.LIST}
            breadcrumbs={[{ label: "Dashboard", href: ROUTE.DASHBOARD }]}
          />
          {mode === "Add" && <StudentBasicForm />}
          <StudentProfileUploadCard />
          <div className="w-full mx-auto space-y-5">
            <StudentFormDetail />
            <Card>
              <CardContent>
                <div className="flex justify-between items-center pt-5 gap-3">
                  {mode === "Edit" && (
                    <Button
                      type="submit"
                      disabled={loading || isSubmitting}
                      onClick={() =>
                        setValue("status", StatusEnum.INACTIVE as any)
                      }
                      className="flex items-center gap-2 bg-red-600 bg-opacity-30 text-red-600 hover:bg-red-700 hover:bg-opacity-40 disabled:pointer-events-none"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full">
                        <Ban
                          size={18}
                          strokeWidth={3}
                          className="text-red-600"
                        />
                      </span>
                      Disable User
                    </Button>
                  )}

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      disabled={loading || isSubmitting}
                      variant="outline"
                      onClick={handleClosePage}
                    >
                      Discard
                    </Button>
                    <Button
                      type="submit"
                      className="bg-emerald-800 hover:bg-emerald-900"
                      disabled={!canSubmitForm()}
                    >
                      {loading || isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
