"use client";
import React from "react";
import CollapsibleCard from "@/components/shared/collapsibleCard";
import DynamicInputGrid from "@/components/shared/dynamicInputGrid";
import { Input } from "@/components/ui/input";

export default function FamilyStatusForm() {
  return (
    <CollapsibleCard title="ស្ថានភាពគ្រួសារ">
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Family Status */}
        <div>
          <label
            htmlFor="family-status"
            className="mb-1 block text-sm font-bold"
          >
            ស្ថានភាពគ្រួសារ
          </label>
          <Input
            id="family-status"
            placeholder="ឋានន្តរស័ក្តិ និងថ្នាក់..."
            className="bg-gray-100"
          />
        </div>

        {/* Relationship and Occupation */}
        <div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="relation-to"
                className="mb-1 block text-sm font-bold"
              >
                ត្រូវជា
              </label>
              <Input
                id="relation-to"
                placeholder="ត្រូវជា..."
                className="bg-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="partner-job"
                className="mb-1 block text-sm font-bold"
              >
                មុខរបរសហព័ទ្ធ
              </label>
              <Input
                id="partner-job"
                placeholder="មុខរបរ..."
                className="bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Partner Name */}
        <div>
          <label
            htmlFor="partner-name"
            className="mb-1 block text-sm font-bold"
          >
            ឈ្មោះសហព័ទ្ធ
          </label>
          <div className="flex gap-2">
            <Input
              id="partner-lastname"
              placeholder="នាមត្រកូល"
              className="w-1/2 bg-gray-100"
            />
            <Input
              id="partner-firstname"
              placeholder="នាមខ្លួន"
              className="w-1/2 bg-gray-100"
            />
          </div>
        </div>

        {/* Partner Unit */}
        <div>
          <label
            htmlFor="partner-unit"
            className="mb-1 block text-sm font-bold"
          >
            អង្គភាពសហព័ទ្ធ
          </label>
          <Input
            id="partner-unit"
            placeholder="អង្គភាព..."
            className="bg-gray-100"
          />
        </div>

        {/* Partner Birthdate and Salary */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label
              htmlFor="partner-dob"
              className="mb-1 block text-sm font-bold"
            >
              ថ្ងៃខែឆ្នាំកំណើតសហព័ទ្ធ
            </label>
            <Input id="partner-dob" type="date" className="bg-gray-100" />
          </div>
          <div>
            <label
              htmlFor="partner-salary"
              className="mb-1 block text-sm font-bold"
            >
              ប្រាក់ខែប្រពន្ធ
            </label>
            <Input
              id="partner-salary"
              placeholder="ប្រាក់ខែ..."
              className="bg-gray-100"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-bold">
              លេខទូរស័ព្ទផ្ទាល់ខ្លួន
            </label>
            <Input
              id="phone"
              placeholder="លេខទូរស័ព្ទ..."
              className="bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-bold">
              អ៊ីមែល
            </label>
            <Input
              id="email"
              placeholder="example@email.com"
              className="bg-gray-100"
            />
          </div>
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label htmlFor="address" className="mb-1 block text-sm font-bold">
            អាសយដ្ឋានបច្ចុប្បន្ន
          </label>
          <Input
            id="address"
            placeholder="អាសយដ្ឋាន..."
            className="bg-gray-100"
          />
        </div>
      </div>

      {/* Children Info Grid */}
      <div className="mt-6">
        <DynamicInputGrid
          labels={["ឈ្មោះកូន", "ភេទ", "ថ្ងៃខែឆ្នាំកំណើត", "មុខរបរ"]}
          fields={[
            {
              name: "childName",
              type: "text",
              placeholder: "ឈ្មោះកូន",
            },
            {
              name: "gender",
              type: "text",
              placeholder: "ភេទ",
            },
            {
              name: "dob",
              type: "date",
              placeholder: "ថ្ងៃខែឆ្នាំកំណើត",
            },
            {
              name: "job",
              type: "text",
              placeholder: "មុខរបរ",
            },
          ]}
          defaultRows={2}
        />
      </div>
    </CollapsibleCard>
  );
}
