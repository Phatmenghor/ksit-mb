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
import { SurveyQuestionResponseDto } from "@/model/survey/survey-model";
import { Input } from "@/components/ui/input";

interface ParagraphProps {
  isDialogOpen: boolean;
  onClose: () => void;
  question: SurveyQuestionResponseDto;
  onUpdate?: (updatedQuestion: SurveyQuestionResponseDto) => void; // optional callback
  onDuplicate?: (question: SurveyQuestionResponseDto) => void; 
  onDelete?: (id: number) => void; // optional callback
}

export default function ParagraphQuestion({
  isDialogOpen,
 // onClose,
  question,
  onUpdate,
  onDelete,
  onDuplicate
}: ParagraphProps) {
  // const [questions, setQuestions] = useState([
  //   {
  //     id: 1,
  //     type: "text" as const,
  //     text: "What did you enjoy most about this class?",
  //     isEditing: false,
  //   },
  //   {
  //     id: 2,
  //     type: "text",
  //     text: "The instructor communicated effectively.",
  //     isEditing: false,
  //   },
  // ]);


  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(question?.questionText || "");

  // Sync local state if question prop changes
  useEffect(() => {
    setText(question?.questionText || "");
  }, [question]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  //   const saveChanges = () => {
  //   if (onUpdate) {
  //     onUpdate({ ...question, question });
  //   }
  //   setIsEditing(false);
  // };

  if (!isDialogOpen) return null;
  return (
    <div className="py-2">
      <div className="border border-gray-300 rounded-lg p-4 mt-4 bg-white shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <Input
              type="text"
              value={text}
              onChange={handleTextChange}
              //  onBlur={saveChanges}
              // className="text-sm font-medium text-gray-900 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              className="text-sm font-medium text-gray-900 w-full"
              placeholder="Enter your question here..."
              autoFocus
            />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => {
                onDuplicate && onDuplicate(question)
              }}
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

        {/* Input for answer */}
        <Input
          type="text"
          placeholder="Answer Text Input"
          className="w-full border border-gray-300 rounded-md p-2 text-sm placeholder-gray-400 bg-gray-50"
          
        />
      </div>
    </div>
  );

  // return (
  //   <div className="w-full max-w-4xl mx-auto p-6 bg-white ">
  //     {/* Add Question Button and Dialog */}

  //     {questions.map((question, index) => (
  //       <div
  //         key={question.id}
  //         className="mb-6 border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
  //       >
  //         {/* Question Header */}
  //         <div className="flex items-start justify-between mb-4">
  //           <div className="flex-1">
  //             {question.isEditing ? (
  //               <input
  //                 type="text"
  //                 value={question.text}
  //                 onChange={(e) =>
  //                   updateQuestionText(question.id, e.target.value)
  //                 }
  //                 className="text-sm font-medium text-gray-900 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //                 placeholder="Enter your question here..."
  //               />
  //             ) : (
  //               <h3
  //                 className="text-sm font-medium text-gray-900 mb-4 cursor-pointer hover:bg-gray-50 p-1 rounded"
  //                 onClick={() => toggleEdit(question.id)}
  //               >
  //                 {index + 1}. {question.text}
  //               </h3>
  //             )}
  //           </div>
  //           <div className="flex items-center gap-2 ml-4">
  //             <Button
  //               variant="ghost"
  //               size="sm"
  //               className="h-6 w-6 p-0"
  //               onClick={() => {
  //                 const newId = questions.length + 1;
  //                 const duplicated = {
  //                   ...question,
  //                   id: newId,
  //                   isEditing: false,
  //                 };
  //                 setQuestions([...questions, duplicated]);
  //               }}
  //             >
  //               <Copy className="h-4 w-4 text-gray-500" />
  //             </Button>

  //             <Button
  //               variant="ghost"
  //               size="sm"
  //               className="h-6 w-6 p-0"
  //               onClick={() =>
  //                 setQuestions(questions.filter((q) => q.id !== question.id))
  //               }
  //             >
  //               <Trash2 className="h-4 w-4 text-red-500" />
  //             </Button>
  //           </div>
  //         </div>

  //         {/* Question Input Area */}
  //         {question.type === "text" ? (
  //           <input
  //             type="text"
  //             placeholder="Answer Text Input"
  //             className="w-full border border-gray-300 rounded-md p-2 text-sm placeholder-gray-400 bg-gray-50"
  //           />
  //         ) : (
  //           <p></p>
  //         )}
  //       </div>
  //     ))}
  //   </div>
  // );
}
