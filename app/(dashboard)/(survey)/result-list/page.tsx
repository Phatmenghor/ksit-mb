"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import { getAllStudentsService } from "@/service/user/student.service";
import { SemesterFilter, StatusEnum } from "@/constants/constant";
import { Column, CustomTable } from "@/components/shared/layout/table-section";
import { CardHeaderSection } from "@/components/shared/layout/card-header-section";
import { ROUTE } from "@/constants/routes";
import { YearSelector } from "@/components/shared/year-selector";
import { ClassModel } from "@/model/master-data/class/all-class-model";
import { BreadcrumbLink } from "@/components/ui/breadcrumb";
import PaginationPage from "@/components/shared/pagination-page";
import {
  AllStudentModel,
  RequestAllStudent,
  StudentModel,
} from "@/model/user/student/student.request.model";
import { useDebounce } from "@/utils/debounce/debounce";
import { ComboboxSelectClass } from "@/components/shared/ComboBox/combobox-class";
import Loading from "@/components/shared/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ResultListPage() {
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
  const [selectedSemester, setSelectedSemester] = useState<string>("ALL");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
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
          console.log(">>>", response);
        } else {
          console.error("Failed to fetch departments:");
        }
      } catch (error) {
        toast.error("An error occurred while loading departments");
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedSearchQuery, selectedClass, selectAcademicYear]
  );

  useEffect(() => {
    loadStudents({});
  }, [searchQuery, loadStudents, debouncedSearchQuery, selectAcademicYear]);

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

  const columns: Column<StudentModel>[] = [
    {
      key: "student#",
      header: "#",
      render: (_: any, index: number) => index + 1,
    },
    {
      key: "code",
      header: "Class Code",
      render: (student: StudentModel) => `${student.id ?? ""}`,
    },
    {
      key: "subject",
      header: "Subject",
      render: (student: StudentModel) =>
        `${student.khmerFirstName ?? "---"} ${student.khmerLastName ?? ""}`,
    },
    {
      key: "teacher",
      header: "Teacher",
      render: (student: StudentModel) =>
        `${student.englishFirstName ?? "---"} ${student.englishLastName ?? ""}`,
    },
    {
      key: "total",
      header: "Total Submitted",
      render: (student: any) => (
        <span className={`inline-flex rounded-full px-2 py-1  text-center`}>
          {student.gender ?? "---"}
        </span>
      ),
    },
    {
      key: "lastUpdate",
      header: "Last Updated",
      render: (student: StudentModel) =>
        `${student.englishFirstName ?? "---"} ${student.englishLastName ?? ""}`,
    },
  ];

  return (
    <div className="space-y-4">
      <CardHeaderSection
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          { label: "Survey Results", href: ROUTE.SURVEY.RESULT_LIST },
        ]}
        title="Survey Results"
        searchValue={searchQuery}
        searchPlaceholder="Enter name or ID..."
        onSearchChange={handleSearchChange}
        customSelect={
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-4">
            <div className="w-full min-w-[200px] md:w-1/2">
              <ComboboxSelectClass
                dataSelect={selectedClass ?? null}
                onChangeSelected={handleClassChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="w-full min-w-[200px] md:w-1/2">
              <div className="w-full min-w-[200px]">
                <YearSelector
                  title="Select Year"
                  onChange={handleYearChange}
                  value={selectAcademicYear || 0}
                />
              </div>
            </div>

            <Select onValueChange={handleSearchChange} value={selectedSemester}>
              <SelectTrigger>
                <SelectValue placeholder="Select a semester" />
              </SelectTrigger>
              <SelectContent>
                {SemesterFilter.map((semester) => (
                  <SelectItem key={semester.value} value={semester.value}>
                    {semester.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        }
      />

      <div className="overflow-x-auto">
        {isLoading ? (
          <Loading />
        ) : (
          <CustomTable
            columns={columns}
            isLoading={isLoading}
            data={allStudentData?.content ?? []}
          />
        )}
      </div>

      {!isLoading && allStudentData && (
        <div className="mt-4 flex justify-end ">
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
