"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Eye, EyeOff, Save } from "lucide-react";
import { AdminChangePasswordService } from "@/service/auth/auth.service";

const schema = z
  .object({
    newPassword: z.string().min(8, "Must be 8+ chars"),
    confirmNewPassword: z.string().min(8, "Must be 8+ chars"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords must match",
    path: ["confirmNewPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function ChangePasswordModal({
  userId,
  isOpen,
  onClose,
}: {
  userId?: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const firstRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { newPassword: "", confirmNewPassword: "" },
  });

  // autofocus first field when dialog opens
  useEffect(() => {
    if (isOpen) firstRef.current?.focus();
  }, [isOpen]);

  const onSubmit = async (data: FormData) => {
    if (!userId) return toast.error("User ID missing");
    const ok = await AdminChangePasswordService({ id: userId, ...data });
    ok
      ? (toast.success("Password changed"), onClose())
      : toast.error("Change failed", ok);
  };

  const inputClasses =
    "pr-10 placeholder-gray-400 placeholder-opacity-80 text-gray-900";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Default: <strong className="text-blue-600">88889999</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* New Password */}
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative mt-1">
              <Controller
                control={control}
                name="newPassword"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="newPassword"
                    type={show1 ? "text" : "password"}
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    className={inputClasses}
                    ref={firstRef}
                  />
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 mr-2 text-gray-500"
                onClick={() => setShow1((v) => !v)}
                aria-label={show1 ? "Hide password" : "Show password"}
              >
                {show1 ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </Button>
            </div>
            {errors.newPassword && (
              <p className="text-sm text-destructive">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <Separator />

          {/* Confirm New Password */}
          <div>
            <Label htmlFor="confirmNewPassword">Confirm Password</Label>
            <div className="relative mt-1">
              <Controller
                control={control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="confirmNewPassword"
                    type={show2 ? "text" : "password"}
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    className={inputClasses}
                  />
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 mr-2 text-gray-500"
                onClick={() => setShow2((v) => !v)}
                aria-label={show2 ? "Hide password" : "Show password"}
              >
                {show2 ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </Button>
            </div>
            {errors.confirmNewPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              <Save className="h-4 w-4" /> Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
