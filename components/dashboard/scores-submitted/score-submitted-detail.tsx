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
} from "lucide-react";
import Link from "next/link";

interface ScoreSubmissionDetailProps {
  id: string;
  onBack: () => void;
}

export function ScoreSubmissionDetail({
  id,
  onBack,
}: ScoreSubmissionDetailProps) {
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
    <div className="container mx-auto p-4">
      <div className="flex items-center border-b pb-2">
        <h1 className="text-xl font-medium border-l-4 border-emerald-700 pl-2">
          Score submission details
        </h1>
        <span className="text-gray-500 ml-4">Institute Management System</span>
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
          <Link href="/score-submitted">Score submitted</Link>
          <span>&gt;</span>
          <span>Details</span>
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

      <Card className="mb-6">
        <CardHeader className="bg-slate-100 pb-2">
          <CardTitle className="text-lg">Submission Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            <div>
              <div className="mb-2">
                <span className="font-medium">Subject code: </span>
                <span>
                  {submission.subjectCode} - {submission.subjectDetails}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Subject: </span>
                <span className="text-blue-600">{submission.subjectName}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Semester: </span>
                <span>{submission.semester}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Academy year: </span>
                <span>{submission.academicYear}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Total students: </span>
                <span>{submission.totalStudents}</span>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <span className="font-medium">Class: </span>
                <span>{submission.classId}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Dep: </span>
                <span>{submission.department}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Maj: </span>
                <span>{submission.major}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Submitted by: </span>
                <span>{submission.submittedBy}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Submitted date: </span>
                <span>{submission.submittedDate}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Status: </span>
                <Badge
                  className={
                    submission.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : submission.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {submission.status.charAt(0).toUpperCase() +
                    submission.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="bg-slate-100 pb-2">
          <CardTitle className="text-lg">Score Formula</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
            <div>
              <span className="font-medium">Attendance: </span>
              <span>{submission.formula.attendance}%</span>
            </div>
            <div>
              <span className="font-medium">Assignment: </span>
              <span>{submission.formula.assignment}%</span>
            </div>
            <div>
              <span className="font-medium">Midterm: </span>
              <span>{submission.formula.midterm}%</span>
            </div>
            <div>
              <span className="font-medium">Final: </span>
              <span>{submission.formula.final}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-slate-100 pb-2">
          <CardTitle className="text-lg">Student Scores</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-center">No.</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Fullname ខ្មែរ</TableHead>
                <TableHead>Fullname EN</TableHead>
                <TableHead className="text-center">Attendance</TableHead>
                <TableHead className="text-center">Assignment</TableHead>
                <TableHead className="text-center">Midterm</TableHead>
                <TableHead className="text-center">Final</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submission.students.map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.fullnameKh}</TableCell>
                  <TableCell>{student.fullnameEn}</TableCell>
                  <TableCell className="text-center">
                    {student.attendance}
                  </TableCell>
                  <TableCell className="text-center">
                    {student.assignment}
                  </TableCell>
                  <TableCell className="text-center">
                    {student.midterm}
                  </TableCell>
                  <TableCell className="text-center">{student.final}</TableCell>
                  <TableCell className="text-center font-medium">
                    {student.total}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className="bg-blue-500">{student.grade}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
