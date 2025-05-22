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
import {
  Clock,
  Users,
  MapPin,
  ArrowLeft,
  RefreshCcw,
  Play,
} from "lucide-react";
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
import { getAllAttedanceGenerateService } from "@/service/schedule/attendance.service";
import { AttendanceGenerateModel } from "@/model/schedule/attendance/attendance-generate";

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
  const [attendanceGenerate, setAttendanceGenerate] =
    useState<AttendanceGenerateModel | null>(null);

  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState(students);
  const [isInitialized, setIsInitialized] = useState(false);

  // Function to load schedule data
  const loadScheduleData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await getDetailScheduleService(id);
      setScheduleDetail(response);
    } catch (error) {
      toast.error("Error fetching schedule data");
      console.error("Error fetching class data:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const loadAttendanceData = useCallback(async () => {
    if (!scheduleDetail?.id) return;
    setLoading(true);
    try {
      const response = await getAllAttedanceGenerateService({
        scheduleId: scheduleDetail.id,
      });
      setAttendanceGenerate(response);
    } catch (error) {
      toast.error("Error fetching attendance data");
      console.error("Error fetching attendance data:", error);
    } finally {
      setLoading(false);
    }
  }, [scheduleDetail]);

  useEffect(() => {
    loadScheduleData();
  }, [id]);

  const handleInitializeSession = async () => {
    await loadAttendanceData();
  };

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
                "Attendance Check"}
            </h1>
          </div>

          <Card
            key={scheduleDetail?.id}
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
                          {scheduleDetail?.course?.code || "- - -"}
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">
                          {scheduleDetail?.day || "- - -"}
                        </span>
                      </div>
                      <div className="text-sm font-medium">
                        {scheduleDetail?.course?.nameEn ||
                          scheduleDetail?.course?.nameKH ||
                          "- - -"}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {scheduleDetail?.startTime} - {scheduleDetail?.endTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>
                        {(scheduleDetail?.teacher &&
                          (scheduleDetail.teacher.englishFirstName ||
                          scheduleDetail.teacher.englishLastName
                            ? `${
                                scheduleDetail.teacher.englishFirstName || ""
                              } ${
                                scheduleDetail.teacher.englishLastName || ""
                              }`.trim()
                            : scheduleDetail.teacher.khmerFirstName ||
                              scheduleDetail.teacher.khmerLastName
                            ? `${scheduleDetail.teacher.khmerFirstName || ""} ${
                                scheduleDetail.teacher.khmerLastName || ""
                              }`.trim()
                            : "- - -")) ||
                          "- - -"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{scheduleDetail?.room?.name || "- - -"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Initialize Session Button */}
      {!isInitialized && (
        <Card className="mt-4">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="text-lg font-medium text-muted-foreground">
                Ready to start attendance session?
              </div>
              <div className="text-sm text-muted-foreground max-w-md">
                Click the button below to load the class schedule and initialize
                the attendance tracking session.
              </div>
              <Button
                onClick={handleInitializeSession}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                {loading ? (
                  <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                {loading ? "Loading..." : "Initialize Attendance Session"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* QR Code Section - Only show after initialization */}
      {attendanceGenerate && (
        <QRCodeSection sessionId={attendanceGenerate?.id} />
      )}

      {/* Student List - Only show after initialization */}
      {attendanceGenerate && (
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
                Total Student:{" "}
                <span className="font-medium">
                  {attendanceGenerate.attendances.length || 0}
                </span>
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
                  {attendanceGenerate.attendances.map((student) => (
                    <TableRow key={student.id} className="hover:bg-gray-50">
                      <TableCell className="py-2 px-3">{student.id}</TableCell>
                      <TableCell className="py-2 px-3">
                        {student.studentId}
                      </TableCell>
                      <TableCell className="py-2 px-3">
                        {student.studentName || "- - -"}
                      </TableCell>
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
                        {/* {student.checkInTime} */}
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
      )}
    </div>
  );
};

export default AttendanceCheckPage;
