import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { Mode, StatusEnum } from "@/constants/constant";
import { EditStudentFormData } from "@/model/user/student/add-edit.student.zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import StudentProfileUploadCard from "../add-single-student/StuProfileUploadCard";
import StudentFormDetail from "./StudentFormDetail";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, Loader2, Save } from "lucide-react";
import { ROUTE } from "@/constants/routes";

type EditProps = {
  mode: Mode.EDIT;
  initialValues: EditStudentFormData;
  onSubmit: (data: EditStudentFormData) => Promise<void>;
  loading: boolean;
  title: string;
  back?: string;
  onDiscard?: () => void;
};

export function StudentFormEdit({
  initialValues,
  onSubmit,
  loading,
  title,
  mode,
  onDiscard,
  back,
}: EditProps) {
  const methods = useForm<EditStudentFormData>({
    defaultValues: initialValues,
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
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <CardHeaderSection
            title={title}
            backHref={back ?? ROUTE.STUDENTS.LIST}
            breadcrumbs={[{ label: "Dashboard", href: ROUTE.DASHBOARD }]}
          />
          <StudentProfileUploadCard mode={mode} />
          <div className="w-full mx-auto space-y-5">
            <StudentFormDetail />
            <Card>
              <CardContent>
                <div className="flex justify-between items-center pt-5 gap-3">
                  <Button
                    type="submit"
                    disabled={loading || isSubmitting}
                    onClick={() => setValue("status", StatusEnum.INACTIVE)}
                    className="flex items-center gap-2 bg-red-600 bg-opacity-30 text-red-600 hover:bg-red-700 hover:bg-opacity-40 disabled:pointer-events-none"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full">
                      <Ban size={18} strokeWidth={3} className="text-red-600" />
                    </span>
                    Disable User
                  </Button>
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
