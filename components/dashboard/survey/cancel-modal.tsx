import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Cancel } from "@radix-ui/react-alert-dialog";
import { CheckCircle, DiscIcon, Loader2 } from "lucide-react";

interface CancelConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title: string;
  description: string;
  itemName?: string;
  isSubmitting: boolean;
  isDelete: boolean;
}
export function CancelConfirmationDialog({
  isOpen,
  onClose,
  onDelete,
  title,
  description,
  isSubmitting,
  isDelete,
}: CancelConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-center ">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <DiscIcon className="w-10 h-10 text-white" />
          </div>
        </div>
        <DialogHeader>
          <DialogTitle className="mb-2 text-center">{title}</DialogTitle>

          <DialogDescription asChild className="text-center">
            <div>
              {description}
              {isDelete && (
                <p className="text-red-500 mb-2">
                  All questions in this section will be deleted
                </p>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button variant="outline" onClick={onClose}>
            Discard
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </>
            ) : isDelete ? (
              "Delete"
            ) : (
              "Cancel"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
