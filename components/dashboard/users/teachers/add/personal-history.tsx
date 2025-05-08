import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function PersonalHistoryForm() {
  return (
    <div>
      {/* Personal information section */}
      <div>
        <h2 className="mb-8 font-bold border-b pb-2 text-[14px]">
          ប្រវត្តិរូបគ្រូបង្រៀន
        </h2>
        <div className="grid mb-7 grid-cols-1 gap-4 md:grid-cols-2">
          {/* Khmer Full Name */}
          <div className="grid grid-cols-1 gap-2">
            <label
              htmlFor="khmer-full-name"
              className="mb-1 block text-sm font-bold"
            >
              នាមត្រកូល និងនាមខ្លួន
            </label>
            <div className="flex gap-2">
              <Input
                id="khmer-first-name"
                placeholder="នាមត្រកូល..."
                className="w-1/2 bg-gray-100"
              />
              <Input
                id="khmer-last-name"
                placeholder="នាមខ្លួន..."
                className="w-1/2 bg-gray-100"
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
              <Input
                id="latin-first-name"
                placeholder="First name..."
                className="w-1/2 bg-gray-100"
              />
              <Input
                id="latin-last-name"
                placeholder="Last name..."
                className="w-1/2 bg-gray-100"
              />
            </div>
          </div>

          {/* Gender & Disability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label htmlFor="gender" className="mb-1 block text-sm font-bold">
                ភេទ
              </label>
              <Select>
                <SelectTrigger className="bg-gray-100">
                  <SelectValue placeholder="សូមជ្រើសរើស" />
                </SelectTrigger>
                <SelectContent className="bg-gray-100">
                  <SelectItem value="male">ប្រុស</SelectItem>
                  <SelectItem value="female">ស្រី</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="disable" className="mb-1 block text-sm font-bold">
                ពិការ
              </label>
              <Input
                id="disable"
                placeholder="បញ្ហាពិការ..."
                className="w-full bg-gray-100"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="mb-1 block text-sm font-bold">
              ថ្ងៃខែឆ្នាំកំណើត
            </label>
            <Input
              id="dob"
              type="date"
              placeholder="mm/dd/yyyy"
              className="w-full bg-gray-100"
            />
          </div>

          {/* Account Number */}
          <div>
            <label
              htmlFor="account-number"
              className="mb-1 block text-sm font-bold"
            >
              លេខគណនីបៀវត្ស
            </label>
            <Input
              id="account-number"
              placeholder="លេខគណនីបៀវត្ស..."
              className="w-full bg-gray-100"
            />
          </div>

          {/* Membership Number */}
          <div>
            <label
              htmlFor="membership-number"
              className="mb-1 block text-sm font-bold"
            >
              លេខសមាជិកបសបខ
            </label>
            <Input
              id="membership-number"
              placeholder="លេខសមាជិកបសបខ..."
              className="w-full bg-gray-100"
            />
          </div>

          {/* Joining Date */}
          <div>
            <label
              htmlFor="joining-date"
              className="mb-1 block text-sm font-bold"
            >
              ថ្ងៃខែឆ្នាំចូលបម្រើការងារ
            </label>
            <Input
              id="joining-date"
              type="date"
              placeholder="mm/dd/yyyy"
              className="w-full bg-gray-100"
            />
          </div>

          {/* Appointment Date */}
          <div>
            <label
              htmlFor="appointment-date"
              className="mb-1 block text-sm font-bold"
            >
              ថ្ងៃខែឆ្នាំតែងតាំងស៊ុប
            </label>
            <Input
              id="appointment-date"
              type="date"
              placeholder="mm/dd/yyyy"
              className="w-full bg-gray-100"
            />
          </div>

          {/* Place of Birth */}
          <div>
            <label htmlFor="pob" className="mb-1 block text-sm font-bold">
              ទីកន្លែងកំណើត
            </label>
            <Input
              id="pob"
              placeholder="ទីកន្លែងកំណើត..."
              className="w-full bg-gray-100"
            />{" "}
          </div>

          {/* Current Address */}
          <div>
            <label
              htmlFor="current-address"
              className="mb-1 block text-sm font-bold"
            >
              អាសយដ្ឋានបច្ចុប្បន្ន
            </label>
            <Input
              id="current-address"
              placeholder="អាសយដ្ឋានបច្ចុប្បន្ន..."
              className="w-full bg-gray-100"
            />
          </div>
        </div>

        <Separator />

        <div className="grid space-y-4 mt-7">
          {/* Province, District, Commune, Village */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label
                htmlFor="province"
                className="mb-1 block text-sm font-bold"
              >
                ខេត្ត
              </label>
              <Input
                id="province"
                placeholder="ខេត្ត..."
                className="w-full bg-gray-100"
              />{" "}
            </div>
            <div>
              <label
                htmlFor="district"
                className="mb-1 block text-sm font-bold"
              >
                ស្រុក
              </label>
              <Input
                id="district"
                placeholder="ស្រុក..."
                className="w-full bg-gray-100"
              />{" "}
            </div>
            <div>
              <label htmlFor="commune" className="mb-1 block text-sm font-bold">
                ឃុំ
              </label>
              <Input
                id="commune"
                placeholder="ឃុំ..."
                className="w-full bg-gray-100"
              />{" "}
            </div>
            <div>
              <label htmlFor="village" className="mb-1 block text-sm font-bold">
                ភូមិ
              </label>
              <Input
                id="village"
                placeholder="ភូមិ..."
                className="w-full bg-gray-100"
              />{" "}
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-bold">
                លេខទូរស័ព្ទទំនាក់ទំនង
              </label>
              <Input
                id="phone"
                placeholder="លេខទូរស័ព្ទទំនាក់ទំនង..."
                className="w-full bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-bold">
                អ៊ីមែល
              </label>
              <Input
                id="email"
                type="email"
                placeholder="អ៊ីមែល..."
                className="w-full bg-gray-100"
              />
            </div>
          </div>

          {/* Birthplace */}
          <div>
            <label
              htmlFor="address-detail"
              className="mb-1 block text-sm font-bold"
            >
              ទីកន្លែងកំណើត
            </label>
            <Textarea
              id="address-detail"
              placeholder="ភូមិ ឃុំ/សង្កាត់ ស្រុក/ខណ្ឌ ខេត្ត"
              className="min-h-[100px] w-full bg-gray-100"
            />
          </div>

          {/* Position & Salary */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="position"
                className="mb-1 block text-sm font-bold"
              >
                មុខតំណែង
              </label>
              <Input
                id="position"
                placeholder="មុខតំណែង..."
                className="w-full bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="salary" className="mb-1 block text-sm font-bold">
                ប្រាក់ខែ
              </label>
              <Input
                id="salary"
                placeholder="ប្រាក់ខែ..."
                className="w-full bg-gray-100"
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
