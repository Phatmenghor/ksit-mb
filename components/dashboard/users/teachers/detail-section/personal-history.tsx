"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import CollapsibleCard from "./customFormSection";
import { Controller, useFormContext } from "react-hook-form";
import { GenderEnum, Mode } from "@/constants/constant";
import { ZodStaffModelType } from "@/model/user/staff/schema";

export default function PersonalHistoryForm({ mode }: { mode: Mode }) {
  const {
    control,
    formState: { isSubmitting, isDirty },
  } = useFormContext<ZodStaffModelType>();

  const isReadOnly = mode === Mode.VIEW;

  return (
    <CollapsibleCard title="ប្រវត្តិផ្ទាល់គ្រូបង្រៀន">
      {/* Personal information section */}
      <div>
        <div className="grid mb-7 grid-cols-1 gap-4 md:grid-cols-2">
          {/* នាមត្រកូល និងនាមខ្លួន */}
          <div className="grid grid-cols-1 gap-2">
            <label
              htmlFor="khmer-full-name"
              className="mb-1 block text-sm font-bold"
            >
              នាមត្រកូល និងនាមខ្លួន
            </label>

            <div className="flex gap-2" id="khmerFirstName">
              <Controller
                name="khmerFirstName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="khmerFirstName"
                    {...field}
                    placeholder="នាមត្រកូល..."
                    disabled={isSubmitting || isReadOnly}
                    className="w-1/2 bg-gray-100"
                  />
                )}
              />
              <Controller
                name="khmerLastName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    disabled={isSubmitting || isReadOnly}
                    placeholder="នាមខ្លួន..."
                    className="w-1/2 bg-gray-100"
                  />
                )}
              />
            </div>
          </div>
          {/* លេខគណនីបៀវត្ស */}
          <div>
            <label
              htmlFor="account-number"
              className="mb-1 block text-sm font-bold"
            >
              លេខគណនីបៀវត្ស
            </label>
            <Controller
              name="payrollAccountNumber"
              control={control}
              render={({ field }) => (
                <Input
                  id="account-number"
                  {...field}
                  disabled={isSubmitting || isReadOnly}
                  placeholder="លេខគណនីបៀវត្ស..."
                  className="w-full bg-gray-100"
                />
              )}
            />
          </div>

          {/* ជាអក្សរឡាតាំង */}
          <div className="grid grid-cols-1 gap-2">
            <label
              htmlFor="latin-full-name"
              className="mb-1 block text-sm font-bold"
            >
              ជាអក្សរឡាតាំង
            </label>
            <div className="flex gap-2">
              <Controller
                name="englishFirstName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="latin-first-name"
                    {...field}
                    disabled={isSubmitting || isReadOnly}
                    placeholder="First name..."
                    className="w-1/2 bg-gray-100"
                  />
                )}
              />
              <Controller
                name="englishLastName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="latin-last-name"
                    {...field}
                    disabled={isSubmitting || isReadOnly}
                    placeholder="Last name..."
                    className="w-1/2 bg-gray-100"
                  />
                )}
              />
            </div>
          </div>

          {/* លេខសមាជិកបសបខ */}
          <div>
            <label
              htmlFor="membership-number"
              className="mb-1 block text-sm font-bold"
            >
              លេខសមាជិកបសបខ
            </label>
            <Controller
              name="cppMembershipNumber"
              control={control}
              render={({ field }) => (
                <Input
                  id="membership-number"
                  {...field}
                  disabled={isSubmitting || isReadOnly}
                  placeholder="លេខសមាជិកបសបខ..."
                  className="w-full bg-gray-100"
                />
              )}
            />
          </div>

          {/* ភេទ */}
          <div>
            <label htmlFor="gender" className="mb-1 block text-sm font-bold">
              ភេទ
            </label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  disabled={isSubmitting || isReadOnly}
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

          {/* ថ្ងៃខែឆ្នាំចូលបម្រើការងារ */}
          <div>
            <label
              htmlFor="start-Work-Date"
              className="mb-1 block text-sm font-bold"
            >
              ថ្ងៃខែឆ្នាំចូលបម្រើការងារ
            </label>
            <Controller
              name="startWorkDate"
              control={control}
              render={({ field }) => (
                <Input
                  id="start-Work-Date"
                  type="date"
                  {...field}
                  disabled={isSubmitting || isReadOnly}
                  placeholder="mm/dd/yyyy"
                  className="w-full bg-gray-100"
                />
              )}
            />
          </div>

          {/* ថ្ងៃខែឆ្នាំកំណើត */}
          <div>
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
                  disabled={isSubmitting || isReadOnly}
                  type="date"
                  placeholder="mm/dd/yyyy"
                  className="w-full bg-gray-100"
                />
              )}
            />
          </div>

          {/* ថ្ងៃខែឆ្នាំតែងតាំងស៊ុប */}
          <div>
            <label
              htmlFor="appointment-date"
              className="mb-1 block text-sm font-bold"
            >
              ថ្ងៃខែឆ្នាំតែងតាំងស៊ុប
            </label>
            <Controller
              control={control}
              name="currentPositionDate"
              render={({ field }) => (
                <Input
                  id="appointment-date"
                  type="date"
                  {...field}
                  disabled={isSubmitting || isReadOnly}
                  placeholder="mm/dd/yyyy"
                  className="w-full bg-gray-100"
                />
              )}
            />
          </div>

          {/* ជនជាតិ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
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
                    type="text"
                    {...field}
                    disabled={isSubmitting || isReadOnly}
                    placeholder="ជនជាតិ"
                    className="w-full bg-gray-100"
                  />
                )}
              />
            </div>

            {/*  ពិការ */}
            <div>
              <label htmlFor="disable" className="mb-1 block text-sm font-bold">
                ពិការ
              </label>
              <Controller
                name="disability"
                control={control}
                render={({ field }) => (
                  <Input
                    id="disable"
                    {...field}
                    disabled={isSubmitting || isReadOnly}
                    placeholder="បញ្ហាពិការ..."
                    className="w-full bg-gray-100"
                  />
                )}
              />
            </div>
          </div>

          {/* {អង្គភាពបម្រើការងារ} */}
          <div>
            <label
              htmlFor="employee-work"
              className="mb-1 block text-sm font-bold"
            >
              អង្គភាពបម្រើការងារ
            </label>
            <Controller
              control={control}
              name="employeeWork"
              render={({ field }) => (
                <Input
                  id="employee-work"
                  type="text"
                  {...field}
                  disabled={isSubmitting || isReadOnly}
                  placeholder="អង្គភាពបម្រើការងារ..."
                  className="w-full bg-gray-100"
                />
              )}
            />{" "}
          </div>

          {/* អត្តលេខមន្ត្រី */}
          <div>
            <label
              htmlFor="identify-number"
              className="mb-1 block text-sm font-bold"
            >
              អត្តលេខមន្ត្រី
            </label>
            <Controller
              control={control}
              name="staffId"
              render={({ field }) => (
                <Input
                  id="identify-number"
                  {...field}
                  disabled={isSubmitting || isReadOnly}
                  placeholder="អត្តលេខមន្ត្រី..."
                  className="w-full bg-gray-100"
                />
              )}
            />{" "}
          </div>

          <div className="grid space-y-4">
            {/* Province, District, Commune, Village */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label
                  htmlFor="village"
                  className="mb-1 block text-sm font-bold"
                >
                  ភូមិ
                </label>
                <Controller
                  control={control}
                  name="village"
                  render={({ field }) => (
                    <Input
                      id="village"
                      {...field}
                      disabled={isSubmitting || isReadOnly}
                      placeholder="ភូមិ..."
                      className="w-full bg-gray-100"
                    />
                  )}
                />{" "}
              </div>
              <div>
                <label
                  htmlFor="commune"
                  className="mb-1 block text-sm font-bold"
                >
                  ឃុំ
                </label>
                <Controller
                  control={control}
                  name="commune"
                  render={({ field }) => (
                    <Input
                      id="commune"
                      {...field}
                      disabled={isSubmitting || isReadOnly}
                      placeholder="ឃុំ..."
                      className="w-full bg-gray-100"
                    />
                  )}
                />{" "}
              </div>

              <div>
                <label
                  htmlFor="district"
                  className="mb-1 block text-sm font-bold"
                >
                  ស្រុក
                </label>
                <Controller
                  control={control}
                  name="district"
                  render={({ field }) => (
                    <Input
                      id="district"
                      {...field}
                      disabled={isSubmitting || isReadOnly}
                      placeholder="ស្រុក..."
                      className="w-full bg-gray-100"
                    />
                  )}
                />{" "}
              </div>
              <div>
                <label
                  htmlFor="province"
                  className="mb-1 block text-sm font-bold"
                >
                  ខេត្ត
                </label>
                <Controller
                  control={control}
                  name="province"
                  render={({ field }) => (
                    <Input
                      id="province"
                      {...field}
                      disabled={isSubmitting || isReadOnly}
                      placeholder="ខេត្ត..."
                      className="w-full bg-gray-100"
                    />
                  )}
                />{" "}
              </div>
            </div>
          </div>

          {/* លេខអត្តសញ្ញាណបណ្ណ */}
          <div>
            <label
              htmlFor="national-Id"
              className="mb-1 block text-sm font-bold"
            >
              លេខអត្តសញ្ញាណបណ្ណ
            </label>
            <Controller
              control={control}
              name="nationalId"
              render={({ field }) => (
                <Input
                  id="national-Id"
                  type="texst"
                  {...field}
                  disabled={isSubmitting || isReadOnly}
                  placeholder="លេខអត្តសញ្ញាណបណ្ណ..."
                  className="w-full bg-gray-100"
                />
              )}
            />
          </div>

          {/* ការិយាល័យe */}
          <div>
            <label htmlFor="Office" className="mb-1 block text-sm font-bold">
              ការិយាល័យ
            </label>
            <Controller
              control={control}
              name="officeName"
              render={({ field }) => (
                <Input
                  id="Office"
                  type="text"
                  {...field}
                  disabled={isSubmitting || isReadOnly}
                  placeholder="ការិយាល័យ"
                  className="w-full bg-gray-100"
                />
              )}
            />
          </div>

          {/* ទីកន្លែងកំណើត */}
          <div>
            <label htmlFor="Office" className="mb-1 block text-sm font-bold">
              ទីកន្លែងកំណើត
            </label>
            <Controller
              control={control}
              name="placeOfBirth"
              render={({ field }) => (
                <Input
                  id="Office"
                  {...field}
                  disabled={isSubmitting || isReadOnly}
                  placeholder="ទីកន្លែងកំណើត"
                  className="w-full bg-gray-100"
                />
              )}
            />
          </div>

          {/* មុខតំណែង */}
          <div>
            <label htmlFor="position" className="mb-1 block text-sm font-bold">
              មុខតំណែង
            </label>
            <Controller
              control={control}
              name="currentPosition"
              render={({ field }) => (
                <Input
                  id="position"
                  {...field}
                  disabled={isSubmitting || isReadOnly}
                  placeholder="មុខតំណែង..."
                  className="w-full bg-gray-100"
                />
              )}
            />
          </div>
        </div>
        {/* ប្រកាស */}
        <div className="mb-3">
          <label htmlFor="Posts" className="mb-1 block text-sm font-bold">
            ប្រកាស
          </label>
          <Controller
            control={control}
            name="decreeFinal"
            render={({ field }) => (
              <Input
                id="Posts"
                {...field}
                disabled={isSubmitting || isReadOnly}
                placeholder="ប្រកាស..."
                className="bg-gray-100"
              />
            )}
          />
        </div>
      </div>
    </CollapsibleCard>
  );
}
