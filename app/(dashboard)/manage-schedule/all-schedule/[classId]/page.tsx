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
  Edit,
  Pen,
  Copy,
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
import { getAllScheduleService } from "@/service/schedule/schedule.service";
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
import DuplicateScheduleModal from "@/components/dashboard/manage-schedule/duplicate-schedule-modal";

const AllSchedulePage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<DayType>({
    label: "All",
    value: "ALL",
  });
  const [scheduleData, setScheduleData] = useState<AllScheduleModel | null>(
    null
  );
  const [isDuplicateScheduleModalOpen, setIsDuplicateScheduleModalOpen] =
    useState(false);
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
        // Create base filters object
        const baseFilters = {
          search: debouncedSearchQuery,
          status: StatusEnum.ACTIVE,
          academyYear: selectedYear,
          semester: selectedSemester != "ALL" ? selectedSemester : undefined,
          dayOfWeek:
            selectedDay?.value !== "ALL" ? selectedDay?.value : undefined,
          ...filters,
        };

        const response = await getAllScheduleService(baseFilters);

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

  useEffect(() => {
    if (selectedDay) {
      fetchSchedule({ pageNo: currentPage });
    }
  }, [selectedDay, debouncedSearchQuery, currentPage, fetchSchedule]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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

  const handleEditClick = (scheduleId: number) => {
    router.push(ROUTE.MANAGE_SCHEDULE.UPDATE_SCHEDULE + `${scheduleId}`);
  };

  const handleCardClick = (scheduleId: number) => {
    router.push(ROUTE.STUDENT_LIST(String(scheduleId)));
  };

  return (
    <div>
      <Card>
        <CardContent className="p-3 sm:p-6 space-y-3 sm:space-y-4">
          {/* Breadcrumb - Hide on very small screens */}
          <div className="hidden sm:block">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href={ROUTE.DASHBOARD}>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={ROUTE.MANAGE_SCHEDULE.DEPARTMENT}>
                    Department List
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Class</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Header with back button and title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full shrink-0"
            >
              <img
                src={AppIcons.Back}
                alt="back Icon"
                className="h-4 w-4 text-muted-foreground"
              />
            </Button>
            <h3 className="text-lg sm:text-xl font-bold truncate">
              Class Schedule List
            </h3>
          </div>

          {/* Search and filters section */}
          <div className="space-y-3 sm:space-y-4">
            {/* Search input - full width on mobile */}
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search class..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            {/* Filters and actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 sm:items-center sm:justify-end">
              {/* Year and Semester selectors */}
              <div className="flex gap-2 sm:gap-2">
                <div className="flex-1 sm:flex-none">
                  <YearSelector
                    value={selectedYear}
                    onChange={setSelectedYear}
                  />
                </div>
                <div className="flex-1 sm:flex-none">
                  <Select
                    onValueChange={setSelectedSemester}
                    value={selectedSemester}
                  >
                    <SelectTrigger className="w-full sm:w-auto">
                      <SelectValue placeholder="Select semester" />
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

              {/* Duplicate button */}
              <Button
                onClick={() => setIsDuplicateScheduleModalOpen(true)}
                className="bg-teal-900 hover:bg-teal-950 w-full sm:w-auto"
              >
                <Copy className="h-4 w-4 mr-2" />
                <span className="sm:inline">Duplicate</span>
              </Button>
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
              className="whitespace-nowrap"
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

                          <div className="flex flex-wrap mt-3 ">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                                      ? `${sche.teacher.khmerFirstName || ""} ${
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

                            <div className="ml-auto">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-amber-500 hover:bg-amber-50 hover:text-amber-600 hover:underline p-0 h-auto"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditClick(sche.id);
                                }}
                              >
                                <Pen className="h-4 w-4" />
                                Edit
                              </Button>
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

        <DuplicateScheduleModal
          sources={
            scheduleData?.content
              ? Array.from(
                  new Set(
                    scheduleData.content.map(
                      (s) => `${s.classes.id}-${s.semester.id}`
                    )
                  )
                ).map((key) => {
                  const [sourceClassId, sourceSemesterId] = key
                    .split("-")
                    .map((v) => parseInt(v));
                  return { sourceClassId, sourceSemesterId };
                })
              : []
          }
          isOpen={isDuplicateScheduleModalOpen}
          onOpenChange={() => setIsDuplicateScheduleModalOpen(false)}
        />

        {/* Pagination - FIXED to use handlePageChange */}
        {!isLoading && scheduleData && (
          <div className="mt-8 flex justify-end">
            <PaginationPage
              currentPage={scheduleData.pageNo}
              totalPages={scheduleData.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSchedulePage;
