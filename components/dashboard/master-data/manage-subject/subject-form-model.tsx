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
const subjectFormSchema = z.object({
    name: z.string().min(1, { message: "Subject name is required" }),
    status: z.literal(Constants.ACTIVE),
});
export type SubjectFormData = z.infer<typeof subjectFormSchema> & {
    id?: number,

};
interface SubjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: SubjectFormData) => void;
    initialData?: SubjectFormData;
    mode: "add" | "edit";
    isSubmitting?: boolean;
}
export function SubjectModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    mode,
    isSubmitting = false,
}: SubjectModalProps) {
   
  
    const [isUploading, setIsUploading] = useState(false);
    const form = useForm<SubjectFormData>({
        resolver: zodResolver(subjectFormSchema),
        defaultValues: {

            name: "",

            status: Constants.ACTIVE,
        },
    });
    useEffect(() => {
        if (isOpen) {
            if (initialData && mode === "edit") {
                form.reset({

                    name: initialData.name || "",

                    status: Constants.ACTIVE,
                });

            } else {
                form.reset({

                    name: "",

                    status: Constants.ACTIVE,
                });

            }
            
        }
    }, [isOpen, initialData, mode, form]);
    const handleSubmit = async (data: SubjectFormData) => {
        setIsUploading(true);
        try {
            const submitData: SubjectFormData = {
                ...data,
                status: Constants.ACTIVE,
            };
            if (mode === "edit" && initialData?.id) {
                submitData.id = initialData.id;
            }

            onSubmit(submitData);
        } catch (error) {
            toast.error("An error occurred while saving subject");
        } finally {
            setIsUploading(false);
        }
    };
  

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "add" ? "Add Subject" : "Edit Subject"}
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the information below to{" "}
                        {mode === "add" ? "create" : "update"} a subject.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Subject Name <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter subject name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                    "Save subject"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
