"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Question,
  Section,
  SurveyFormDataModel,
  SurveyMainModel,
} from "@/model/survey/survey-main-model";
import {
  getAllSurveySectionService,
  submitSurveyService,
} from "@/service/survey/survey.service";
import Loading from "@/components/shared/loading";
import SurveyFormHeader from "@/components/dashboard/survey/form/survey-form-header";
import { useParams, useRouter } from "next/navigation";
import { SurveyCancelDialog } from "@/components/dashboard/survey/form/survey-cancel-dialog";
import SurveySection from "@/components/dashboard/survey/form/survey-section";
import { useSurveyValidation } from "@/hooks/use-survey-validation";
import { useForm } from "react-hook-form";

export default function SurveyFormPage() {
  const [surveyData, setSurveyData] = useState<SurveyMainModel | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cancelSurveyDialog, setCancelSurveyDialog] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const { validateSection, getUnansweredRequiredQuestions } =
    useSurveyValidation();
  const params = useParams();

  const scheduleId =
    params?.scheduleId && typeof params.scheduleId === "string"
      ? parseInt(params.scheduleId, 10)
      : null;

  const form = useForm<SurveyFormDataModel>({
    defaultValues: {
      answers: [],
      overallComment: "",
      overallRating: 0,
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = form;

  const fetchSurveyData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getAllSurveySectionService();

      if (!response) {
        throw new Error("Failed to fetch survey data");
      }

      setSurveyData(response);
    } catch (error) {
      console.error("Error fetching survey data:", error);
      toast({
        title: "Error loading survey",
        description: "Failed to load survey data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchSurveyData();
  }, [fetchSurveyData]);

  const getSortedSections = useCallback(() => {
    if (!surveyData?.sections) return [];
    return [...surveyData.sections].sort(
      (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
    );
  }, [surveyData?.sections]);

  const sortedSections = getSortedSections();
  const currentSection = sortedSections[currentSectionIndex];
  const totalSections = sortedSections.length;

  const transformFormDataToApiFormat = useCallback(
    (formData: SurveyFormDataModel) => {
      if (!surveyData?.sections) return [];

      const allQuestions = surveyData.sections.flatMap(
        (section) => section.questions || []
      );

      return Object.entries(formData.answers || {}).map(
        ([questionId, value]) => {
          const question = allQuestions.find(
            (q) => (q.id?.toString() || q.tempId) === questionId
          );

          const answer: any = {
            questionId: parseInt(questionId),
          };

          // Set appropriate answer field based on question type
          if (question?.questionType === "rating") {
            answer.ratingAnswer =
              typeof value === "number"
                ? value
                : parseInt(value as unknown as string);
          } else if (
            question?.questionType === "multiple_choice" &&
            Array.isArray(value)
          ) {
            answer.textAnswer = value.join(", "); // Join multiple selections
          } else {
            answer.textAnswer = value as unknown as string;
          }

          return answer;
        }
      );
    },
    [surveyData?.sections]
  );

  const onSubmit = useCallback(
    async (formData: SurveyFormDataModel) => {
      if (!surveyData || !scheduleId) {
        toast({
          title: "Submission failed",
          description: "Survey data or schedule ID is missing.",
          variant: "destructive",
        });
        return;
      }

      try {
        setIsSubmitting(true);

        // Transform form data to API format
        const transformedData = {
          ...formData,
          answers: transformFormDataToApiFormat(formData),
        };

        const response = await submitSurveyService(scheduleId, transformedData);

        if (!response.ok) {
          throw new Error(`Failed to submit survey: ${response.status}`);
        }

        toast({
          title: "Survey submitted successfully!",
          description: "Thank you for your feedback.",
        });

        // Redirect to success page or dashboard
        router.push("/dashboard/surveys");
      } catch (error) {
        console.error("Error submitting survey:", error);
        toast({
          title: "Submission failed",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [surveyData, scheduleId, transformFormDataToApiFormat, toast, router]
  );

  const handleCancel = useCallback(() => {
    router.back();
    setCancelSurveyDialog(false);
  }, [router]);

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  // Error state
  if (!surveyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-600">Failed to load survey data.</p>
          <Button onClick={fetchSurveyData} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // No sections available
  if (totalSections === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No survey sections available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Header */}
        <SurveyFormHeader
          handleBack={() => router.back()}
          surveyData={surveyData}
        />

        {/* Main Content */}
        <div className="mx-auto space-y-4">
          {/* Current Section Only */}
          {currentSection && (
            <SurveySection
              key={currentSection.id || currentSection.tempId}
              section={currentSection}
              control={control}
            />
          )}

          {/* Navigation Footer */}
          <Card className="p-4 flex justify-end gap-2 items-center">
            <Button variant="outline" onClick={handleCancel}>
              Back
            </Button>
            <Button
              type="submit"
              onClick={() => {
                const formData = form.getValues();
                const isSectionValid = validateSection(
                  currentSection,
                  formData
                );

                if (!isSectionValid) {
                  const unanswered = getUnansweredRequiredQuestions(
                    currentSection,
                    formData
                  );
                  toast({
                    title: "Please answer all required questions",
                    description: `Unanswered: ${unanswered.join(", ")}`,
                    variant: "destructive",
                  });
                  return;
                }

                handleSubmit(onSubmit)();
              }}
              disabled={isSubmitting}
              className="bg-teal-900 hover:bg-teal-950"
            >
              {isSubmitting ? "Submitting..." : "Submit Survey"}
            </Button>
          </Card>
        </div>

        {/* Cancel Dialog */}
        <SurveyCancelDialog
          description="Are you sure you want to cancel this survey? Your progress will be lost."
          cancelText="Discard"
          onConfirm={handleCancel}
          onOpenChange={setCancelSurveyDialog}
          open={cancelSurveyDialog}
          title="Cancel Survey"
        />
      </form>
    </div>
  );
}
