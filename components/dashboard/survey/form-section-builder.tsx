import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import FeedbackFormDisplay from "./paragraph-question";
import { SetStateAction, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import addQuestion from "./paragraph-question";
import { tuple } from "zod";
import AddQuestion from "./paragraph-question";
import LinarQuestion from "./linar-question";
import ParagraphQuestion from "./paragraph-question";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import { CancelConfirmationDialog } from "./cancel-modal";
import {
  SurveyQuestionResponseDto,
  SurveySectionResponseDto,
} from "@/model/survey/survey-model";
import { toRoman } from "@/utils/number/roman-number";

type FormSectionProps = {
  sectionNumber: number;
  totalSections: number;
  onRemove: () => Promise<void>;
  section: SurveySectionResponseDto;
};
export default function Section({
  sectionNumber,
  totalSections,
  onRemove,
  section,
}: FormSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleAddQuestion = () => {
    setIsDialogOpen(true);
  };
const [selectedLinar, setSelectedLinar] = useState<SurveyQuestionResponseDto | null>(null);

  const [selectedParagraph, setSelectedParagraphe] = useState<SurveyQuestionResponseDto | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [sectionTitle, setSectionTitle] = useState(section.title || "");
  const [question, setQuestion] = useState(section.questions || "");
  const [questions, setQuestions] = useState<SurveyQuestionResponseDto[]>(
    section.questions || []
  );

  useEffect(() => {
    setSectionTitle(section.title || "");
  }, [section.title]);
  const handleDuplicate = (q: SurveyQuestionResponseDto) => {
    const duplicated = {
      ...q,
      id: new Date().getTime(),
      questionText: q.questionText + " (copy)",
    };
    setQuestions([...questions, duplicated]); // ✅ plural
  };

  //   setQuestions(questions.filter((q) => q.id !== id));
  // };
  const handleDeleteLinear = (id: number) => {
    console.log("Deleting Linear");
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleDeleteParagraph = (id: number) => {
    console.log("Deleting Paragraph");
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleUpdate = (updated: SurveyQuestionResponseDto) => {
    setQuestions(questions.map((q) => (q.id === updated.id ? updated : q)));
  };

  // ✅ Add new linear question and open modal for it
const handleAddLinearQuestion = () => {
  const newQuestion: SurveyQuestionResponseDto = {
    id: Date.now(), // unique!
    questionText: "",
    questionType: "RATING",
    required: false,
    displayOrder: questions.length,
    minRating: 0,
    maxRating: 0,
    leftLabel: "",
    rightLabel: "",
    ratingOptions: [],
  };
  setQuestions(prev => [...prev, newQuestion]);
  setSelectedLinar(newQuestion); // instead of `true` => save which question is being edited
};
const handleAddParagraphQuestion = () => {
  const newQuestion: SurveyQuestionResponseDto = {
    id: Date.now(),
    questionText: "",
    questionType: "TEXT",
    required: false,
    displayOrder: questions.length,
    minRating: 0,
    maxRating: 0,
    leftLabel: "",
    rightLabel: "",
    ratingOptions: [],
  };
  setQuestions(prev => [...prev, newQuestion]);
  setSelectedParagraphe(newQuestion);
};


  console.log(" this section", questions.length);
  const prefix = `${toRoman(sectionNumber)}. `;
  return (
    <>
      <Card>
        <div className="w-full max-w-4xl p-4">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              {" "}
              Section {sectionNumber} of {totalSections}
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#024D3E] hover:text-teal-700 hover:bg-teal-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 p-2 mt-1 bg-slate-50 border border-gray-400 text-sm rounded-lg ">
                  <div className="text-sm font-medium text-gray-600 mb-3 px-2 ">
                    Select Question Type
                  </div>
                  <hr />
                  <DropdownMenuItem
                    className="cursor-pointer p-3 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-0"
                    onClick={() => {
                       handleAddParagraphQuestion();
                      setIsDialogOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                      <span className="font-medium">Paragraph</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer p-3 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-0"
                    onClick={() => {
                      handleAddLinearQuestion();
                      setIsDialogOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                      <span className="font-medium">Linear Scale</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Section
              </Button>
            </div>
          </div>

          {/* Form Section */}
          <div className="space-y-2">
            <div className="flex gap-4 ">
              <div className="border-l-4 border-[#024D3E] rounded-lg "></div>
              <Input
                id="section-name"
                placeholder="Name Section..."
                className="max-w-full "
                value={prefix + sectionTitle}
                onChange={(e) => {
                  let input = e.target.value;
                  if (input.startsWith(prefix)) {
                    input = input.slice(prefix.length);
                  }
                  setSectionTitle(input);
                }}
              />
              {/* <div className="flex gap-2 items-center">
                <span>{toRoman(sectionNumber)}.</span>
                  <Input
                id="section-name"
                placeholder="Name Section..."
                className="max-w-full "
                value={`${toRoman(sectionNumber)}. ${sectionTitle}}`}
                onChange={(e) => setSectionTitle(e.target.value)}
              />
              </div> */}
            </div>
          </div>
          {/* {selectedLinar && (
            <LinarQuestion
              isDialogOpen={selectedLinar}
              onClose={setSelectedLinar}
            />
          )}
          {selectedParagraph && (
            <ParagraphQuestion
              isDialogOpen={selectedParagraph}
              onClose={setSelectedParagraphe}
            />
          )} */}
          {/* Existing questions */}
          {/* {section.questions?.map((q, index) => {
            if (q.questionType === "RATING") {
              return (
                <LinarQuestion
                  key={q.id || index}
                  isDialogOpen={true}
                  onClose={() => {}}
                  questions={q}
                  onDuplicate={handleDuplicate}
                />
              );
            } else if (q.questionType === "TEXT") {
              return (
                <ParagraphQuestion
                  key={q.id || index}
                  isDialogOpen={true}
                  onClose={() => {}}
                  question={q}
                />
              );
            } else {
              return null;
            }
          })} */}
          {questions.map((q, index) => {
            if (q.questionType === "RATING") {
              return (
                <LinarQuestion
                  key={q.id || index}
                  isDialogOpen={true}
                  onClose={() => {}}
                  question={q} // ✅ singular
                  onDuplicate={handleDuplicate}
                  onDelete={handleDeleteLinear}
                  onUpdate={handleUpdate}
                />
              );
            } else if (q.questionType === "TEXT") {
              return (
                <ParagraphQuestion
                  key={q.id || index}
                  isDialogOpen={true}
                  onClose={() => {}}
                  question={q}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDeleteParagraph}
                  onUpdate={handleUpdate}
                />
              );
            } else {
              return null;
            }
          })}

          {/* New question modal */}
          {/* {selectedLinar && (
            <LinarQuestion
              key={selectedLinar.id}
              isDialogOpen={!!selectedLinar}
              onClose={()=>setSelectedLinar(null)}
              question={selectedLinar} // For new
              onDelete={handleDeleteLinear}
              onDuplicate={handleDuplicate}
            />
          )}
          {selectedParagraph && (
            <ParagraphQuestion
              key={selectedParagraph.id}
              isDialogOpen={!!selectedParagraph}
              onClose={() => setSelectedParagraphe(null)}
              question={selectedParagraph} // For new
              onDelete={handleDeleteParagraph}
              onDuplicate={handleDuplicate}
            />
          )} */}
        </div>
      </Card>
      <CancelConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={onRemove}
        title="Confirm Delete!"
        description="Are you sure you want to delete this section?"
        isSubmitting={isSubmitting}
        isDelete={true}
      />
    </>
  );
}
