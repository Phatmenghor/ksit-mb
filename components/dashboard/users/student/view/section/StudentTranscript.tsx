import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

interface Course {
  subjectCode: string;
  subjectName: string;
  credit: number;
  grade: string;
}

interface SemesterData {
  semester: string;
  courses: Course[];
  totalCredit: number;
  gpa: number;
}

interface StudentInfo {
  studentId: string;
  studentName: string;
  dateOfBirth: string;
  department: string;
  major: string;
  degree: string;
}

interface TranscriptSummary {
  creditsStudied: number;
  creditsTransferred: number;
  totalCreditsEarned: number;
  cumulativeGPA: number;
}

const StudentTranscript = () => {
  const studentInfo: StudentInfo = {
    studentId: "Placeholder",
    studentName: "Placeholder",
    dateOfBirth: "Placeholder",
    department: "Placeholder",
    major: "Placeholder",
    degree: "Placeholder",
  };

  const semesterData: SemesterData[] = [
    {
      semester: "1st Semester, 1st Year",
      courses: [
        { subjectCode: "---", subjectName: "---", credit: 0, grade: "---" },
        { subjectCode: "---", subjectName: "---", credit: 0, grade: "---" },
        { subjectCode: "---", subjectName: "---", credit: 0, grade: "---" },
        { subjectCode: "---", subjectName: "---", credit: 0, grade: "---" },
        { subjectCode: "---", subjectName: "---", credit: 0, grade: "---" },
      ],
      totalCredit: 0,
      gpa: 0,
    },
    {
      semester: "2nd Semester, 1st Year",
      courses: [],
      totalCredit: 0,
      gpa: 0,
    },
    {
      semester: "1st Semester, 2nd Year",
      courses: [],
      totalCredit: 0,
      gpa: 0,
    },
    {
      semester: "2nd Semester, 2nd Year",
      courses: [],
      totalCredit: 0,
      gpa: 0,
    },
  ];

  const transcriptSummary: TranscriptSummary = {
    creditsStudied: 0,
    creditsTransferred: 0,
    totalCreditsEarned: 0,
    cumulativeGPA: 0,
  };

  const renderSemesterTable = (semesterInfo: SemesterData) => (
    <Card>
      <CardContent className="p-6">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-center mb-4 text-gray-800">
            {semesterInfo.semester}
          </h3>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black text-white">
                <th className="border border-gray-300 px-4 py-3 text-left font-medium">
                  Subject Code
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-medium">
                  Subject Name
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-medium">
                  Credit
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-medium">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>
              {semesterInfo.courses.length > 0 ? (
                semesterInfo.courses.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">
                      {course.subjectCode}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">
                      {course.subjectName}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">
                      {course.credit || "---"}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">
                      {course.grade}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="border border-gray-300 px-4 py-8 text-center text-gray-400"
                  >
                    No Record
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-end mt-4 space-x-8 text-sm font-medium">
            <span>Total Credit: {semesterInfo.totalCredit}</span>
            <span>GPA: {semesterInfo.gpa}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card>
      <CardContent className="p-10">
        <div className="max-w-7xl mx-auto space-y-5 border-2 rounded-xl p-7 border-green-900 bg-gray-50 min-h-screen shadow-[13px_13px_0px_0px_rgba(20,83,45,1)]">
          <Card className="shadow-none border-none ">
            <CardContent className="bg-green-900 rounded-lg space-y-3 text-white p-6">
              {/* Student Information Header */}

              <h1 className="text-2xl font-bold text-center ">
                Student Information
              </h1>

              <Separator />

              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Student ID:</span>
                  <span>{studentInfo.studentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Department:</span>
                  <span>{studentInfo.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Student Name:</span>
                  <span>{studentInfo.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Major:</span>
                  <span>{studentInfo.major}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date of Birth:</span>
                  <span>{studentInfo.dateOfBirth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Degree:</span>
                  <span>{studentInfo.degree}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Records */}
          <div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8">
              {semesterData.map((semester, index) => (
                <div key={index} className="w-full">
                  {renderSemesterTable(semester)}
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="mt-12 bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-center mb-6 text-gray-800">
                Total for first and second semester
              </h3>

              <div className="border-t border-gray-300 pt-6">
                <div className="grid grid-cols-1 gap-4 text-gray-700">
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">
                      Number of Credits Studied:
                    </span>
                    <span className="font-semibold">---</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">
                      Number of Credits Transferred:
                    </span>
                    <span className="font-semibold">---</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">
                      Total Number of Credits Earned:
                    </span>
                    <span className="font-semibold">---</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">
                      Cumulative grade point average:
                    </span>
                    <span className="font-semibold">---</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentTranscript;
