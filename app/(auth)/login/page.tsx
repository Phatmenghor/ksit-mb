"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginRequest } from "@/model/auth/auth.model";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/constants/routes";
import { FormField } from "@/components/ui/form";
import { loginService } from "@/service/auth/auth.service";

const FormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "developer@ksit.com",
      password: "developer123",
    },
  });

  const Submit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const credentials: LoginRequest = {
        username: data.username,
        password: data.password,
      };

      const response = await loginService(credentials);

      if (response) {
        toast("Login success");
        router.push(ROUTE.DASHBOARD);
      } else {
        toast("Fail to login");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Login error:", error.message);
        toast.error(error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left side with logo */}
      <div className="hidden flex-1 flex-col items-center justify-center bg-emerald-800 md:flex">
        <div className="flex flex-col items-center justify-center">
          <div className="relative mb-4 h-32 w-32">
            <Image
              src="/assets/KSIT.png"
              alt="KSIT Logo"
              fill
              className="rounded-full object-contain"
              priority
            />
          </div>
          <p className="text-center text-white">KSIT (Dashboard)</p>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex flex-1 items-center justify-center bg-white p-4">
        <Card className="w-full max-w-md border-0 p-7 shadow-md">
          <CardHeader className="space-y-1 p-0 pb-6">
            <h1 className="text-2xl font-bold">Welcome,</h1>
            <p className="text-gray-500">Please login to continue</p>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit(Submit)} className="space-y-4">
              <FormField
                control={control}
                name="username"
                render={({ field }) => (
                  <div className="space-y-1">
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Username"
                        disabled={isSubmitting}
                        className="pl-10"
                        {...field}
                        required
                      />
                    </div>
                    {errors.username && (
                      <p className="text-sm text-red-500">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <div className="space-y-1">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="Password"
                        className="pl-10"
                        {...field}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                    {errors.username && (
                      <p className="text-sm text-red-500">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-700"
              >
                {isLoading ? "Signing in..." : "Login"}
              </Button>
              <div className="flex items-center justify-between pt-2 text-sm">
                <span className="text-gray-500">
                  Forgot username or password?
                </span>
                <Link href="/help" className="text-emerald-800 hover:underline">
                  Get help!
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
