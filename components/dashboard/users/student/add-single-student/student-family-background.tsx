"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext, Controller } from "react-hook-form";
import StudentSibling from "./student-sibling";
import CollapsibleCard from "@/components/shared/collapsibleCard";

export default function StudentFamilyBackgroundSection() {
  const {
    control,
    formState: { isSubmitting },
    setValue,
    watch,
  } = useFormContext();

  useEffect(() => {
    // Check if studentParents is empty and initialize with father and mother entries
    const currentParents = watch("studentParents") || [];
    if (currentParents.length === 0) {
      setValue("studentParents", [
        { parentType: "FATHER" },
        { parentType: "MOTHER" },
      ]);
    }
  }, [setValue, watch]);

  return (
    <CollapsibleCard title="ព័ត៌មានគ្រួសារ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Father Section */}
        <div className="rounded-md">
          <div className="flex flex-col gap-4">
            {/* Father Name */}
            <div>
              <label
                htmlFor="fatherName"
                className="mb-1 block text-sm font-bold"
              >
                ឈ្មោះឪពុក
              </label>
              <Controller
                control={control}
                name="studentParents.0.name"
                render={({ field }) => (
                  <Input
                    id="fatherName"
                    {...field}
                    disabled={isSubmitting}
                    placeholder="ឈ្មោះពេញ..."
                    className="w-full mt-1 bg-gray-100"
                  />
                )}
              />
            </div>

            {/* Father Phone */}
            <div>
              <label
                htmlFor="fatherPhone"
                className="mb-1 block text-sm font-bold"
              >
                លេខទូរស័ព្ទ
              </label>
              <Controller
                control={control}
                name="studentParents.0.phone"
                render={({ field }) => (
                  <Input
                    id="fatherPhone"
                    {...field}
                    disabled={isSubmitting}
                    placeholder="លេខទូរស័ព្ទ..."
                    className="w-full mt-1 bg-gray-100"
                  />
                )}
              />
            </div>

            {/* Father Age */}
            <div>
              <label
                htmlFor="fatherAge"
                className="mb-1 block text-sm font-bold"
              >
                អាយុ
              </label>
              <Controller
                control={control}
                name="studentParents.0.age"
                render={({ field }) => (
                  <Input
                    id="fatherAge"
                    type="number"
                    {...field}
                    disabled={isSubmitting}
                    placeholder="អាយុ..."
                    className="w-full mt-1 bg-gray-100"
                  />
                )}
              />
            </div>

            {/* Father Job */}
            <div>
              <label
                htmlFor="fatherJob"
                className="mb-1 block text-sm font-bold"
              >
                មុខរបរ
              </label>
              <Controller
                control={control}
                name="studentParents.0.job"
                render={({ field }) => (
                  <Input
                    id="fatherJob"
                    {...field}
                    disabled={isSubmitting}
                    placeholder="មុខរបរ..."
                    className="w-full mt-1 bg-gray-100"
                  />
                )}
              />
            </div>

            {/* Father Address */}
            <div className="md:col-span-2">
              <label
                htmlFor="fatherAddress"
                className="mb-1 block text-sm font-bold"
              >
                អាសយដ្ឋាន
              </label>
              <Controller
                control={control}
                name="studentParents.0.address"
                render={({ field }) => (
                  <Textarea
                    id="fatherAddress"
                    {...field}
                    disabled={isSubmitting}
                    placeholder="ភូមិ ឃុំ/សង្កាត់ ស្រុក/ខណ្ឌ ខេត្ត..."
                    className="w-full mt-1 bg-gray-100"
                  />
                )}
              />
            </div>

            {/* Hidden field for parent type */}
            <Controller
              control={control}
              name="studentParents.0.parentType"
              defaultValue="father"
              render={({ field }) => <input type="hidden" {...field} />}
            />
          </div>
        </div>

        {/* Mother Section */}
        <div className="rounded-md">
          <div className="flex flex-col gap-4">
            {/* Mother Name */}
            <div>
              <label
                htmlFor="motherName"
                className="mb-1 block text-sm font-bold"
              >
                ឈ្មោះម្តាយ
              </label>
              <Controller
                control={control}
                name="studentParents.1.name"
                render={({ field }) => (
                  <Input
                    id="motherName"
                    {...field}
                    disabled={isSubmitting}
                    placeholder="ឈ្មោះពេញ..."
                    className="w-full mt-1 bg-gray-100"
                  />
                )}
              />
            </div>

            {/* Mother Phone */}
            <div>
              <label
                htmlFor="motherPhone"
                className="mb-1 block text-sm font-bold"
              >
                លេខទូរស័ព្ទ
              </label>
              <Controller
                control={control}
                name="studentParents.1.phone"
                render={({ field }) => (
                  <Input
                    id="motherPhone"
                    {...field}
                    disabled={isSubmitting}
                    placeholder="លេខទូរស័ព្ទ..."
                    className="w-full mt-1 bg-gray-100"
                  />
                )}
              />
            </div>

            {/* Mother Age */}
            <div>
              <label
                htmlFor="motherAge"
                className="mb-1 block text-sm font-bold"
              >
                អាយុ
              </label>
              <Controller
                control={control}
                name="studentParents.1.age"
                render={({ field }) => (
                  <Input
                    id="motherAge"
                    type="number"
                    {...field}
                    disabled={isSubmitting}
                    placeholder="អាយុ..."
                    className="w-full mt-1 bg-gray-100"
                  />
                )}
              />
            </div>

            {/* Mother Job */}
            <div>
              <label
                htmlFor="motherJob"
                className="mb-1 block text-sm font-bold"
              >
                មុខរបរ
              </label>
              <Controller
                control={control}
                name="studentParents.1.job"
                render={({ field }) => (
                  <Input
                    id="motherJob"
                    {...field}
                    disabled={isSubmitting}
                    placeholder="មុខរបរ..."
                    className="w-full mt-1 bg-gray-100"
                  />
                )}
              />
            </div>

            {/* Mother Address */}
            <div className="md:col-span-2">
              <label
                htmlFor="motherAddress"
                className="mb-1 block text-sm font-bold"
              >
                អាសយដ្ឋាន
              </label>
              <Controller
                control={control}
                name="studentParents.1.address"
                render={({ field }) => (
                  <Textarea
                    id="motherAddress"
                    {...field}
                    disabled={isSubmitting}
                    placeholder="ភូមិ ឃុំ/សង្កាត់ ស្រុក/ខណ្ឌ ខេត្ត..."
                    className="w-full mt-1 bg-gray-100"
                  />
                )}
              />
            </div>

            {/* Hidden field for parent type */}
            <Controller
              control={control}
              name="studentParents.1.parentType"
              defaultValue="mother"
              render={({ field }) => <input type="hidden" {...field} />}
            />
          </div>
        </div>
      </div>

      {/* Siblings Section */}
      <StudentSibling />
    </CollapsibleCard>
  );
}
