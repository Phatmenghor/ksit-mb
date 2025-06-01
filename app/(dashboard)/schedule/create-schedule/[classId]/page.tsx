"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Plus } from "lucide-react";

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
import { createScheduleService } from "@/service/schedule/schedule.service";
import { toast } from "sonner";

import { ComboboxSelectSemester } from "@/components/shared/ComboBox/combobox-semester";
import { Constants } from "@/constants/text-string";
import { useRouter } from "next/navigation";
import { StaffModel } from "@/model/user/staff/staff.respond.model";

interface DayModel {
  id: string;
  name: string;
}

const formSchema = z.object({
  classId: z.number().min(1, "Department is required"),
  departmentId: z.number().min(1, "Department is required"),
  instructorId: z.number().min(1, "Instructor is required"),
  subjectTypeId: z.number().min(1, "Subject type is required"),
  day: z.string().min(1, "Please select a day"),
  academyYear: z.number({
    required_error: "Academy year is required",
  }),
  startTime: z.string().min(1, "Please select start time"),
  endTime: z.string().min(1, "Please select end time"),
  semesterId: z.number().min(1, "Subject type is required"),
  roomId: z.number().min(1, "Subject type is required"),
  status: z.literal(Constants.ACTIVE),
});

export default function AddSchedule() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentModel | null>(null);
  const [selectedSemester, setSelectedSemester] =
    useState<SemesterModel | null>(null);
  const [selectedSubjectType, setSelectedSubjectType] =
    useState<SubjectModel | null>(null);
  const [selectedInstructor, setSelectedInstructor] =
    useState<StaffModel | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassModel | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayModel | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomModel | null>(null);
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

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    console.log(values);
    // return 0;
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
      console.log(scheduleData);
      return;
      await createScheduleService(scheduleData);
      toast.success("Schedule created successfully");
      // router.replace(ROUTE.COURSES.INDEX);
    } catch (error: any) {
      toast.error(error.message || "Failed to create schedule");
      console.error("Error submitting course:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDiscard = () => {
    form.reset();
    setSelectedDepartment(null);
    setSelectedSubjectType(null);
    setSelectedInstructor(null);
    setSelectedClass(null);
    setSelectedDay(null);
    setSelectedRoom(null);
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

  const handleDayChange = (day: DayModel) => {
    setSelectedDay(day);
    form.setValue("day", day.id, {
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
            <Button variant="ghost" size="icon" className="h-8 w-8">
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
                <div className="text-lg font-semibold text-gray-900">
                  Class 2504fsdfsfds
                </div>
                <div className=" gap-6 text-sm text-gray-600">
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
                          onValueChange={(key) => field.onChange(key)} // Remove the cast, store the key directly
                          defaultValue={field.value}
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
                                {" "}
                                {/* Use key as value instead of value */}
                                {value} {/* Display the readable value */}
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

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDiscard}
                  disabled={isSubmitting}
                >
                  Discard
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-700 hover:bg-green-800 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add
                    </>
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
