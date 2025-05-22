"use client";
import { Eye, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ClassCardProps {
  classNumber: string;
  degree: string;
  year: string;
  academyYear: string;
  onViewSchedule: () => void;
  onAddSchedule: () => void;
}

export function ClassCard({
  classNumber,
  degree,
  year,
  academyYear,
  onViewSchedule,
  onAddSchedule,
}: ClassCardProps) {
  return (
    <div className="rounded-md border border-gray-200 shadow-sm bg-white">
      <Card className="rounded-xl shadow-none border-none">
        <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left section: Class number */}
          <div className="text-lg font-semibold text-gray-800">
            Total Class {classNumber}
          </div>

          {/* Middle section: Details */}
          <div className="flex-1 md:ml-8 space-y-1 text-sm text-gray-700">
            <div className="flex gap-2">
              <span className="text-gray-500">Degree:</span>
              <span>{degree}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500">Year:</span>
              <span>{year}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500">Academy Year:</span>
              <span>{academyYear}</span>
            </div>
          </div>

          {/* Right section: Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-1 border-amber-500 text-amber-500 hover:bg-amber-50 hover:text-amber-600"
              onClick={onViewSchedule}
            >
              <Eye className="h-4 w-4" />
              View Schedule
            </Button>
            <Button className="flex items-center gap-1" onClick={onAddSchedule}>
              <Plus className="h-4 w-4" />
              Add Schedule
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
