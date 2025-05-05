import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function PersonalHistoryForm() {
  return (
    <div>
      {/* Personal information section */}
      <div>
        <h2 className="mb-4 border-b pb-2 text-[12px] font-medium">
          ប្រវត្តិរូបគ្រូបង្រៀន
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="khmer-first-name"
              className="mb-2 block text-sm font-medium"
            >
              នាមត្រកូល និងនាមខ្លួន
            </label>
            <div className="flex gap-2">
              <Input
                id="khmer-first-name"
                placeholder="នាមត្រកូល..."
                className="w-1/2"
              />
              <Input
                id="khmer-last​-name"
                placeholder="នាមខ្លួន..."
                className="w-1/2"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="khmer-last-name"
              className="mb-2 block text-sm font-medium"
            >
              លេខគណនីបៀវត្ស
            </label>
            <Input id="khmer-last-name" placeholder="លេខគណនីបៀវត្ស..." />
          </div>
          <div>
            <label
              htmlFor="khmer-first-name"
              className="mb-2 block text-sm font-medium"
            >
              ជាអក្សរឡាតាំង
            </label>
            <div className="flex gap-2">
              <Input
                id="khmer-first-name"
                placeholder="First name..."
                className="w-1/2"
              />
              <Input
                id="khmer-last​-name"
                placeholder="Last name..."
                className="w-1/2"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="khmer-last-name"
              className="mb-2 block text-sm font-medium"
            >
              លេខសមាជិកបសបខ
            </label>
            <Input id="khmer-last-name" placeholder="លេខសមាជិកបសបខ..." />
          </div>

          <div>
            <label htmlFor="gender" className="mb-2 block text-sm font-medium">
              ភេទ
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="សូមជ្រើសរើស" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">ប្រុស</SelectItem>
                <SelectItem value="female">ស្រី</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="dob" className="mb-2 block text-sm font-medium">
              ថ្ងៃខែឆ្នាំចូលបម្រើការងារ
            </label>
            <Input id="dob" type="date" placeholder="mm/dd/yyyy" />
          </div>
          <div>
            <label
              htmlFor="start-date"
              className="mb-2 block text-sm font-medium"
            >
              ថ្ងៃខែឆ្នាំកំណើត
            </label>
            <Input id="start-date" type="date" placeholder="mm/dd/yyyy" />
          </div>

          <div>
            <label htmlFor="dob" className="mb-2 block text-sm font-medium">
              ថ្ងៃខែឆ្នាំតែងតាំងស៊ុប
            </label>
            <Input id="dob" type="date" placeholder="mm/dd/yyyy" />
          </div>
          <div>
            <label htmlFor="pob" className="mb-2 block text-sm font-medium">
              ទីកន្លែងកំណើត
            </label>
            <Input id="pob" placeholder="ទីកន្លែងកំណើត..." />
          </div>
          <div>
            <label
              htmlFor="current-address"
              className="mb-2 block text-sm font-medium"
            >
              អាសយដ្ឋានបច្ចុប្បន្ន
            </label>
            <Input id="current-address" placeholder="អាសយដ្ឋានបច្ចុប្បន្ន..." />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label
              htmlFor="province"
              className="mb-2 block text-sm font-medium"
            >
              ខេត្ត
            </label>
            <Input id="province" placeholder="ខេត្ត..." />
          </div>
          <div>
            <label
              htmlFor="district"
              className="mb-2 block text-sm font-medium"
            >
              ស្រុក
            </label>
            <Input id="district" placeholder="ស្រុក..." />
          </div>
          <div>
            <label htmlFor="commune" className="mb-2 block text-sm font-medium">
              ឃុំ
            </label>
            <Input id="commune" placeholder="ឃុំ..." />
          </div>
          <div>
            <label htmlFor="village" className="mb-2 block text-sm font-medium">
              ភូមិ
            </label>
            <Input id="village" placeholder="ភូមិ..." />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium">
              លេខទូរស័ព្ទទំនាក់ទំនង
            </label>
            <Input id="phone" placeholder="លេខទូរស័ព្ទទំនាក់ទំនង..." />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              អ៊ីមែល
            </label>
            <Input id="email" type="email" placeholder="អ៊ីមែល..." />
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="address-detail"
            className="mb-2 block text-sm font-medium"
          >
            ទីកន្លែងកំណើត
          </label>
          <Textarea
            id="address-detail"
            placeholder="ភូមិ ឃុំ/សង្កាត់ ស្រុក/ខណ្ឌ ខេត្ត"
            className="min-h-[100px]"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="position"
              className="mb-2 block text-sm font-medium"
            >
              មុខតំណែង
            </label>
            <Input id="position" placeholder="មុខតំណែង..." />
          </div>
          <div>
            <label htmlFor="salary" className="mb-2 block text-sm font-medium">
              ប្រាក់ខែ
            </label>
            <Input id="salary" placeholder="ប្រាក់ខែ..." />
          </div>
        </div>
      </div>
    </div>
  );
}
