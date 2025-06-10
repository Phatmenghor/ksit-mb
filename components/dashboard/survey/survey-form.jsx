"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SurveyFormCard({ question }) {
  const [selectedValue, setSelectedValue] = useState("4");

  return (
    <Card>
      <div className="p-4 ">
        <div className="space-y-4">
          {/* Question */}
          <div className="flex items-start gap-1">
            <div className="flex-1">
              <span className="text-sm text-gray-700">{question}</span>
              <span className="text-red-500 ml-1">*</span>
            </div>
          </div>
          <hr />
          {/* Rating Scale */}
          <div className="flex items-center justify-between gap-4 mt-6">
            {/* Left Label */}
            <div className="text-xs text-gray-500 whitespace-nowrap flex items-center h-full">
              (1) Strongly Disagree
            </div>

            {/* Radio Buttons */}
            <div className="flex items-center gap-x-16 flex-1 justify-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <label
                  key={value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="course-materials"
                    value={value.toString()}
                    checked={selectedValue === value.toString()}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedValue === value.toString()
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {selectedValue === value.toString() && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">{value}</span>
                </label>
              ))}
            </div>

            {/* Right Label */}
            <div className="text-xs text-gray-500 whitespace-nowrap flex items-center h-full">
              (5) Strongly Agree
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

