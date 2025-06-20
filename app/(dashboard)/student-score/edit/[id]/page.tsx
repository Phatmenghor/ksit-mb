"use client";

import StudentScoreHeader from "@/components/dashboard/student-scores/layout/header-section";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import {
  StudentScoreModel,
  SubmissionScoreModel,
} from "@/model/score/student-score/student-score.response";
import {
  getConfigurationScoreService,
  intiStudentsScoreService,
  submittedScoreService,
  updateStudentsScoreService,
} from "@/service/score/score.service";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { getDetailScheduleService } from "@/service/schedule/schedule.service";
import { ScheduleModel } from "@/model/schedules/all-schedule-model";
import { ScoreSubmitConfirmDialog } from "@/components/dashboard/student-scores/layout/submit-confirm-dialog";
import { SubmissionEnum } from "@/constants/constant";
import { formatDate } from "date-fns";
import Loading from "@/app/(dashboard)/settings/theme/loading";
import _ from "lodash";
import { ScoreConfigurationModel } from "@/model/score/submitted-score/submitted-score.response.model";
import StudentScoresTable from "@/components/dashboard/student-scores/student-scores-table";
import StudentScoresQuickAction from "@/components/dashboard/student-scores/student-scores-quick-action";
import StudentScoreAlert from "@/components/dashboard/student-scores/student-scores-alert";
import RenderModeBasedContent from "@/components/dashboard/student-scores/student-scores-mode-based-content";

export default function StudentScoreDetailsPage() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshProgress, setRefreshProgress] = useState(0);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [isSubmittedDialogOpen, setIsSubmittedDialogOpen] = useState(false);
  const [isSubmittingToStaff, setIsSubmittingToStaff] = useState(false);

  const [configureScore, setConfigureScore] =
    useState<ScoreConfigurationModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [unsavedChanges, setUnsavedChanges] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingAll, setIsSavingAll] = useState(false);

  const [scheduleDetail, setScheduleDetail] = useState<ScheduleModel | null>(
    null
  );
  const [score, setScore] = useState<SubmissionScoreModel | null>(null);
  const [mode, setMode] = useState<"view" | "edit-score">("view");
  const [originalData, setOriginalData] = useState<Map<number, any>>(new Map());
  const [isSubmitted, setIsSubmitted] = useState(false);

  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-refresh timing constants
  const REFRESH_INTERVAL = 30; // 30 seconds
  const PROGRESS_UPDATE_INTERVAL = 100; // Update progress every 100ms

  const router = useRouter();
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;

  const loadScheduleData = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await getDetailScheduleService(Number(id));
      console.log("Schedule detail response:", response);

      setScheduleDetail(response);
    } catch (error) {
      toast.error("Error fetching schedule data");
      console.error("Error fetching class data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const loadScoreConfigureData = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await getConfigurationScoreService();

      setConfigureScore(response);
    } catch (error) {
      toast.error("Error configure score data");
      console.error("Error fetching configure score:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  // Helper function to determine if editing is allowed
  const isEditingAllowed = (status: string) => {
    return status === SubmissionEnum.DRAFT;
  };

  // Helper function to get mode based on status
  const getModeFromStatus = (status: string) => {
    return isEditingAllowed(status) ? "edit-score" : "view";
  };

  const HandleInitStudentScore = useCallback(
    async (forceRefresh = false, showLoader = true) => {
      if (!scheduleDetail?.id) return;

      if (!forceRefresh && unsavedChanges.size > 0) {
        return;
      }

      if (showLoader) {
        setIsRefreshing(true);
      }

      try {
        if (scheduleDetail?.id == null) {
          throw new Error("Schedule ID is required");
        }

        const response = await intiStudentsScoreService({
          scheduleId: scheduleDetail?.id,
        });

        setScore(response);

        setIsInitialized(true);

        // Set mode based on status
        const newMode = getModeFromStatus(response.status);
        setMode(newMode);

        // Set isSubmitted based on whether editing is allowed
        const notEditable = !isEditingAllowed(response.status);
        setIsSubmitted(notEditable);
        setIsSubmittingToStaff(notEditable);

        // Update original data
        const originalMap = new Map();
        response.studentScores?.forEach((score: StudentScoreModel) => {
          originalMap.set(score.id, {
            assignmentScore: score.assignmentScore,
            midtermScore: score.midtermScore,
            finalScore: score.finalScore,
            grade: score.grade,
          });
        });
        setOriginalData(originalMap);
        setUnsavedChanges(new Set());
      } catch (error: any) {
        toast.error("Failed to initialize student");
        console.log("Error initialize student", error);
      } finally {
        if (showLoader) {
          setTimeout(() => {
            setIsRefreshing(false);
          }, 500);
        }
      }
    },
    [scheduleDetail, unsavedChanges.size]
  );

  // Add a useEffect to handle mode changes when status changes
  useEffect(() => {
    if (score?.status) {
      const newMode = getModeFromStatus(score.status);
      setMode(newMode);

      const notEditable = !isEditingAllowed(score.status);
      setIsSubmitted(notEditable);
      setIsSubmittingToStaff(notEditable);
    }
  }, [score?.status]);

  const handleSubmit = useCallback(async () => {
    if (!score) return;

    if (unsavedChanges.size > 0) {
      toast.error("Please save all changes before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submittedScoreService({
        id: score.id ?? 0,
        status: SubmissionEnum.SUBMITTED ?? "SUBMITTED",
      });

      if (response) {
        // Update the score status and mode
        setScore((prev) =>
          prev ? { ...prev, status: SubmissionEnum.SUBMITTED } : prev
        );
        setMode("view"); // Switch to view mode after submission
        setIsSubmitted(true);
        setAutoRefresh(false);
        setIsSubmittingToStaff(true);

        toast.success("Score successfully submitted to staff officer!", {
          duration: 3000,
          icon: <CheckCircle className="h-4 w-4" />,
        });
      } else {
        toast.error("Failed to submit score");
      }
    } catch (error) {
      toast.error("Failed to submit score to staff");
      console.error("Error submitting score:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [score, unsavedChanges.size]);

  // Optimized field change handler with Set
  const handleFieldChange = useCallback(
    (scoreId: number, field: string, value: string) => {
      if (isSubmitted) {
        toast.error("Cannot modify student score after submission");
        return;
      }

      // Update attendance data with optimistic update
      setScore((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          studentScores: prev.studentScores.map((score) =>
            score.id === scoreId ? { ...score, [field]: value } : score
          ),
        };
      });

      // Smart unsaved changes tracking with original data comparison
      setUnsavedChanges((prevSet) => {
        const original = originalData.get(scoreId);
        if (!original) {
          // If no original data, mark as unsaved
          if (prevSet.has(scoreId)) return prevSet;
          const newSet = new Set(prevSet);
          newSet.add(scoreId);
          return newSet;
        }

        // Get current state to compare
        const currentStudentScore = score?.studentScores.find(
          (a) => a.id === scoreId
        );

        if (!currentStudentScore) return prevSet;

        // Create updated version
        const updated = { ...currentStudentScore, [field]: value };

        // Check if any field differs from original
        const hasChanges =
          updated.assignmentScore !== original.assignmentScore ||
          updated.midtermScore !== original.midtermScore ||
          updated.finalScore !== original.finalScore;

        const isCurrentlyUnsaved = prevSet.has(scoreId);

        if (hasChanges && !isCurrentlyUnsaved) {
          // Add to unsaved
          const newSet = new Set(prevSet);
          newSet.add(scoreId);
          return newSet;
        } else if (!hasChanges && isCurrentlyUnsaved) {
          // Remove from unsaved (reverted to original)
          const newSet = new Set(prevSet);
          newSet.delete(scoreId);
          return newSet;
        }

        return prevSet; // No change needed
      });
    },
    [originalData, score, isSubmitted]
  );

  // Smooth progress animation for auto-refresh
  const startRefreshProgress = useCallback(() => {
    setRefreshProgress(0);

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / REFRESH_INTERVAL) * 100, 100);

      setRefreshProgress(progress);

      if (progress >= 100) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      }
    }, PROGRESS_UPDATE_INTERVAL);
  }, []);

  // Initial load
  useEffect(() => {
    loadScheduleData();
    loadScoreConfigureData();
  }, [loadScheduleData, id]);

  // Smart auto-refresh with smooth progress animation
  useEffect(() => {
    if (autoRefresh && isInitialized && !isSubmitted) {
      startRefreshProgress();

      refreshIntervalRef.current = setInterval(() => {
        if (unsavedChanges.size === 0) {
          HandleInitStudentScore(false, false); // Silent refresh
          startRefreshProgress(); // Restart progress
        }
      }, REFRESH_INTERVAL);

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    } else {
      // Clean up intervals when auto-refresh is disabled
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      setRefreshProgress(0);
    }
  }, [
    autoRefresh,
    isInitialized,
    unsavedChanges.size,
    isSubmitted,
    HandleInitStudentScore,
    startRefreshProgress,
  ]);

  const handleSaveAllChanges = useCallback(async () => {
    if (unsavedChanges.size === 0) return;

    if (isSubmitted) {
      toast.error("Cannot modify student score after submission");
      return;
    }

    setIsSavingAll(true);
    try {
      // Find all rows with unsaved changes using Set
      const changedStudentScore = score?.studentScores.filter((studentScore) =>
        unsavedChanges.has(studentScore.id)
      );

      // Perform bulk update
      await Promise.all(
        (changedStudentScore ?? []).map((score) =>
          updateStudentsScoreService({
            id: score.id,
            assignmentScore: score.assignmentScore,
            midtermScore: score.midtermScore,
            finalScore: score.finalScore,
            comments: score.comments || "",
          })
        )
      );

      // Update original data with saved values
      const newOriginalData = new Map(originalData);
      (changedStudentScore ?? []).forEach((score) => {
        newOriginalData.set(score.id, {
          assignmentScore: score.assignmentScore,
          midtermScore: score.midtermScore,
          finalScore: score.finalScore,
        });
      });
      setOriginalData(newOriginalData);

      // Clear unsaved changes - create new empty Set
      setUnsavedChanges(new Set());
      setMode("view");
      toast.success(
        `Successfully updated ${changedStudentScore?.length} student scores`,
        { duration: 2000 }
      );
    } catch (error: any) {
      const ErrMessage = error.message || "Failed to save score records";

      toast.error(ErrMessage);
      console.error("Error saving records:", error);
    } finally {
      setIsSavingAll(false);
    }
  }, [score, unsavedChanges, originalData, isSubmitted]);

  // Remove specific item from unsaved changes
  const handleRemoveFromUnsaved = useCallback((scoreId: number) => {
    setUnsavedChanges((prevSet) => {
      if (!prevSet.has(scoreId)) {
        return prevSet; // No change needed
      }
      const newSet = new Set(prevSet);
      newSet.delete(scoreId);
      return newSet;
    });
  }, []);

  const handleResetChanges = useCallback(() => {
    if (isSubmitted) {
      toast.error("Cannot reset student score after submission");
      return;
    }
    // Clear unsaved changes
    setUnsavedChanges(new Set());
    // Reload original data
    HandleInitStudentScore(true);
  }, [HandleInitStudentScore, isSubmitted]);

  const handleSaveScores = async () => {
    setIsSubmitting(true);
    try {
      const promises =
        score?.studentScores.map((student) => {
          const payload = {
            id: student.id,
            assignmentScore: student.assignmentScore,
            midtermScore: student.midtermScore,
            finalScore: student.finalScore,
            comments: student.comments || "",
          };

          return updateStudentsScoreService(payload);
        }) || [];

      const results = await Promise.allSettled(promises);
      const hasFailures = results.some((r) => r.status === "rejected");

      if (hasFailures) {
        toast.error("Some scores failed to update.");
      } else {
        toast.success("All scores updated successfully!");
      }
    } catch (err: any) {
      console.error("Failed to update scores:");
      toast.error(err.message || "Failed to update scores.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <StudentScoreHeader schedule={scheduleDetail} title="View Class Detail" />
      {!isInitialized ? (
        <div className="flex justify-end">
          <Button
            onClick={() => HandleInitStudentScore()}
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={isRefreshing}
          >
            {isRefreshing ? "Initializing..." : "Initialize Score"}
          </Button>
        </div>
      ) : (
        <div>
          <div>
            <Card className="shadow-md">
              <CardHeader className="flex flex-row justify-between w-full">
                <div>
                  <CardTitle className="font-bold text-xl">
                    Student List
                  </CardTitle>
                </div>
                <div>
                  <RenderModeBasedContent
                    isSubmittingToStaff={isSubmittingToStaff}
                    mode={mode}
                    scheduleDetail={scheduleDetail}
                    score={score}
                    setIsSubmittedDialogOpen={setIsSubmittedDialogOpen}
                    setMode={setMode}
                  />
                </div>
              </CardHeader>

              {/* Initialize Session Button */}
              {isRefreshing && (
                <div className="flex justify-center py-4">
                  <Loading />
                </div>
              )}

              <div className="w-full px-4">
                <Separator className="bg-gray-300" />
              </div>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-6 mb-2">
                  <p className="mb-0">
                    <span className="text-gray-500">Total Students: </span>
                    <span className="font-semibold">
                      {score?.studentScores.length || 0}
                    </span>
                  </p>

                  {isSubmittingToStaff && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">|</span>
                      <p className="mb-0">
                        <span className="text-gray-500">Submitted Date: </span>
                        <span className="font-semibold">
                          {score?.submissionDate
                            ? formatDate(new Date(score.submissionDate), "PP")
                            : "---"}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
                <StudentScoresTable
                  configureScore={configureScore}
                  handleFieldChange={handleFieldChange}
                  handleRemoveFromUnsaved={handleRemoveFromUnsaved}
                  isSubmitted={isSubmitted}
                  isSubmitting={isSubmitting}
                  mode={mode}
                  score={score}
                  unsavedChanges={unsavedChanges}
                />
                {(!score?.studentScores || score?.studentScores.length === 0) &&
                  isInitialized && (
                    <div className="text-center py-12 text-muted-foreground">
                      <p className="text-sm mt-1">No Record</p>
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>

          {mode === "edit-score" && score !== null && (
            <Card className="w-full">
              <CardContent className="flex justify-end gap-3 p-4">
                <Button
                  disabled={isSubmitting}
                  variant="outline"
                  onClick={() => setMode("view")}
                >
                  Discard
                </Button>
                <Button
                  variant="default"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleSaveAllChanges}
                  disabled={isSavingAll}
                >
                  {isSavingAll ? "Saving..." : "Save"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions Panel - Only show when not submitted */}
          {score && unsavedChanges.size > 0 && !isSubmitted && (
            <StudentScoresQuickAction
              handleResetChanges={handleResetChanges}
              handleSaveScores={handleSaveScores}
              isSavingAll={isSavingAll}
              setUnsavedChanges={setUnsavedChanges}
              unsavedChanges={unsavedChanges}
            />
          )}

          <ScoreSubmitConfirmDialog
            open={isSubmittedDialogOpen}
            title="Confirm Submit!"
            description="Are u sure u want to submit student score?"
            onConfirm={handleSubmit}
            cancelText="Discard"
            subDescription="Student score will submit to staff officer."
            onOpenChange={() => {
              setIsSubmittedDialogOpen(false);
            }}
          />

          {score && unsavedChanges.size > 0 && (
            <StudentScoreAlert unsavedChanges={unsavedChanges} />
          )}
        </div>
      )}
    </div>
  );
}
