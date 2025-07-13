"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  editStudentService,
  getAllStudentsService,
} from "@/service/user/student.service";
import { StatusEnum } from "@/constants/constant";
import { CardHeaderSection } from "@/components/shared/layout/card-header-section";
import { ROUTE } from "@/constants/routes";
import { YearSelector } from "@/components/shared/year-selector";
import { ClassModel } from "@/model/master-data/class/all-class-model";
import { useDebounce } from "@/utils/debounce/debounce";
import { StudentTableHeader } from "@/constants/table/user";
import ChangePasswordModal from "@/components/dashboard/users/shared/change-password-modal";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import {
  AllStudentModel,
  RequestAllStudent,
  StudentModel,
} from "@/model/user/student/student.request.model";
import Loading from "@/components/shared/loading";
import { ComboboxSelectClass } from "@/components/shared/ComboBox/combobox-class";
import PaginationPage from "@/components/shared/pagination-page";
import { useIsMobile } from "@/hooks/use-mobile";

export default function StudentsListPage() {
  // Core state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectAcademicYear, setSelectAcademicYear] = useState<
    number | undefined
  >();
  const [selectedClass, setSelectedClass] = useState<ClassModel | undefined>(
    undefined
  );

  // Main student data from API
  const [allStudentData, setAllStudentData] = useState<AllStudentModel | null>(
    null
  );

  // Dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentModel | null>(
    null
  );

  // Debounced search to reduce API call frequency
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const router = useRouter();

  // Fetch student data from server
  const loadStudents = useCallback(
    async (param: RequestAllStudent) => {
      setIsLoading(true);

      try {
        const response = await getAllStudentsService({
          ...param,
          academicYear: selectAcademicYear,
          search: debouncedSearchQuery,
          status: StatusEnum.ACTIVE,
          classId: selectedClass?.id,
        });

        if (response) {
          setAllStudentData(response);
        } else {
          console.error("Failed to fetch student:");
        }
      } catch (error) {
        toast.error("An error occurred while loading student");
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedSearchQuery, selectedClass, selectAcademicYear]
  );

  // Run fetch on mount and when filters change
  useEffect(() => {
    loadStudents({});
  }, [loadStudents, selectedClass, debouncedSearchQuery, selectAcademicYear]);

  // Handlers for search, year, class change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleYearChange = (e: number) => {
    setSelectAcademicYear(e);
  };

  const handleClassChange = (e: ClassModel | null) => {
    setSelectedClass(e ?? undefined);
  };

  // Delete selected student (optimistic UI update)
  async function handleDeleteStudent() {
    if (!selectedStudent) return;

    setIsSubmitting(true);
    try {
      const originalData = allStudentData;

      // Optimistically remove student from UI
      setAllStudentData((prevData) => {
        if (!prevData) return null;
        const updatedContent = prevData.content.filter(
          (item) => item.id !== selectedStudent.id
        );
        return {
          ...prevData,
          content: updatedContent,
          totalElements: prevData.totalElements - 1,
        };
      });

      const response = await editStudentService(selectedStudent.id, {
        status: StatusEnum.INACTIVE,
      });

      if (response) {
        toast.success(
          `Student ${selectedStudent.username ?? ""} deleted successfully`
        );
      } else {
        setAllStudentData(originalData);
        toast.error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("An error occurred while deleting the student");
      loadStudents({});
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
    }
  }

  return (
    <div className="space-y-4">
      <CardHeaderSection
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          { label: "Student List", href: "" },
        ]}
        searchValue={searchQuery}
        searchPlaceholder="Search..."
        onSearchChange={handleSearchChange}
        buttonText="Add New"
        buttonHref={ROUTE.STUDENTS.ADD_NEW}
        buttonIcon={<Plus className="mr-2 h-2 w-2" />}
        customSelect={
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-4">
            <div className="w-full min-w-[200px] md:w-1/2">
              <div className="w-full min-w-[200px]">
                <YearSelector
                  title="Select Year"
                  onChange={handleYearChange}
                  value={selectAcademicYear || 0}
                />
              </div>
            </div>

            <div className="w-full min-w-[200px] md:w-1/2">
              <ComboboxSelectClass
                dataSelect={selectedClass ?? null}
                onChangeSelected={handleClassChange}
                disabled={isSubmitting}
              />
            </div>
          </div>
        }
      />

      <div className={`overflow-x-auto mt-4 ${useIsMobile() ? "pl-4" : ""}`}>
        {isLoading ? (
          <Loading />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {StudentTableHeader.map((header, index) => (
                  <TableHead key={index} className={header.className}>
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {allStudentData?.content.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={StudentTableHeader.length}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No classes found
                  </TableCell>
                </TableRow>
              ) : (
                allStudentData?.content.map((student, index) => {
                  const indexDisplay =
                    ((allStudentData.pageNo || 1) - 1) *
                      (allStudentData.pageSize || 10) +
                    index +
                    1;
                  return (
                    <TableRow key={student.id}>
                      <TableCell>{indexDisplay}</TableCell>
                      <TableCell>{student.username || "---"}</TableCell>
                      <TableCell>
                        {`${student.khmerFirstName || ""} ${
                          student.khmerLastName || ""
                        }`.trim() || "---"}
                      </TableCell>
                      <TableCell>
                        {`${student.englishFirstName || ""} ${
                          student.englishLastName || ""
                        }`.trim() || "---"}
                      </TableCell>
                      <TableCell>{student.gender || "---"}</TableCell>
                      <TableCell>{student.dateOfBirth || "---"}</TableCell>
                      <TableCell>
                        {student.studentClass?.code || "---"}
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-start space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => {
                                    router.push(
                                      `${ROUTE.STUDENTS.VIEW(
                                        String(student.id)
                                      )}`
                                    );
                                  }}
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                                  disabled={isSubmitting}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Student Detail</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() =>
                                    router.push(
                                      `${ROUTE.STUDENTS.EDIT_STUDENT(
                                        String(student.id)
                                      )}`
                                    )
                                  }
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                                  disabled={isSubmitting}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => {
                                    setSelectedStudent(student);
                                    setIsChangePasswordDialogOpen(true);
                                  }}
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                                  disabled={isSubmitting}
                                >
                                  <RotateCcw className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Reset Password</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => {
                                    setSelectedStudent(student);
                                    setIsDeleteDialogOpen(true);
                                  }}
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 bg-red-500 text-white hover:text-gray-100 hover:bg-red-600"
                                  disabled={isSubmitting}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
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

      <ChangePasswordModal
        isOpen={isChangePasswordDialogOpen}
        onClose={() => {
          setSelectedStudent(null);
          setIsChangePasswordDialogOpen(false);
        }}
        userId={selectedStudent?.id}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteStudent}
        title="Delete Student"
        description={`Are you sure you want to delete the student: ${selectedStudent?.username}?`}
        itemName={selectedStudent?.username}
        isSubmitting={isSubmitting}
      />

      {!isLoading && allStudentData && (
        <div className="mt-4 flex justify-end">
          <PaginationPage
            currentPage={allStudentData.pageNo}
            totalPages={allStudentData.totalPages}
            onPageChange={(page: number) => loadStudents({ pageNo: page })}
          />
        </div>
      )}
    </div>
  );
}
