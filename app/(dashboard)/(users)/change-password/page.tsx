"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CardHeaderSection } from "@/components/shared/layout/card-header-section";
import { ROUTE } from "@/constants/routes";
import { ChangePasswordService } from "@/service/auth/auth.service";
import { toast } from "sonner";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(1, "New password is required"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "New passwords do not match",
  });

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      const response = await ChangePasswordService(data);
      if (response) {
        toast.success("Password changed successfully");
        reset();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to change password");
    }
  };

  return (
    <div>
      <CardHeaderSection
        title="Account Settings"
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          {
            label: "Change Password",
            href: "",
          },
        ]}
      />
      <Card className="mt-2 p-4 space-y-2">
        <CardHeader className="p-0">
          <CardTitle className="font-medium text-base">
            Change your password
          </CardTitle>
        </CardHeader>
        <Separator className="bg-gray-300" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-2 p-0">
            <div className="space-y-1">
              <Label htmlFor="currentPassword" className="text-sm">
                Current Password *
              </Label>
              <Input
                id="currentPassword"
                placeholder="••••••••"
                type="password"
                className="h-10 text-sm placeholder:text-gray-400"
                {...register("currentPassword")}
              />
              {errors.currentPassword && (
                <p className="text-xs text-red-500">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="newPassword" className="text-sm">
                New Password *
              </Label>
              <Input
                id="newPassword"
                placeholder="••••••••"
                type="password"
                className="h-10 text-sm placeholder:text-gray-400"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="text-xs text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmNewPassword" className="text-sm">
                Confirm New Password *
              </Label>
              <Input
                id="confirmNewPassword"
                placeholder="••••••••"
                type="password"
                className="h-10 text-sm placeholder:text-gray-400"
                {...register("confirmNewPassword")}
              />
              {errors.confirmNewPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 p-0 pt-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => reset()}
              disabled={isSubmitting}
            >
              Discard
            </Button>
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Changing..." : "Change"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
