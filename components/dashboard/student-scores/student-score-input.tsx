"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  FileSpreadsheet,
  FileIcon as FilePdf,
  Save,
  X,
  Calculator,
  FileUp,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import type { SubjectType, StudentType } from "@/model/score-types";

interface StudentScoreInputProps {
  subject: SubjectType;
  students: StudentType[];
  onBack: () => void;
  onSave: (students: StudentType[]) => void;
}

export function StudentScoreInput({
  subject,
  students = [],
  onBack,
  onSave,
}: StudentScoreInputProps) {
  const [activeTab, setActiveTab] = useState("individual");
  const [studentScores, setStudentScores] = useState<StudentType[]>([]);
  const [calculationFormula, setCalculationFormula] = useState({
    attendance: 10,
    assignment: 20,
    midterm: 30,
    final: 40,
  });

  // Initialize student scores
  useEffect(() => {
    if (students.length > 0) {
      setStudentScores([...students]);
    } else {
      // For 2025 subjects, create empty student records
      const emptyStudents = [
        {
          id: "234012001",
          fullnameKh: "រ៉ូ វិសាល",
          fullnameEn: "KAO VISAL",
          gender: "Male",
          birthDate: "13-Jun-2002",
          attendance: 0,
          assignment: 0,
          midterm: 0,
          final: 0,
          total: 0,
          grade: "",
        },
        {
          id: "234012002",
          fullnameKh: "ខន កុសល",
          fullnameEn: "KHORN KOSORL",
          gender: "Male",
          birthDate: "20-Jun-2005",
          attendance: 0,
          assignment: 0,
          midterm: 0,
          final: 0,
          total: 0,
          grade: "",
        },
        {
          id: "234012003",
          fullnameKh: "ខាន ភារ៉ុម",
          fullnameEn: "KHAN PHEARUM",
          gender: "Male",
          birthDate: "17-Jun-2005",
          attendance: 0,
          assignment: 0,
          midterm: 0,
          final: 0,
          total: 0,
          grade: "",
        },
      ];
      setStudentScores(emptyStudents);
    }
  }, [students]);

  // Handle score change for a student
  const handleScoreChange = (
    studentId: string,
    field: keyof StudentType,
    value: any
  ) => {
    setStudentScores((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, [field]: value } : student
      )
    );
  };

  // Calculate total score and grade based on components
  const calculateScores = () => {
    const updatedStudents = studentScores.map((student) => {
      const attendance = student.attendance || 0;
      const assignment = student.assignment || 0;
      const midterm = student.midterm || 0;
      const final = student.final || 0;

      // Calculate weighted total
      const total = Number(
        (
          (attendance * calculationFormula.attendance) / 100 +
          (assignment * calculationFormula.assignment) / 100 +
          (midterm * calculationFormula.midterm) / 100 +
          (final * calculationFormula.final) / 100
        ).toFixed(2)
      );

      // Determine grade based on total
      let grade = "F";
      if (total >= 90) grade = "A";
      else if (total >= 85) grade = "B+";
      else if (total >= 80) grade = "B";
      else if (total >= 75) grade = "C+";
      else if (total >= 70) grade = "C";
      else if (total >= 65) grade = "D+";
      else if (total >= 60) grade = "D";
      else if (total >= 50) grade = "E";

      return {
        ...student,
        total,
        grade,
      };
    });

    setStudentScores(updatedStudents);
  };

  // Handle formula weight change
  const handleFormulaChange = (field: string, value: number) => {
    setCalculationFormula((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle file upload for batch import
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real implementation, you would parse the CSV/Excel file
    alert("File upload functionality would be implemented here");
  };

  // Handle save scores
  const handleSaveScores = () => {
    // Calculate final scores before saving
    calculateScores();

    // In a real app, this would save to a database
    onSave(studentScores);
  };

  return (
    <div className="w-full">
      <div className="container mx-auto p-4">
        <div className="flex items-center border-b pb-2">
          <h1 className="text-xl font-medium border-l-4 border-emerald-700 pl-2">
            Student list in class
          </h1>
          <span className="text-gray-500 ml-4">
            Institute Management System
          </span>
        </div>

        <div className="flex items-center justify-between my-4">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={onBack}
            >
              <ChevronLeft className="h-4 w-4" />
              BACK
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/home">Home</Link>
            <span>&gt;</span>
            <span>Student list</span>
          </div>
        </div>

        <div className="border-t-4 border-emerald-700 mt-4"></div>

        <div className="my-4">
          <div className="flex items-center gap-2">
            <span>Export as:</span>
            <Button
              variant="outline"
              size="sm"
              className="bg-green-600 text-white hover:bg-green-700 gap-1"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Excel
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-red-600 text-white hover:bg-red-700 gap-1"
            >
              <FilePdf className="h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>

        <Card className="mt-4">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-100 p-4">
              <div>
                <div className="mb-2">
                  <span className="font-medium">Subject code: </span>
                  <span>
                    {subject.code} - {subject.codeDetails}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-medium">Subject: </span>
                  <span className="text-blue-600">{subject.title}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium">Semester: </span>
                  <span>{subject.semester}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium">Academy year: </span>
                  <span>{subject.academicYear}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium">Total students: </span>
                  <span>{subject.totalStudents}</span>
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <span className="font-medium">Class: </span>
                  <span>{subject.classId}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium">Dep: </span>
                  <span>{subject.department}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium">Maj: </span>
                  <span>{subject.major}</span>
                </div>
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full p-4"
            >
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="individual">Individual Entry</TabsTrigger>
                <TabsTrigger value="batch">Batch Import</TabsTrigger>
                <TabsTrigger value="formula">Score Formula</TabsTrigger>
              </TabsList>

              <TabsContent value="individual" className="space-y-4">
                <div className="flex justify-end gap-2 mb-4">
                  <Button
                    variant="outline"
                    onClick={calculateScores}
                    className="gap-2"
                  >
                    <Calculator className="h-4 w-4" />
                    Calculate Totals & Grades
                  </Button>
                </div>

                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-100">
                        <TableHead className="text-center">No.</TableHead>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-center">
                          Attendance
                          <div className="text-xs text-gray-500">
                            {calculationFormula.attendance}%
                          </div>
                        </TableHead>
                        <TableHead className="text-center">
                          Assignment
                          <div className="text-xs text-gray-500">
                            {calculationFormula.assignment}%
                          </div>
                        </TableHead>
                        <TableHead className="text-center">
                          Midterm
                          <div className="text-xs text-gray-500">
                            {calculationFormula.midterm}%
                          </div>
                        </TableHead>
                        <TableHead className="text-center">
                          Final
                          <div className="text-xs text-gray-500">
                            {calculationFormula.final}%
                          </div>
                        </TableHead>
                        <TableHead className="text-center">Total</TableHead>
                        <TableHead className="text-center">Grade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentScores.length > 0 ? (
                        studentScores.map((student, index) => (
                          <TableRow key={student.id}>
                            <TableCell className="text-center">
                              {index + 1}
                            </TableCell>
                            <TableCell>{student.id}</TableCell>
                            <TableCell>{student.fullnameEn}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={student.attendance || ""}
                                onChange={(e) =>
                                  handleScoreChange(
                                    student.id,
                                    "attendance",
                                    Number(e.target.value)
                                  )
                                }
                                className="w-16 mx-auto text-center"
                                min="0"
                                max="100"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={student.assignment || ""}
                                onChange={(e) =>
                                  handleScoreChange(
                                    student.id,
                                    "assignment",
                                    Number(e.target.value)
                                  )
                                }
                                className="w-16 mx-auto text-center"
                                min="0"
                                max="100"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={student.midterm || ""}
                                onChange={(e) =>
                                  handleScoreChange(
                                    student.id,
                                    "midterm",
                                    Number(e.target.value)
                                  )
                                }
                                className="w-16 mx-auto text-center"
                                min="0"
                                max="100"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={student.final || ""}
                                onChange={(e) =>
                                  handleScoreChange(
                                    student.id,
                                    "final",
                                    Number(e.target.value)
                                  )
                                }
                                className="w-16 mx-auto text-center"
                                min="0"
                                max="100"
                              />
                            </TableCell>
                            <TableCell className="text-center font-medium">
                              {student.total !== undefined
                                ? student.total
                                : "-"}
                            </TableCell>
                            <TableCell className="text-center font-medium">
                              {student.grade || "-"}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={9}
                            className="text-center py-8 text-gray-500"
                          >
                            No students found. Please add students to this class
                            first.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="batch" className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-md mb-4">
                  <h3 className="font-medium mb-2">
                    Batch Import Instructions
                  </h3>
                  <p className="text-sm mb-2">
                    Upload a CSV or Excel file with the following columns:
                  </p>
                  <ul className="text-sm list-disc pl-5 mb-4">
                    <li>Student ID (required)</li>
                    <li>Attendance (0-100)</li>
                    <li>Assignment (0-100)</li>
                    <li>Midterm (0-100)</li>
                    <li>Final (0-100)</li>
                  </ul>
                  <p className="text-sm">
                    Download the template below to get started.
                  </p>
                </div>

                <div className="flex flex-col gap-4 items-center justify-center py-8 border-2 border-dashed rounded-md">
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download Template
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button className="gap-2">
                      <FileUp className="h-4 w-4" />
                      Upload Score File
                    </Button>
                    <Input
                      type="file"
                      className="hidden"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                      id="score-file-upload"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="formula" className="space-y-4">
                <div className="bg-amber-50 p-4 rounded-md mb-4">
                  <h3 className="font-medium mb-2">
                    Score Calculation Formula
                  </h3>
                  <p className="text-sm">
                    Set the weight for each component. The total must equal
                    100%.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Attendance Weight (%)
                    </label>
                    <Input
                      type="number"
                      value={calculationFormula.attendance}
                      onChange={(e) =>
                        handleFormulaChange(
                          "attendance",
                          Number(e.target.value)
                        )
                      }
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Assignment Weight (%)
                    </label>
                    <Input
                      type="number"
                      value={calculationFormula.assignment}
                      onChange={(e) =>
                        handleFormulaChange(
                          "assignment",
                          Number(e.target.value)
                        )
                      }
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Midterm Weight (%)
                    </label>
                    <Input
                      type="number"
                      value={calculationFormula.midterm}
                      onChange={(e) =>
                        handleFormulaChange("midterm", Number(e.target.value))
                      }
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Final Weight (%)
                    </label>
                    <Input
                      type="number"
                      value={calculationFormula.final}
                      onChange={(e) =>
                        handleFormulaChange("final", Number(e.target.value))
                      }
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <div
                    className={`text-right font-medium ${
                      calculationFormula.attendance +
                        calculationFormula.assignment +
                        calculationFormula.midterm +
                        calculationFormula.final ===
                      100
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Total:{" "}
                    {calculationFormula.attendance +
                      calculationFormula.assignment +
                      calculationFormula.midterm +
                      calculationFormula.final}
                    %
                    {calculationFormula.attendance +
                      calculationFormula.assignment +
                      calculationFormula.midterm +
                      calculationFormula.final !==
                      100 && " (Must equal 100%)"}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium mb-2">Grade Scale</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>A: 90-100%</div>
                    <div>B+: 85-89%</div>
                    <div>B: 80-84%</div>
                    <div>C+: 75-79%</div>
                    <div>C: 70-74%</div>
                    <div>D+: 65-69%</div>
                    <div>D: 60-64%</div>
                    <div>E: 50-59%</div>
                    <div>F: 0-49%</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="p-4 flex justify-end gap-2">
              <Button
                variant="outline"
                className="gap-1 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={onBack}
              >
                <X className="h-4 w-4" />
                CANCEL
              </Button>
              <Button
                className={`${
                  subject.academicYear === "2024"
                    ? "bg-emerald-700 hover:bg-emerald-800"
                    : "bg-blue-600 hover:bg-blue-700"
                } gap-1`}
                onClick={handleSaveScores}
              >
                <Save className="h-4 w-4" />
                {subject.academicYear === "2024"
                  ? "UPDATE SCORES"
                  : "SAVE SCORES"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
