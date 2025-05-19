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
import { StudentFormData } from "@/model/user/student/add.student.zod";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function StudentPersonalDetailSection() {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<StudentFormData>();

  return (
    <CollapsibleCard title="ប្រវត្តិផ្ទាល់">
      {/* Personal information section */}
      <div className="grid mb-7 grid-cols-1 gap-4 md:grid-cols-2">
        {/* Khmer Full Name */}
        <div className="grid grid-cols-1 gap-2">
          <label
            htmlFor="khmer-full-name"
            className="mb-1 block text-sm font-bold"
          >
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

        <div className="grid grid-cols-2 gap-2 items-start">
          {/* Gender */}
          <div className="flex flex-col">
            <label
              htmlFor="nationality"
              className="mb-1 block text-sm font-bold"
            >
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
                  type="text"
                  placeholder="ជនជាតិ..."
                  className="w-full bg-gray-100"
                />
              )}
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label htmlFor="ethnicity" className="mb-1 block text-sm font-bold">
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
                  type="text"
                  placeholder="សញ្ជាតិ..."
                  className="w-full bg-gray-100"
                />
              )}
            />
          </div>
        </div>

        {/* Latin Full Name */}
        <div className="grid grid-cols-1 gap-2">
          <label
            htmlFor="latin-full-name"
            className="mb-1 block text-sm font-bold"
          >
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

        <div>
          <label htmlFor="​phone" className="mb-1 block text-sm font-bold">
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

        <div className="grid grid-cols-2 gap-2 items-start">
          {/* ភេទ */}
          <div>
            <label htmlFor="gender" className="mb-1 block text-sm font-bold">
              ភេទ
            </label>
            <Controller
              control={control}
              name=""
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                  value={field.value}
                >
                  <SelectTrigger className="bg-gray-100">
                    <SelectValue placeholder="សូមជ្រើសរើស" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-100">
                    <SelectItem value={GenderEnum.MALE}>ប្រុស</SelectItem>
                    <SelectItem value={GenderEnum.FEMALE}>ស្រី</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* ថ្ងៃខែឆ្នាំកំណើត */}
          <div className="flex flex-col">
            <label htmlFor="dob" className="mb-1 block text-sm font-bold">
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

        {/* អ៊ីម៊ែល */}
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-bold">
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

        {/* ទីកន្លែងកំណើត */}
        <div>
          <label
            htmlFor="placeOfBirth"
            className="mb-1 block text-sm font-bold"
          >
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

        {/* ទីកន្លែងបច្ចុប្បន្ន*/}
        <div>
          <label
            htmlFor="currentAddress"
            className="mb-1 block text-sm font-bold"
          >
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
