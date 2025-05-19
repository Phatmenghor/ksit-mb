// AttendanceCheckPage.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROUTE } from "@/constants/routes";
import { Clock, Users, MapPin, ArrowLeft, RefreshCcw } from "lucide-react";
import { useParams } from "next/navigation";
import { getDetailScheduleService } from "@/service/schedule/schedule.service";
import { ScheduleModel } from "@/model/schedule/schedule/schedule-model";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { QRCodeSection } from "@/components/dashboard/attendance/qr-code-section";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Mock data for student list
const students = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  studentId: "123412",
  name: "KSIT Student",
  attendance: "",
  type: "",
  checkInTime: "---",
  comment: "",
}));

const AttendanceCheckPage = () => {
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;
  const [scheduleDetail, setScheduleDetail] = useState<ScheduleModel | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState(students);

  // Function to load schedule data
  const loadScheduleData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await getDetailScheduleService(id);
      setScheduleDetail(response);

      // For demonstration purposes, setting some initial attendance stats
      // In a real application, you would fetch these from your backend
    } catch (error) {
      toast.error("Error fetching schedule data");
      console.error("Error fetching class data:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Load schedule data on component mount
  useEffect(() => {
    loadScheduleData();
  }, [loadScheduleData]);

  // Function to update attendance stats
  // This would be called periodically in a real application to get updated stats
  const updateAttendanceStats = useCallback(async () => {
    if (!id) return;
    try {
      // In a real app, you would call an API endpoint here
      // For example: const stats = await getAttendanceStatsService(id);
    } catch (error) {
      console.error("Error updating attendance stats:", error);
    }
  }, [id]);

  // Set up a periodic check for attendance stats
  useEffect(() => {
    if (!id) return;

    // In a real application, you would poll the server for updates
    // This is just for demonstration
    const intervalId = setInterval(() => {
      // Only update if there's a chance of someone being present (random for demo)
      if (Math.random() > 0.7) {
        updateAttendanceStats();
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(intervalId);
  }, [id, updateAttendanceStats]);

  return (
    <div>
      <Card>
        <CardContent className="p-6 space-y-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={ROUTE.DASHBOARD}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Schedule</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Class</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center mb-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/manage-class-schedule">
                <ArrowLeft className="h-6 w-6" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold">
              {scheduleDetail?.course?.nameEn ||
                scheduleDetail?.course?.nameKH ||
                ""}
            </h1>
          </div>

          {!loading && scheduleDetail && (
            <Card
              key={scheduleDetail.id}
              className="overflow-hidden bg-amber-50/50 transition-all"
            >
              <CardContent className="p-0">
                <div>
                  <div className="p-4 flex-1">
                    <div className="flex gap-4">
                      <div className="flex border-l-4 border-amber-500 rounded-xl" />
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-1 justify-between">
                          <div className="text-sm font-medium text-amber-500">
                            {scheduleDetail.course?.code || "- - -"}
                          </div>
                          <span className="text-sm font-medium text-muted-foreground">
                            {scheduleDetail.day || "- - -"}
                          </span>
                        </div>
                        <div className="text-sm font-medium">
                          {scheduleDetail.course?.nameEn ||
                            scheduleDetail.course?.nameKH ||
                            "- - -"}
                        </div>
                      </div>
                    </div>

                    <Separator className="my-2" />

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>
                          {scheduleDetail.startTime} - {scheduleDetail.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>
                          {(scheduleDetail.teacher &&
                            (scheduleDetail.teacher.englishFirstName ||
                            scheduleDetail.teacher.englishLastName
                              ? `${
                                  scheduleDetail.teacher.englishFirstName || ""
                                } ${
                                  scheduleDetail.teacher.englishLastName || ""
                                }`.trim()
                              : scheduleDetail.teacher.khmerFirstName ||
                                scheduleDetail.teacher.khmerLastName
                              ? `${
                                  scheduleDetail.teacher.khmerFirstName || ""
                                } ${
                                  scheduleDetail.teacher.khmerLastName || ""
                                }`.trim()
                              : "- - -")) ||
                            "- - -"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{scheduleDetail.room?.name || "- - -"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Use our enhanced QR Code component */}
      {scheduleDetail && <QRCodeSection sessionId={scheduleDetail.id} />}

      <Card className="mt-4">
        <CardHeader className="flex flex-row items-center justify-between ">
          <CardTitle className="text-base font-medium">
            Attendance - Student List
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white border-0"
            >
              Submit Attendance
            </Button>
          </div>
        </CardHeader>

        <div className="px-6">
          <Separator className="mb-4 px-8 flex-1 w-full" />
        </div>

        <CardContent>
          <div className="flex justify-start gap-4 text-sm mb-4">
            <div>
              Total Student: <span className="font-medium">10</span>
            </div>
            <div>
              Total Present: <span className="font-medium">0</span>
            </div>
            <div>
              Total Absent: <span className="font-medium">0</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Check-in Time</TableHead>
                  <TableHead>Comments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y">
                {studentData.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell className="py-2 px-3">{student.id}</TableCell>
                    <TableCell className="py-2 px-3">
                      {student.studentId}
                    </TableCell>
                    <TableCell className="py-2 px-3">{student.name}</TableCell>
                    <TableCell className="py-2 px-3">
                      <Select>
                        <SelectTrigger className="h-8 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">Present</SelectItem>
                          <SelectItem value="absent">Absent</SelectItem>
                          <SelectItem value="late">Late</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <Select>
                        <SelectTrigger className="h-8 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excused">Excused</SelectItem>
                          <SelectItem value="unexcused">Unexcused</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      {student.checkInTime}
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <Input
                        placeholder="Add Comment"
                        className="h-8 text-sm"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceCheckPage;
