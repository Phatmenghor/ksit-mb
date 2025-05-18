"use client";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import { AddStaffModelType } from "@/model/user/schema";
import { GenerateDataForm } from "../add/GenerateDataForm";
import ProfileUploadCard from "./profileUploadCard";
import FormDetail from "./FormDetail";

type Props = {
  initialValues?: AddStaffModelType;
  onSubmit: (data: AddStaffModelType) => Promise<void>;
  loading: boolean;
  title: string;
  onDiscard?: () => void;
};

export default function TeacherForm({
  initialValues,
  onSubmit,
  loading,
  title,
  onDiscard,
}: Props) {
  const methods = useForm<AddStaffModelType>({
    defaultValues: initialValues || {},
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">{title}</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <GenerateDataForm />
          <ProfileUploadCard />
          <div className="w-full mx-auto space-y-5">
            <FormDetail />
            <Card>
              <CardContent>
                <div className="flex justify-end gap-3 pt-5">
                  <Button
                    type="button"
                    disabled={loading}
                    variant="outline"
                    onClick={onDiscard}
                  >
                    Discard
                  </Button>
                  <Button
                    type="submit"
                    className="bg-emerald-800 hover:bg-emerald-900"
                    disabled={loading}
                  >
                    {loading ? (
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
              </CardContent>
            </Card>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
