"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import { getAllStudentsService } from "@/service/user/student.service";
import { StatusEnum } from "@/constants/constant";
import { Column, CustomTable } from "@/components/shared/layout/TableSection";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
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
import { Card } from "@/components/ui/card";
import Component from "@/components/dashboard/survey/form-section-builder";
import SurveyFormCard from "@/components/dashboard/survey/survey-form";
export default function ManageQAPage() {
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
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [isAddNew, setIsAddNew] = useState<boolean>(false);
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
  // const handleAddNew = ()=>{
  //    setIsAddNew(true)
  // }
  const iconColor = "text-black";
  const [sections, setSections] = useState<number[]>([]);

  const handleAddNew = () => {
    setSections((prev) => [...prev, prev.length]);
  };
  const handleRemoveSection = (indexToRemove: number) => {
    setSections((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const columns: Column<StudentModel>[] = [
    {
      key: "student#",
      header: "#",
      render: (_: any, index: number) => index + 1,
    },
    {
      key: "id",
      header: "student ID",
      render: (student: StudentModel) => `${student.id ?? ""}`,
    },
    {
      key: "fullname (kh)",
      header: "Fullname (KH)",
      render: (student: StudentModel) =>
        `${student.khmerFirstName ?? "---"} ${student.khmerLastName ?? ""}`,
    },
    {
      key: "fullname (en)",
      header: "Fullname (EN)",
      render: (student: StudentModel) =>
        `${student.englishFirstName ?? "---"} ${student.englishLastName ?? ""}`,
    },
    {
      key: "gender",
      header: "Gender",
      render: (student: any) => (
        <span className={`inline-flex rounded-full px-2 py-1  text-center`}>
          {student.gender ?? "---"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (student: any) => (
        <>
          <BreadcrumbLink href={ROUTE.PAYMENT.VIEW_PAYMENT(String(student.id))}>
            <Button
              variant="link"
              size="icon"
              className={`${iconColor} underline hover:text-blue-600 flex items-center`}
            >
              <Eye size="h-4 w-4" />
              <span className="text-sm"> Detail</span>
            </Button>
          </BreadcrumbLink>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <CardHeaderSection
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          { label: "Manage Q&As", href: ROUTE.SURVEY.MANAGE_QA },
        ]}
        title="Manage Q&As"
      />

      {sections.map((_, index) => (
        <div key={index} className="mb-4">
          <Component
            key={index}
            sectionNumber={index + 1}
            totalSections={sections.length}
            onRemove={async () => handleRemoveSection(index)}
          />
        </div>
      ))}

      <div className="overflow-x-auto">
        <Card>
          <Button
            className="bg-transparent text-[#024D3E] border-gray-300 hover:bg-transparent underline"
            onClick={handleAddNew}
          >
            + Add New Section
          </Button>
        </Card>
      </div>
      {/* {!isLoading && allStudentData && (
        <div className="mt-4 flex justify-end ">
          <PaginationPage
            currentPage={allStudentData.pageNo}
            totalPages={allStudentData.totalPages}
            onPageChange={(page: number) => loadStudents({ pageNo: page })}
          />
        </div>
      )} */}
    </div>
  );
}
