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
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DAYS_OF_WEEK, DayType, StatusEnum } from "@/constants/constant";
import Loading from "@/components/shared/loading";
import { toast } from "sonner";
import { getAllMyScheduleService } from "@/service/schedule/schedule.service";
import { AllScheduleModel } from "@/model/attendance/schedule/schedule-model";
import { useDebounce } from "@/utils/debounce/debounce";
import { Separator } from "@/components/ui/separator";
import PaginationPage from "@/components/shared/pagination-page";
import { ScheduleFilterModel } from "@/model/attendance/schedule/schedule-filter";
import { useRouter } from "next/navigation";

const AttendanceScheduleCheckPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<DayType>({
    label: "All",
    value: "ALL",
  });
  const [scheduleData, setScheduleData] = useState<AllScheduleModel | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchSchedule = useCallback(
    async (filters: ScheduleFilterModel) => {
      setIsLoading(true);
      try {
        const response = await getAllMyScheduleService({
          search: debouncedSearchQuery,
          status: StatusEnum.ACTIVE,
          dayOfWeek:
            selectedDay && selectedDay.value !== "ALL"
              ? selectedDay.value
              : undefined,
          ...filters,
        });
        setScheduleData(response);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
        toast.error("An error occurred while loading classes");
        setScheduleData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedSearchQuery, selectedDay]
  );

  // Fetch schedule when selectedDay, search query, or page changes
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

  const handleCardClick = (scheduleId: number) => {
    // Navigate to the class detail page with the schedule ID
    router.push(`${ROUTE.ATTENDANCE.ATTENDANCE_CHECK}/${scheduleId}`);
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
            </BreadcrumbList>
          </Breadcrumb>

          <h3 className="text-xl font-bold">Class Schedule List</h3>

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
          </div>
        </CardContent>
      </Card>

      <div className="relative flex items-center my-6">
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
          {DAYS_OF_WEEK.map((day, index) => (
            <Button
              key={day.label}
              variant={selectedDay?.value === day.value ? "default" : "outline"}
              className={`whitespace-nowrap transition-colors duration-200 ${
                selectedDay?.value === day.value
                  ? "bg-amber-500 text-white"
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
                {scheduleData.content.map((sche, index) => (
                  <Card
                    key={sche.id}
                    className="overflow-hidden bg-amber-50/30 cursor-pointer transition-transform duration-200 hover:scale-[1.01] hover:shadow-md"
                    onClick={() => handleCardClick(sche.id)}
                  >
                    <CardContent className="p-0 relative overflow-hidden">
                      <div className="relative">
                        <div className="p-4 flex-1">
                          <div className="flex gap-4">
                            <div className="flex border-l-4 border-amber-500 rounded-xl" />
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
                                {sche.course.nameKH || "- - -"}
                              </div>
                            </div>
                          </div>

                          <Separator className="my-2" />

                          <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
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
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{sche.room.name || "- - -"}</span>
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
                <div className="mb-4">
                  <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
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
          <div className="mt-8 flex justify-end">
            <div>
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

export default AttendanceScheduleCheckPage;
