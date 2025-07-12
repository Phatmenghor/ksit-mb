"use client";
import { Constants } from "@/constants/text-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { RoleEnum, StatusEnum } from "@/constants/constant";
import {
  AdminFormData,
  AdminFormSchema,
} from "@/model/user/staff/staff.schema";
import { StaffModel } from "@/model/user/staff/staff.respond.model";
import { cleanField, cleanRequiredField } from "@/utils/map-helper/student";
import { useIsMobile } from "@/hooks/use-mobile";

interface AdminFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminFormData) => void;
  initialData?: AdminFormData | null;
  mode: "add" | "edit";
  isSubmitting?: boolean;
}

export default function AdminModalForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
  isSubmitting = false,
}: AdminFormModalProps) {
  // Initialize selectedAdmin with initialData.selectedAdmin if available
  const [selectedAdmin, setSelectedAdmin] = useState<StaffModel | null>(
    initialData?.selectedStaff || null
  );
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const isMobile = useIsMobile();
  // Initialize the form with Zod validation
  const form = useForm<AdminFormData>({
    resolver: zodResolver(AdminFormSchema),
    defaultValues: {
      id: initialData?.id || 0,
      username: initialData?.username || "",
      email: initialData?.email || "",
      first_name: initialData?.first_name || "",
      last_name: initialData?.last_name || "",
      password: "",
      confirmPassword: "",
      status: Constants.ACTIVE,
      roles: [RoleEnum.ADMIN],
    },
    mode: "onChange",
  });

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData && mode === "edit") {
        // Set the form values
        form.reset({
          id: initialData.id || 0,
          username: initialData.username || "",
          email: initialData.email || "",
          first_name: initialData.first_name || "",
          last_name: initialData.last_name || "",
          status: Constants.ACTIVE,
          roles: [RoleEnum.ADMIN],
        });

        // Set the selected admin if it was passed from the parent
        if (initialData.selectedStaff) {
          setSelectedAdmin(initialData.selectedStaff);
        }
      } else {
        // Reset for add mode
        form.reset({
          id: 0,
          username: "",
          email: "",
          first_name: "",
          last_name: "",
          password: "",
          confirmPassword: "",
          status: Constants.ACTIVE,
          roles: [RoleEnum.ADMIN],
        });
        setSelectedAdmin(null);
      }
      setIsFormDirty(false);
      setIsFormValid(false);
    }
  }, [isOpen, initialData, mode, form]);

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

  // Handle close with confirmation if form is dirty
  const handleCloseModal = () => {
    form.reset({
      id: 0,
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirmPassword: "",
      status: Constants.ACTIVE,
      roles: [RoleEnum.ADMIN],
    });
    setSelectedAdmin(null);
    onClose();
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

      if (mode === "add") {
        submitData.password = (data as AdminFormData).password;

        submitData.confirmPassword = (data as AdminFormData).confirmPassword;
      }

      if (mode === "edit" && initialData?.id) {
        submitData.id = initialData.id;
      }

      console.log("##Submitting data:", submitData);

      onSubmit(submitData);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while saving admin");
    }
  };

  // Determine if the form can be submitted
  const canSubmitForm = () => {
    if (isSubmitting) return false;

    // In edit mode, we'll allow submission if the form is valid, even if not dirty
    if (mode === "edit") {
      return (
        isFormValid ||
        (form.formState.isValid &&
          !!form.getValues().first_name &&
          !!form.getValues().last_name &&
          !!form.getValues().username &&
          !!form.getValues().email)
      );
    }

    if (mode === "add") {
      return (
        isFormValid ||
        (form.formState.isValid &&
          !!form.getValues().first_name &&
          !!form.getValues().last_name &&
          !!form.getValues().username &&
          !!form.getValues().email &&
          !!form.getValues().password &&
          !!form.getValues().confirmPassword)
      );
    }

    // For add mode, ensure the form is both dirty and valid
    return isFormDirty && isFormValid;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent
        className={`max-h-[90vh] rounded-xl overflow-y-auto ${
          isMobile ? "max-w-[95vw] w-full p-4" : "max-w-lg w-full"
        }`}
      >
        <DialogHeader className={isMobile ? "text-center" : ""}>
          <DialogTitle className={isMobile ? "text-lg" : "text-xl"}>
            {mode === "add" ? "Add Admin" : "Edit Admin"}
          </DialogTitle>
          <DialogDescription className={isMobile ? "text-sm" : ""}>
            Fill in the information below to{" "}
            {mode === "add" ? "create" : "update"} admin.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className={`space-y-3 mt-4 ${isMobile ? "space-y-4" : ""}`}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={isMobile ? "text-sm font-medium" : ""}>
                    Username <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter username"
                      maxLength={50}
                      className={isMobile ? "h-12 text-base" : ""}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mode === "add" && (
              <div className={`space-y-3 ${isMobile ? "space-y-4" : ""}`}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={isMobile ? "text-sm font-medium" : ""}
                      >
                        Password <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          maxLength={50}
                          className={isMobile ? "h-12 text-base" : ""}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={isMobile ? "text-sm font-medium" : ""}
                      >
                        Confirm Password <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter confirm Password"
                          maxLength={50}
                          className={isMobile ? "h-12 text-base" : ""}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={isMobile ? "text-sm font-medium" : ""}>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      maxLength={50}
                      className={isMobile ? "h-12 text-base" : ""}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={isMobile ? "text-sm font-medium" : ""}
                    >
                      First Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter first name"
                        autoFocus
                        maxLength={50}
                        className={isMobile ? "h-12 text-base" : ""}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={isMobile ? "text-sm font-medium" : ""}
                    >
                      Last Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter last name"
                        autoFocus
                        maxLength={50}
                        className={isMobile ? "h-12 text-base" : ""}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter
              className={`bg-white w-full ${isMobile ? "mt-6" : "mt-4"}`}
            >
              <div
                className={`flex items-center w-full gap-3 ${
                  isMobile
                    ? "flex-col-reverse space-y-reverse space-y-3"
                    : "justify-between"
                }`}
              >
                {/* Disable User button */}
                {mode === "edit" && (
                  <div className={`${isMobile ? "w-full" : "flex-shrink-0"}`}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={() =>
                        form.setValue("status", StatusEnum.INACTIVE)
                      }
                      className={`flex items-center justify-center gap-2 bg-red-600 bg-opacity-30 text-red-600 hover:bg-red-700 hover:bg-opacity-40 disabled:pointer-events-none ${
                        isMobile ? "w-full h-12 text-base" : ""
                      }`}
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
                )}

                {/* Cancel and Submit buttons */}
                <div
                  className={`flex gap-3 ${
                    isMobile
                      ? "w-full"
                      : mode === "edit"
                      ? "ml-auto"
                      : "w-full justify-end"
                  }`}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseModal}
                    disabled={isSubmitting}
                    className={isMobile ? "flex-1 h-12 text-base" : ""}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!canSubmitForm()}
                    className={`bg-green-900 text-white hover:bg-green-950 ${
                      isMobile ? "flex-1 h-12 text-base" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        {mode === "add" ? "Creating..." : "Updating..."}
                      </>
                    ) : (
                      `${mode === "add" ? "Create" : "Update"} Admin`
                    )}
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
