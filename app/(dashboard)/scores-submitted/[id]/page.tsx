"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  FileSpreadsheet,
  FileIcon as FilePdf,
  Check,
  X,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import StudentScoreHeader from "@/components/dashboard/student-scores/layout/header-section";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function ScoreSubmissionDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // In a real app, you would fetch the submission details based on the ID
  const [submission] = useState({
    id,
    subjectCode: "401101",
    subjectName: "Computer Assembly and Software Installation",
    subjectDetails: "3(2.1.0)",
    classId: "254013",
    department: "Computer Science",
    major: "បច្ចេកវិទ្យាព័ត៌មាន",
    semester: "1",
    academicYear: "2025",
    submittedBy: "Tong Vuthea",
    submittedDate: "2025-05-03 16:42:10",
    status: "pending",
    totalStudents: 3,
    students: [
      {
        id: "234012001",
        fullnameKh: "រ៉ូ វិសាល",
        fullnameEn: "KAO VISAL",
        gender: "Male",
        birthDate: "13-Jun-2002",
        attendance: 90,
        assignment: 85,
        midterm: 78,
        final: 82,
        total: 82.5,
        grade: "B",
      },
      {
        id: "234012002",
        fullnameKh: "ខន កុសល",
        fullnameEn: "KHORN KOSORL",
        gender: "Male",
        birthDate: "20-Jun-2005",
        attendance: 95,
        assignment: 88,
        midterm: 85,
        final: 87,
        total: 87.8,
        grade: "B+",
      },
      {
        id: "234012003",
        fullnameKh: "ខាន ភារ៉ុម",
        fullnameEn: "KHAN PHEARUM",
        gender: "Male",
        birthDate: "17-Jun-2005",
        attendance: 92,
        assignment: 90,
        midterm: 82,
        final: 88,
        total: 87.2,
        grade: "B+",
      },
    ],
    formula: {
      attendance: 10,
      assignment: 20,
      midterm: 30,
      final: 40,
    },
  });

  const handleApprove = () => {
    // Logic to approve the submission
    console.log("Approve submission", id);
  };

  const handleReject = () => {
    // Logic to reject the submission
    console.log("Reject submission", id);
  };

  return (
    <div className="container space-y-4 p-4">
      <StudentScoreHeader title="View Score Submitted Detail" />

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-bold">
            Submitting Approval
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline">Return</Button>
            <Button>Accept</Button>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between w-full">
          <div>
            <CardTitle className="font-bold text-xl">Student List</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-muted-foreground mb-4">
            Total Students:{" "}
            <span className="font-bold">
              {students?.studentScores.length || 0}
            </span>
          </p>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-black hover:bg-black">
                  <TableHead className="text-white w-12">#</TableHead>
                  <TableHead className="text-white">Student ID</TableHead>
                  <TableHead className="text-white">Fullname</TableHead>
                  <TableHead className="text-white text-center">
                    Att. (10%)
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Ass. (30%)
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Mid. (30%)
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Final (30%)
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Total
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Grade
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students?.studentScores.map((student, index) => {
                  const indexDisplay = index + 1;

                  return (
                    <TableRow key={student.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {indexDisplay}
                      </TableCell>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell className="font-medium">
                        {student.studentName}
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <Input
                            type="number"
                            value={student.attendanceScore}
                            className="w-20 text-center"
                            min="0"
                            max="100"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <Input
                            type="number"
                            value={student.assignmentScore}
                            className="w-20 text-center"
                            min="0"
                            max="100"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <Input
                            type="number"
                            value={student.midtermScore}
                            className="w-20 text-center"
                            min="0"
                            max="100"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="relative"></div>
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        {student.totalScore}
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`font-bold px-2 py-1 rounded text-sm ${
                            student.grade === "A"
                              ? "bg-green-100 text-green-800"
                              : student.grade === "B"
                              ? "bg-blue-100 text-blue-800"
                              : student.grade === "C"
                              ? "bg-yellow-100 text-yellow-800"
                              : student.grade === "D"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {student.grade}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {submission.status === "pending" && (
        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="outline"
            className="gap-1 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={handleReject}
          >
            <X className="h-4 w-4" />
            REJECT
          </Button>
          <Button
            className="bg-emerald-700 hover:bg-emerald-800 gap-1"
            onClick={handleApprove}
          >
            <Check className="h-4 w-4" />
            APPROVE
          </Button>
        </div>
      )}

      {submission.status === "approved" && (
        <div className="flex justify-center bg-green-50 p-4 rounded-md mt-6">
          <div className="flex items-center gap-2 text-green-700">
            <Check className="h-5 w-5" />
            <span>
              This submission has been approved and the scores have been
              recorded in the system.
            </span>
          </div>
        </div>
      )}

      {submission.status === "rejected" && (
        <div className="flex justify-center bg-red-50 p-4 rounded-md mt-6">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            <span>
              This submission has been rejected. Please contact the
              administrator for more information.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
