"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, X, Upload, Check } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { uploadImageService } from "@/service/setting/image.serice";
import { UploadImage } from "@/model/setting/image-model";
import { toast } from "sonner";

export default function AdminProfileUploadCard() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const { setValue, watch } = useFormContext();
  const profileUrl = watch("profileUrl");

  console.log("Profile:", profileUrl);
  useEffect(() => {
    if (profileUrl) {
      setLogoPreview(profileUrl);
    }
  }, [profileUrl]);

  useEffect(() => {
    return () => {
      if (logoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  const validateFile = (file: File) => {
    if (!file) {
      return "No file selected";
    }

    return null;
  };

  const processFile = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadSuccess(false);

    // Start progress simulation
    const progressInterval = simulateProgress();

    try {
      const blobUrl = URL.createObjectURL(file);
      setLogoPreview(blobUrl);
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(",")[1];

        const payload: UploadImage = {
          base64: base64Data,
          type: file.type,
        };

        const response = await uploadImageService(payload);
        console.log("Upload response:", response);
        URL.revokeObjectURL(blobUrl);

        if (response?.imageUrl) {
          // Complete progress
          setUploadProgress(100);
          clearInterval(progressInterval);

          // Update form state
          setValue("profileUrl", response.imageUrl, {
            shouldValidate: true,
            shouldDirty: true,
          });
          // Update local preview
          setLogoPreview(response.imageUrl);
          setUploadSuccess(true);

          // Reset success state after 2 seconds
          setTimeout(() => setUploadSuccess(false), 2000);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Failed to upload image", error);
      setError("Failed to upload image. Please try again.");
      clearInterval(progressInterval);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await processFile(file);
  };

  const getImageSource = () => {
    if (!logoPreview) return "/no-image.png"; // or a placeholder

    // If it's already a full URL (starts with http), use as is
    if (logoPreview.startsWith("http")) return logoPreview;

    // Otherwise, prefix with the image base URL
    return `${process.env.NEXT_PUBLIC_API_IMAGE}${logoPreview}`;
  };

  const simulateProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return interval;
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const file = files[0] as File;

    if (file) {
      await processFile(file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleRemoveLogo = () => {
    if (logoPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(logoPreview);
    }
    setLogoPreview(null);
    setValue("profileUrl", "", {
      shouldDirty: true,
      shouldValidate: true,
    });
    setError(null);
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const getUploadButtonColor = () => {
    if (isUploading) {
      return "bg-blue-500 hover:bg-blue-600";
    }
    if (uploadSuccess) {
      return "bg-green-500 hover:bg-green-600";
    }
    return "bg-blue-500 hover:bg-blue-600";
  };

  const getUploadStatusIcon = () => {
    if (isUploading) {
      return (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      );
    }
    if (uploadSuccess) {
      return <Check className="w-4 h-4 text-white" />;
    }
    return <Upload className="w-4 h-4 text-white" />;
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4 flex flex-col items-center">
        <div className="w-28 h-28 relative">
          <div
            ref={dropZoneRef}
            className={`w-full h-full rounded-full border-2 border-dashed transition-transform overflow-hidden relative flex items-center justify-center ${
              isDragOver
                ? "border-blue-400 bg-blue-50 scale-105"
                : logoPreview
                ? "border-gray-200 hover:border-gray-300"
                : "border-dashed border-gray-300 bg-gray-100 hover:border-gray-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            {logoPreview ? (
              <img
                src={getImageSource()}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
                draggable={false}
              />
            ) : (
              <div className="flex flex-col items-center">
                <User className="w-10 h-10 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Click or drag</span>
              </div>
            )}

            {/* Upload Progress */}
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
                  <div className="text-xs text-white font-medium">
                    {Math.round(uploadProgress)}%
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute -bottom-3 right-1 flex gap-2">
            {logoPreview && !isUploading && (
              <button
                type="button"
                onClick={handleRemoveLogo}
                className="w-9 h-9 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg transition-colors"
                title="Remove profile image"
                aria-label="Remove profile image"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}

            <button
              type="button"
              onClick={handleClick}
              disabled={isUploading}
              className={`w-9 h-9 rounded-full flex items-center justify-center border-2 border-white shadow-lg transition-all duration-300 ${getUploadButtonColor()} ${
                isUploading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              title={
                isUploading
                  ? "Uploading..."
                  : uploadSuccess
                  ? "Upload successful!"
                  : "Upload profile image"
              }
              aria-label="Upload profile image"
            >
              {getUploadStatusIcon()}
            </button>
          </div>
        </div>

        <p className="text-sm font-medium">
          {logoPreview ? "" : "Add Profile"}
        </p>
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

        <Input
          id="admin-profile-upload"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
      </CardContent>
    </Card>
  );
}
