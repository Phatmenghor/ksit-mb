"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Divide, Eye } from "lucide-react";
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
import Image from "next/image";
import { hrtime } from "process";
import { CardHeaderSurvey } from "@/components/dashboard/survey/CardHeaderSurvey";
import { CancelConfirmationDialog } from "@/components/dashboard/survey/cancel-modal";
import SuccessPopup from "@/components/dashboard/survey/success-modal";
import { getAllSurveySectionService } from "@/service/survey/survey.service";
import {
  SurveyResponseDto,
  SurveySectionResponseDto,
} from "@/model/survey/survey-model";
import { toRoman } from "@/utils/number/roman-number";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CourseCard from "@/components/dashboard/survey/CourseCard";
export const schema = z.object({
  answers: z.record(z.string().min(1, "Please select a rating")),
});
type FormValues = {
  answers: Record<string, string>;
};
export default function TakeSurvey() {
  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      answers: {},
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("✅ User's selected answers:", data.answers);
    // your API call or other logic
  };
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

  const iconColor = "text-black";
  const [currentSection, setCurrentSection] = useState(2);
  const [survey, setSurvey] = useState<SurveyResponseDto | null>(null);
  const [sections, setSections] = useState<SurveySectionResponseDto[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const handleAnswerChange = useCallback(
    (index: number, value: string): void => {
      setAnswers((prev) => ({ ...prev, [index]: value }));
    },
    []
  );
  async function fetchSurvey() {
    const data = await getAllSurveySectionService();
    setSurvey(data);
    setSections(data?.sections || []);
    console.log("this data", data);
  }
  // const questions =
  //   survey?.sections?.find((section) => section.id === currentSection)
  //     ?.questions || [];

  useEffect(() => {
    fetchSurvey();
  }, []);

  const [isCancel, setisCancel] = useState(false);
  const [selectedValue, setSelectedValue] = useState("4");
  // const handleSubmit = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   console.log("User chose:", answers);
  // };
  console.log("Survey:", survey);
  console.log("Current section:", currentSection);

  // Instead of picking just one section, flatten ALL sections' questions
  const questions =
    survey?.sections
      ?.flatMap((section) => section.questions)
      .filter((q) => q != null) ?? [];
  const onError = (errors: any) => {
    console.log("Validation errors on submit:", errors);
  };
  console.log("Questions for this section:", questions);
  //const prefix = `${toRoman(sections.)}. `;
  console.log("err", errors);
  const handleCancel = () => {
    setisCancel(true);
  };

  const confirmCancel = () => {
    // Reset answers
    setValue("answers", {}); // react-hook-form: reset all answers to {}
    setAnswers({}); // optional: also clear your local answers state if you use it
    setisCancel(false); // close dialog
    toast.success("Survey form has been reset");
  };

  return (
    <div className="space-y-4">
      <CardHeaderSurvey
        title="Survey Form"
        back
        customSelect={
          <CourseCard
            imageSrc="/assets/profile.png"
            title="Computer Programming II - 3(2,1,0)"
            description="Class 44001 | Tong Yuthea"
          />
        }
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          { label: "View Profile", href: ROUTE.SURVEY.MANAGE_QA },
          { label: "Transcript", href: ROUTE.SURVEY.MANAGE_QA },
          { label: "Take Survey", href: ROUTE.SURVEY.MANAGE_QA },
        ]}
      />
      <Card>
        {survey?.sections.map((q, idx) => (
          <div key={q.id ?? idx} className="p-2">
            {toRoman(idx + 1)} . {q.title}
          </div>
        ))}
      </Card>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="">
        {questions.map((q, idx) => (
          <div key={q.id}>
            <Controller
              name={`answers.${q.id}`}
              control={control}
              render={({ field }) => (
                <SurveyFormCard
                  question={`${idx + 1}. ${q.questionText}`}
                  leftLabel={q.leftLabel}
                  rightLabel={q.rightLabel}
                  minRating={q.minRating}
                  maxRating={q.maxRating}
                  onValueChange={field.onChange}
                  name={field.name}
                  selectedValue={watch(`answers.${q.id}`)}
                />
              )}
            />

            {errors.answers?.[q.id]?.message && (
              <p className="text-red-500 text-sm">
                {errors.answers[q.id]?.message}
              </p>
            )}
          </div>
        ))}

        <Card className="mt-4">
          <div className="flex gap-3 p-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-100"
            >
              Cancel
            </Button>

            <Button type="submit">Submit</Button>
          </div>
        </Card>
        {/* Action Buttons */}
      </form>
      <SuccessPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
      <CancelConfirmationDialog
        isOpen={isCancel}
        onClose={() => setisCancel(false)}
        title="Confirm Cancel!"
        description="Are you sure you want to cancel this survey form?"
        isSubmitting={isSubmitting}
        onDelete={confirmCancel} // ✅ Do the reset here
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
