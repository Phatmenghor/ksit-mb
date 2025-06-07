"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileIcon as FilePdf,
  Check,
  X,
  AlertTriangle,
  CheckCircle,
  Download,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import StudentScoreHeader from "@/components/dashboard/student-scores/layout/header-section";
import { ScoreSubmittedModel } from "@/model/score/submitted-score/submitted-score.response.model";
import {
  getSubmissionScoreByIdService,
  submittedScoreService,
} from "@/service/score/score.service";
import { toast } from "sonner";
import { SubmissionEnum } from "@/constants/constant";
import { ScoreSubmitConfirmDialog } from "@/components/dashboard/student-scores/layout/submit-confirm-dialog";
import { ReturnDialog } from "@/components/dashboard/scores-submitted/return-dialog";
import { SubmitScoreModel } from "@/model/score/student-score/student-score.request";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "date-fns";
import { ROUTE } from "@/constants/routes";
import { useExportHandlers } from "@/components/dashboard/scores-submitted/export-handler";
import { getDetailScheduleService } from "@/service/schedule/schedule.service";
import { ScheduleModel } from "@/model/schedules/all-schedule-model";
import { SubmissionScoreModel } from "@/model/score/student-score/student-score.response";

export default function ScoreSubmissionDetailPage() {
  const [submission, setSubmissions] = useState<SubmissionScoreModel | null>(
    null
  );
  const [scheduleDetail, setScheduleDetail] = useState<ScheduleModel | null>(
    null
  );

  const [approveDialog, setApproveDialog] = useState(false);
  const [returnDialog, setReturnDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isScoreApproval, setIsScoreApproval] = useState(false);
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { handleExportToPDF, handleExportToExcel } = useExportHandlers(
    submission,
    scheduleDetail
  );

  const loadStudentSubmittedScore = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await getSubmissionScoreByIdService(Number(id));
      console.log("##Submission detail: ", response);

      if (response) {
        setSubmissions(response);
      } else {
        console.error("Failed to fetch student:");
      }
    } catch (error) {
      toast.error("An error occurred while loading student");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const loadSchedule = useCallback(async () => {
    setIsLoading(true);
    try {
      if (submission?.scheduleId === undefined) {
        setScheduleDetail(null);
      } else {
        const response = await getDetailScheduleService(submission?.scheduleId);
        setScheduleDetail(response);
      }
    } catch (error) {
      console.error("Error fetching schedule data:", error);
      toast.error("An error occurred while loading schedule");
      setScheduleDetail(null);
    } finally {
      setIsLoading(false);
    }
  }, [submission?.scheduleId]);

  useEffect(() => {
    loadStudentSubmittedScore();
  }, [loadStudentSubmittedScore]);

  useEffect(() => {
    loadSchedule();
  }, [loadSchedule]);

  const handleReturn = async () => {
    // Logic to reject the submission
    try {
      const response = await submittedScoreService({
        id: submission?.id ?? 0,
        status: SubmissionEnum.DRAFT,
      });

      if (response) {
        setIsScoreApproval(true);
        setReturnDialog(false);

        toast.success("Score successfully return!", {
          duration: 3000,
          icon: <CheckCircle className="h-4 w-4" />,
        });
        router.push(ROUTE.SCORES.SUBMITTED);
      } else {
        toast.error("Failed to return score");
      }
    } catch (error) {
      toast.error("Failed to return score");
      console.error("Error return score:", error);
    }
  };

  const handleApproval = async () => {
    // Logic to reject the submission
    try {
      const payload: SubmitScoreModel = {
        id: submission?.id ?? 0,
        status: SubmissionEnum.APPROVED,
      };

      const response = await submittedScoreService(payload);

      if (response) {
        setIsScoreApproval(true);
        setApproveDialog(false);
        toast.success("Score successfully approved to staff officer!", {
          duration: 3000,
          icon: <CheckCircle className="h-4 w-4" />,
        });
        router.push(ROUTE.SCORES.SUBMITTED);
      } else {
        toast.error("Failed to approve score");
      }
    } catch (error) {
      toast.error("Failed to approve score to staff");
      console.error("Error approving score:", error);
    }
  };

  return (
    <div className="container space-y-4">
      <StudentScoreHeader
        schedule={scheduleDetail}
        title="View Score Submitted Detail"
      />

      {!isScoreApproval && submission?.status === SubmissionEnum.SUBMITTED && (
        <Card className="shadow-md">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-lg font-bold">
              Submitting Approval
            </CardTitle>
            <div className="flex gap-2">
              <>
                <Button onClick={() => setReturnDialog(true)} variant="outline">
                  Return
                </Button>
                <Button onClick={() => setApproveDialog(true)}>Approve</Button>
              </>
            </div>
          </CardHeader>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between w-full">
          <div>
            <CardTitle className="font-bold text-xl">Student List</CardTitle>
          </div>
          {isScoreApproval ||
            (submission?.status !== SubmissionEnum.SUBMITTED && (
              <>
                <div className="flex items-center gap-4">
                  {/* Label */}
                  <span className="text-muted-foreground font-medium">
                    Export Data By Class:
                  </span>

                  {/* Excel Export Button */}
                  <Button
                    onClick={() =>
                      handleExportToExcel({
                        includeComments: false,
                        includeCreatedAt: true,
                      })
                    }
                    variant="outline"
                    className="gap-2"
                  >
                    <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">X</span>
                    </div>
                    <span>Excel</span>
                    <Download className="w-4 h-4" />
                  </Button>

                  {/* PDF Export Button */}
                  <Button
                    onClick={() =>
                      handleExportToPDF({
                        includeComments: false,
                      })
                    }
                    variant="outline"
                    className="gap-2"
                  >
                    <div className="w-5 h-5 border-2 border-red-500 rounded flex items-center justify-center">
                      <span className="text-red-500 text-[10px] font-bold">
                        PDF
                      </span>
                    </div>
                    <span>PDF</span>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ))}
        </CardHeader>
        <div className="w-full px-4">
          <Separator className="bg-gray-300" />
        </div>
        <CardContent className="p-4">
          <div className="flex flex-row gap-2">
            <p className="mb-4">
              <span className="text-gray-500">Total Students: </span>
              <span className="font-semibold">
                {submission?.studentScores.length || 0}
              </span>
            </p>

            <span className="text-gray-500">|</span>
            <p className="mb-4">
              <span className="text-gray-500">Submit Date:</span>{" "}
              <span className="font-semibold">
                {submission?.submissionDate
                  ? formatDate(new Date(submission.submissionDate), "PP")
                  : "N/A"}
              </span>
            </p>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-black hover:bg-black">
                  <TableHead className="text-white w-12">#</TableHead>
                  <TableHead className="text-white">Student ID</TableHead>
                  <TableHead className="text-white">Fullname (KH)</TableHead>
                  <TableHead className="text-white">Fullname (EN)</TableHead>
                  <TableHead className="text-white">Gender</TableHead>
                  <TableHead className="text-white">Birth Date</TableHead>
                  <TableHead className="text-white text-center">
                    Att. (10%)
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Ass. (30%)
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Mid. (30%)
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Final (30%)
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Total
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Grade
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submission?.studentScores?.map((student, index) => {
                  const indexDisplay = index + 1;

                  return (
                    <TableRow key={student.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {indexDisplay}
                      </TableCell>
                      <TableCell className="font-medium">
                        {student?.studentId || "---"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {student?.studentNameKhmer?.trim() || "---"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {student?.studentNameEnglish?.trim() || "---"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {student?.gender ?? "---"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {student?.dateOfBirth ?? "---"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {student?.attendanceScore ?? "---"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {student?.assignmentScore ?? "---"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {student?.midtermScore ?? "---"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {student?.finalScore ?? "---"}
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        {student?.totalScore ?? "---"}
                      </TableCell>
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
                          {student.grade ?? "---"}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {submission?.status === "approved" && (
        <div className="flex justify-center bg-green-50 p-4 rounded-md mt-6">
          <div className="flex items-center gap-2 text-green-700">
            <Check className="h-5 w-5" />
            <span>
              This submission has been approved and the scores have been
              recorded in the system.
            </span>
          </div>
        </div>
      )}

      <ScoreSubmitConfirmDialog
        open={approveDialog}
        title="Confirm Approve!"
        description="Are u sure u want to approve the students score?"
        onConfirm={handleApproval}
        cancelText="Discard"
        onOpenChange={() => {
          setApproveDialog(false);
        }}
      />

      <ReturnDialog
        open={returnDialog}
        title="Confirm Return!"
        description="Are u sure u want to return the students score?"
        onConfirm={handleReturn}
        cancelText="Discard"
        onOpenChange={() => {
          setReturnDialog(false);
        }}
      />

      {submission?.status === "rejected" && (
        <div className="flex justify-center bg-red-50 p-4 rounded-md mt-6">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            <span>
              This submission has been rejected. Please contact the
              administrator for more information.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
