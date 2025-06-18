"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  response: any; // the API response object you showed
}

export default function SuccessPopup({
  isOpen,
  onClose,
  response,
}: SuccessPopupProps) {
  // Fallback if response is missing
  if (!response) return null;

  const submission = Array.isArray(response)
    ? response[0]?.data
    : response.data;
  console.log("repose api", response);
  // Extract info safely
  const timestamp = new Date(submission?.submittedAt).toLocaleString();
  const courseDetails = {
    subject: submission?.surveyTitle || "N/A",
    classCode: submission?.surveyDescription || "N/A",
    day: submission?.sections?.[0]?.title || "N/A",
    instructor: submission?.user?.username || "N/A",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogTitle className="sr-only">Survey Submission Success</DialogTitle>
        <div className="bg-white rounded-lg text-center p-2">
          {/* Success Icon */}
          <div className="flex justify-center py-4">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title and Timestamp */}
          <h2 className="text-xl font-bold text-gray-900 mb-2">Submitted!</h2>
          <p className="text-gray-500 text-sm mb-6">{response.submittedAt}</p>
          <hr className="mx-4" />

          {/* Thank you message */}
          <div className="mb-8 text-sm">
            <p className="text-[#024D3E] leading-relaxed">
              Thank you for taking the time to complete this survey.
              <br />
              Your feedback is greatly appreciated!
            </p>
          </div>

          {/* Course Details */}
          <div className="bg-gray-100 rounded-lg p-6 mb-8 space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Subject</span>
              <span className="text-gray-900 font-medium">
                {response.user.majorName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Class Code</span>
              <span className="text-gray-900 font-medium">
                {response.user.userClass}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Day</span>
              <span className="text-gray-900 font-medium">
                {courseDetails.day}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Instructor</span>
              <span className="text-gray-900 font-medium">
                {courseDetails.instructor}
              </span>
            </div>
          </div>

          {/* Done Button */}
          <Button
            onClick={onClose}
            className="w-full bg-green-700 hover:bg-green-800 text-white px-4 text-base font-medium"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// export default function SuccessPopup({
//   isOpen,
//   onClose,
//   timestamp = "11-12-2025 4:59 PM",
//   courseDetails = {
//     subject: "Computer Programming II - 3(2,1,0)",
//     classCode: "Class 401101",
//     day: "Monday (8:00 - 12:00 AM)",
//     instructor: "Tong Vuthea",
//   },
// }: SuccessPopupProps) {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md p-0 gap-0">
//         <DialogTitle className="sr-only">Survey Submission Success</DialogTitle>
//         <div className="bg-white rounded-lg  text-center p-2">
//           {/* Success Icon */}
//           <div className="flex justify-center py-4">
//             <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
//               <CheckCircle className="w-10 h-10 text-white" />
//             </div>
//           </div>

//           {/* Title and Timestamp */}
//           <h2 className="text-xl font-bold text-gray-900 mb-2">Submitted!</h2>
//           <p className="text-gray-500 text-sm mb-6">{timestamp}</p>
//           <hr className="mx-4" />
//           {/* Thank you message */}
//           <div className="mb-8 text-sm">
//             <p className="text-[#024D3E] leading-relaxed">
//               Thank you for taking the time to complete this survey.
//               <br />
//               Your feedback is greatly appreciated!
//             </p>
//           </div>

//           {/* Course Details */}
//           <div className="bg-gray-100 rounded-lg p-6 mb-8 space-y-4 text-xs">
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600 font-medium">Subject</span>
//               <span className="text-gray-900 font-medium">
//                 {courseDetails.subject}
//               </span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600 font-medium">Class Code</span>
//               <span className="text-gray-900 font-medium">
//                 {courseDetails.classCode}
//               </span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600 font-medium">Day</span>
//               <span className="text-gray-900 font-medium">
//                 {courseDetails.day}
//               </span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600 font-medium">Instructor</span>
//               <span className="text-gray-900 font-medium">
//                 {courseDetails.instructor}
//               </span>
//             </div>
//           </div>

//           {/* Done Button */}
//           <Button
//             onClick={onClose}
//             className="w-full bg-green-700 hover:bg-green-800 text-white px-4 text-base font-medium"
//           >
//             Done
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
