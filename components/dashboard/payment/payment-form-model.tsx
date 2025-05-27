import { ComboboxSelectMajor } from "@/components/shared/ComboBox/combobox-major";
import { YearSelector } from "@/components/shared/year-selector";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { DegreeEnum, TYPE, YearLevelEnum } from "@/constants/constant";
import { Constants } from "@/constants/text-string";
import { MajorModel } from "@/model/master-data/major/all-major-model";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { useState, useEffect } from "react";
import { Button } from "react-day-picker";
import { useForm, Form } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Type } from "lucide-react";

export const paymentFormSchema = z.object({
  item: z.string().min(1, { message: "Item is required" }),
  type: z.nativeEnum(TYPE, {
    required_error: "Type is required",
  }),
  percentage: z.number().min(1, { message: "Percentage is required" }),
  amount: z.number().min(1, { message: "Amount is required" }),
  comment: z.string().min(1, { message: "Comment is required" }),
});

// Export the type for use across your application
export type PaymentFormData = z.infer<typeof paymentFormSchema> & {
  id?: number;
  selectedMajor?: MajorModel; // Add the selected major for edit mode
};

interface PaymentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PaymentFormData) => void;
  initialData?: PaymentFormData;
  mode: "add" | "edit";
  isSubmitting?: boolean;
}

export function PaymentFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
  isSubmitting = false,
}: PaymentFormModalProps) {
  // Initialize selectedMajor with initialData.selectedMajor if available
  const [selectedMajor, setSelectedMajor] = useState<MajorModel | null>(
    initialData?.selectedMajor || null
  );
  const [isFormDirty, setIsFormDirty] = useState(false);
  const currentYear = new Date().getFullYear();

  // Initialize the form with Zod validation
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      item: "",
      type: TYPE.FREE,
      percentage: 0,
      amount: 0,
      comment: "",
    },
    mode: "onChange", // Validate on change for better UX
  });

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData && mode === "edit") {
        // Set the form values
        form.reset({
          item: initialData.item || "",
          type: initialData.type || "",
          percentage: initialData.percentage || 0,
          amount: initialData.amount || 0,
          comment: initialData.comment || "",
        });

        // Set the selected major if it was passed from the parent
        if (initialData.selectedMajor) {
          setSelectedMajor(initialData.selectedMajor);
        }
      } else {
        // Reset for add mode
        form.reset({
          item: "",
          type: TYPE.FREE,
          percentage: 0,
          amount: 0,
          comment: "",
        });
        setSelectedMajor(null);
      }
      setIsFormDirty(false);
    }
  }, [isOpen, initialData, mode, form, currentYear]);

  // Track form changes
  useEffect(() => {
    const subscription = form.watch(() =>
      setIsFormDirty(form.formState.isDirty)
    );
    return () => subscription.unsubscribe();
  }, [form]);

  // Handle close with confirmation if form is dirty
  const handleCloseModal = () => {
    if (isFormDirty) {
      // Use native confirm for simplicity, could be replaced with a custom dialog
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to close?"
      );
      if (!confirmed) return;
    }
    onClose();
  };

  // Handle form submission
  const handleSubmit = async (data: PaymentFormData) => {
    try {
      const submitData: PaymentFormData = {
        ...data,
      };

      if (mode === "edit" && initialData?.id) {
        submitData.id = initialData.id;
      }

      onSubmit(submitData);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while saving class");
    }
  };

  // Handle academy year change
  //   const handleYearChange = (year: number) => {
  //     form.setValue("academyYear", year, {
  //       shouldValidate: true,
  //       shouldDirty: true,
  //     });
  //   };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "AAdd New Record" : "Edit Record"}
          </DialogTitle>
        
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="item"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Item <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter item"
                      {...field}
                      autoFocus
                      maxLength={50}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value as TYPE)}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={TYPE.FREE}>Free</SelectItem>
                        <SelectItem value={TYPE.PAY}>Pay</SelectItem>
                        <SelectItem value={TYPE.SCHOLArSHIP}>
                          Scholarship
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            
            <FormField
              control={form.control}
              name="percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Percentage (%) <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                  <Input
                      placeholder="Enter percentage"
                      {...field}
                      autoFocus
                      maxLength={50}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Amount ($) <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                  <Input
                      placeholder="Enter amount"
                      {...field}
                      autoFocus
                      maxLength={50}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Comment  <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                  <Input
                      placeholder="Enter comment"
                      {...field}
                      autoFocus
                      maxLength={50}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6 sticky -bottom-8 z-10 bg-white py-4">
              <Button
                type="button"
                // variant="outline"
                onClick={handleCloseModal}
                disabled={isSubmitting}
              >
                Discard
              </Button>
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  !form.formState.isDirty ||
                  !form.formState.isValid
                }
                className="bg-green-900 text-white hover:bg-green-950"
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    {mode === "add" ? "Creating..." : "Updating..."}
                  </>
                ) : (
                  `${mode === "add" ? "Create" : "Update"} Class`
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
