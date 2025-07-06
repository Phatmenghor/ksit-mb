"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROUTE } from "@/constants/routes";
import { ComboboxSelectDepartment } from "@/components/shared/ComboBox/combobox-department";
import { ComboboxSelectSubject } from "@/components/shared/ComboBox/combobox-subject-type";
import { ComboboxSelectInstructor } from "@/components/shared/ComboBox/combobox-instructor";
import { ComboboxSelectClass } from "@/components/shared/ComboBox/combobox-class";
import { ComboboxSelectRoom } from "@/components/shared/ComboBox/combobox-room";
import { YearSelector } from "@/components/shared/year-selector";
import { DepartmentModel } from "@/model/master-data/department/all-department-model";
import { SubjectModel } from "@/model/master-data/subject/all-subject-model";
import { RoomModel } from "@/model/master-data/room/all-room-model";
import { ClassModel } from "@/model/master-data/class/all-class-model";
import { SemesterModel } from "@/model/master-data/semester/semester-model";
import { StaffModel } from "@/model/user/staff/staff.respond.model";
import { DayEnum, StatusEnum, YearLevelEnum } from "@/constants/constant";
import { Constants } from "@/constants/text-string";
import {
  createScheduleService,
  getAllSimpleScheduleService,
} from "@/service/schedule/schedule.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getAllSemesterService } from "@/service/master-data/semester.service";
import SchedulePreviewTable from "@/components/dashboard/manage-schedule/schedule-preview-table";
import ScheduleTeacherTable from "@/components/dashboard/manage-schedule/schedule-teacher-table";
import { ScheduleModel } from "@/model/schedules/all-schedule-model";
import { AppIcons } from "@/constants/icons/icon";

// Enhanced form schema with better validation
const formSchema = z
  .object({
    classId: z.number().min(0, "Class is required"),
    instructorId: z.number().min(0, "Instructor is required"),
    subjectTypeId: z.number().min(1, "Subject type is required"),
    day: z.string().min(1, "Please select a day"),
    academyYear: z
      .number({
        required_error: "Academy year is required",
      })
      .min(2000, "Invalid academy year")
      .max(2100, "Invalid academy year"),
    startTime: z
      .string()
      .min(1, "Please select start time")
      .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
    endTime: z
      .string()
      .min(1, "Please select end time")
      .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
    semesterId: z.number().min(0, "Semester is required"),
    roomId: z.number().min(1, "Room is required"),
    status: z.literal(Constants.ACTIVE),
    yearLevel: z.nativeEnum(YearLevelEnum, {
      required_error: "Year level is required",
    }),
  })
  .refine(
    (data) => {
      // Validate that end time is after start time
      const start = new Date(`1970-01-01T${data.startTime}`);
      const end = new Date(`1970-01-01T${data.endTime}`);
      return end > start;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

// Custom hook for managing form selections
const useFormSelections = () => {
  const [selectedSubjectType, setSelectedSubjectType] =
    useState<SubjectModel | null>(null);
  const [selectedInstructor, setSelectedInstructor] =
    useState<StaffModel | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassModel | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomModel | null>(null);

  const resetSelections = useCallback(() => {
    setSelectedSubjectType(null);
    setSelectedInstructor(null);
    setSelectedClass(null);
    setSelectedRoom(null);
  }, []);

  return {
    selectedSubjectType,
    setSelectedSubjectType,
    selectedInstructor,
    setSelectedInstructor,
    selectedClass,
    setSelectedClass,
    selectedRoom,
    setSelectedRoom,
    resetSelections,
  };
};

export default function AddSchedule() {
  // State management
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSemesters, setIsLoadingSemesters] = useState(false);
  const [isSchedulePreviewAvailable, setIsSchedulePreviewAvailable] =
    useState(false);
  const [isTeacherPreviewAvailable, setIsTeacherPreviewAvailable] =
    useState(false);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);
  const [scheduleData, setScheduleData] = useState<ScheduleModel[]>([]);
  const [semesters, setSemesters] = useState<SemesterModel[]>([]);

  const router = useRouter();
  const selections = useFormSelections();

  // Form setup with better default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classId: 0,
      instructorId: 0,
      subjectTypeId: 0,
      day: "",
      academyYear: new Date().getFullYear(),
      startTime: "",
      endTime: "",
      semesterId: 0,
      roomId: 0,
      status: Constants.ACTIVE,
    },
    mode: "onChange", // Enable real-time validation
  });

  // Watch form values for reactive updates - separate watches for better reactivity
  const watchedAcademyYear = form.watch("academyYear");
  const watchedClassId = form.watch("classId");
  const watchedInstructorId = form.watch("instructorId");
  const watchedSemesterId = form.watch("semesterId");

  // Memoized semester enum lookup
  const getSemesterEnum = useCallback(
    (id: number) => {
      const semester = semesters.find((s) => s.id === id);
      return semester?.semester || "SEMESTER_1";
    },
    [semesters]
  );

  // Optimized semester fetching with proper cleanup
  const fetchSemesters = useCallback(async (academyYear: number) => {
    if (!academyYear) return;

    setIsLoadingSemesters(true);
    try {
      const result = await getAllSemesterService({
        academyYear,
        status: StatusEnum.ACTIVE,
      });

      if (result?.content) {
        setSemesters(result.content);
      } else {
        setSemesters([]);
        toast.warning("No semesters found for the selected year");
      }
    } catch (error) {
      console.error("Error fetching semesters:", error);
      toast.error("Failed to load semesters");
      setSemesters([]);
    } finally {
      setIsLoadingSemesters(false);
    }
  }, []);

  // Optimized schedule fetching with proper loading states
  const fetchSchedule = useCallback(
    async (
      classId: number,
      instructorId: number,
      semesterId: number,
      academyYear: number
    ) => {
      if (semesterId === 0 || academyYear === 0) {
        setScheduleData([]);
        return;
      }

      // Must have either classId or instructorId (but not both as 0)
      const hasValidClassId = classId && classId > 0;
      const hasValidInstructorId = instructorId && instructorId > 0;

      if (!hasValidClassId && !hasValidInstructorId) {
        setScheduleData([]);
        return;
      }

      console.log("Fetching schedule with:", {
        classId,
        instructorId,
        semesterId,
        academyYear,
      });

      setIsLoadingSchedule(true);
      try {
        let res = null;
        const semester = getSemesterEnum(semesterId);

        // Priority: If both are selected, use instructor first
        if (hasValidInstructorId) {
          console.log("Fetching by instructor:", instructorId);
          res = await getAllSimpleScheduleService({
            classId: hasValidClassId ? classId : undefined, // Include classId if valid
            teacherId: instructorId,
            academyYear,
            semester,
            status: StatusEnum.ACTIVE,
          });
          setIsTeacherPreviewAvailable(true);
          console.log("Instructor Schedule Preview: ", res);
        } else if (hasValidClassId) {
          console.log("Fetching by class:", classId);
          res = await getAllSimpleScheduleService({
            classId,
            academyYear,
            semester,
            status: StatusEnum.ACTIVE,
          });
          console.log("Class Schedule Preview: ", res);
          setIsSchedulePreviewAvailable(true);
        }

        console.log("Schedule API response:", res);
        setScheduleData(res);
      } catch (error) {
        console.error("Failed to fetch schedule", error);
        toast.error("Failed to load schedule preview");
        setScheduleData([]);
      } finally {
        setIsLoadingSchedule(false);
      }
    },
    [getSemesterEnum]
  );

  // Effect for semester fetching
  useEffect(() => {
    if (watchedAcademyYear && watchedAcademyYear > 0) {
      fetchSemesters(watchedAcademyYear);
      // Reset semester selection when academy year changes
      form.setValue("semesterId", 0);
    }
  }, [watchedAcademyYear, fetchSemesters, form]);

  // Effect for schedule fetching - trigger immediately when dependencies change
  useEffect(() => {
    const hasValidSemester = watchedSemesterId > 0;
    const hasValidYear = watchedAcademyYear > 0;
    const hasValidClassId = watchedClassId > 0;
    const hasValidInstructorId = watchedInstructorId > 0;
    const hasSemesters = semesters.length > 0;

    if (
      hasValidSemester &&
      hasValidYear &&
      hasSemesters &&
      (hasValidClassId || hasValidInstructorId)
    ) {
      fetchSchedule(
        watchedClassId,
        watchedInstructorId,
        watchedSemesterId,
        watchedAcademyYear
      );
    } else {
      setScheduleData([]);
    }
  }, [
    watchedClassId,
    watchedInstructorId,
    watchedSemesterId,
    watchedAcademyYear,
    semesters.length,
    fetchSchedule, // Add fetchSchedule to dependencies
  ]);

  // Enhanced form submission with better error handling
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const scheduleData = {
        startTime: values.startTime,
        endTime: values.endTime,
        day: values.day,
        academyYear: values.academyYear,
        classId: values.classId,
        teacherId: values.instructorId,
        courseId: values.subjectTypeId,
        roomId: values.roomId,
        semesterId: values.semesterId,
        status: values.status,
        yearLevel: values.yearLevel,
      };

      const response = await createScheduleService(scheduleData);

      if (response) {
        toast.success("Schedule created successfully!");
        // Reset form and selections
        form.reset();
        selections.resetSelections();
        router.back();
      } else {
        throw new Error("Failed to create schedule");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Failed to create schedule";
      toast.error(errorMessage);
      console.error("Error creating schedule:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubjectTypeChange = useCallback(
    (subjectType: SubjectModel) => {
      selections.setSelectedSubjectType(subjectType);
      form.setValue("subjectTypeId", subjectType.id, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [selections, form]
  );

  const handleInstructorChange = useCallback(
    (instructor: StaffModel) => {
      console.log("Instructor changed:", instructor);
      selections.setSelectedInstructor(instructor);
      form.setValue("instructorId", instructor.id, {
        shouldValidate: true,
        shouldDirty: true,
      });
      form.trigger("instructorId");
    },
    [selections, form]
  );

  const handleClassChange = useCallback(
    (classData: ClassModel) => {
      console.log("Class changed:", classData);
      selections.setSelectedClass(classData);
      form.setValue("classId", classData.id, {
        shouldValidate: true,
        shouldDirty: true,
      });
      form.trigger("classId");
    },
    [selections, form]
  );

  const handleRoomChange = useCallback(
    (room: RoomModel) => {
      selections.setSelectedRoom(room);
      form.setValue("roomId", room.id, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [selections, form]
  );

  const handleYearChange = useCallback(
    (year: number) => {
      form.setValue("academyYear", year, {
        shouldValidate: true,
        shouldDirty: true,
      });
      // Trigger form state update to ensure reactivity
      form.trigger("academyYear");
    },
    [form]
  );

  const handleBackNavigation = useCallback(() => {
    router.back();
  }, [router]);

  // Memoized day options for better performance
  const dayOptions = useMemo(
    () => Object.entries(DayEnum).map(([key, value]) => ({ key, value })),
    []
  );

  // Memoized year level options
  const yearLevelOptions = useMemo(
    () => [
      { value: YearLevelEnum.FIRST_YEAR, label: "Year 1" },
      { value: YearLevelEnum.SECOND_YEAR, label: "Year 2" },
      { value: YearLevelEnum.THIRD_YEAR, label: "Year 3" },
      { value: YearLevelEnum.FOURTH_YEAR, label: "Year 4" },
    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* Enhanced Breadcrumb */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={ROUTE.DASHBOARD}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={ROUTE.SCHEDULE.DEPARTMENT}>
                  Department List
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={ROUTE.DASHBOARD}>
                  Class List
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Add Schedule</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full"
            >
              <img
                src={AppIcons.Back}
                alt="back Icon"
                className="h-4 w-4 mr-5 text-muted-foreground"
              />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900">
              Add Schedule
            </h1>
          </div>

          {/* Enhanced Class Info Card */}
          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-gray-900">
                  Schedule Information
                </div>
                <div className="flex gap-6 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Degree:</span> Associate
                    Degree
                  </div>
                  <div>
                    <span className="font-medium">Current Year:</span>{" "}
                    {new Date().getFullYear()}
                  </div>
                  <div>
                    <span className="font-medium">Academy Year:</span>{" "}
                    {watchedAcademyYear}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Enhanced Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="classId"
                    render={() => (
                      <FormItem>
                        <FormLabel>
                          Select Class <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <ComboboxSelectClass
                            dataSelect={selections.selectedClass}
                            onChangeSelected={handleClassChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subjectTypeId"
                    render={() => (
                      <FormItem>
                        <FormLabel>
                          Subject Type <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <ComboboxSelectSubject
                            dataSelect={selections.selectedSubjectType}
                            onChangeSelected={handleSubjectTypeChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="academyYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Academy Year <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <YearSelector
                            value={field.value}
                            onChange={handleYearChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="semesterId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Semester <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(parseInt(value))
                          }
                          value={field.value ? field.value.toString() : ""}
                          disabled={
                            isLoadingSemesters || semesters.length === 0
                          }
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  isLoadingSemesters
                                    ? "Loading semesters..."
                                    : semesters.length === 0
                                    ? "No semesters available"
                                    : "Select a semester"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {semesters.map((semester) => (
                              <SelectItem
                                key={semester.id}
                                value={semester.id?.toString() || ""}
                              >
                                {semester.semester}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Year Level <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={isSubmitting}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select year level" />
                            </SelectTrigger>
                            <SelectContent>
                              {yearLevelOptions.map(({ value, label }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="instructorId"
                    render={() => (
                      <FormItem>
                        <FormLabel>
                          Instructor <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <ComboboxSelectInstructor
                            dataSelect={selections.selectedInstructor}
                            onChangeSelected={handleInstructorChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Day <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a day" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {dayOptions.map(({ key, value }) => (
                              <SelectItem key={key} value={key}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Start Time <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="time" {...field} className="w-full" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            End Time <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="time" {...field} className="w-full" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="roomId"
                    render={() => (
                      <FormItem>
                        <FormLabel>
                          Room <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <ComboboxSelectRoom
                            dataSelect={selections.selectedRoom}
                            onChangeSelected={handleRoomChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Schedule Preview with Loading States */}
          {isLoadingSchedule && (
            <Card>
              <CardContent className="p-6 text-center">
                <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                <p className="mt-2 text-sm text-gray-600">
                  Loading schedule preview...
                </p>
              </CardContent>
            </Card>
          )}

          {isSchedulePreviewAvailable && (
            <SchedulePreviewTable scheduleList={scheduleData} />
          )}
          {isTeacherPreviewAvailable && (
            <ScheduleTeacherTable scheduleList={scheduleData} />
          )}

          {/* Enhanced Action Buttons */}
          <Card>
            <CardContent className="flex justify-end items-center p-4 gap-3">
              {" "}
              <Button
                type="button"
                variant="outline"
                onClick={handleBackNavigation}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !form.formState.isValid}
                className="bg-green-700 hover:bg-green-800 text-white px-6 min-w-[100px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Schedule"
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
