"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft } from "lucide-react";

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
import { DayEnum, StatusEnum } from "@/constants/constant";
import { Constants } from "@/constants/text-string";
import { createScheduleService } from "@/service/schedule/schedule.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getAllSemesterService } from "@/service/master-data/semester.service";

const formSchema = z.object({
  classId: z.number().min(1, "Class is required"),
  departmentId: z.number().min(1, "Department is required"),
  instructorId: z.number().min(1, "Instructor is required"),
  subjectTypeId: z.number().min(1, "Subject type is required"),
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

export default function AddSchedule() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSemesters, setIsLoadingSemesters] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentModel | null>(null);
  const [selectedSubjectType, setSelectedSubjectType] =
    useState<SubjectModel | null>(null);
  const [selectedInstructor, setSelectedInstructor] =
    useState<StaffModel | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassModel | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomModel | null>(null);
  const [semesters, setSemesters] = useState<SemesterModel[]>([]);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classId: 0,
      departmentId: 0,
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
  });

  const watchedAcademyYear = form.watch("academyYear");

  // Fetch semesters when academy year changes
  useEffect(() => {
    const fetchSemesters = async () => {
      if (!watchedAcademyYear) return;

      setIsLoadingSemesters(true);
      try {
        const result = await getAllSemesterService({
          academyYear: watchedAcademyYear,
          status: StatusEnum.ACTIVE,
        });

        if (result?.content) {
          setSemesters(result.content);
        }
      } catch (error) {
        console.error("Error fetching semesters:", error);
        toast.error("Failed to load semesters");
      } finally {
        setIsLoadingSemesters(false);
      }
    };

    fetchSemesters();

    // Reset semester selection when academy year changes
    form.setValue("semesterId", 0);
  }, [watchedAcademyYear, form]);

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
      };

      const response = await createScheduleService(scheduleData);

      if (response) {
        toast.success("Schedule created successfully");
        router.back();
      } else {
        toast.error("Failed to create schedule");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create schedule");
      console.error("Error creating schedule:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDepartmentChange = (department: DepartmentModel) => {
    setSelectedDepartment(department);
    form.setValue("departmentId", department.id, { shouldValidate: true });
  };

  const handleSubjectTypeChange = (subjectType: SubjectModel) => {
    setSelectedSubjectType(subjectType);
    form.setValue("subjectTypeId", subjectType.id, { shouldValidate: true });
  };

  const handleInstructorChange = (instructor: StaffModel) => {
    setSelectedInstructor(instructor);
    form.setValue("instructorId", instructor.id, { shouldValidate: true });
  };

  const handleClassChange = (classData: ClassModel) => {
    setSelectedClass(classData);
    form.setValue("classId", classData.id, { shouldValidate: true });
  };

  const handleRoomChange = (room: RoomModel) => {
    setSelectedRoom(room);
    form.setValue("roomId", room.id, { shouldValidate: true });
  };

  const handleYearChange = (year: number) => {
    form.setValue("academyYear", year, { shouldValidate: true });
  };

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

          <div className="flex items-center gap-3 mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleBackNavigation}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900">
              Add Schedule
            </h1>
          </div>

          {/* Class Info Card */}
          <Card className="mb-6 bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-8">
                <div className="text-lg font-semibold text-gray-900"></div>
                <div className="gap-6 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Degree:</span> Associate
                    Degree
                  </div>
                  <div>
                    <span className="font-medium">Year:</span> 2025
                  </div>
                  <div>
                    <span className="font-medium">Academy Year:</span> 2025
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Form */}
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    render={() => (
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
                    render={() => (
                      <FormItem>
                        <FormLabel>
                          Subject Type <span className="text-red-500">*</span>
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
                                value={semester.id.toString()}
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
                    render={() => (
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

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-700 hover:bg-green-800 text-white px-6"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating...
                    </>
                  ) : (
                    "Create"
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
