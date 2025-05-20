"use client";
import CollapsibleCard from "@/components/shared/collapsibleCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { GenderEnum } from "@/constants/constant";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function StudentPersonalDetailSection() {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <CollapsibleCard title="ប្រវត្តិផ្ទាល់">
      <div className="grid mb-7 grid-cols-1 gap-6 md:grid-cols-2">
        {/* Khmer Full Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="khmer-full-name" className="text-sm font-bold">
            នាមត្រកូល និងនាមខ្លួន
          </label>
          <div className="flex gap-2" id="khmer-full-name">
            <Controller
              control={control}
              name="khmerFirstName"
              render={({ field }) => (
                <Input
                  id="khmerFirstName"
                  {...field}
                  placeholder="នាមត្រកូល..."
                  disabled={isSubmitting}
                  className="w-1/2 bg-gray-100"
                />
              )}
            />
            <Controller
              control={control}
              name="khmerLastName"
              render={({ field }) => (
                <Input
                  {...field}
                  disabled={isSubmitting}
                  placeholder="នាមខ្លួន..."
                  className="w-1/2 bg-gray-100"
                />
              )}
            />
          </div>
        </div>

        {/* Nationality & Ethnicity */}
        <div className="flex gap-4">
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="nationality" className="text-sm font-bold">
              ជនជាតិ
            </label>
            <Controller
              control={control}
              name="nationality"
              render={({ field }) => (
                <Input
                  id="nationality"
                  {...field}
                  disabled={isSubmitting}
                  placeholder="ជនជាតិ..."
                  className="w-full bg-gray-100"
                />
              )}
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="ethnicity" className="text-sm font-bold">
              សញ្ជាតិ
            </label>
            <Controller
              control={control}
              name="ethnicity"
              render={({ field }) => (
                <Input
                  id="ethnicity"
                  {...field}
                  disabled={isSubmitting}
                  placeholder="សញ្ជាតិ..."
                  className="w-full bg-gray-100"
                />
              )}
            />
          </div>
        </div>

        {/* Latin Full Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="latin-full-name" className="text-sm font-bold">
            ជាអក្សរឡាតាំង
          </label>
          <div className="flex gap-2">
            <Controller
              control={control}
              name="englishFirstName"
              render={({ field }) => (
                <Input
                  id="latin-first-name"
                  {...field}
                  placeholder="First name..."
                  className="w-1/2 bg-gray-100"
                />
              )}
            />
            <Controller
              control={control}
              name="englishLastName"
              render={({ field }) => (
                <Input
                  id="latin-last-name"
                  {...field}
                  disabled={isSubmitting}
                  placeholder="Last name..."
                  className="w-1/2 bg-gray-100"
                />
              )}
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-bold">
            លេខទូរស័ព្ទ
          </label>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <Input
                id="phone"
                {...field}
                disabled={isSubmitting}
                placeholder="លេខទូរស័ព្ទ..."
                className="w-full bg-gray-100"
              />
            )}
          />
        </div>

        {/* Gender & Date of Birth */}
        <div className="flex gap-4">
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="gender" className="text-sm font-bold">
              ភេទ
            </label>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                  value={field.value}
                >
                  <SelectTrigger className="bg-gray-100" />
                  <SelectValue placeholder="សូមជ្រើសរើស" />
                  <SelectContent className="bg-gray-100">
                    <SelectItem value={GenderEnum.MALE}>ប្រុស</SelectItem>
                    <SelectItem value={GenderEnum.FEMALE}>ស្រី</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="dob" className="text-sm font-bold">
              ថ្ងៃខែឆ្នាំកំណើត
            </label>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <Input
                  id="dob"
                  {...field}
                  disabled={isSubmitting}
                  type="date"
                  placeholder="mm/dd/yyyy"
                  className="w-full bg-gray-100"
                />
              )}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-bold">
            អ៊ីម៊ែល
          </label>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                id="email"
                {...field}
                disabled={isSubmitting}
                placeholder="អ៊ីម៊ែល"
                className="w-full bg-gray-100"
              />
            )}
          />
        </div>

        {/* Place of Birth */}
        <div className="flex flex-col gap-2">
          <label htmlFor="placeOfBirth" className="text-sm font-bold">
            ទីកន្លែងកំណើត
          </label>
          <Controller
            name="placeOfBirth"
            control={control}
            render={({ field }) => (
              <Textarea
                id="placeOfBirth"
                {...field}
                disabled={isSubmitting}
                placeholder="ភូមិ ​ឃុំ/សង្កាត់ ស្រុក/ខណ្ច​ ខេត្ត"
                className="w-full bg-gray-100"
              />
            )}
          />
        </div>

        {/* Current Address */}
        <div className="flex flex-col gap-2">
          <label htmlFor="currentAddress" className="text-sm font-bold">
            ទីកន្លែងបច្ចុប្បន្ន
          </label>
          <Controller
            control={control}
            name="currentAddress"
            render={({ field }) => (
              <Textarea
                id="currentAddress"
                {...field}
                disabled={isSubmitting}
                placeholder="ភូមិ ​ឃុំ/សង្កាត់ ស្រុក/ខណ្ច​ ខេត្ត"
                className="w-full bg-gray-100"
              />
            )}
          />
        </div>
      </div>
    </CollapsibleCard>
  );
}
