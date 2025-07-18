"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
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
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Clock,
  Users,
  MapPin,
  Pen,
  Eye,
  Clipboard,
  ClipboardPenLine,
  CheckCircle,
  FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DAYS_OF_WEEK,
  DayType,
  SemesterFilter,
  StatusEnum,
} from "@/constants/constant";
import Loading from "@/components/shared/loading";
import { toast } from "sonner";
import {
  getAllMyScheduleService,
  getAllScheduleService,
} from "@/service/schedule/schedule.service";
import { AllScheduleModel } from "@/model/attendance/schedule/schedule-model";
import { useDebounce } from "@/utils/debounce/debounce";
import { Separator } from "@/components/ui/separator";
import PaginationPage from "@/components/shared/pagination-page";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { AllScheduleFilterModel } from "@/model/schedules/type-schedule-model";
import { YearSelector } from "@/components/shared/year-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppIcons } from "@/constants/icons/icon";
import { usePagination } from "@/hooks/use-pagination";

const MySchedulePage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<DayType>({
    label: "All",
    value: "ALL",
  });
  const [scheduleData, setScheduleData] = useState<AllScheduleModel | null>(
    null
  );
  const [selectedSemester, setSelectedSemester] = useState<string>("ALL");

  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const params = useParams();
  const classId = params?.classId ? Number(params.classId) : null;

  const searchParams = useSearchParams();

  const { currentPage, updateUrlWithPage, handlePageChange, getDisplayIndex } =
    usePagination({
      baseRoute: ROUTE.MY_CLASS.MY_SCHEDULE_DETAIL(String(classId)),
      defaultPageSize: 10,
    });

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (currentPage !== 1) {
      updateUrlWithPage(1);
    }
  };

  // Then add this effect for initial URL setup
  useEffect(() => {
    const pageParam = searchParams.get("pageNo");
    if (!pageParam) {
      // Use replace: true to avoid adding to browser history
      updateUrlWithPage(1, true);
    }
  }, [searchParams, updateUrlWithPage]);

  const fetchSchedule = useCallback(
    async (filters: AllScheduleFilterModel) => {
      setIsLoading(true);
      try {
        const baseFilters = {
          classId: Number(classId),
          search: debouncedSearchQuery,
          status: StatusEnum.ACTIVE,
          pageNo: currentPage,
          academyYear: selectedYear,
          semester: selectedSemester != "ALL" ? selectedSemester : undefined,
          dayOfWeek:
            selectedDay?.value !== "ALL" ? selectedDay?.value : undefined,
          ...filters,
        };
        const response = await getAllScheduleService(baseFilters);
        setScheduleData(response);
        // Handle case where current page exceeds total pages
        if (response.totalPages > 0 && currentPage > response.totalPages) {
          updateUrlWithPage(response.totalPages);
          return;
        }
      } catch (error) {
        toast.error("An error occurred while loading classes");
        setScheduleData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [
      debouncedSearchQuery,
      selectedDay,
      currentPage,
      selectedYear,
      selectedSemester,
    ]
  );

  useEffect(() => {
    if (selectedDay) {
      fetchSchedule({ pageNo: currentPage });
    }
  }, [selectedDay, debouncedSearchQuery, currentPage]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleDaySelect = (day: DayType) => {
    setSelectedDay(day);
    updateUrlWithPage(1);
  };

  const handleCardClick = (scheduleId: number) => {
    router.push(ROUTE.STUDENT_LIST(String(scheduleId)));
  };

  const handleClassListClick = () => {
    router.back();
  };

  return (
    <div>
      <Card>
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
                <BreadcrumbLink
                  onClick={handleClassListClick}
                  style={{ cursor: "pointer" }}
                >
                  Class List
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Class</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center min-w-0 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              asChild
              className="rounded-full flex-shrink-0"
            >
              <img
                src={AppIcons.Back}
                alt="back Icon"
                className="h-4 w-4 mr-3 sm:mr-5 text-muted-foreground"
              />
            </Button>
            <h3 className="text-xl font-bold">Class Schedule List</h3>
          </div>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search class..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <YearSelector value={selectedYear} onChange={setSelectedYear} />
              <Select
                onValueChange={setSelectedSemester}
                value={selectedSemester}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a semester" />
                </SelectTrigger>
                <SelectContent>
                  {SemesterFilter.map((semester) => (
                    <SelectItem key={semester.value} value={semester.value}>
                      {semester.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="relative flex items-center my-6 ">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 z-10 rounded-full"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-2 px-16 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {DAYS_OF_WEEK.map((day) => (
            <Button
              key={day.value}
              variant={selectedDay?.value === day.value ? "default" : "outline"}
              className={`whitespace-nowrap transition-colors duration-200 ${
                selectedDay?.value === day.value
                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                  : "hover:bg-amber-100"
              }`}
              onClick={() => handleDaySelect(day)}
            >
              {day.label}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 z-10 rounded-full"
          onClick={scrollRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="mb-4">
          <h2 className="text-lg font-bold">
            {selectedDay ? `${selectedDay.label}` : ""}
          </h2>
          <p className="text-sm text-muted-foreground">
            Total Schedule: {scheduleData?.totalElements || 0}
          </p>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {scheduleData && scheduleData.totalElements > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scheduleData.content.map((sche) => (
                  <Card
                    key={sche.id}
                    className="overflow-hidden bg-amber-50/50 transition-all hover:bg-amber-50 hover:shadow-md cursor-pointer"
                    onClick={() => handleCardClick(sche.id)}
                  >
                    <CardContent className="p-0">
                      <div>
                        <div className="p-4 flex-1">
                          <div className="flex gap-4">
                            <div className="flex border-l-[2px] my-1 border-amber-500 rounded-xl " />
                            <div className="flex flex-col flex-1">
                              <div className="flex items-center gap-1 justify-between">
                                <div className="text-sm font-medium text-amber-500">
                                  {sche.course.code}
                                </div>
                                <span className="text-sm font-medium text-muted-foreground">
                                  {sche.day || "- - -"}
                                </span>
                              </div>
                              <div className="text-sm font-medium">
                                {sche.course.nameKH ||
                                  sche.course.nameKH ||
                                  "- - -"}
                              </div>
                            </div>
                          </div>

                          <Separator className="my-2" />

                          <div className="flex flex-wrap mt-3">
                            <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>
                                    {sche.startTime} - {sche.endTime}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  <span>
                                    {(sche.teacher &&
                                      (sche.teacher.englishFirstName ||
                                      sche.teacher.englishLastName
                                        ? `${
                                            sche.teacher.englishFirstName || ""
                                          } ${
                                            sche.teacher.englishLastName || ""
                                          }`.trim()
                                        : sche.teacher.khmerFirstName ||
                                          sche.teacher.khmerLastName
                                        ? `${
                                            sche.teacher.khmerFirstName || ""
                                          } ${
                                            sche.teacher.khmerLastName || ""
                                          }`.trim()
                                        : "- - -")) ||
                                      "- - -"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{sche.room.name || "- - -"}</span>
                                </div>
                              </div>
                              {sche.surveyStatus !== "NONE" && (
                                <div
                                  className={`flex items-center gap-1 transition-all duration-300 ${
                                    sche.surveyStatus === "NOT_STARTED"
                                      ? "group-hover:text-gray-600 group-hover:scale-105 cursor-pointer"
                                      : "text-green-600 cursor-default"
                                  }`}
                                  onClick={(e) => {
                                    if (sche.surveyStatus === "NOT_STARTED") {
                                      e.stopPropagation();
                                      router.push(
                                        ROUTE.SURVEY.SURVEY_FORM(
                                          String(sche.id)
                                        )
                                      );
                                    }
                                  }}
                                >
                                  {sche.surveyStatus === "COMPLETED" ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <FileText className="h-4 w-4 transition-all duration-300 group-hover:text-amber-500 group-hover:scale-110" />
                                  )}
                                  <span
                                    className={`transition-all duration-300 ${
                                      sche.surveyStatus === "COMPLETED"
                                        ? "font-medium text-green-600"
                                        : "group-hover:font-medium underline decoration-dotted underline-offset-2"
                                    }`}
                                  >
                                    {sche.surveyStatus === "COMPLETED"
                                      ? "Survey Completed"
                                      : "Take Survey"}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No classes scheduled for {selectedDay?.label || "this day"}.
              </div>
            )}
          </div>
        )}

        {/* Pagination - FIXED to use handlePageChange */}
        {!isLoading && scheduleData && (
          <div className="mt-8 flex justify-end">
            <PaginationPage
              currentPage={currentPage}
              totalPages={scheduleData.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MySchedulePage;
