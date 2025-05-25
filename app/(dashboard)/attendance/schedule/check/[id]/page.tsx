// AttendanceCheckPage.tsx
"use client";

import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
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
  RefreshCw,
  Play,
  Search,
  Upload,
  Loader2,
  X,
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
import {
  getAllAttedanceGenerateService,
  updateAttendanceSessionService,
} from "@/service/schedule/attendance.service";
import { AttendanceGenerateModel } from "@/model/schedule/attendance/attendance-generate";
import {
  attendanceStatusOptions,
  attendanceTypeOptions,
} from "@/constants/filter/filter-page";
import { Badge } from "@/components/ui/badge";

const AttendanceCheckPage = () => {
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;

  // Core state
  const [scheduleDetail, setScheduleDetail] = useState<ScheduleModel | null>(
    null
  );
  const [attendanceGenerate, setAttendanceGenerate] =
    useState<AttendanceGenerateModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Enhanced state for saving
  const [unsavedChanges, setUnsavedChanges] = useState<Map<number, boolean>>(
    new Map()
  );
  const [isSavingAll, setIsSavingAll] = useState(false);

  // Filter and search state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Settings state
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Refs for smooth scrolling and focus management
  const tableRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Get status color with smooth transitions
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "present":
        return "text-green-700 bg-green-100 border-green-300 shadow-sm transition-all duration-200";
      case "absent":
        return "text-red-700 bg-red-100 border-red-300 shadow-sm transition-all duration-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-300 shadow-sm transition-all duration-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case "none":
        return "text-slate-700 bg-slate-100 border-slate-300 shadow-sm transition-all duration-200";
      case "late":
        return "text-amber-700 bg-amber-100 border-amber-300 shadow-sm transition-all duration-200";
      case "permission":
        return "text-emerald-700 bg-emerald-100 border-emerald-300 shadow-sm transition-all duration-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-300 shadow-sm transition-all duration-200";
    }
  };

  // Enhanced data loading functions with better error handling
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

  const loadAttendanceData = useCallback(
    async (forceRefresh = false) => {
      if (!scheduleDetail?.id) return;

      if (!forceRefresh && unsavedChanges.size > 0) {
        return;
      }

      setLoading(true);
      try {
        const response = await getAllAttedanceGenerateService({
          scheduleId: scheduleDetail.id,
        });
        setAttendanceGenerate(response);
        setLastUpdated(new Date());
        setIsInitialized(true);
        // Reset unsaved changes
        setUnsavedChanges(new Map());
      } catch (error) {
        toast.error("Error fetching attendance data");
        console.error("Error fetching attendance data:", error);
      } finally {
        setLoading(false);
      }
    },
    [scheduleDetail, unsavedChanges.size]
  );

  // Smooth field changes with optimistic updates
  const handleFieldChange = useCallback(
    (attendanceId: number, field: string, value: string) => {
      setAttendanceGenerate((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          attendances: prev.attendances.map((attendance) =>
            attendance.id === attendanceId
              ? { ...attendance, [field]: value }
              : attendance
          ),
        };
      });

      // Mark this row as having unsaved changes
      setUnsavedChanges((prev) => {
        const newMap = new Map(prev);
        newMap.set(attendanceId, true);
        return newMap;
      });
    },
    []
  );

  // Save all changed records
  const handleSaveAllChanges = useCallback(async () => {
    if (!attendanceGenerate) return;

    setIsSavingAll(true);
    try {
      // Find all rows with unsaved changes
      const changedAttendances = attendanceGenerate.attendances.filter(
        (attendance) => unsavedChanges.has(attendance.id)
      );

      // Perform bulk update
      await Promise.all(
        changedAttendances.map((attendance) =>
          updateAttendanceSessionService({
            id: attendance.id,
            status: attendance.status,
            attendanceType: attendance.attendanceType,
            comment: attendance.comment || "",
          })
        )
      );

      // Clear unsaved changes
      setUnsavedChanges(new Map());
      setLastUpdated(new Date());

      toast.success(
        `Successfully updated ${changedAttendances.length} attendance records`,
        { duration: 2000 }
      );
    } catch (error) {
      toast.error("Failed to save attendance records");
      console.error("Error saving records:", error);
    } finally {
      setIsSavingAll(false);
    }
  }, [attendanceGenerate, unsavedChanges]);

  // Reset changes
  const handleResetChanges = useCallback(() => {
    // Reload original data
    loadAttendanceData(true);
  }, [loadAttendanceData]);

  // Smart auto-refresh with better timing
  useEffect(() => {
    if (autoRefresh && isInitialized) {
      const interval = setInterval(() => {
        if (unsavedChanges.size === 0) {
          loadAttendanceData();
        }
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [autoRefresh, isInitialized, unsavedChanges.size, loadAttendanceData]);

  // Initial load
  useEffect(() => {
    loadScheduleData();
  }, [loadScheduleData]);

  // Memoized filtered data
  const filteredAttendances = useMemo(() => {
    if (!attendanceGenerate?.attendances) return [];

    return attendanceGenerate.attendances.filter((attendance) => {
      const matchesSearch =
        !searchQuery ||
        attendance.studentName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        attendance.identifyNumber
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || attendance.status === statusFilter;
      const matchesType =
        typeFilter === "all" || attendance.attendanceType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [attendanceGenerate?.attendances, searchQuery, statusFilter, typeFilter]);

  // Enhanced statistics
  const stats = useMemo(() => {
    if (!filteredAttendances.length)
      return { total: 0, present: 0, absent: 0, late: 0 };

    return {
      total: filteredAttendances.length,
      present: filteredAttendances.filter((a) => a.status === "PRESENT").length,
      absent: filteredAttendances.filter((a) => a.status === "ABSENT").length,
      late: filteredAttendances.filter((a) => a.attendanceType === "LATE")
        .length,
    };
  }, [filteredAttendances]);

  // Initialize session
  const handleInitializeSession = async () => {
    await loadAttendanceData(true);
  };

  return (
    <div className="space-y-4">
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

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
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

            <div className="flex items-center gap-2">
              {unsavedChanges.size > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {unsavedChanges.size} Unsaved Changes
                </Badge>
              )}

              {autoRefresh && (
                <Badge variant="secondary" className="text-xs">
                  Auto-refresh: ON
                </Badge>
              )}

              {lastUpdated && (
                <span className="text-xs text-muted-foreground">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>

          {/* Schedule Details Card */}
          <Card className="overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 transition-all duration-300">
            <CardContent className="p-0">
              <div className="p-4 flex-1">
                <div className="flex gap-4">
                  <div className="flex border-l-4 border-amber-500 rounded-xl" />
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-1 justify-between">
                      <div className="text-sm font-medium text-amber-600">
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
                  <div className="flex items-center gap-1 hover:scale-105 transition-transform duration-200">
                    <Clock className="h-4 w-4" />
                    <span>
                      {scheduleDetail?.startTime} - {scheduleDetail?.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 hover:scale-105 transition-transform duration-200">
                    <Users className="h-4 w-4" />
                    <span>
                      {(scheduleDetail?.teacher &&
                        (scheduleDetail.teacher.englishFirstName ||
                        scheduleDetail.teacher.englishLastName
                          ? `${scheduleDetail.teacher.englishFirstName || ""} ${
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
                  <div className="flex items-center gap-1 hover:scale-105 transition-transform duration-200">
                    <MapPin className="h-4 w-4" />
                    <span>{scheduleDetail?.room?.name || "- - -"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Initialize Session Button */}
      {!isInitialized && (
        <Card>
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
                className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                size="lg"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                {loading ? "Loading..." : "Initialize Attendance Session"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* QR Code Section */}
      {attendanceGenerate && (
        <QRCodeSection sessionId={attendanceGenerate?.id} />
      )}

      {/* Student List */}
      {attendanceGenerate && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">
              Attendance - Student List
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setAutoRefresh(!autoRefresh);
                  toast.success(
                    `Auto-refresh ${!autoRefresh ? "enabled" : "disabled"}`
                  );
                }}
                className={`transition-all duration-200 hover:scale-105 ${
                  autoRefresh ? "bg-blue-100 text-blue-700 border-blue-300" : ""
                }`}
                title={`Click to ${
                  autoRefresh ? "disable" : "enable"
                } auto-refresh`}
              >
                <RefreshCcw
                  className={`h-4 w-4 mr-2 transition-transform duration-200 ${
                    autoRefresh ? "animate-spin" : ""
                  }`}
                />
                Auto {autoRefresh ? "ON" : "OFF"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => loadAttendanceData(true)}
                disabled={loading}
                className="transition-all duration-200 hover:scale-105"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 transition-transform duration-200 ${
                    loading ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </Button>
            </div>
          </CardHeader>

          {/* Unsaved Changes Banner */}
          {unsavedChanges.size > 0 && (
            <div className="px-6 pb-4">
              <div className="flex justify-between items-center bg-yellow-50 border-yellow-200 border p-3 rounded">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="animate-pulse">
                    {unsavedChanges.size} Unsaved Changes
                  </Badge>
                  <span className="text-sm text-yellow-700">
                    You have pending updates
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetChanges}
                    className="hover:bg-red-100 text-red-600"
                  >
                    <X className="h-4 w-4 mr-2" /> Reset Changes
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveAllChanges}
                    disabled={isSavingAll}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isSavingAll ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    Save All Changes
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="px-6">
            <Separator className="mb-4" />

            {/* Filters and Search */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search
                    className={`h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-all duration-300`}
                  />
                  <Input
                    ref={searchInputRef}
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 max-w-xl transition-all duration-300 ${
                      searchQuery
                        ? "border-blue-300 ring-1 ring-blue-200 shadow-sm"
                        : ""
                    }`}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-red-500 transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px] transition-all duration-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {attendanceStatusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px] transition-all duration-200">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {attendanceTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Statistics */}
            <div className="flex justify-start gap-6 text-sm mb-4">
              <div className="hover:scale-105 transition-transform duration-200">
                Total Students:
                <span className="font-medium ml-1">{stats.total}</span>
              </div>
              <div className="hover:scale-105 transition-transform duration-200">
                Present:{" "}
                <span className="font-medium ml-1 text-green-600">
                  {stats.present}
                </span>
              </div>
              <div className="hover:scale-105 transition-transform duration-200">
                Absent:{" "}
                <span className="font-medium ml-1 text-red-600">
                  {stats.absent}
                </span>
              </div>
              <div className="hover:scale-105 transition-transform duration-200">
                Late:{" "}
                <span className="font-medium ml-1 text-orange-600">
                  {stats.late}
                </span>
              </div>
            </div>
          </div>

          <CardContent>
            <div className="overflow-x-auto" ref={tableRef}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Check-in Time</TableHead>
                    <TableHead>Comments</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y">
                  {filteredAttendances.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {student.studentName || "- - -"}
                        </div>
                      </TableCell>
                      <TableCell>{student.identifyNumber}</TableCell>
                      <TableCell className="py-2 px-3">
                        <Select
                          value={student.status}
                          onValueChange={(value) =>
                            handleFieldChange(student.id, "status", value)
                          }
                        >
                          <SelectTrigger
                            className={`h-8 w-full border ${getStatusColor(
                              student.status
                            )}`}
                          >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {attendanceStatusOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                                className={getStatusColor(option.value)}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="py-2 px-3">
                        <Select
                          value={student.attendanceType}
                          onValueChange={(value) =>
                            handleFieldChange(
                              student.id,
                              "attendanceType",
                              value
                            )
                          }
                        >
                          <SelectTrigger
                            className={`h-8 w-full border ${getTypeColor(
                              student.attendanceType
                            )}`}
                          >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {attendanceTypeOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                                className={getTypeColor(option.value)}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="py-2 px-3">
                        {student.recordedTime || "--"}
                      </TableCell>
                      <TableCell className="py-2 px-3">
                        <Input
                          placeholder="Add Comment"
                          className="h-8 text-sm w-full transition-all duration-100 ease-in-out"
                          value={student.comment || ""}
                          onChange={(e) =>
                            handleFieldChange(
                              student.id,
                              "comment",
                              e.target.value
                            )
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* No Results Message */}
              {filteredAttendances.length === 0 &&
                attendanceGenerate?.attendances?.length > 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Search className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium">No students found</p>
                    <p className="text-sm mt-1">
                      Try adjusting your search criteria or filters
                    </p>
                  </div>
                )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AttendanceCheckPage;
