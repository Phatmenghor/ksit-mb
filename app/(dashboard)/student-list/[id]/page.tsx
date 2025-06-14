"use client";

import { ArrowLeft, Clock, MapPin, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTE } from "@/constants/routes";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AllScheduleFilterModel } from "@/model/schedules/type-schedule-model";
import {
  AllStudentModel,
  RequestAllStudent,
} from "@/model/user/student/student.respond.model";
import { getAllStudentsService } from "@/service/user/student.service";
import { StudentModel } from "@/model/user/student/student.request.model";
import { toast } from "sonner";
import { Separator } from "@radix-ui/react-separator";
import Loading from "@/components/shared/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StudentListTableHeader } from "@/constants/table/user";
import PaginationPage from "@/components/shared/pagination-page";
import { status } from "@/constants/constant";
import { Constants } from "@/constants/text-string";
import { getClassByIdService } from "@/service/master-data/class.service";
import { ClassModel } from "@/model/master-data/class/all-class-model";
import { getScheduleByIdService } from "@/service/schedule/schedule.service";
import { ScheduleModel } from "@/model/schedules/all-schedule-model";

export default function AddSchedule() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [students, setStudents] = useState<AllStudentModel | null>(null);
  const [schedule, setSchedule] = useState<ScheduleModel | null>(null);

  const params = useParams();
  const scheduleId = params?.id ? Number(params.id) : null;

  const fetchSchedule = useCallback(async (filters: RequestAllStudent) => {
    setIsLoading(true);
    try {
      const baseFilters = {
        scheduleId: scheduleId || 0,
        status: Constants.ACTIVE,
        ...filters,
      };

      const response = await getAllStudentsService(baseFilters);

      console.log(response);
      setStudents(response);
    } catch (error) {
      console.error("Error fetching schedule data:", error);
      toast.error("An error occurred while loading classes");
      setStudents(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchClassDetail = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getScheduleByIdService(scheduleId || 0);

      console.log("hourng", response);
      setSchedule(response);
    } catch (error) {
      console.error("Error fetching class data:", error);
      toast.error("An error occurred while loading classes");
      setSchedule(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedule({});
    fetchClassDetail(); // Call with empty filters or your default filters
  }, [fetchSchedule, fetchClassDetail]);
  const router = useRouter();

  const handleBackNavigation = () => {
    router.back();
  };

  return (
    <div>
      {/* Breadcrumb */}
      <Card className="mb-6">
        <CardContent className="p-6 space-y-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={ROUTE.DASHBOARD}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink href={ROUTE.MY_CLASS.CLASS}>
                  Class List
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink href={ROUTE.MY_CLASS.MY_SCHEDULE}>
                  Schedule List
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Student List Schedule</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Class Info Card */}
          <Card className="mb-6 bg-orange-50 border-orange-200">
            <CardContent className="p-0">
              <div>
                <div className="p-4 flex-1">
                  <div className="flex gap-4">
                    <div className="flex border-l-[2px] my-1 border-amber-500 rounded-xl " />
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-1 justify-between">
                        <div className="text-sm font-medium text-amber-500">
                          {schedule?.course.code}
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">
                          {schedule?.day || "- - -"}
                        </span>
                      </div>
                      <div className="text-sm font-medium">
                        {schedule?.course.nameKH ||
                          schedule?.course.nameKH ||
                          "- - -"}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex flex-wrap mt-3 ">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>
                          {schedule?.startTime} - {schedule?.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>
                          {(schedule?.teacher &&
                            (schedule?.teacher.englishFirstName ||
                            schedule?.teacher.englishLastName
                              ? `${schedule?.teacher.englishFirstName || ""} ${
                                  schedule?.teacher.englishLastName || ""
                                }`.trim()
                              : schedule?.teacher.khmerFirstName ||
                                schedule?.teacher.khmerLastName
                              ? `${schedule?.teacher.khmerFirstName || ""} ${
                                  schedule?.teacher.khmerLastName || ""
                                }`.trim()
                              : "- - -")) ||
                            "- - -"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{schedule?.room.name || "- - -"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Form */}
      <div className="overflow-hidden mt-4">
        {isLoading ? (
          <Loading />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {StudentListTableHeader.map((header, index) => (
                  <TableHead key={index} className={header.className}>
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {students?.content.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No student found
                  </TableCell>
                </TableRow>
              ) : (
                students?.content.map((student, index) => {
                  const indexDisplay =
                    ((students.pageNo || 1) - 1) * 10 + index + 1;
                  return (
                    <TableRow key={student.id}>
                      <TableCell>{indexDisplay}</TableCell>
                      <TableCell>{student.username || "---"}</TableCell>
                      <TableCell>
                        {`${student.khmerFirstName || ""} ${
                          student.khmerLastName || ""
                        }`.trim() || "---"}
                      </TableCell>
                      <TableCell>
                        {`${student.englishFirstName || ""} ${
                          student.englishLastName || ""
                        }`.trim() || "---"}
                      </TableCell>
                      <TableCell>{student.id || "---"}</TableCell>
                      <TableCell>{student.gender || "---"}</TableCell>
                      <TableCell>{student.dateOfBirth || "---"}</TableCell>
                      <TableCell>
                        {student.studentClass?.code || "---"}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </div>
      {!isLoading && students && (
        <div className="mt-4 flex justify-end">
          <PaginationPage
            currentPage={students.pageNo}
            totalPages={students.totalPages}
            onPageChange={(page: number) => fetchSchedule({ pageNo: page })}
          />
        </div>
      )}
    </div>
  );
}
