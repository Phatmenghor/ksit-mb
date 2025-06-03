"use client";

import React, { useState } from "react";
import { Edit, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTE } from "@/constants/routes";
import { Input } from "@/components/ui/input";

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
    <div className="space-y-4">
      <Card>
        <CardContent className="flex flex-col items-start justify-start p-6 space-y-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={ROUTE.DASHBOARD}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={ROUTE.SCORES.SETTINGS}>
                  Score Setting
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-2xl font-bold text-gray-900">Score Setting</h1>

          <div className="flex items-start gap-3 rounded-lg p-4 bg-yellow-50 border border-yellow-200">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> The total score setting cannot exceed 100%.
              Make sure all components add up to a maximum of 100%.
            </p>
          </div>
        </CardContent>
      </Card>
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-gray-900 text-white">
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-white">Attendance</TableHead>
            <TableHead className="text-white">Assignment</TableHead>
            <TableHead className="text-white">Midterm</TableHead>
            <TableHead className="text-white">Final</TableHead>
            {!isEditing && (
              <TableHead className="text-white">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{scoreData.id}</TableCell>
            <TableCell>{scoreData.attendance}</TableCell>
            <TableCell>
              {isEditing ? (
                <Input
                  type="number"
                  className="h-8 px-2 text-sm"
                  value={editData.assignment}
                  onChange={(e) =>
                    updateEditData("assignment", Number(e.target.value))
                  }
                  min={0}
                  max={100}
                />
              ) : (
                scoreData.assignment
              )}
            </TableCell>
            <TableCell>
              {isEditing ? (
                <Input
                  type="number"
                  value={editData.midterm}
                  className="h-8 px-2 text-sm"
                  onChange={(e) =>
                    updateEditData("midterm", Number(e.target.value))
                  }
                  min={0}
                  max={100}
                />
              ) : (
                scoreData.midterm
              )}
            </TableCell>
            <TableCell>
              {isEditing ? (
                <Input
                  type="number"
                  value={editData.final}
                  className="h-8 px-2 text-sm"
                  onChange={(e) =>
                    updateEditData("final", Number(e.target.value))
                  }
                  min={0}
                  max={100}
                />
              ) : (
                scoreData.final
              )}
            </TableCell>
            {!isEditing && (
              <TableCell>
                <Button onClick={handleEdit} variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </TableCell>
            )}
          </TableRow>
        </TableBody>
      </Table>
      {/* Action Buttons (shown only in edit mode) */}
      {isEditing && (
        <Card className="w-full">
          <CardContent className="flex justify-end gap-3 p-4">
            <Button variant="outline" onClick={handleDiscard} className="px-6">
              Discard
            </Button>
            <Button
              onClick={handleSave}
              className="px-6 bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Save
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
