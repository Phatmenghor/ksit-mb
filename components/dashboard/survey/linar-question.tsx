"use client";

import { Dispatch, SetStateAction, useState } from "react";
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

interface FeedbackFormDisplayProps {
  isDialogOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}
type Question = {
  id: number;
  type: "text" | "rating";
  text: string;
  isEditing: boolean;
};

export default function LinarQuestion({
  isDialogOpen,
  onClose,
}: FeedbackFormDisplayProps) {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "rating",
      text: "What did you enjoy most about this class?",
      isEditing: false,
    },
    {
      id: 2,
      type: "rating" as const,
      text: "The instructor communicated effectively.",
      isEditing: false,
    },
  ]);

  const updateQuestionText = (id: number, newText: string) => {
    if (questions.length > 0) {
      setQuestions(
        questions.map((q) => (q.id === id ? { ...q, text: newText } : q))
      );
    }
  };

  const toggleEdit = (id: number) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, isEditing: !q.isEditing } : q
      )
    );
  };

  const addQuestion = (type: "text" | "rating") => {
    const newQuestion = {
      id: questions.length + 1,
      type: type,
      text:
        type === "text"
          ? "Enter your question here..."
          : "Rate this statement...",
      isEditing: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4 bg-white ">
      {/* Add Question Button and Dialog */}

      {questions.map((question, index) => (
        <div
          key={question.id}
          className="mb-6 border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
        >
          {/* Question Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {/* {question.isEditing ? ( */}
              <input
                type="text"
                value={question.text}
                onChange={(e) =>
                  updateQuestionText(question.id, e.target.value)
                }
                className="text-sm font-medium text-gray-900 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your question here..."
              />
              {/* ) : (
                <h3
                  className="text-sm font-medium text-gray-900 mb-4 cursor-pointer hover:bg-gray-50 p-1 rounded"
                  onClick={() => toggleEdit(question.id)}
                >
                  {index + 1}. {question.text}
                </h3>
              )} */}
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => {
                  const newId = questions.length + 1;
                  const duplicated = {
                    ...question,
                    id: newId,
                    isEditing: false,
                  };
                  setQuestions([...questions, duplicated]);
                }}
              >
                <Copy className="h-4 w-4 text-gray-500" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() =>
                  setQuestions(questions.filter((q) => q.id !== question.id))
                }
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <RadioGroup
              disabled
              className="grid grid-cols-[1fr_auto_1fr] items-center gap-2"
            >
              {/* Very Disagree */}
              <div className="flex gap-2 items-center justify-end">
                <span className="text-sm font-medium text-muted-foreground">
                  (1)
                </span>
                <Input
                  id="section-name"
                  placeholder="Very Disagree"
                  className="w-full focus:border-none"
                  readOnly
                />
              </div>

              {/* Separator */}
              <div className="flex justify-center items-center mb-3 text-gray-400">
                ___
              </div>

              {/* Strongly Agree */}
              <div className="flex gap-2 items-center justify-start">
                <Input
                  id="section-name"
                  placeholder="Strongly Agree"
                  className="w-full focus:border-none"
                  readOnly
                />
                <span className="text-sm font-medium text-muted-foreground">
                  (5)
                </span>
              </div>
            </RadioGroup>
          </div>
        </div>
      ))}
    </div>
  );
}
