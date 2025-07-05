"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
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
  FileText,
  CheckCircle,
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
import { getAllMyScheduleService } from "@/service/schedule/schedule.service";
import { AllScheduleModel } from "@/model/attendance/schedule/schedule-model";
import { useDebounce } from "@/utils/debounce/debounce";
import { Separator } from "@/components/ui/separator";
import PaginationPage from "@/components/shared/pagination-page";
import { useRouter } from "next/navigation";

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

const ScheduleAllPage = () => {
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchSchedule = useCallback(
    async (filters: AllScheduleFilterModel) => {
      setIsLoading(true);
      try {
        const baseFilters = {
          search: debouncedSearchQuery,
          status: StatusEnum.ACTIVE,
          academyYear: selectedYear,
          semester: selectedSemester !== "ALL" ? selectedSemester : undefined,
          dayOfWeek:
            selectedDay?.value !== "ALL" ? selectedDay?.value : undefined,
          ...filters,
        };

        console.log("##Fetching schedule with filters:", baseFilters);

        const response = await getAllMyScheduleService(baseFilters);

        console.log("##Schedule data received:", response);
        setScheduleData(response);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
        toast.error("An error occurred while loading classes");
        setScheduleData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedSearchQuery, selectedDay, selectedYear, selectedSemester]
  );

  // Fetch schedule when any filter changes
  useEffect(() => {
    if (selectedDay) {
      fetchSchedule({ pageNo: currentPage });
    }
  }, [
    selectedDay,
    selectedYear,
    selectedSemester,
    debouncedSearchQuery,
    currentPage,
    fetchSchedule,
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const handleSemesterChange = (semester: string) => {
    setSelectedSemester(semester);
    setCurrentPage(1);
  };

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
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCardClick = (scheduleId: number) => {
    router.push(ROUTE.STUDENT_LIST(String(scheduleId)));
  };

  return (
    <div className="animate-in fade-in duration-700">
      <Card className="animate-in slide-in-from-top-4 duration-500">
        <CardContent className="p-6 space-y-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="animate-in fade-in duration-500 delay-100">
                <BreadcrumbLink
                  href={ROUTE.DASHBOARD}
                  className="transition-all duration-300 hover:text-amber-600 hover:underline hover:underline-offset-4"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="animate-in fade-in duration-500 delay-200" />
              <BreadcrumbItem className="animate-in fade-in duration-500 delay-300">
                <BreadcrumbLink href={ROUTE.SCHEDULE.ROOT}>
                  Schedule
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h3 className="text-xl font-bold animate-in slide-in-from-left-4 duration-600 delay-200">
            All Schedule
          </h3>

          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-in slide-in-from-bottom-4 duration-600 delay-300">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-all duration-300 group-focus-within:text-amber-500 group-focus-within:scale-110" />
              <Input
                type="search"
                placeholder="Search class..."
                className="pl-8 w-full transition-all duration-300 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:shadow-lg focus:shadow-amber-100/50 hover:shadow-md"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <YearSelector value={selectedYear} onChange={handleYearChange} />
              <Select
                onValueChange={handleSemesterChange}
                value={selectedSemester}
              >
                <SelectTrigger className="flex gap-2">
                  <img
                    src={AppIcons.Filter}
                    alt="Time Icon"
                    className="h-4 w-4 text-muted-foreground"
                  />
                  <SelectValue
                    className="underline underline-offset-1"
                    placeholder="Select a semester"
                  />
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

      <div className="relative flex items-center my-6 animate-in slide-in-from-left-6 duration-700 delay-400">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 z-10 rounded-full transition-all duration-300 hover:bg-amber-50 hover:border-amber-300 hover:shadow-lg hover:scale-110 active:scale-95 group"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-4 w-4 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-amber-600" />
        </Button>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-2 px-16 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {DAYS_OF_WEEK.map((day, index) => (
            <Button
              key={day.label}
              variant={selectedDay?.value === day.value ? "default" : "outline"}
              className={`whitespace-nowrap transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
                selectedDay?.value === day.value
                  ? "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-200/50 scale-105"
                  : "hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 hover:shadow-lg hover:shadow-amber-100/50 hover:scale-105 hover:-translate-y-1"
              }`}
              style={{ animationDelay: `${500 + index * 100}ms` }}
              onClick={() => handleDaySelect(day)}
            >
              {day.label}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 z-10 rounded-full transition-all duration-300 hover:bg-amber-50 hover:border-amber-300 hover:shadow-lg hover:scale-110 active:scale-95 group"
          onClick={scrollRight}
        >
          <ChevronRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-amber-600" />
        </Button>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border transition-all duration-300 hover:shadow-xl hover:shadow-amber-100/20 animate-in slide-in-from-bottom-6 duration-800 delay-600">
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
                {scheduleData.content.map((sche, index) => (
                  <Card
                    key={sche.id}
                    className="group overflow-hidden bg-amber-50/30 transition-all duration-500 hover:bg-amber-50 hover:shadow-2xl hover:shadow-amber-200/30 cursor-pointer hover:scale-[1.03] hover:border-amber-200 hover:-translate-y-2 active:scale-[0.98] animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${800 + index * 150}ms` }}
                    onClick={() => handleCardClick(sche.id)}
                  >
                    <CardContent className="p-0 relative overflow-hidden">
                      {/* Animated background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/0 via-amber-50/0 to-amber-200/0 transition-all duration-500 group-hover:from-amber-100/40 group-hover:via-amber-50/20 group-hover:to-amber-200/10" />

                      <div className="relative">
                        <div className="p-4 flex-1">
                          <div className="flex gap-4">
                            <div className="flex border-l-4 border-amber-500 rounded-xl transition-all duration-500 group-hover:border-amber-600 group-hover:shadow-lg group-hover:shadow-amber-200/50 animate-pulse group-hover:animate-none" />
                            <div className="flex flex-col flex-1">
                              <div className="flex items-center gap-1 justify-between">
                                <div className="text-sm font-medium text-amber-500 transition-all duration-300 group-hover:text-amber-600 group-hover:scale-105 group-hover:font-semibold">
                                  {sche.course.code}
                                </div>
                                <span className="text-sm font-medium text-muted-foreground transition-all duration-300 group-hover:text-gray-600 group-hover:scale-105">
                                  {sche.day || "- - -"}
                                </span>
                              </div>
                              <div className="text-sm font-medium transition-all duration-300 group-hover:text-gray-800 group-hover:font-semibold">
                                {sche.course.nameKH || "- - -"}
                              </div>
                            </div>
                          </div>

                          <Separator className="my-2 transition-all duration-300 group-hover:bg-amber-300 group-hover:h-0.5" />

                          <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1 transition-all duration-300 group-hover:text-gray-600 group-hover:scale-105">
                              <Clock className="h-4 w-4 transition-all duration-300 group-hover:text-amber-500 group-hover:rotate-12 group-hover:scale-110" />
                              <span className="transition-all duration-300 group-hover:font-medium">
                                {sche.startTime} - {sche.endTime}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 transition-all duration-300 group-hover:text-gray-600 group-hover:scale-105">
                              <Users className="h-4 w-4 transition-all duration-300 group-hover:text-amber-500 group-hover:scale-110" />
                              <span className="transition-all duration-300 group-hover:font-medium">
                                {(sche.teacher &&
                                  (sche.teacher.englishFirstName ||
                                  sche.teacher.englishLastName
                                    ? `${sche.teacher.englishFirstName || ""} ${
                                        sche.teacher.englishLastName || ""
                                      }`.trim()
                                    : sche.teacher.khmerFirstName ||
                                      sche.teacher.khmerLastName
                                    ? `${sche.teacher.khmerFirstName || ""} ${
                                        sche.teacher.khmerLastName || ""
                                      }`.trim()
                                    : "- - -")) ||
                                  "- - -"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 transition-all duration-300 group-hover:text-gray-600 group-hover:scale-105">
                              <MapPin className="h-4 w-4 transition-all duration-300 group-hover:text-amber-500 group-hover:bounce group-hover:scale-110" />
                              <span className="transition-all duration-300 group-hover:font-medium">
                                {sche.room.name || "- - -"}
                              </span>
                            </div>

                            {/* Survey - now looks exactly like other items, no button styling */}
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
                                      ROUTE.SURVEY.SURVEY_FORM(String(sche.id))
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-600 delay-500">
                <div className="mb-4">
                  <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center animate-pulse">
                    <Clock className="h-8 w-8 text-amber-500" />
                  </div>
                </div>
                <p className="text-lg font-medium">
                  No classes scheduled for {selectedDay?.label}
                </p>
                <p className="text-sm mt-2 opacity-60">
                  Try selecting a different day or check back later
                </p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && scheduleData && scheduleData.totalPages > 1 && (
          <div className="mt-8 flex justify-end animate-in slide-in-from-bottom-4 duration-500 delay-1000">
            <div className="transition-all duration-300 hover:scale-105">
              <PaginationPage
                currentPage={scheduleData.pageNo}
                totalPages={scheduleData.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleAllPage;
