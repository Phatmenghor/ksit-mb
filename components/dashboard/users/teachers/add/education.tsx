import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function EducationForm() {
  return (
    <div>
      <div>
        <h2 className="mb-4 border-b pb-2 text-lg font-medium">
          ឋានៈវិជ្ជាជីវៈគ្រូបង្រៀន
        </h2>
        <div className="mb-4">
          <div className="mb-2 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="font-medium">ប្រភេទឋានៈវិជ្ជាជីវៈ</div>
            <div className="font-medium">បរិយាយ</div>
            <div className="font-medium">ប្រកាសលេខ</div>
            <div className="font-medium">កាលបរិច្ឆេទទទួល</div>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
              <Input placeholder="ប្រភេទឋានៈវិជ្ជាជីវៈ" />
              <Textarea
                placeholder="បរិយាយ"
                className="h-10 min-h-0 resize-none"
              />
              <Input placeholder="ប្រកាសលេខ" />
              <Input type="date" placeholder="mm/dd/yyyy" />
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
              <Input placeholder="ប្រភេទឋានៈវិជ្ជាជីវៈ" />
              <Textarea
                placeholder="បរិយាយ"
                className="h-10 min-h-0 resize-none"
              />
              <Input placeholder="ប្រកាសលេខ" />
              <Input type="date" placeholder="mm/dd/yyyy" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Input type="number" className="w-16" defaultValue={1} min={1} />
            <Button type="button" variant="outline" size="sm">
              Add row
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
