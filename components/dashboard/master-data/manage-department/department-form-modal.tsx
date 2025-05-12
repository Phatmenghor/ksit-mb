"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Upload, X, ImageIcon } from "lucide-react";
import { Constants } from "@/constants/text-string";

// Define Zod schema for department form validation
const departmentFormSchema = z.object({
  code: z.string().min(1, { message: "Department code is required" }),
  name: z.string().min(1, { message: "Department name is required" }),
  urlLogo: z.string().optional(),
  status: z.literal(Constants.ACTIVE),
});

// Type for the form data based on the Zod schema
export type DepartmentFormData = z.infer<typeof departmentFormSchema> & {
  id?: number;
};

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DepartmentFormData) => void;
  initialData?: DepartmentFormData;
  mode: "add" | "edit";
  isSubmitting?: boolean; // Add this line
}

export function DepartmentModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
  isSubmitting = false,
}: DepartmentModalProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fixed image URL as requested
  const fixedImageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToIBhiJevC0oBF4f-zvmpQSWkubyRTHVXwxA&s";

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      code: "",
      name: "",
      urlLogo: fixedImageUrl, // Set default to fixed image URL
      status: Constants.ACTIVE,
    },
  });

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData && mode === "edit") {
        form.reset({
          code: initialData.code || "",
          name: initialData.name || "",
          urlLogo: fixedImageUrl,
          status: Constants.ACTIVE,
        });

        // Always use the fixed image for preview
        setLogoPreview(fixedImageUrl);
      } else {
        form.reset({
          code: "",
          name: "",
          urlLogo: fixedImageUrl,
          status: Constants.ACTIVE,
        });
        setLogoPreview(fixedImageUrl);
      }
      setLogoFile(null);
    }
  }, [isOpen, initialData, mode, form]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("File must be an image");
      return;
    }

    setLogoFile(file);

    // For now, always use the fixed image
    setLogoPreview(fixedImageUrl);
  };

  // Handle form submission
  const handleSubmit = async (data: DepartmentFormData) => {
    setIsUploading(true);

    try {
      // Always use the fixed image URL for now
      const logoUrl = fixedImageUrl;

      // Submit the form data with the logo URL
      const submitData: DepartmentFormData = {
        ...data,
        urlLogo: logoUrl,
        status: Constants.ACTIVE,
      };

      // If in edit mode, include the ID
      if (mode === "edit" && initialData?.id) {
        submitData.id = initialData.id;
      }

      onSubmit(submitData);
    } catch (error) {
      toast.error("An error occurred while saving department");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle removing the logo
  const handleRemoveLogo = () => {
    // For now, even when "removing", we'll still use the fixed image
    setLogoFile(null);
    setLogoPreview(fixedImageUrl);
    form.setValue("urlLogo", fixedImageUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add Department" : "Edit Department"}
          </DialogTitle>
          <DialogDescription>
            Fill in the information below to{" "}
            {mode === "add" ? "create" : "update"} a department.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-4"
          >
            {/* Department Code */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Department Code <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter department code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Department Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Department Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter department name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Logo Upload */}
            <div className="space-y-2">
              <FormLabel>Department Logo</FormLabel>
              <div className="border border-dashed border-gray-300 rounded-md p-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="relative w-24 h-24">
                    <img
                      src={fixedImageUrl}
                      alt="Department logo"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={handleRemoveLogo}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-center">
                    <label
                      htmlFor="logo-upload"
                      className="cursor-pointer px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 flex items-center"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    PNG, JPG or GIF up to 2MB
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6 sticky -bottom-8 z-10 bg-white py-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUploading || isSubmitting}
                className="bg-green-900 text-white hover:bg-green-950"
              >
                {isUploading || isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Saving...
                  </>
                ) : (
                  "Save Department"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
