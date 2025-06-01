"use client";
import { ComboboxSelectSemester } from "@/components/shared/ComboBox/combobox-semester";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { YearSelector } from "@/components/shared/year-selector";
import { Card, CardContent } from "@/components/ui/card";
import {
  DAYS_OF_WEEK,
  DAYS_OF_WEEK_V1,
  DayType,
  StatusEnum,
} from "@/constants/constant";
import { ROUTE } from "@/constants/routes";
import { SemesterModel } from "@/model/master-data/semester/semester-model";
import { ScheduleFilterModel } from "@/model/schedule/schedule/schedule-filter";
import { AllScheduleModel } from "@/model/schedule/schedule/schedule-model";
import { getAllScheduleService } from "@/service/schedule/schedule.service";
import { useDebounce } from "@/utils/debounce/debounce";
import { Clock, MapPin, Plus, User } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { groupBy } from "lodash";
import { ScheduleModel } from "@/model/schedules/all-schedule-model";
import { Button } from "@/components/ui/button";

export default function StudentScorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectAcademicYear, setSelectAcademicYear] = useState<
    number | undefined
  >();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<
    SemesterModel | undefined
  >();
  const [selectedDay, setSelectedDay] = useState<DayType | null>(null);
  const [scheduleData, setScheduleData] = useState<AllScheduleModel | null>(
    null
  );
  const [initialLoadDone, setInitialLoadDone] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchSchedule = useCallback(
    async (filters: ScheduleFilterModel = {}) => {
      setIsLoading(true);
      try {
        const finalFilters: ScheduleFilterModel = {
          ...filters,
          search: debouncedSearchQuery,
          academyYear: selectAcademicYear,
          semester: selectedSemester?.semester,
          dayOfWeek: selectedDay?.value,
          status: StatusEnum.ACTIVE,
        };

        const response = await getAllScheduleService(finalFilters);
        setScheduleData(response);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
        toast.error("An error occurred while loading schedule");
        setScheduleData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedSearchQuery, selectAcademicYear, selectedSemester, selectedDay]
  );

  // Initialize selected day on component mount
  useEffect(() => {
    if (!initialLoadDone) {
      const currentDate = new Date();
      const currentDayId = currentDate.getDay();
      const currentDay = DAYS_OF_WEEK_V1.find((day) => day.id === currentDayId);

      setSelectedDay(currentDay || DAYS_OF_WEEK_V1[0]);
      setInitialLoadDone(true);
    }
  }, [initialLoadDone]);

  // Fetch schedule when filters change
  useEffect(() => {
    if (initialLoadDone) {
      const hasActiveFilters = selectAcademicYear && selectedSemester;

      if (hasActiveFilters) {
        fetchSchedule({});
      }
    }
  }, [
    initialLoadDone,
    debouncedSearchQuery,
    selectAcademicYear,
    selectedSemester,
    selectedDay,
    fetchSchedule,
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleYearChange = (year: number) => {
    setSelectAcademicYear(year || undefined);
  };

  const handleDayChange = (day: DayType) => {
    setSelectedDay(day);
  };

  const handleSemesterChange = (semester: SemesterModel | null) => {
    setSelectedSemester(semester ?? undefined);
  };

  const formatTime = (time: string): string => {
    return time.substring(0, 5); // Convert "08:00:00" to "08:00"
  };

  // Check if filters are applied
  const hasFiltersApplied = Boolean(selectAcademicYear && selectedSemester);

  // Group schedules by semester
  const groupedBySemester = scheduleData
    ? groupBy(scheduleData.content, (item: ScheduleModel) => item.semester.id)
    : {};

  const renderEmptyState = () => (
    <Card>
      <CardContent className="flex flex-col items-center space-y-4 justify-center text-center py-8">
        <div className="w-full text-left">
          <h3 className="text-base text-red-600">
            No current schedule applied
          </h3>
        </div>
        <Card className="rounded-lg w-full border-gray-400 p-4">
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Empty Records</p>
          </div>
        </Card>
      </CardContent>
    </Card>
  );

  const renderDayTabs = () => (
    <div className="flex flex-wrap gap-2">
      {DAYS_OF_WEEK_V1.map((day) => (
        <Button
          key={day.id}
          onClick={() => handleDayChange(day)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedDay?.value === day.value
              ? "bg-teal-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          {day.label}
        </Button>
      ))}
    </div>
  );

  const renderLoadingState = () => (
    <Card>
      <CardContent className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
        <p className="text-gray-500 mt-2">Loading schedules...</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <CardHeaderSection
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          { label: "Student Score", href: ROUTE.SCORES.STUDENT_SCORE },
        ]}
        searchValue={searchQuery}
        searchPlaceholder="Search..."
        title="Student Score"
        onSearchChange={handleSearchChange}
        buttonHref={ROUTE.STUDENTS.ADD_SINGLE}
        buttonIcon={<Plus className="mr-2 h-2 w-2" />}
        customSelect={
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-4">
            <div className="w-full min-w-[200px] md:w-1/2">
              <YearSelector
                title="Select Year"
                onChange={handleYearChange}
                value={selectAcademicYear || 0}
              />
            </div>
            <div className="w-full min-w-[200px] md:w-1/2">
              <ComboboxSelectSemester
                dataSelect={selectedSemester ?? null}
                onChangeSelected={handleSemesterChange}
                disabled={isSubmitting}
              />
            </div>
          </div>
        }
      />

      {hasFiltersApplied ? (
        <div className="space-y-6">
          {renderDayTabs()}

          {isLoading ? (
            renderLoadingState()
          ) : Object.keys(groupedBySemester).length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">
                  No schedules found for the selected criteria.
                </p>
              </CardContent>
            </Card>
          ) : (
            Object.entries(groupedBySemester).map(([semesterId, schedules]) => {
              const scheduleArr: ScheduleModel[] = Array.isArray(schedules)
                ? (schedules as unknown[]).filter(
                    (item): item is ScheduleModel =>
                      typeof item === "object" &&
                      item !== null &&
                      "course" in item &&
                      "semester" in item &&
                      "startTime" in item
                  )
                : [];
              const semesterData = scheduleArr[0];
              const semesterName =
                semesterData?.semester.semester || `Semester ${semesterId}`;
              const academyYear =
                semesterData?.semester.academyYear || selectAcademicYear;

              return (
                <div key={semesterId} className="rounded-xl border p-4 mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Year {academyYear} - {semesterName}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scheduleArr.map((schedule) => (
                      <div
                        key={schedule.id}
                        className="flex flex-col border-l-4 rounded-lg bg-orange-50 border-yellow-500 p-4"
                      >
                        <h3 className="font-semibold text-gray-900">
                          {schedule.course.code}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {schedule.course.nameEn} - {schedule.course.credit}(
                          {schedule.course.theory}, {schedule.course.execute},{" "}
                          {schedule.course.apply})
                        </p>

                        <div className="mt-auto flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {formatTime(schedule.startTime)} -{" "}
                              {formatTime(schedule.endTime)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{schedule.classes.degree}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{schedule.room.name}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        renderEmptyState()
      )}
    </div>
  );
}
