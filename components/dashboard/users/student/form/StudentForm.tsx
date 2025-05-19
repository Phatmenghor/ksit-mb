"use client";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ban, Loader2, Save } from "lucide-react";
import { ZodStaffModelType } from "@/model/user/staff/schema";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { ROUTE } from "@/constants/routes";
import { useEffect } from "react";
import { Mode, StatusEnum } from "@/constants/constant";
import { StudentBasicForm } from "../add -single-student/StuBasicForm";
import StudentProfileUploadCard from "../add -single-student/StuProfileUploadCard";
import StudentFormDetail from "./StudentFormDetail";
import { StudentModel } from "@/model/user/student/student.model";
import {
  initStudentFormData,
  StudentFormData,
} from "@/model/user/student/add.student.zod";

type Props = {
  initialValues?: StudentFormData;
  onSubmit: (data: StudentFormData) => Promise<void>;
  loading: boolean;
  title: string;
  mode: Mode;
  back: string | undefined;
  onDiscard?: () => void;
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
  const methods = useForm<StudentFormData>({
    defaultValues: initialValues ?? initStudentFormData,
  });

  const {
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (initialValues) {
      methods.reset(initialValues);
    }
  }, [initialValues, methods]);

  return (
    <div className="space-y-6">
      {!initialValues && (mode === Mode.EDIT || mode === Mode.VIEW) ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">
            Loading teacher data...
          </span>
        </div>
      ) : (
        <FormProvider {...methods}>
          {mode === Mode.VIEW ? (
            // VIEW MODE: read-only, no form, no submit
            <div className="space-y-4">
              <CardHeaderSection
                title={title}
                backHref={ROUTE.STUDENTS.LIST}
                breadcrumbs={[
                  { label: "Dashboard", href: ROUTE.DASHBOARD },
                  { label: "Add Student", href: ROUTE.STUDENTS.ADD_SINGLE },
                ]}
              />
              <StudentBasicForm mode={mode} />
              <StudentProfileUploadCard mode={mode} />
              <StudentFormDetail />
            </div>
          ) : (
            // EDIT / ADD MODE: form with submit
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
            >
              <CardHeaderSection
                title="Add New Student"
                backHref={ROUTE.STUDENTS.LIST}
                breadcrumbs={[
                  { label: "Dashboard", href: ROUTE.DASHBOARD },
                  { label: "Add Student", href: ROUTE.STUDENTS.ADD_SINGLE },
                ]}
              />
              {mode === Mode.ADD && <StudentBasicForm mode={mode} />}
              <StudentProfileUploadCard mode={mode} />
              <div className="w-full mx-auto space-y-5">
                <StudentFormDetail />
                <Card>
                  <CardContent>
                    <div className="flex justify-between items-center pt-5 gap-3">
                      {/* Left side: Disable User button */}
                      {mode === Mode.EDIT && (
                        <Button
                          type="submit"
                          disabled={loading || isSubmitting}
                          onClick={() =>
                            setValue("status", StatusEnum.INACTIVE)
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

                      {/* Right side: Discard and Save buttons */}
                      <div className="flex gap-3">
                        <Button
                          type="button"
                          disabled={loading || isSubmitting}
                          variant="outline"
                          onClick={onDiscard}
                        >
                          Discard
                        </Button>
                        <Button
                          type="submit"
                          className="bg-emerald-800 hover:bg-emerald-900"
                          disabled={loading || isSubmitting}
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
          )}
        </FormProvider>
      )}
    </div>
  );
}
