import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import FeedbackFormDisplay from "./paragraph-question";
import { SetStateAction, useState } from "react";
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

type FormSectionProps = {
  sectionNumber: number;
  totalSections: number;
  onRemove: () => Promise<void>;
};
export default function Component({
  sectionNumber,
  totalSections,
  onRemove,
}: FormSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleAddQuestion = () => {
    setIsDialogOpen(true);
  };
  const [selectedLinar, setSelectedLinar] = useState(false);
  const [selectedParagraph, setSelectedParagraphe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
                      setSelectedParagraphe(true);
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
                      setSelectedLinar(true);
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
            <div className="flex gap-4">
              <div className="border-l-4 border-[#024D3E] rounded-lg "></div>
              <Input
                id="section-name"
                placeholder="Name Section..."
                className="max-w-full "
              />
            </div>
          </div>
          {selectedLinar && (
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
          )}
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
