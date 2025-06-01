"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

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
import { ROUTE } from "@/constants/routes";
import { ComboboxSelectDepartment } from "@/components/shared/ComboBox/combobox-department";
import { ComboboxSelectSubject } from "@/components/shared/ComboBox/combobox-subject-type";
import { ComboboxSelectInstructor } from "@/components/shared/ComboBox/combobox-instructor";
import { DepartmentModel } from "@/model/master-data/department/all-department-model";
import { SubjectModel } from "@/model/master-data/subject/all-subject-model";

import { YearSelector } from "@/components/shared/year-selector";
import { ComboboxSelectRoom } from "@/components/shared/ComboBox/combobox-room";
import { RoomModel } from "@/model/master-data/room/all-room-model";
import { ClassModel } from "@/model/master-data/class/all-class-model";
import { SemesterModel } from "@/model/master-data/semester/semester-model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DayEnum, SemesterEnum } from "@/constants/constant";
import { ComboboxSelectClass } from "@/components/shared/ComboBox/combobox-class";
import {
  updateScheduleService,
  getDetailScheduleService,
} from "@/service/schedule/schedule.service";
import { toast } from "sonner";
import { ComboboxSelectSemester } from "@/components/shared/ComboBox/combobox-semester";
import { Constants } from "@/constants/text-string";
import { StaffModel } from "@/model/user/staff/staff.respond.model";

const formSchema = z.object({
  classId: z.number().min(1, "Class is required"),
  departmentId: z.number().min(1, "Department is required"),
  instructorId: z.number().min(1, "Instructor is required"),
  subjectTypeId: z.number().min(1, "Subject type is required"),
  courseId: z.number().min(1, "Course is required"),
  day: z.string().min(1, "Please select a day"),
  academyYear: z.number({
    required_error: "Academy year is required",
  }),
  startTime: z.string().min(1, "Please select start time"),
  endTime: z.string().min(1, "Please select end time"),
  semesterId: z.number().min(1, "Semester is required"),
  roomId: z.number().min(1, "Room is required"),
  status: z.literal(Constants.ACTIVE),
});

export default function UpdateSchedule() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentModel | null>(null);
  const [selectedSemester, setSelectedSemester] =
    useState<SemesterModel | null>(null);
  const [selectedSubjectType, setSelectedSubjectType] =
    useState<SubjectModel | null>(null);
  const [selectedInstructor, setSelectedInstructor] =
    useState<StaffModel | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassModel | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomModel | null>(null);

  const params = useParams();
  const router = useRouter();
  const scheduleId = Number(params.classId); // Changed from params.classId to params.id

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classId: 0,
      departmentId: 0,
      instructorId: 0,
      subjectTypeId: 0,
      courseId: 0,
      day: "",
      academyYear: new Date().getFullYear(),
      startTime: "",
      endTime: "",
      semesterId: 0,
      roomId: 0,
      status: Constants.ACTIVE,
    },
  });

  // Fetch existing schedule data
  useEffect(() => {
    const fetchScheduleData = async () => {
      if (!scheduleId) return;

      try {
        setIsLoading(true);
        const scheduleData = await getDetailScheduleService(scheduleId);

        if (scheduleData) {
          // Populate form with existing data
          form.reset({
            classId: scheduleData.classes?.id || 0,
            departmentId: scheduleData.course?.department?.id || 0,
            instructorId: scheduleData.teacher?.id || 0,
            subjectTypeId: scheduleData.course?.subject?.id || 0,
            courseId: scheduleData.course?.id || 0,
            day: scheduleData.day || "",
            academyYear:
              scheduleData.classes?.academyYear ||
              scheduleData.semester?.academyYear ||
              new Date().getFullYear(),
            startTime: scheduleData.startTime || "",
            endTime: scheduleData.endTime || "",
            semesterId: scheduleData.semester?.id || 0,
            roomId: scheduleData.room?.id || 0,
            status: scheduleData.status || Constants.ACTIVE,
          });

          // Set selected items for comboboxes
          setSelectedClass(scheduleData.classes || null);
          setSelectedDepartment(scheduleData.course?.department || null);
          setSelectedInstructor(scheduleData.teacher || null);
          setSelectedSubjectType(scheduleData.course?.subject || null);
          setSelectedSemester(scheduleData.semester || null);
          setSelectedRoom(scheduleData.room || null);
        } else {
          toast.error("Schedule not found");
          // router.replace(ROUTE.SCHEDULE.DEPARTMENT);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to load schedule data");
        console.error("Error fetching schedule:", error);
        // router.replace(ROUTE.SCHEDULE.DEPARTMENT);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScheduleData();
  }, [scheduleId, form, router]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const scheduleData = {
        startTime: values.startTime,
        endTime: values.endTime,
        day: values.day,
        classId: values.classId,
        teacherId: values.instructorId,
        courseId: values.courseId,
        roomId: values.roomId,
        semesterId: values.semesterId,
        status: values.status,
      };

      await updateScheduleService(scheduleId, scheduleData);
      toast.success("Schedule updated successfully");
      router.replace(ROUTE.SCHEDULE.DEPARTMENT);
    } catch (error: any) {
      toast.error(error.message || "Failed to update schedule");
      console.error("Error updating schedule:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDiscard = () => {
    router.back();
  };

  const handleDepartmentChange = (department: DepartmentModel) => {
    setSelectedDepartment(department);
    form.setValue("departmentId", department.id, {
      shouldValidate: true,
    });
  };

  const handleSemesterChange = (semester: SemesterModel) => {
    setSelectedSemester(semester);
    form.setValue("semesterId", semester.id, {
      shouldValidate: true,
    });
  };

  const handleSubjectTypeChange = (subjectType: SubjectModel) => {
    setSelectedSubjectType(subjectType);
    form.setValue("subjectTypeId", subjectType.id, {
      shouldValidate: true,
    });
  };

  const handleInstructorChange = (instructor: StaffModel) => {
    setSelectedInstructor(instructor);
    form.setValue("instructorId", instructor.id, {
      shouldValidate: true,
    });
  };

  const handleClassChange = (classData: ClassModel) => {
    setSelectedClass(classData);
    form.setValue("classId", classData.id, {
      shouldValidate: true,
    });
  };

  const handleRoomChange = (room: RoomModel) => {
    setSelectedRoom(room);
    form.setValue("roomId", room.id, {
      shouldValidate: true,
    });
  };

  const handleYearChange = (year: number) => {
    form.setValue("academyYear", year, {
      shouldValidate: true,
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        <span className="ml-2">Loading schedule details...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Update Schedule</h1>
          <p className="text-muted-foreground">Institute Management System</p>
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={ROUTE.SCHEDULE.DEPARTMENT}>
                Schedules
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Update Schedule</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mb-4">
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" /> BACK
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="classId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Select Class <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <ComboboxSelectClass
                            dataSelect={selectedClass}
                            onChangeSelected={handleClassChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="departmentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Department <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <ComboboxSelectDepartment
                            dataSelect={selectedDepartment}
                            onChangeSelected={handleDepartmentChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subjectTypeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Subject type <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <ComboboxSelectSubject
                            dataSelect={selectedSubjectType}
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
                        <FormControl>
                          <ComboboxSelectSemester
                            dataSelect={selectedSemester}
                            onChangeSelected={handleSemesterChange}
                          />
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Instructor <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <ComboboxSelectInstructor
                            dataSelect={selectedInstructor}
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
                            {Object.entries(DayEnum).map(([key, value]) => (
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Room <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <ComboboxSelectRoom
                            dataSelect={selectedRoom}
                            onChangeSelected={handleRoomChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-900 text-white  hover:bg-green-950 "
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Updating...
                    </>
                  ) : (
                    "Update Schedule"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
