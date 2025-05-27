"use client";
import CollapsibleCard from "@/components/shared/collapsibleCard";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="gender" className="bg-gray-100">
                    <SelectValue>
                      {field.value === "MALE"
                        ? "ប្រុស"
                        : field.value === "FEMALE"
                        ? "ស្រី"
                        : "សូមជ្រើសរើស"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-gray-100">
                    <SelectItem value="MALE">ប្រុស</SelectItem>
                    <SelectItem value="FEMALE">ស្រី</SelectItem>
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
              render={({ field }) => {
                const selectedDate = field.value
                  ? new Date(field.value)
                  : undefined;

                return (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full bg-gray-100 justify-start text-left text-sm",
                          !selectedDate && "text-muted-foreground"
                        )}
                        disabled={isSubmitting}
                      >
                        {selectedDate
                          ? format(selectedDate, "yyyy-MM-dd")
                          : "ជ្រើសរើស"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          field.onChange(
                            date ? format(date, "yyyy-MM-dd") : ""
                          );
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                );
              }}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="student-email" className="text-sm font-bold">
            អ៊ីម៊ែល
          </label>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({ field }) => (
              <Input
                id="student-email"
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
