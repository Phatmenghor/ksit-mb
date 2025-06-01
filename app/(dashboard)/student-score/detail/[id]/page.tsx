"use client";

import StudentScoreHeader from "@/components/dashboard/student-scores/layout/header-section";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle,
  Download,
  Edit,
  Eye,
  Loader2,
  Pencil,
  Save,
  Upload,
  X,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import {
  SessionScoreModel,
  StudentScoreModel,
} from "@/model/score/student-score/student-score.response";
import {
  intiStudentsScoreService,
  submittedScoreService,
  updateStudentsScoreService,
} from "@/service/score/score.service";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROUTE } from "@/constants/routes";
import { Badge } from "@/components/ui/badge";
import { getDetailScheduleService } from "@/service/schedule/schedule.service";
import { ScheduleModel } from "@/model/schedules/all-schedule-model";
import Loading from "@/app/(dashboard)/requests/loading";
import { ConfirmDialog } from "@/components/shared/custom-comfirm-diaglog";
import { ScoreSubmitConfirmDialog } from "@/components/dashboard/student-scores/layout/submit-comfirm-dialog";
import { GradeSelect, SubmissionEnum } from "@/constants/constant";

export default function StudentScoreDetailsPage() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshProgress, setRefreshProgress] = useState(0);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [isSubmittedDialogOpen, setIsSubmittedDialogOpen] = useState(false);
  const [isSubmittingToStaff, setIsSubmittingToStaff] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [unsavedChanges, setUnsavedChanges] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [isSavingAll, setIsSavingAll] = useState(false);

  const [scheduleDetail, setScheduleDetail] = useState<ScheduleModel | null>(
    null
  );
  const [students, setStudents] = useState<SessionScoreModel | null>(null);
  const [mode, setMode] = useState<"view" | "edit-score" | "edit-grade">(
    "view"
  );
  const [studentScoreDetail, setStudentScoreDetail] =
    useState<StudentScoreModel | null>(null);
  const [originalData, setOriginalData] = useState<Map<number, any>>(new Map());

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionTime, setSubmissionTime] = useState<Date | null>(null);

  const tableRef = useRef<HTMLDivElement>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

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

  const loadStudentScore = useCallback(
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

        console.log("##data", response);

        setStudents(response);
        setIsInitialized(true);

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
        setIsSubmitted(false);
      } catch (error) {
        toast.error("An error occurred while loading student score");
      } finally {
        if (showLoader) {
          // Add a small delay for smooth animation
          setTimeout(() => {
            setIsRefreshing(false);
          }, 500);
        }
      }
    },
    [scheduleDetail, unsavedChanges.size]
  );

  const handleSubmit = useCallback(async () => {
    if (!students) return;

    if (unsavedChanges.size > 0) {
      toast.error("Please save all changes before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submittedScoreService({
        id: scheduleDetail!.id,
        status: SubmissionEnum.SUBMITTED.toString(),
      });

      console.log("##submit score: ", response);
      if (response) {
        setAutoRefresh(false);
        setIsSubmittingToStaff(true);
        toast.success("Score successfully submitted to staff officer!", {
          duration: 3000,
          icon: <CheckCircle className="h-4 w-4" />,
        });
      } else {
        toast.error("Failed to submit score");
      }
      // Disable auto-refresh after submission
    } catch (error) {
      toast.error("Failed to submit score to staff");
      console.error("Error submitting score:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [students, unsavedChanges.size]);

  // Optimized field change handler with Set
  const handleFieldChange = useCallback(
    (scoreId: number, field: string, value: string) => {
      if (isSubmitted) {
        toast.error("Cannot modify student score after submission");
        return;
      }

      // Update attendance data with optimistic update
      setStudents((prev) => {
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
        const currentStudentScore = students?.studentScores.find(
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
    [originalData, students, isSubmitted]
  );

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    studentId: number,
    field: string
  ): void => {
    const currentIndex = students?.studentScores.findIndex(
      (s) => s.id === studentId
    );
    const fields = ["assignmentScore", "midtermScore", "finalScore"];
    const currentFieldIndex = fields.indexOf(field);

    switch (e.key) {
      case "Enter":
      case "ArrowDown":
        e.preventDefault();
        if (
          typeof currentIndex === "number" &&
          students &&
          currentIndex < students.studentScores.length - 1
        ) {
          const nextStudent = students?.studentScores[currentIndex + 1];
          const nextRef = inputRefs.current[`${nextStudent.id}-${field}`];
          nextRef?.focus();
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (typeof currentIndex === "number" && currentIndex > 0 && students) {
          const prevStudent = students.studentScores[currentIndex - 1];
          const prevRef = inputRefs.current[`${prevStudent.id}-${field}`];
          prevRef?.focus();
        }
        break;
      case "Tab":
        if (!e.shiftKey && currentFieldIndex < fields.length - 1) {
          e.preventDefault();
          const nextField = fields[currentFieldIndex + 1];
          const nextRef = inputRefs.current[`${studentId}-${nextField}`];
          nextRef?.focus();
        } else if (e.shiftKey && currentFieldIndex > 0) {
          e.preventDefault();
          const prevField = fields[currentFieldIndex - 1];
          const prevRef = inputRefs.current[`${studentId}-${prevField}`];
          prevRef?.focus();
        }
        break;
    }
  };

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
  }, [loadScheduleData]);

  // Smart auto-refresh with smooth progress animation
  useEffect(() => {
    if (autoRefresh && isInitialized && !isSubmitted) {
      startRefreshProgress();

      refreshIntervalRef.current = setInterval(() => {
        if (unsavedChanges.size === 0) {
          loadStudentScore(false, false); // Silent refresh
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
    loadStudentScore,
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
      const changedStudentScore = students?.studentScores.filter(
        (studentScore) => unsavedChanges.has(studentScore.id)
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

      toast.success(
        `Successfully updated ${changedStudentScore?.length} student scores`,
        { duration: 2000 }
      );
    } catch (error) {
      toast.error("Failed to save score records");
      console.error("Error saving records:", error);
    } finally {
      setIsSavingAll(false);
    }
  }, [students, unsavedChanges, originalData, isSubmitted]);

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

  useEffect(() => {
    loadStudentScore(false, false);
  }, []);

  const handleResetChanges = useCallback(() => {
    if (isSubmitted) {
      toast.error("Cannot reset student score after submission");
      return;
    }
    // Clear unsaved changes
    setUnsavedChanges(new Set());
    // Reload original data
    loadStudentScore(true);
  }, [loadStudentScore, isSubmitted]);

  useEffect(() => {
    if (scheduleDetail?.id) {
      loadStudentScore();
    }
  }, [scheduleDetail?.id, loadStudentScore]);

  const handleSaveScores = async () => {
    try {
      setIsSubmitting(true);

      const promises =
        students?.studentScores.map((student) => {
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
      setMode("view");
    } catch (err: any) {
      console.error("Failed to update scores:", err);
      toast.error(err.message || "Failed to update scores.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <StudentScoreHeader schedule={scheduleDetail} title="View Class Detail" />
      <div>
        <Card>
          <CardHeader className="flex flex-row justify-between w-full">
            <div>
              <CardTitle className="font-bold text-xl">Student List</CardTitle>
            </div>
            <div>
              {mode === "view" && isSubmittingToStaff && (
                <div className="flex items-center gap-4">
                  {/* Label */}
                  <span className="text-muted-foreground font-medium">
                    Export Data By Class:
                  </span>

                  {/* Excel Export Button */}
                  <Button variant="outline" className="gap-2">
                    <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">X</span>
                    </div>
                    <span>Excel</span>
                    <Download className="w-4 h-4" />
                  </Button>

                  {/* PDF Export Button */}
                  <Button variant="outline" className="gap-2">
                    <div className="w-5 h-5 border-2 border-red-500 rounded flex items-center justify-center">
                      <span className="text-red-500 text-[10px] font-bold">
                        PDF
                      </span>
                    </div>
                    <span>PDF</span>
                    <Download className="w-4 h-4" />
                  </Button>

                  {/* Edit Grade Button */}
                  <Button
                    onClick={() => setMode("edit-grade")}
                    className="gap-2 bg-orange-400 hover:bg-orange-500"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Grade</span>
                  </Button>
                </div>
              )}

              {mode === "view" && !isSubmittingToStaff && (
                <div className="flex flex-row gap-2">
                  <Button
                    className=" bg-orange-400 hover:bg-orange-500"
                    onClick={() => setMode("edit-score")}
                  >
                    <Edit className="w-4 h-4" />
                    Edit score
                  </Button>
                  {!isSubmittingToStaff && (
                    <Button onClick={() => setIsSubmittedDialogOpen(true)}>
                      <Save className="w-4 h-4" />
                      Submit score
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardHeader>

          {/* Initialize Session Button */}
          {!isInitialized && <Loading />}

          <div className="w-full px-4">
            <Separator className="bg-gray-300" />
          </div>
          <CardContent className="p-4">
            <p className="text-muted-foreground mb-4">
              Total Students:{" "}
              <span className="font-bold">
                {students?.studentScores.length || 0}
              </span>
            </p>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-black hover:bg-black">
                    <TableHead className="text-white w-12">#</TableHead>
                    <TableHead className="text-white">Student ID</TableHead>
                    <TableHead className="text-white">Fullname</TableHead>
                    {mode !== "edit-grade" && (
                      <TableHead className="text-white text-center">
                        Att. (10%)
                      </TableHead>
                    )}
                    {mode !== "edit-grade" && (
                      <TableHead className="text-white text-center">
                        Ass. (30%)
                      </TableHead>
                    )}

                    {mode !== "edit-grade" && (
                      <TableHead className="text-white text-center">
                        Mid. (30%)
                      </TableHead>
                    )}
                    {mode !== "edit-grade" && (
                      <TableHead className="text-white text-center">
                        Final (30%)
                      </TableHead>
                    )}

                    {mode === "view" && (
                      <TableHead className="text-white text-center">
                        Total
                      </TableHead>
                    )}
                    {mode !== "edit-score" && (
                      <TableHead className="text-white text-center">
                        Grade
                      </TableHead>
                    )}
                    {mode !== "edit-grade" && (
                      <TableHead className="text-white text-center">
                        Action
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students?.studentScores?.map((student, index) => {
                    const indexDisplay = index + 1;

                    return (
                      <TableRow key={student.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {indexDisplay}
                        </TableCell>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell className="font-medium">
                          {student.studentName}
                        </TableCell>
                        {mode !== "edit-grade" && (
                          <TableCell className="text-center">
                            {student.attendanceScore}
                          </TableCell>
                        )}
                        {mode !== "edit-grade" && (
                          <TableCell className="text-center">
                            {mode === "edit-score" ? (
                              <Input
                                type="number"
                                value={student.assignmentScore}
                                className={`h-8 text-sm w-full transition-all duration-100 ease-in-out ${
                                  unsavedChanges.has(student.id)
                                    ? "border-yellow-300 ring-1 ring-yellow-200"
                                    : ""
                                } ${isSubmitted ? "cursor-not-allowed" : ""}`}
                                ref={(el) => {
                                  inputRefs.current[
                                    `${student.id}-assignmentScore`
                                  ] = el;
                                }}
                                onKeyDown={(e) =>
                                  handleKeyDown(
                                    e,
                                    student.id,
                                    "assignmentScore"
                                  )
                                }
                                onChange={(e) =>
                                  handleFieldChange(
                                    student.id,
                                    "assignmentScore",
                                    e.target.value
                                  )
                                }
                                min="0"
                                max="100"
                              />
                            ) : (
                              <span>{student.assignmentScore}</span>
                            )}
                          </TableCell>
                        )}
                        {mode !== "edit-grade" && (
                          <TableCell className="text-center">
                            {mode === "edit-score" ? (
                              <Input
                                type="number"
                                value={student.midtermScore}
                                ref={(el) => {
                                  inputRefs.current[
                                    `${student.id}-midtermScore`
                                  ] = el;
                                }}
                                onKeyDown={(e) =>
                                  handleKeyDown(e, student.id, "midtermScore")
                                }
                                className={`h-8 text-sm w-full transition-all duration-100 ease-in-out ${
                                  unsavedChanges.has(student.id)
                                    ? "border-yellow-300 ring-1 ring-yellow-200"
                                    : ""
                                } ${isSubmitted ? "cursor-not-allowed" : ""}`}
                                onChange={(e) =>
                                  handleFieldChange(
                                    student.id,
                                    "midtermScore",
                                    e.target.value
                                  )
                                }
                                min="0"
                                max="100"
                              />
                            ) : (
                              <span>{student.midtermScore}</span>
                            )}
                          </TableCell>
                        )}

                        {mode !== "edit-grade" && (
                          <TableCell className="text-center">
                            {mode === "edit-score" ? (
                              <Input
                                type="number"
                                value={student.finalScore}
                                ref={(el) => {
                                  inputRefs.current[
                                    `${student.id}-finalScore`
                                  ] = el;
                                }}
                                onKeyDown={(e) =>
                                  handleKeyDown(e, student.id, "finalScore")
                                }
                                className={`h-8 text-sm w-full transition-all duration-100 ease-in-out ${
                                  unsavedChanges.has(student.id)
                                    ? "border-yellow-300 ring-1 ring-yellow-200"
                                    : ""
                                } ${isSubmitted ? "cursor-not-allowed" : ""}`}
                                onChange={(e) =>
                                  handleFieldChange(
                                    student.id,
                                    "finalScore",
                                    e.target.value
                                  )
                                }
                                min="0"
                                max="100"
                              />
                            ) : (
                              <span>{student.finalScore}</span>
                            )}
                          </TableCell>
                        )}

                        {mode === "view" && (
                          <TableCell className="text-center font-bold">
                            <span>{student.totalScore}</span>
                          </TableCell>
                        )}

                        {mode === "view" && (
                          <TableCell className="text-center">
                            <span
                              className={`font-bold px-2 py-1 rounded text-sm ${
                                student.grade === "A"
                                  ? "bg-green-100 text-green-800"
                                  : student.grade === "B"
                                  ? "bg-blue-100 text-blue-800"
                                  : student.grade === "C"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : student.grade === "D"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {student.grade}
                            </span>
                          </TableCell>
                        )}

                        {mode === "edit-grade" && (
                          <TableCell className="text-center">
                            <Select
                              value={student.grade}
                              onValueChange={(value) =>
                                handleFieldChange(student.id, "grade", value)
                              }
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Select grade" />
                              </SelectTrigger>
                              <SelectContent>
                                {GradeSelect.map((grade) => (
                                  <SelectItem
                                    value={grade.value}
                                    key={grade.value}
                                  >
                                    {grade.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                        )}

                        {mode === "view" ? (
                          <TableCell>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    onClick={() => {
                                      router.push(
                                        `${ROUTE.USERS.VIEW_TEACHER(
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
                                <TooltipContent>Detail</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                        ) : mode === "edit-score" ? (
                          <TableCell>
                            {isSubmitted ? (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Submitted
                              </Badge>
                            ) : unsavedChanges.has(student.id) ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleRemoveFromUnsaved(student.id)
                                }
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                Saved
                              </Badge>
                            )}
                          </TableCell>
                        ) : (
                          <></>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            {(!students?.studentScores ||
              students?.studentScores.length === 0) &&
              isInitialized && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-sm mt-1">No Record</p>
                </div>
              )}
          </CardContent>
        </Card>
      </div>
      {mode === "edit-score" ||
        (mode === "edit-grade" && (
          <Card className="w-full">
            <CardContent className="flex justify-end gap-2 p-4">
              <Button variant="outline" onClick={() => setMode("view")}>
                Discard
              </Button>
              <Button
                className=" bg-orange-400 hover:bg-orange-500"
                onClick={handleSaveScores}
              >
                {isSubmitting ? "Save" : "Saving..."}
              </Button>
            </CardContent>
          </Card>
        ))}

      {/* Quick Actions Panel - Only show when not submitted */}
      {students && unsavedChanges.size > 0 && !isSubmitted && (
        <Card className="fixed bottom-4 right-4 w-80 shadow-lg border-yellow-300 bg-yellow-50 z-50 animate-in slide-in-from-bottom-4 duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="animate-pulse">
                  {unsavedChanges.size}
                </Badge>
                <span className="text-sm font-medium">Pending Changes</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUnsavedChanges(new Set())}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetChanges}
                className="flex-1 hover:bg-red-100 text-red-600"
              >
                <X className="h-4 w-4 mr-1" />
                Reset
              </Button>
              <Button
                size="sm"
                onClick={handleSaveAllChanges}
                disabled={isSavingAll}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSavingAll ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-1" />
                )}
                Save All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <ScoreSubmitConfirmDialog
        open={isSubmittedDialogOpen}
        title="Comfirm Submit!"
        description="Are u sure u want to submit student score?"
        onConfirm={handleSubmit}
        cancelText="Discard"
        subDescription="Student score will submit to staff officer."
        onOpenChange={() => {
          setIsSubmittedDialogOpen(false);
        }}
      />

      {students && unsavedChanges.size > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <div className="text-sm font-medium text-orange-800">
                  Save changes before submitting
                </div>
                <div className="text-xs text-orange-700">
                  You have {unsavedChanges.size} unsaved changes. Please save
                  all changes before submitting student score.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
