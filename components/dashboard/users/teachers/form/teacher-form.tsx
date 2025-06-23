"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ban, Loader2, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import FormDetail from "./form-detail";
import { ROUTE } from "@/constants/routes";
import { BasicInformationForm } from "../detail-section/teacher-basic-info";
import ProfileUploadCard from "./profile-upload-card";
import { StatusEnum } from "@/constants/constant";
import {
  AddStaffSchema,
  EditStaffFormData,
  EditStaffSchema,
} from "@/model/user/staff/staff.schema";
import { CardHeaderSection } from "@/components/shared/layout/card-header-section";
import { initialStaffValues } from "@/model/user/staff/staff.request.model";

type Props = {
  mode: "Add" | "Edit";
  initialValues?: EditStaffFormData;
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
  title: string;
  back: string | undefined;
  onDiscard?: () => void;
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
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const methods = useForm({
    resolver: zodResolver(mode === "Add" ? AddStaffSchema : EditStaffSchema),
    defaultValues: initialStaffValues,
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
        ...initialStaffValues,
        ...Object.fromEntries(
          Object.entries(initialValues).map(([key, value]) => [
            key,
            value === null ? undefined : value,
          ])
        ),
      });
    } else {
      reset(initialStaffValues);
    }
  }, [initialValues, methods, mode]);

  const handleDisableUser = async () => {
    try {
      setValue("status", StatusEnum.INACTIVE, {
        shouldDirty: true,
      });

      await handleSubmit(onSubmit)();
    } catch (error) {
      console.error("Error disabling user:", error);
    }
  };

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
          Loading teacher data...
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
              href: "",
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
