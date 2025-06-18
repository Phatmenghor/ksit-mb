"use client";
import { Constants } from "@/constants/text-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RoleEnum, StatusEnum } from "@/constants/constant";
import {
  AdminFormData,
  AdminFormSchema,
} from "@/model/user/staff/staff.schema";
import { StaffModel } from "@/model/user/staff/staff.respond.model";
import ProfileUploadCard from "../teachers/form/profileUploadCard";
import { ExtendedAdminFormData } from "@/app/(dashboard)/profile/admin/edit/page";

interface AdminFormProps {
  onSubmit: (data: AdminFormData) => void;
  onCancel?: () => void;
  initialData: ExtendedAdminFormData | null;
  isSubmitting?: boolean;
}

export default function AdminForm({
  onSubmit,
  onCancel,
  initialData,
  isSubmitting = false,
}: AdminFormProps) {
  // Initialize selectedAdmin with initialData.selectedAdmin
  const [selectedAdmin, setSelectedAdmin] = useState<StaffModel | null>(
    initialData?.selectedStaff || null
  );
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Initialize the form with Zod validation
  const form = useForm<ExtendedAdminFormData>({
    resolver: zodResolver(AdminFormSchema),
    defaultValues: {
      id: initialData?.id || 0,
      username: initialData?.username || "",
      email: initialData?.email || "",
      first_name: initialData?.first_name || "",
      last_name: initialData?.last_name || "",
      password: "",
      confirmPassword: "",
      profileUrl: "",
      status: Constants.ACTIVE,
      roles: [RoleEnum.ADMIN],
    },
    mode: "onChange",
  });

  // Reset form when initialData changes
  useEffect(() => {
    // Set the form values for edit mode
    form.reset({
      id: initialData?.id || 0,
      username: initialData?.username || "",
      email: initialData?.email || "",
      first_name: initialData?.first_name || "",
      last_name: initialData?.last_name || "",
      status: Constants.ACTIVE,
      roles: [RoleEnum.ADMIN],
    });

    // Set the selected admin
    if (initialData?.selectedStaff) {
      setSelectedAdmin(initialData?.selectedStaff);
    }

    setIsFormDirty(false);
    setIsFormValid(false);
  }, [initialData, form]);

  // Track form changes
  useEffect(() => {
    const subscription = form.watch(() => {
      // Update form state based on validation
      setIsFormDirty(form.formState.isDirty);
      setIsFormValid(
        Object.keys(form.formState.errors).length === 0 &&
          form.formState.isValid
      );

      console.log(
        "Dirty:",
        form.formState.isDirty,
        "Valid:",
        form.formState.isValid,
        "Errors:",
        form.formState.errors
      );
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Handle cancel with confirmation if form is dirty
  const handleCancel = () => {
    if (isFormDirty) {
      // Use native confirm for simplicity, could be replaced with a custom dialog
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to cancel?"
      );
      if (!confirmed) return;
    }
    if (onCancel) {
      onCancel();
    }
  };

  // Handle form submission
  const handleSubmit = async (data: AdminFormData) => {
    try {
      const submitData: any = {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email: data.email,
        status: Constants.ACTIVE,
        roles: [RoleEnum.ADMIN],
      };

      if (initialData?.id) {
        submitData.id = initialData?.id;
      }

      onSubmit(submitData);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while saving profile");
    }
  };

  // Determine if the form can be submitted
  const canSubmitForm = () => {
    if (isSubmitting) return false;

    // Allow submission if the form is valid, even if not dirty
    return (
      isFormValid ||
      (form.formState.isValid &&
        !!form.getValues().first_name &&
        !!form.getValues().last_name &&
        !!form.getValues().username &&
        !!form.getValues().email)
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit your profile</CardTitle>
        <CardDescription>
          Fill in the information below to update your profile.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <ProfileUploadCard />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Username <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter username"
                      maxLength={50}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      maxLength={50}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter first name"
                      autoFocus
                      maxLength={50}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Last Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter last name"
                      maxLength={50}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center pt-6 border-t">
              {/* Left side: Disable User button */}
              <div className="flex-shrink-0">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => form.setValue("status", StatusEnum.INACTIVE)}
                  className="flex items-center gap-2 bg-red-600 bg-opacity-30 text-red-600 hover:bg-red-700 hover:bg-opacity-40 disabled:pointer-events-none"
                >
                  <span className="flex items-center justify-center w-2 h-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-600"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                    </svg>
                  </span>
                  Disable User
                </Button>
              </div>

              {/* Right side: Cancel and Submit buttons */}
              <div className="flex space-x-4 ml-auto">
                {onCancel && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={!canSubmitForm()}
                  className="bg-green-900 text-white hover:bg-green-950"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Updating...
                    </>
                  ) : (
                    "Update Admin"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
