"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import PaginationPage from "@/components/shared/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { getAllStudentsService } from "@/service/user/student.service";
import { StatusEnum } from "@/constants/constant";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { ROUTE } from "@/constants/routes";
import { YearSelector } from "@/components/shared/year-selector";
import ComboBoxClass from "@/components/shared/ComboBox/combobox-class";
import { ClassModel } from "@/model/master-data/class/all-class-model";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/utils/debounce/debounce";
import Loading from "../../permissions/loading";
import { StudentTableHeader } from "@/constants/table/user";
import ChangePasswordModal from "@/components/dashboard/users/shared/ChangePasswordModal";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import {
  AllStudentModel,
  RequestAllStudent,
  StudentModel,
} from "@/model/user/student/student.request.model";

export default function StudentsListPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectAcademicYear, setSelectAcademicYear] = useState<
    number | undefined
  >();
  const [selectedClass, setSelectedClass] = useState<ClassModel>();
  const [allStudentData, setAllStudentData] = useState<AllStudentModel | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);
  const [selectedStludent, setSelectedStudent] = useState<StudentModel | null>(
    null
  );

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const router = useRouter();
  const loadStudents = useCallback(
    async (param: RequestAllStudent) => {
      setIsLoading(true);

      try {
        const response = await getAllStudentsService({
          search: searchQuery,
          status: StatusEnum.ACTIVE,
          ...param,
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
    [debouncedSearchQuery, selectedClass]
  );

  useEffect(() => {
    loadStudents({});
  }, [loadStudents, selectedClass, debouncedSearchQuery, selectAcademicYear]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleYearChange = (e: number) => {
    setSelectAcademicYear(e);
  };

  const handleClassChange = (e: ClassModel | null) => {
    setSelectedClass(e ?? undefined);
  };

  const iconColor = "text-black";

  async function handleDeleteStudent() {
    if (!selectedStludent) return;

    setIsSubmitting(true);
    try {
      const originalData = allStudentData;
      setAllStudentData((prevData) => {
        if (!prevData) return null;
        const updatedContent = prevData.content.filter(
          (item) => item.id !== selectedStludent.id
        );
        return {
          ...prevData,
          content: updatedContent,
          totalElements: prevData.totalElements - 1,
        };
      });

      const response = await (selectedStludent.id,
      {
        status: StatusEnum.INACTIVE,
      });

      if (response) {
        toast.success(
          `Student ${selectedStludent.username ?? ""} deleted successfully`
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
        back
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          { label: "Student List", href: ROUTE.STUDENTS.LIST },
        ]}
        title="Student list"
        searchValue={searchQuery}
        searchPlaceholder="Search..."
        onSearchChange={handleSearchChange}
        buttonText="Add New"
        buttonHref={ROUTE.STUDENTS.ADD_SINGLE}
        buttonIcon={<Plus className="mr-2 h-2 w-2" />}
        customSelect={
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-4">
            <div className="w-full min-w-[150px] md:w-1/2">
              <YearSelector
                title="ឆ្នាំសិក្សា"
                onChange={handleYearChange}
                value={selectAcademicYear ?? 2024}
                maxYear={2040}
                minYear={2020}
              />
            </div>

            <div className="w-full min-w-[150px] md:w-1/2">
              <ComboBoxClass
                title="ថ្នាក់:"
                disabled={isSubmitting}
                onChange={handleClassChange}
                selectedClass={selectedClass ?? null}
              />
            </div>
          </div>
        }
      />

      <div className="overflow-x-auto">
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
                      <TableCell>
                        {student.khmerFirstName} {student.khmerLastName}
                      </TableCell>
                      <TableCell>
                        {" "}
                        {student.englishFirstName ?? ""}{" "}
                        {student.englishLastName ?? ""}
                      </TableCell>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.gender}</TableCell>
                      <TableCell>{student.dateOfBirth}</TableCell>
                      <TableCell>{student.studentClass.code}</TableCell>
                      <TableCell>
                        <div className="flex justify-start space-x-2">
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
                            className="h-8 w-8 text-black hover:text-gray-900"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setIsChangePasswordDialogOpen(true);
                              setSelectedStudent(student);
                            }}
                            className={iconColor}
                            size="sm"
                          >
                            <RotateCcw />
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedStudent(student);
                              setIsDeleteDialogOpen(true);
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600"
                            disabled={isSubmitting}
                            title="Delete"
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

      <ChangePasswordModal
        isOpen={isChangePasswordDialogOpen}
        onClose={() => {
          setIsChangePasswordDialogOpen(false);
          setSelectedStudent(null);
        }}
        userId={selectedStludent?.id}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteStudent}
        title="Delete Student"
        description={`Are you sure you want to delete the student: ${selectedStludent?.username}?`}
        itemName={selectedStludent?.username}
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
