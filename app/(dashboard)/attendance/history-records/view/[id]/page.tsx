"use client";

import StudentScoreHeader from "@/components/dashboard/student-scores/layout/header-section";
import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { getDetailScheduleService } from "@/service/schedule/schedule.service";
import { ScheduleModel } from "@/model/schedules/all-schedule-model";
import Loading from "@/app/(dashboard)/settings/theme/loading";
import {
  getAllAttendanceGenerateService,
  getAttendanceSessionByIdService,
  getAttendanceSessionService,
} from "@/service/schedule/attendance.service";
import {
  AllAttendanceModel,
  AttendanceModel,
} from "@/model/schedule/attendance/attendance-get";
import { useExportAttendanceHandlers } from "@/components/shared/export/attendance-export-handler";

export default function HistoryRecordDetailPage() {
  const [isInitialized, setIsInitialized] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [scheduleDetail, setScheduleDetail] = useState<ScheduleModel | null>(
    null
  );
  const [attendance, setAttendance] = useState<AllAttendanceModel | null>(null);

  const params = useParams();
  const id = params?.id ? Number(params.id) : null;

  const { handleExportToExcel } = useExportAttendanceHandlers(
    attendance,
    scheduleDetail
  );

  const loadScheduleData = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await getDetailScheduleService(Number(id));
      console.log("Schedule detail response:", response);

      setScheduleDetail(response);
    } catch (error) {
      toast.error("Error fetching schedule data");
      console.error("Error fetching class data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const loadAttendanceData = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await getAllAttendanceGenerateService({
        scheduleId: id,
      });
      console.log("Schedule detail response:", response);

      setAttendance(response);
    } catch (error) {
      toast.error("Error fetching schedule data");
      console.error("Error fetching class data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id && !isInitialized) {
      loadScheduleData();
      loadAttendanceData();
      setIsInitialized(true);
    }
  }, [id, isInitialized, loadScheduleData, loadAttendanceData]);

  return (
    <div className="space-y-4">
      <StudentScoreHeader schedule={scheduleDetail} title="View Class Detail" />
      <div>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row justify-between w-full">
            <div>
              <CardTitle className="font-bold text-xl">
                Attendance - Student List
              </CardTitle>
            </div>
            <div>
              <div className="flex items-center gap-4">
                {/* Label */}
                <span className="text-muted-foreground font-medium">
                  Export Data By Class:
                </span>

                {/* Excel Export Button */}
                <Button
                  onClick={() => {
                    handleExportToExcel({
                      includeComments: true,
                    });
                  }}
                  variant="outline"
                  className="gap-2"
                >
                  <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">X</span>
                  </div>
                  <span>Excel</span>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Initialize Session Button */}
          {!isInitialized && <Loading />}

          <div className="w-full px-4">
            <Separator className="bg-gray-300" />
          </div>
          <CardContent className="p-4">
            <div className="flex flex-row gap-4">
              <p className="mb-4">
                <span className="text-gray-500">Total Students: </span>
                <span className="font-semibold">
                  {attendance?.totalStudents ?? 0}
                </span>
              </p>

              <p className="mb-4">
                <span className="text-gray-500">| Total Present: </span>
                <span className="font-semibold">
                  {attendance?.totalPresent ?? 0}
                </span>
              </p>

              <p className="mb-4">
                <span className="text-gray-500">| Total Absent: </span>
                <span className="font-semibold">
                  {attendance?.totalAbsent ?? 0}
                </span>
              </p>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-black hover:bg-black">
                    <TableHead className="text-white w-12">#</TableHead>
                    <TableHead className="text-white">Student ID</TableHead>
                    <TableHead className="text-white">Fullname</TableHead>
                    <TableHead className="text-white">Attendance</TableHead>
                    <TableHead className="text-white">Type</TableHead>
                    <TableHead className="text-white">Check-in Time</TableHead>
                    <TableHead className="text-white">Comment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance?.attendances.length === 0 ||
                  attendance === null ? (
                    <TableRow>
                      <TableCell
                        colSpan={15}
                        className="text-center italic text-gray-500"
                      >
                        No attendance found in this class.
                      </TableCell>
                    </TableRow>
                  ) : (
                    attendance?.attendances?.map((attendance, index) => {
                      const indexDisplay = index + 1;
                      return (
                        <TableRow
                          key={attendance.id}
                          className="hover:bg-gray-50"
                        >
                          <TableCell className="font-medium">
                            {indexDisplay}
                          </TableCell>
                          <TableCell>{attendance?.studentId}</TableCell>
                          <TableCell className="font-medium">
                            {attendance?.studentName?.trim() ?? "---"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {attendance?.status?.trim() ?? "---"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {attendance?.attendanceType ?? "---"}
                          </TableCell>
                          <TableCell className="text-center">
                            {attendance?.recordedTime ?? "---"}
                          </TableCell>
                          <TableCell className="text-center">
                            <span>{attendance?.comment ?? "---"}</span>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
            {(!attendance?.attendances ||
              attendance?.attendances.length === 0) &&
              isInitialized && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-sm mt-1">No Record</p>
                </div>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
