"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Divide, Eye } from "lucide-react";
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
import Image from "next/image";
import { hrtime } from "process";
import { CardHeaderSurvey } from "@/components/dashboard/survey/CardHeaderSurvey";
import { CancelConfirmationDialog } from "@/components/dashboard/survey/cancel-modal";
import SuccessPopup from "@/components/dashboard/survey/success-modal";
export default function TakeSurvey() {
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
  const questions = [
    "1. The course materials were helpful and relevant.",
    "2. The instructor communicated clearly.",
    "3. The course met my expectations.",
    // Add more questions as needed
  ];
  const iconColor = "text-black";
  const [sections, setSections] = useState<number[]>([]);
  const [currentSection, setCurrentSection] = useState(2);
  const [showPopup, setShowPopup] = useState(false);
  const handleAddNew = () => {
    setSections((prev) => [...prev, prev.length]);
  };
  const handleRemoveSection = (indexToRemove: number) => {
    setSections((prev) => prev.filter((_, index) => index !== indexToRemove));
  };
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const handleAnswerChange = useCallback(
    (index: number, value: string): void => {
      setAnswers((prev) => ({ ...prev, [index]: value }));
    },
    []
  );

  const [isCancel, setisCancel] = useState(false);
  const [selectedValue, setSelectedValue] = useState("4");
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("User chose:", answers);
  };
  return (
    <div className="space-y-4">
      <CardHeaderSurvey
        title="Survey Form"
        back
        customSelect={
          <div className="w-full bg-[#fdf7ed] p-4 rounded-md flex items-center">
            <div className="relative h-10 w-10 mr-4 shrink-0">
              <div className="absolute inset-0 rounded-full  border-2 border-[#024D3E] flex items-center justify-center overflow-hidden">
                <Image
                  src="./assets/profile.png"
                  alt="Course logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-[#333] text-base font-medium">
                Computer Programming II - 3(2,1,0)
              </h1>
              <p className="text-[#666] text-sm">Class 44001 | Tong Yuthea</p>
            </div>
            <div className="max-w-full"></div>
            <div className="max-w-full"></div>
          </div>
        }
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          { label: "View Profile", href: ROUTE.SURVEY.MANAGE_QA },
          { label: "Transcript", href: ROUTE.SURVEY.MANAGE_QA },
          { label: "Take Survey", href: ROUTE.SURVEY.MANAGE_QA },
        ]}
      />
      <Card>
        <div className="p-2">
          I. Please share your thoughts about your experience in this class
        </div>
      </Card>
      <form onSubmit={handleSubmit} className="">
        {questions.map((questionText, idx) => (
          <SurveyFormCard
            key={idx}
            question={questionText}
            initialValue={answers[idx] ?? "4"}
            onValueChange={(val: string) => handleAnswerChange(idx, val)}
          />
        ))}

        <Card className="mt-4">
          <div className="flex items-center justify-between p-3 ">
            {/* Section Label */}
            <div className="text-sm font-medium text-gray-700">
              {currentSection === 1 ? "Section 1 of 2" : "Section 2 of 2"}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 ">
              {currentSection === 1 ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setisCancel(true)}
                    className="border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                  <Button className="">Next</Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-100"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className=""
                    onClick={() => setShowPopup(true)}
                  >
                    Submit
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      </form>
      <SuccessPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
      <CancelConfirmationDialog
        isOpen={isCancel}
        onClose={() => setisCancel(false)}
        title="Confirm Cancel!"
        description="Are you sure you want cancel this survey form?"
        isSubmitting={isSubmitting}
        onDelete={function (): Promise<void> {
          throw new Error("Function not implemented.");
        }}
        isDelete={false}
      />
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
