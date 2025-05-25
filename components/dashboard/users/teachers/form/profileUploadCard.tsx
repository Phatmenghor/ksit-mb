"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, X } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { baseAPI } from "@/constants/api";
import { Input } from "@/components/ui/input";
import { uploadImageService } from "@/service/setting/image.serice";
import { UploadImage } from "@/model/setting/image-model";

export default function ProfileUploadCard() {
  // State to hold preview image URL (can be uploaded blob or server image)
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  // State to track upload status
  const [isUploading, setIsUploading] = useState(false);
  // Ref for the hidden file input (if we want to programmatically trigger it later)
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Access form context (from React Hook Form)
  const { setValue, watch } = useFormContext();
  const profileUrl = watch("profileUrl");

  /**
   * On mount or when profileUrl changes,
   * update the preview state if there's already a profile image in the form.
   */
  useEffect(() => {
    if (profileUrl) {
      setLogoPreview(profileUrl);
    }
  }, [profileUrl]);

  /**
   * Cleanup blob URLs when component unmounts or logoPreview changes.
   * This prevents memory leaks when using blob URLs.
   */
  useEffect(() => {
    return () => {
      if (logoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  /**
   * Handle file selection and upload.
   * Converts image file to base64, sends to backend,
   * and updates form state + preview on success.
   */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(",")[1];

        const payload: UploadImage = {
          base64: base64Data,
          type: file.type,
        };

        const response = await uploadImageService(payload);
        if (response?.imageUrl) {
          // Update form state
          setValue("profileUrl", response.imageUrl, { shouldValidate: true });
          // Update local preview
          setLogoPreview(response.imageUrl);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Failed to upload image", error);
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Handle removing the uploaded profile image.
   * Clears both form value and local preview.
   */
  const handleRemoveLogo = () => {
    setLogoPreview(null);
    setValue("profileUrl", "", { shouldDirty: true });
  };

  /**
   * Decide which image source to display:
   * - blob or full http(s) URL → use directly
   * - relative path → prepend base URL
   * - no image → fallback placeholder
   */
  const getImageSource = () => {
    if (!logoPreview) {
      return baseAPI.NO_IMAGE;
    }
    return logoPreview.startsWith("http") || logoPreview.startsWith("blob:")
      ? logoPreview
      : baseAPI.BASE_IMAGE + logoPreview;
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-3 flex flex-col items-center">
        <div className="relative w-24 h-24">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 overflow-hidden relative">
            {logoPreview ? (
              <>
                <img
                  src={getImageSource()}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  draggable={false}
                />
                {/* Remove (X) button overlay */}
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="absolute top-0 right-0 bg-red-500 rounded-full p-1 border-2 border-white hover:bg-red-600 transition"
                  disabled={isUploading}
                  title="Remove profile image"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </>
            ) : (
              <User className="w-10 h-10 text-gray-300" />
            )}
          </div>

          {/* Upload button overlay */}
          <label
            htmlFor="profile-upload"
            className="absolute bottom-0 right-0 bg-black rounded-full p-1 border-2 border-white cursor-pointer hover:bg-gray-800 transition"
            onClick={(e) => e.stopPropagation()}
            title="Upload profile image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
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
          </label>

          {/* Hidden file input field */}
          <Input
            id="profile-upload"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>

        <p className="text-sm font-medium">
          {logoPreview ? "Profile Image" : "Add Profile"}
        </p>
      </CardContent>
    </Card>
  );
}
