"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTE } from "@/constants/routes";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  AllCourseModel,
  CourseModel,
} from "@/model/master-data/course/all-course-model";
import { useCallback, useEffect, useState } from "react";
import { AllCourseFilterModel } from "@/model/master-data/course/type-course-model";
import {
  deletedCourseService,
  getAllCourseService,
} from "@/service/master-data/course.service";
import { Constants } from "@/constants/text-string";
import { toast } from "sonner";
import { CourseTableHeader } from "@/constants/table/master-data";
import { useRouter } from "next/navigation";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import PaginationPage from "@/components/shared/pagination-page";
import Loading from "@/components/shared/loading";
import { ComboboxSelectDepartment } from "@/components/shared/ComboBox/combobox-department";
import { DepartmentModel } from "@/model/master-data/department/all-department-model";
import { useForm } from "react-hook-form";

export default function CoursesPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allCourseData, setAllCourseData] = useState<AllCourseModel | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<CourseModel | null>(
    null
  );
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentModel | null>(null);
  type FormValues = {
    departmentId: number;
  };

  const { setValue } = useForm<FormValues>();

  const loadCourses = useCallback(
    async (param: AllCourseFilterModel) => {
      setIsLoading(true);

      try {
        const response = await getAllCourseService({
          search: searchQuery,
          status: Constants.ACTIVE,
          ...param,
        });

        if (response) {
          setAllCourseData(response);
        } else {
          console.error("Failed to fetch departments:");
        }
      } catch (error) {
        toast.error("An error occurred while loading departments");
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery, selectedDepartment]
  );

  useEffect(() => {
    loadCourses({});
  }, [searchQuery, loadCourses, selectedDepartment]);

  async function handleDeleteClass() {
    if (!selectedCourse) return;
    setIsSubmitting(true);
    try {
      const originalData = allCourseData;
      setAllCourseData((prevData) => {
        if (!prevData) return null;
        const updatedContent = prevData.content.filter(
          (item) => item.id !== selectedCourse.id
        );
        return {
          ...prevData,
          content: updatedContent,
          totalElements: prevData.totalElements - 1,
        };
      });

      const response = await deletedCourseService(selectedCourse.id);

      if (response) {
        toast.success(`Class ${selectedCourse.code} deleted successfully`);
      } else {
        setAllCourseData(originalData);
        toast.error("Failed to delete class");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("An error occurred while deleting the course");
      loadCourses({});
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleDepartmentChange = (department: DepartmentModel) => {
    setSelectedDepartment(department);
    setValue("departmentId", department.id as number, {
      shouldValidate: true,
    });
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
                <BreadcrumbPage>Manage Course</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h3 className="text-xl font-bold">Manage Course</h3>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search course..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <ComboboxSelectDepartment
                dataSelect={selectedDepartment}
                onChangeSelected={handleDepartmentChange}
              />

              <Link href={ROUTE.COURSES.ADD}>
                <Button className="bg-green-900 text-white hover:bg-green-950">
                  <Plus className="mr-2 h-2 w-2" />
                  Add New
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="overflow-hidden mt-4">
        {isLoading ? (
          <Loading />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {CourseTableHeader.map((header, index) => (
                  <TableHead key={index} className={header.className}>
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCourseData?.content.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No Course found
                  </TableCell>
                </TableRow>
              ) : (
                allCourseData?.content.map((course, index) => {
                  const indexDisplay =
                    ((allCourseData.pageNo || 1) - 1) * 10 + index + 1;
                  return (
                    <TableRow key={course.id}>
                      <TableCell>{indexDisplay}</TableCell>

                      <TableCell>{course.code}</TableCell>
                      <TableCell>{course.subject.name}</TableCell>
                      <TableCell>{course.credit}</TableCell>
                      <TableCell>{course.user.username}</TableCell>

                      <TableCell>
                        <div className="flex justify-start space-x-2">
                          <Button
                            onClick={() => router.push(`/courses/${course.id}`)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-gray-200"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() =>
                              router.push(`/courses/update/${course.id}`)
                            }
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-gray-200"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedCourse(course);
                              setIsDeleteDialogOpen(true);
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-red-500 text-white hover:bg-red-600"
                            disabled={isSubmitting}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </div>
      {!isLoading && allCourseData && allCourseData.totalPages > 1 && (
        <div className="mt-4 flex justify-end">
          <PaginationPage
            currentPage={allCourseData.pageNo}
            totalPages={allCourseData.totalPages}
            onPageChange={(page: number) => loadCourses({ pageNo: page })}
          />
        </div>
      )}

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteClass}
        title="Delete Course"
        description={`Are you sure you want to delete the course:`}
        itemName={selectedCourse?.nameEn}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
