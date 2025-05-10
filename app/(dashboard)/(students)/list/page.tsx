"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaginationPage from "@/components/shared/pagination";
import { AllPaginationStudentResponse } from "@/model/student/student.model";
import { getStudents } from "@/service/dashboard/student.service";

export default function StudentsListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [academicYear, setAcademicYear] = useState("2024");
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState<AllPaginationStudentResponse | null>(
    null
  );

  const loadUsers = async () => {
    try {
      const response: AllPaginationStudentResponse = await getStudents(
        currentPage,
        10
      );
      setStudents(response);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [currentPage]);
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="border-l-4 border-green-600 pl-2">
          <h1 className="text-xl font-medium">Student list</h1>
          <p className="text-sm text-muted-foreground">
            Institute Management System
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/home">Home</Link>
          <span className="text-muted-foreground">›</span>
          <span>Students</span>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="p-4">
          <Link href="/students/add-single">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add new
            </Button>
          </Link>
        </div>

        <div className="border-t p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Select value={academicYear} onValueChange={setAcademicYear}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="ឆ្នាំសិក្សា 2024" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2022">ឆ្នាំសិក្សា 2022</SelectItem>
                <SelectItem value="2023">ឆ្នាំសិក្សា 2023</SelectItem>
                <SelectItem value="2024">ឆ្នាំសិក្សា 2024</SelectItem>
                <SelectItem value="2025">ឆ្នាំសិក្សា 2025</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="ថ្នាក់រៀន" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="234012">234012</SelectItem>
                <SelectItem value="234013">234013</SelectItem>
                <SelectItem value="234014">234014</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex flex-1 items-center gap-2">
              <Input
                type="search"
                placeholder="Enter student name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-green-600 hover:bg-green-700">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-[50px] text-center">#</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Fullname (KH)</TableHead>
                <TableHead>Fullname (EN)</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Date of birth</TableHead>
                <TableHead>Class code</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students?.content.map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.nameKh}</TableCell>
                  <TableCell>{student.nameEn}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>{student.dob}</TableCell>
                  <TableCell>{student.classCode}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-blue-500 text-white hover:bg-blue-600"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-amber-500 text-white hover:bg-amber-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-red-500 text-white hover:bg-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {students && students.totalPages > 1 && (
          <PaginationPage
            currentPage={students.pageNo}
            totalPages={students.totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            className="border-t p-4"
          />
        )}
      </div>
    </div>
  );
}
