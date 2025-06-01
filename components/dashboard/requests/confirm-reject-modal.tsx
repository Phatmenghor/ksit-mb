"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

interface ConfirmRejectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (message: string) => void;
}

export function ConfirmRejectModal({
  open,
  onOpenChange,
  onConfirm,
}: ConfirmRejectModalProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    onConfirm(message);
    setMessage("");
    onOpenChange(false);
  };

  const handleDiscard = () => {
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <Info className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="font-semibold text-center">
            Confirm Reject!
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-center">
            Are you sure you want to reject this request?
          </DialogDescription>
        </DialogHeader>

        <hr />

        <div className="space-y-4">
          <div>
            <Label htmlFor="message" className="text-sm font-medium">
              Add suggestions or comments{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Write Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 min-h-[100px] resize-none"
            />
          </div>

          <div className="py-2">
            <hr />
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={handleDiscard}>
              Discard
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700"
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
