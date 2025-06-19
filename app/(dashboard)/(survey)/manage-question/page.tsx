"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import { getAllStudentsService } from "@/service/user/student.service";
import { StatusEnum } from "@/constants/constant";
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
import { Card } from "@/components/ui/card";
import Component from "@/components/dashboard/survey/form-section-builder";
import SurveyFormCard from "@/components/dashboard/survey/survey-form";
import { getAllSurveySectionService } from "@/service/survey/survey.service";
import {
  SurveyResponseDto,
  SurveySectionResponseDto,
} from "@/model/survey/survey-model";
import Section from "@/components/dashboard/survey/form-section-builder";
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
  const [survey, setSurvey] = useState<SurveyResponseDto | null>(null);
  const [sections, setSections] = useState<SurveySectionResponseDto[]>([]);
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
  // const [sections, setSections] = useState<number[]>([]);

  // const handleAddNew = () => {
  //   setSections((prev) => [...prev, prev.length]);
  // };

  const handleRemoveSection = (section: number) => {
    setSections((prev) => prev.filter((s) => s.id !== section));
  };

  useEffect(() => {
    async function fetchSurvey() {
      const data = await getAllSurveySectionService();
      //setSurvey(data);
      setSections(data?.sections || []);
    }

    fetchSurvey();
  }, []);
  const handleAddNew = () => {
    const newSection: SurveySectionResponseDto = {
      id: Date.now(), // or use some unique id generation
      title: "",
      description: "",
      displayOrder: sections.length,
      questions: [], // empty questions array initially
    };

    setSections((prev) => [...prev, newSection]);
  };

  console.log("this is result :", survey);
  return (
    <div className="space-y-4">
      <CardHeaderSection
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          { label: "Manage Q&As", href: ROUTE.SURVEY.MANAGE_QA },
        ]}
        title="Manage Q&As"
      />

      {sections.map((section, index) => (
        <Section
          key={section.id}
          sectionNumber={index + 1}
          totalSections={sections.length}
          section={section} // ✅ ONE object, not an array
          onRemove={async () => {
            setSections((prev) => prev.filter((s) => s.id !== section.id));
          }}
        />
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
