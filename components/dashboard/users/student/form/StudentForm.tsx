"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ban, Loader2, Save } from "lucide-react";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { ROUTE } from "@/constants/routes";
import { useEffect, useState } from "react";
import { StatusEnum } from "@/constants/constant";
import { StudentBasicForm } from "../add-single-student/StuBasicForm";
import StudentProfileUploadCard from "../add-single-student/StuProfileUploadCard";
import StudentFormDetail from "./StudentFormDetail";
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

  // Initialize react-hook-form with validation schema depending on mode
  const methods = useForm({
    resolver: zodResolver(
      mode === "Add" ? AddStudentSchema : EditStudentSchema
    ),
    defaultValues: initStudentFormData,
    mode: "onChange",
  });

  // Destructure methods and form state for easier access
  const {
    setValue,
    reset,
    getValues,
    watch,
    formState: { isSubmitting, isDirty, isValid, errors },
    handleSubmit,
  } = methods;

  // Effect to reset form values when initialValues or mode changes
  useEffect(() => {
    if (initialValues && mode === "Edit") {
      // Reset form with existing values for editing
      reset({
        ...initStudentFormData,
        ...Object.fromEntries(
          // Convert null values to undefined for proper form handling
          Object.entries(initialValues).map(([key, value]) => [
            key,
            value === null ? undefined : value,
          ])
        ),
      });
    } else {
      // Reset to default values on add mode or no initialValues
      reset(initStudentFormData);
    }
    setIsFormDirty(false);
  }, [initialValues, methods, mode]);

  // Subscribe to form changes to track dirty and valid state
  useEffect(() => {
    const subscription = watch(() => {
      setIsFormDirty(isDirty);
      setIsFormValid(Object.keys(errors).length === 0 && isValid);

      // Optional debug logs for development
      console.log("Dirty:", isDirty, "Valid:", isValid, "Errors:", errors);
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  /**
   * Handler to confirm closing page if there are unsaved changes
   */
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
      // Consider showing user feedback here (toast, alert, etc.)
    }
  };

  // Show loading indicator if in edit mode but initialValues not loaded yet
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
