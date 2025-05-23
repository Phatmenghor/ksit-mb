import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Save } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { AdminChangePasswordService } from "@/service/auth/auth.service";

const UserPasswordFormSchema = z
  .object({
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmNewPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords must match",
    path: ["confirmNewPassword"],
  });

type Props = {
  userId: number | undefined;
  onClose: () => void;
  isOpen: boolean;
};

type formData = z.infer<typeof UserPasswordFormSchema>;

export default function ChangePasswordModal({
  userId,
  onClose,
  isOpen,
}: Props) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formData>({
    resolver: zodResolver(UserPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // Handle form submission
  const handleChangeUserPassword = async (data: formData) => {
    if (!userId) {
      toast.error("User ID is required.");
      return;
    }
    const newUserPassword = {
      id: userId,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    };

    const response = await AdminChangePasswordService(newUserPassword);
    if (response) {
      toast.success("User password changed successfully.");
      onClose();
    } else {
      toast.error("Failed to change password.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="z-50">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Please enter your new password and confirm it below.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(handleChangeUserPassword)}
            className="space-y-6"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="newPassword">New Password</Label>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="px-0 text-xs"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? "Hide" : "Show"}
                </Button>
              </div>
              <Controller
                control={control}
                name="newPassword"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="placeholder-gray-500 focus:outline-none"
                    disabled={isSubmitting}
                  />
                )}
              />
              {errors.newPassword && (
                <p className="text-sm text-destructive">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <Separator />

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="px-0 text-xs"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </Button>
              </div>
              <Controller
                control={control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="confirmNewPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="placeholder-gray-400 focus:outline-none"
                    disabled={isSubmitting}
                  />
                )}
              />
              {errors.confirmNewPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="gap-1" disabled={isSubmitting}>
                <Save className="h-4 w-4" />
                Update Password
              </Button>
            </div>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
}
