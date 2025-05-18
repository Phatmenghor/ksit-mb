"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import React, { useState } from "react";
import { uploadTeacherProfileService } from "@/service/user/image.service";
import { uploadProfileRequest } from "@/model/user/stuff.request.model";

export default function ProfileUploadCard() {
  // Use useForm here instead of useFormContext
  const [base64, setBase64] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;

      const base64Data = base64String.split(",")[1];
      const payload: uploadProfileRequest = {
        base64: base64Data,
        type: file.type,
      };

      const response = await uploadTeacherProfileService(payload);

      console.log(response);

      setBase64(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-2 flex flex-col items-center">
        <div className="relative w-24 h-24 mb-3">
          <label htmlFor="profile-upload" className="cursor-pointer">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 overflow-hidden">
              {base64 ? (
                <img
                  src={base64}
                  alt="Profile Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <User className="w-10 h-10 text-gray-300" />
              )}
            </div>
            <div className="absolute bottom-0 right-0 bg-black rounded-full p-1 border-2 border-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </label>

          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <Label className="font-medium text-md">Add Profile</Label>
      </CardContent>
    </Card>
  );
}
