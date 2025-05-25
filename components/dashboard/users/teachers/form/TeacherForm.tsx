"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ban, Loader2, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import FormDetail from "./FormDetail";
import { ROUTE } from "@/constants/routes";
import { BasicInformationForm } from "../detail-section/TeacherBasicInfo";
import ProfileUploadCard from "./profileUploadCard";
import { StatusEnum } from "@/constants/constant";
import {
  AddStaffSchema,
  EditStaffFormData,
  EditStaffSchema,
} from "@/model/user/staff/staff.schema";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { initialStaffValues } from "@/model/user/staff/staff.request.model";

type Props = {
  mode: "Add" | "Edit"; // Form mode: Add or Edit teacher
  initialValues?: EditStaffFormData; // Optional initial values for editing
  onSubmit: (data: any) => Promise<void>; // Submit handler passed as prop
  loading: boolean; // Loading state to disable inputs or show spinner
  title: string; // Title of the form/page
  back: string | undefined; // URL or route to go back to
  onDiscard?: () => void; // Optional callback for discard/cancel action
};

export default function TeacherForm({
  initialValues,
  onSubmit,
  loading,
  title,
  mode,
  onDiscard,
  back,
}: Props) {
  // Local state to track if the form has unsaved changes (dirty)
  const [isFormDirty, setIsFormDirty] = useState(false);
  // Local state to track if the form passes validation
  const [isFormValid, setIsFormValid] = useState(false);

  // Initialize react-hook-form with validation schema depending on mode
  const methods = useForm({
    resolver: zodResolver(mode === "Add" ? AddStaffSchema : EditStaffSchema),
    defaultValues: initialStaffValues,
    mode: "onChange", // Validate on every change
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
        ...initialStaffValues,
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
      reset(initialStaffValues);
    }
  }, [initialValues, methods, mode]);

  /**
   * Disable user handler
   * Sets status field to INACTIVE and triggers form submission
   */
  const handleDisableUser = async () => {
    try {
      // Mark status as inactive and mark form as dirty
      setValue("status", StatusEnum.INACTIVE, {
        shouldDirty: true,
      });

      // Submit the form programmatically
      await handleSubmit(onSubmit)();
    } catch (error) {
      console.error("Error disabling user:", error);
    }
  };

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

  /**
   * Main form submission handler wrapping the onSubmit prop
   * with error handling
   */
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
          Loading teacher data...
        </span>
      </div>
    );
  }

  /**
   * Determine if the form can be submitted based on mode, validity, and dirty state
   * - Disables submit while submitting
   * - For edit mode: allow submit if form is valid (dirty not required)
   * - For add mode: require form to be valid and have required fields filled
   */
  const canSubmitForm = () => {
    if (isSubmitting) return false;

    if (mode === "Edit") {
      return isValid;
    }

    if (mode === "Add") {
      return (
        isFormValid ||
        (isValid &&
          !!getValues().username &&
          !!getValues().password &&
          !!getValues().identifyNumber &&
          !!getValues().departmentId)
      );
    }

    return isFormDirty && isFormValid;
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4"
        noValidate
      >
        <CardHeaderSection
          back
          title={title}
          backHref={ROUTE.USERS.TEACHERS}
          breadcrumbs={[
            { label: "Home", href: ROUTE.DASHBOARD },
            {
              label: mode === "Add" ? "Add new" : "Edit teacher",
              href: back,
            },
          ]}
        />

        {mode === "Add" && <BasicInformationForm />}
        <ProfileUploadCard />

        <div className="w-full mx-auto space-y-5">
          <FormDetail />

          <Card>
            <CardContent>
              <div className="flex justify-between items-center pt-5 gap-3">
                {/* Left side: Disable User button */}
                {mode === "Edit" && (
                  <Button
                    type="button"
                    disabled={loading || isSubmitting}
                    onClick={handleDisableUser}
                    className="flex items-center gap-2 bg-red-600 bg-opacity-30 text-red-600 hover:bg-red-700 hover:bg-opacity-40 disabled:pointer-events-none"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full">
                      <Ban size={18} strokeWidth={3} className="text-red-600" />
                    </span>
                    {isSubmitting ? "Disabling..." : "Disable User"}
                  </Button>
                )}

                {/* Right side: Discard and Save buttons */}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    disabled={isSubmitting}
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
                    {isSubmitting ? (
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
  );
}
