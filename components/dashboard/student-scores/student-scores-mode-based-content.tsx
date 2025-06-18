import { useExportScoreHandlers } from "@/components/shared/export/score-export-handler";
import { Button } from "@/components/ui/button";
import { ScheduleModel } from "@/model/schedules/all-schedule-model";
import { SubmissionScoreModel } from "@/model/score/student-score/student-score.response";
import { Download, Edit, Save } from "lucide-react";

interface ModeBasedContentProps {
  mode: string;
  score: SubmissionScoreModel | null;
  scheduleDetail: ScheduleModel | null;
  setMode: (mode: "view" | "edit-score") => void;
  isSubmittingToStaff: boolean;
  setIsSubmittedDialogOpen: (isSubmittedDialogOpen: boolean) => void;
}

export default function RenderModeBasedContent({
  mode,
  setMode,
  score,
  isSubmittingToStaff,
  scheduleDetail,
  setIsSubmittedDialogOpen,
}: ModeBasedContentProps) {
  const { handleExportToExcel, handleExportToPDF } = useExportScoreHandlers(
    score,
    scheduleDetail
  );

  if (mode === "view" && !isSubmittingToStaff) {
    return (
      <div className="flex flex-row gap-2">
        <Button
          className="bg-orange-400 hover:bg-orange-500"
          onClick={() => setMode("edit-score")}
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit score
        </Button>
        <Button onClick={() => setIsSubmittedDialogOpen(true)}>
          <Save className="w-4 h-4 mr-1" />
          Submit score
        </Button>
      </div>
    );
  }

  if (isSubmittingToStaff) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-muted-foreground font-medium">
          Export Data By Class:
        </span>

        <Button
          onClick={() =>
            handleExportToExcel({
              includeComments: false,
              customFileName: "Student Score",
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

        <Button
          onClick={() =>
            handleExportToPDF({
              customFileName: "Student Score",
              includeComments: false,
            })
          }
          variant="outline"
          className="gap-2"
        >
          <div className="w-5 h-5 border-2 border-red-500 rounded flex items-center justify-center">
            <span className="text-red-500 text-[10px] font-bold">PDF</span>
          </div>
          <span>PDF</span>
          <Download className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  // Optional: default fallback (nothing to render)
  return null;
}
