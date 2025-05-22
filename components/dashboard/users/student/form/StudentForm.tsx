"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ban, Loader2, Save } from "lucide-react";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { ROUTE } from "@/constants/routes";
import { useEffect } from "react";
import { Mode, StatusEnum } from "@/constants/constant";
import { StudentBasicForm } from "../add -single-student/StuBasicForm";
import StudentProfileUploadCard from "../add -single-student/StuProfileUploadCard";
import StudentFormDetail from "./StudentFormDetail";
import {
  AddStudentFormData,
  EditStudentFormData,
  initStudentFormData,
} from "@/model/user/student/add-edit.student.zod";

type Props = {
  initialValues: AddStudentFormData | EditStudentFormData;
  onSubmit: (data: AddStudentFormData | EditStudentFormData) => Promise<void>;
  loading: boolean;
  title: string;
  mode: Mode;
  onDiscard: () => void;
  back?: string;
};

export default function StudentForm(props: Props) {
  const { initialValues, onSubmit, loading, title, mode, onDiscard, back } =
    props;

  const methods = useForm<AddStudentFormData | EditStudentFormData>({
    defaultValues:
      mode === Mode.EDIT
        ? (initialValues as EditStudentFormData)
        : (initStudentFormData as AddStudentFormData),
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
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            if (mode === Mode.ADD) {
              onSubmit(data as AddStudentFormData);
            } else {
              onSubmit(data as EditStudentFormData);
            }
          })}
          className="space-y-4"
          noValidate
        >
          <CardHeaderSection
            back
            title={title}
            backHref={back ?? ROUTE.STUDENTS.LIST}
            breadcrumbs={[{ label: "Dashboard", href: ROUTE.DASHBOARD }]}
          />
          {mode === Mode.ADD && <StudentBasicForm mode={mode} />}
          <StudentProfileUploadCard mode={mode} />
          <div className="w-full mx-auto space-y-5">
            <StudentFormDetail />
            <Card>
              <CardContent>
                <div className="flex justify-between items-center pt-5 gap-3">
                  {mode === Mode.EDIT && (
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
      </FormProvider>
    </div>
  );
}
