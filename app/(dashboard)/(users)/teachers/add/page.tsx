"use client";
import FormDetail from "@/components/dashboard/users/teachers/add/FormDetail";
import { GenerateDataForm } from "@/components/dashboard/users/teachers/add/GenerateDataForm";
import ProfileUploadCard from "@/components/dashboard/users/teachers/add/profileUploadCard";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTE } from "@/constants/routes";
import { DepartmentModel } from "@/model/master-data/department/all-department-model";
import {
  teacherFormDefaultValues,
  TeacherFormSchema,
} from "@/model/user/schema";
import { AddStaffModel } from "@/model/user/stuff.request.model";
import { addStaffService } from "@/service/user/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddTeacherPage() {
  const [loading, setLoading] = useState(false);

  const method = useForm<AddStaffModel>({
    resolver: zodResolver(TeacherFormSchema),
    defaultValues: teacherFormDefaultValues,
  });
  const {
    setValue,
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = method;
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const onSubmit = async (data: AddStaffModel) => {
    setLoading(true);
    try {
      await addStaffService(data);
      toast.success("Teacher created successfully");
    } catch (error: any) {
      toast.error("Failed to create teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <CardHeaderSection
        title="Add Teacher"
        backHref={ROUTE.USERS.TEACHERS}
        breadcrumbs={[
          { label: "Home", href: ROUTE.DASHBOARD },
          { label: "Add new", href: ROUTE.USERS.ADD_TEACHER },
        ]}
      />
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Generate Data Card */}
          <GenerateDataForm onGenerate={() => {}} />
          {/* upload profile Card */}
          <ProfileUploadCard />

          {/* Full Form Card */}
          <div className="w-full mx-auto space-y-5">
            <FormDetail />

            {/* Footer Buttons */}
            <Card>
              <CardContent>
                <div className="flex justify-end gap-3 pt-5">
                  <Button
                    type="button"
                    disabled={isSubmitting}
                    variant="outline"
                  >
                    Discard
                  </Button>
                  <Button
                    type="submit"
                    className="bg-emerald-800 hover:bg-emerald-900"
                    disabled={isSubmitting}
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
              </CardContent>
            </Card>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
