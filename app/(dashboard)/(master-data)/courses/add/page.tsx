"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ComboboxSelectDepartment } from "@/components/shared/ComboBox/combobox-department";
import { ComboboxSelectSubject } from "@/components/shared/ComboBox/combobox-subject-type";
import { ComboboxSelectInstructor } from "@/components/shared/ComboBox/combobox-instructor";
import { DepartmentModel } from "@/model/master-data/department/all-department-model";
import { SubjectModel } from "@/model/master-data/subject/all-subject-model";
import { Constants } from "@/constants/text-string";
import { createCourseService } from "@/service/master-data/course.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/constants/routes";
import { StaffModel } from "@/model/user/staff/staff.respond.model";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const courseFormSchema = z.object({
  subjectCode: z.string().min(1, "Subject code is required"),
  subjectNameKh: z.string().optional(),
  subjectNameEn: z.string().min(1, "Subject name in English is required"),
  credit: z.string().min(1, "Credit is required"),
  theory: z.string().min(1, "Theory is required"),
  execute: z.string().min(1, "Execute is required"),
  apply: z.string().min(1, "Apply is required"),
  departmentId: z.number().min(1, "Department is required"),
  subjectTypeId: z.number().min(1, "Subject type is required"),
  instructorId: z.number().min(1, "Instructor is required"),
  totalHours: z.string().min(1, "Total hours is required"),
  description: z.string().optional(),
  purpose: z.string().optional(),
  expectedOutcome: z.string().optional(),
});

export default function AddCoursePage() {
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentModel | null>(null);
  const [selectedSubjectType, setSelectedSubjectType] =
    useState<SubjectModel | null>(null);
  const [selectedInstructor, setSelectedInstructor] =
    useState<StaffModel | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  // Initialize form
  const form = useForm({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      subjectCode: "",
      subjectNameKh: "",
      subjectNameEn: "",
      credit: "",
      theory: "",
      execute: "",
      apply: "",
      departmentId: 0,
      subjectTypeId: 0,
      instructorId: 0,
      totalHours: "",
      description: "",
      purpose: "",
      expectedOutcome: "",
    },
  });

  type CourseFormData = z.infer<typeof courseFormSchema>;

  const handleDepartmentChange = (department: DepartmentModel) => {
    setSelectedDepartment(department);
    form.setValue("departmentId", department.id, {
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

  const handleSubmit = async (data: CourseFormData) => {
    setIsSubmitting(true);
    setIsUploading(true);
    try {
      const courseData = {
        code: data.subjectCode,
        nameKH: data.subjectNameKh,
        nameEn: data.subjectNameEn,
        credit: Number(data.credit),
        theory: Number(data.theory),
        execute: Number(data.execute),
        apply: Number(data.apply),
        totalHour: Number(data.totalHours),
        description: data.description,
        purpose: data.purpose,
        expectedOutcome: data.expectedOutcome,
        status: Constants.ACTIVE,
        departmentId: data.departmentId,
        subjectId: data.subjectTypeId,
        teacherId: data.instructorId,
      };
      await createCourseService(courseData);
      toast.success("Course created successfully");
      router.replace(ROUTE.COURSES.INDEX);
    } catch (error: any) {
      toast.error(error.message || "Failed to create course");
      console.error("Error submitting course:", error);
    } finally {
      setIsUploading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-2">
      {/* Mobile: Breadcrumb on top, Desktop: Breadcrumb on right */}
      <div className={cn(useIsMobile() ? "p-4" : "")}>
        <div className="flex flex-col gap-4">
          {/* Mobile breadcrumb - shows only on mobile */}
          <div className="block md:hidden">
            <Breadcrumb>
              <BreadcrumbList className="flex-wrap justify-start text-sm">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Add course</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Main content container */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Add course</h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Institute Management System
              </p>
            </div>

            {/* Desktop breadcrumb - shows only on desktop */}
            <div className="hidden md:block">
              <Breadcrumb>
                <BreadcrumbList className="flex-wrap justify-end">
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Add course</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-4">
          <Link href="/courses">
            <Button variant="outline" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" /> BACK
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="subjectCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Subject code <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Subject code..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subjectNameKh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject name (KH)</FormLabel>
                    <FormControl>
                      <Input placeholder="Subject name (KH)..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subjectNameEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Subject name (EN) <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Subject name (EN)..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <FormField
                  control={form.control}
                  name="credit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Credit <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Credit..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="theory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Theory <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Theory..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="execute"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Execute <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Execute..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="apply"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Apply <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Apply..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                name="totalHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Total hours <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Total hours..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Purpose..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expectedOutcome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Outcome</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Anticipated Outcome..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                {/* <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Save className="mr-2 h-4 w-4" /> Save course
                </Button> */}
                <Button
                  type="submit"
                  disabled={isUploading || isSubmitting}
                  className="bg-teal-900 text-white hover:bg-teal-950"
                >
                  {isUploading || isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Saving...
                    </>
                  ) : (
                    "Save Course"
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
