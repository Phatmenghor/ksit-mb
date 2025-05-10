"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Filter, Plus, FileText, Eye, Download, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface ScoreSubmission {
  id: string;
  subjectCode: string;
  subjectName: string;
  classId: string;
  semester: string;
  academicYear: string;
  submittedBy: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
}
interface ScoreSubmittedPageProps {
  onViewSubmission: (id: string) => void;
  onNewSubmission: () => void;
}

export function ScoreSubmittedPage({
  onViewSubmission,
  onNewSubmission,
}: ScoreSubmittedPageProps) {
  const [year, setYear] = useState("2025");
  const [semester, setSemester] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [submissions, setSubmissions] = useState<ScoreSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle search/filter
  const handleSearch = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, we'll show some data if specific filters are applied
      if (year === "2024" && semester === "2") {
        setSubmissions([
          {
            id: "1",
            subjectCode: "401220",
            subjectName: "Project in Computer Science 1",
            classId: "234012",
            semester: "2",
            academicYear: "2024",
            submittedBy: "Tong Vuthea",
            submittedDate: "2024-04-15 14:30:22",
            status: "approved",
          },
          {
            id: "2",
            subjectCode: "401204",
            subjectName: "Data Communication and Network",
            classId: "234012",
            semester: "2",
            academicYear: "2024",
            submittedBy: "Tong Vuthea",
            submittedDate: "2024-04-10 09:15:45",
            status: "approved",
          },
        ]);
      } else if (year === "2025" && semester === "1") {
        setSubmissions([
          {
            id: "3",
            subjectCode: "401101",
            subjectName: "Computer Assembly and Software Installation",
            classId: "254013",
            semester: "1",
            academicYear: "2025",
            submittedBy: "Tong Vuthea",
            submittedDate: "2025-05-03 16:42:10",
            status: "pending",
          },
        ]);
      } else {
        setSubmissions([]);
      }

      setIsLoading(false);
    }, 500);
  };

  // Function to handle new submission
  const handleNewSubmission = () => {
    // Navigate to score input page
    console.log("Navigate to new score submission page");
  };

  // Function to handle accept list
  const handleAcceptList = () => {
    // Logic to accept selected submissions
    console.log("Accept selected submissions");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center border-b pb-2">
        <h1 className="text-xl font-medium border-l-4 border-emerald-700 pl-2">
          Student score submitted
        </h1>
        <span className="text-gray-500 ml-4">Institute Management System</span>
      </div>

      <div className="flex items-center justify-between my-4">
        <div className="flex-1"></div>
        <div className="flex items-center gap-2">
          <Link href="/home">Home</Link>
          <span>&gt;</span>
          <span>Score submitted</span>
        </div>
      </div>

      <div className="border-t-4 border-emerald-700 mt-4 mb-6"></div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <Button
            variant="default"
            className="bg-emerald-600 hover:bg-emerald-700 gap-1"
            onClick={handleNewSubmission}
          >
            <Plus className="h-4 w-4" />
            New
          </Button>
          <Button
            variant="outline"
            className="gap-1"
            onClick={handleAcceptList}
          >
            <FileText className="h-4 w-4" />
            Accept list
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </div>

          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">Year: 2025</SelectItem>
              <SelectItem value="2024">Year: 2024</SelectItem>
              <SelectItem value="2023">Year: 2023</SelectItem>
            </SelectContent>
          </Select>

          <Select value={semester} onValueChange={setSemester}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Semester 1</SelectItem>
              <SelectItem value="2">Semester 2</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="By Teacher ID or Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[250px]"
          />

          <Button variant="outline" size="sm" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
            </div>
          ) : submissions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="w-[50px]">
                    <Input type="checkbox" className="rounded" />
                  </TableHead>
                  <TableHead>Subject Code</TableHead>
                  <TableHead>Subject Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Submitted Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <Input type="checkbox" className="rounded" />
                    </TableCell>
                    <TableCell>{submission.subjectCode}</TableCell>
                    <TableCell className="font-medium text-blue-600">
                      {submission.subjectName}
                    </TableCell>
                    <TableCell>{submission.classId}</TableCell>
                    <TableCell>{submission.semester}</TableCell>
                    <TableCell>{submission.academicYear}</TableCell>
                    <TableCell>{submission.submittedBy}</TableCell>
                    <TableCell>{submission.submittedDate}</TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p>Score submitted no record.</p>
              <p className="text-sm mt-2">
                Use the filters above to search for submitted scores or click
                "New" to create a new submission.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
