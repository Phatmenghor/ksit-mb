"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SurveyQuestionResponseDto } from "@/model/survey/survey-model";

interface LinearProps {
  isDialogOpen: boolean;
  onClose: () => void;
  question: SurveyQuestionResponseDto;
  onUpdate?: (updatedQuestion: SurveyQuestionResponseDto) => void; // optional callback
  onDuplicate?: (question: SurveyQuestionResponseDto) => void;
  onDelete?: (id: number) => void; // optional callback
}

export default function LinarQuestion({
  isDialogOpen,
  question,
  onUpdate,
  onDelete,
  onDuplicate,
  onClose,
}: LinearProps) {
  // const [question, setquestion] = useState([
  //   {
  //     id: 1,
  //     type: "rating",
  //     text: "What did you enjoy most about this class?",
  //     isEditing: false,
  //   },
  //   {
  //     id: 2,
  //     type: "rating" as const,
  //     text: "The instructor communicated effectively.",
  //     isEditing: false,
  //   },
  // ]);

  // const updateQuestionText = (id: number, newText: string) => {
  //   if (question.length > 0) {
  //     setquestion(
  //       question.map((q) => (q.id === id ? { ...q, text: newText } : q))
  //     );
  //   }
  // };

  // const toggleEdit = (id: number) => {
  //   setquestion(
  //     question.map((q) =>
  //       q.id === id ? { ...q, isEditing: !q.isEditing } : q
  //     )
  //   );
  // };

  const [questionText, setQuestionText] = useState(
    question?.questionText || ""
  );
  console.log("this", question);
  useEffect(() => {
    // When prop changes, sync local state
    setQuestionText(question?.questionText || "");
  }, [question]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setQuestionText(newText);
    if (onUpdate) {
      onUpdate({ ...question, questionText: newText });
    }
  };

  // const handleDuplicate = () => {
  //   if (onDuplicate) {
  //     onDuplicate(question);
  //   }
  // };

  // const handleDelete = () => {
  //   if (onDelete && question?.id) {
  //     onDelete(question.id);
  //   }
  //   // onClose(false);
  // };

  // return (
  //   <div className="w-full max-w-4xl mx-auto py-4 bg-white ">
  //     {/* Add Question Button and Dialog */}

  //     {question.map((question, index) => (
  //       <div
  //         key={question.id}
  //         className="mb-6 border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
  //       >
  //         {/* Question Header */}
  //         <div className="flex items-start justify-between mb-4">
  //           <div className="flex-1">
  //             {/* {question.isEditing ? ( */}
  //             <input
  //               type="text"
  //               value={question.text}
  //               onChange={(e) =>
  //                 updateQuestionText(question.id, e.target.value)
  //               }
  //               className="text-sm font-medium text-gray-900 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //               placeholder="Enter your question here..."
  //             />
  //             {/* ) : (
  //               <h3
  //                 className="text-sm font-medium text-gray-900 mb-4 cursor-pointer hover:bg-gray-50 p-1 rounded"
  //                 onClick={() => toggleEdit(question.id)}
  //               >
  //                 {index + 1}. {question.text}
  //               </h3>
  //             )} */}
  //           </div>
  //           <div className="flex items-center gap-2 ml-4">
  //             <Button
  //               variant="ghost"
  //               size="sm"
  //               className="h-6 w-6 p-0"
  //               onClick={() => {
  //                 const newId = question.length + 1;
  //                 const duplicated = {
  //                   ...question,
  //                   id: newId,
  //                   isEditing: false,
  //                 };
  //                 setquestion([...question, duplicated]);
  //               }}
  //             >
  //               <Copy className="h-4 w-4 text-gray-500" />
  //             </Button>

  //             <Button
  //               variant="ghost"
  //               size="sm"
  //               className="h-6 w-6 p-0"
  //               onClick={() =>
  //                 setquestion(question.filter((q) => q.id !== question.id))
  //               }
  //             >
  //               <Trash2 className="h-4 w-4 text-red-500" />
  //             </Button>
  //           </div>
  //         </div>
  //         <div className="bg-gray-50 p-4 rounded-md">
  //           <RadioGroup
  //             disabled
  //             className="grid grid-cols-[1fr_auto_1fr] items-center gap-2"
  //           >
  //             {/* Very Disagree */}
  //             <div className="flex gap-2 items-center justify-end">
  //               <span className="text-sm font-medium text-muted-foreground">
  //                 (1)
  //               </span>
  //               <Input
  //                 id="section-name"
  //                 placeholder="Very Disagree"
  //                 className="w-full focus:border-none"
  //                 readOnly
  //               />
  //             </div>

  //             {/* Separator */}
  //             <div className="flex justify-center items-center mb-3 text-gray-400">
  //               ___
  //             </div>

  //             {/* Strongly Agree */}
  //             <div className="flex gap-2 items-center justify-start">
  //               <Input
  //                 id="section-name"
  //                 placeholder="Strongly Agree"
  //                 className="w-full focus:border-none"
  //                 readOnly
  //               />
  //               <span className="text-sm font-medium text-muted-foreground">
  //                 (5)
  //               </span>
  //             </div>
  //           </RadioGroup>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <div className="w-full max-w-4xl mx-auto py-4 bg-white">
      <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between ">
          <div className="flex-1">
            <Input
              type="text"
              value={questionText}
              onChange={handleTextChange}
              className="text-sm font-medium text-gray-900 w-full"
              placeholder="Enter your question here..."
            />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => onDuplicate && onDuplicate(question)}

            >
              <Copy className="h-4 w-4 text-gray-500" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => onDelete && onDelete(question.id)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>

        {/* Linear scale preview */}
        <div className="bg-gray-50 p-4 rounded-md">
          <RadioGroup
            disabled
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-2"
          >
            <div className="flex gap-2 items-center justify-end">
              <span className="text-sm font-medium text-muted-foreground">
                (1)
              </span>
              <Input
                placeholder="Very Disagree"
                readOnly
                className="w-full focus:border-none"
              />
            </div>

            <div className="flex justify-center items-center mb-3 text-gray-400">
              ___
            </div>

            <div className="flex gap-2 items-center justify-start">
              <Input
                placeholder="Strongly Agree"
                readOnly
                className="w-full focus:border-none"
              />
              <span className="text-sm font-medium text-muted-foreground">
                (5)
              </span>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
