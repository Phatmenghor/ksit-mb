"use client";

import { useState } from "react";
import { ChevronRight, Edit, AlertTriangle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ScoreData {
  id: number;
  attendance: number;
  assignment: number;
  midterm: number;
  final: number;
}

export default function ScoreSettingPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [scoreData, setScoreData] = useState<ScoreData>({
    id: 1,
    attendance: 10,
    assignment: 10,
    midterm: 10,
    final: 10,
  });

  const [editData, setEditData] = useState<ScoreData>(scoreData);

  const handleEdit = () => {
    setEditData(scoreData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setScoreData(editData);
    setIsEditing(false);
  };

  const handleDiscard = () => {
    setEditData(scoreData);
    setIsEditing(false);
  };

  const updateEditData = (field: keyof ScoreData, value: number) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateOptions = () => {
    const options = [];
    for (let i = 0; i <= 100; i += 5) {
      options.push(i);
    }
    return options;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <span className="font-medium text-gray-900">Dashboard</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-500">Score Setting</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Score Setting</h1>

        {/* Warning Message */}
        <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            Please note: The total score setting cannot exceed 100%. Make sure
            all components add up to a maximum of 100%.
          </p>
        </div>

        {/* Score Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="px-6 py-4 text-left text-sm font-medium">#</th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Attendance
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Assignment
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Midterm
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Final
                </th>
                {!isEditing && (
                  <th className="px-6 py-4 text-left text-sm font-medium">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {scoreData.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {isEditing ? editData.attendance : scoreData.attendance}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {isEditing ? (
                    <Select
                      value={editData.assignment.toString()}
                      onValueChange={(value) =>
                        updateEditData("assignment", Number.parseInt(value))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                        <ChevronDown className="w-4 h-4" />
                      </SelectTrigger>
                      <SelectContent>
                        {generateOptions().map((option) => (
                          <SelectItem key={option} value={option.toString()}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    scoreData.assignment
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {isEditing ? (
                    <Select
                      value={editData.midterm.toString()}
                      onValueChange={(value) =>
                        updateEditData("midterm", Number.parseInt(value))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                        <ChevronDown className="w-4 h-4" />
                      </SelectTrigger>
                      <SelectContent>
                        {generateOptions().map((option) => (
                          <SelectItem key={option} value={option.toString()}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    scoreData.midterm
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {isEditing ? (
                    <Select
                      value={editData.final.toString()}
                      onValueChange={(value) =>
                        updateEditData("final", Number.parseInt(value))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                        <ChevronDown className="w-4 h-4" />
                      </SelectTrigger>
                      <SelectContent>
                        {generateOptions().map((option) => (
                          <SelectItem key={option} value={option.toString()}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    scoreData.final
                  )}
                </td>
                {!isEditing && (
                  <td className="px-6 py-4">
                    <Button
                      onClick={handleEdit}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Buttons (shown only in edit mode) */}
        {isEditing && (
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={handleDiscard} className="px-6">
              Discard
            </Button>
            <Button
              onClick={handleSave}
              className="px-6 bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
