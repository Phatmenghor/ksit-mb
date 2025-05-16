"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, RotateCcw, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaginationPage from "@/components/shared/pagination";
import {
  AllStudentModel,
  RequestAllStudent,
  StudentModel,
} from "@/model/student/student.model";
import { toast } from "sonner";
import { getAllStudentsService } from "@/service/student.service";
import { StatusEnum } from "@/constants/constant";
import { Column, CustomTable } from "@/components/shared/layout/TableSection";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { ROUTE } from "@/constants/routes";
import { YearSelector } from "@/components/shared/year-selector";
import { ComboboxSelect } from "@/components/shared/custom-comboBox";
import ComboBoxClass from "@/components/shared/ComboBox/combobox-class";
import { ClassModel } from "@/model/master-data/class/all-class-model";

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
          console.error("Failed to fetch departments:");
        }
      } catch (error) {
        toast.error("An error occurred while loading departments");
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    loadStudents({});
  }, [searchQuery, loadStudents, selectAcademicYear]);

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
      key: "id",
      header: "student ID",
    },
    {
      key: "fullname(kh)",
      header: "Fullname (KH)",
      render: (student: StudentModel) =>
        `${student.khmerFirstName} ${student.khmerLastName}`,
    },
    {
      key: "fullname(en)",
      header: "Fullname (EN)",
      render: (student: StudentModel) =>
        `${student.englishFirstName} ${student.englishLastName}`,
    },
    {
      key: "Gender",
      header: "Gender",
    },
    {
      key: "DateOfBirth",
      header: "Date of birth",
      render: (student: any) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            student.status === StatusEnum.ACTIVE
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {student.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (student: any) => (
        <>
          <Button variant="ghost" className={iconColor} size="sm">
            <RotateCcw />
          </Button>
          <Button variant="ghost" className={iconColor} size="sm">
            <Pencil />
          </Button>
          <Button variant="ghost" className={iconColor} size="sm">
            <Trash2 />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <CardHeaderSection
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

      <CustomTable
        columns={columns}
        isLoading={isLoading}
        data={allStudentData?.content ?? []}
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
