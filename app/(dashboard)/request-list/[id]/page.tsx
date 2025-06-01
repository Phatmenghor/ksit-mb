"use client";

import { ConfirmAcceptModal } from "@/components/dashboard/requests/confirm-accept-modal";
import { ConfirmRejectModal } from "@/components/dashboard/requests/confirm-reject-modal";
import { ConfirmReturnModal } from "@/components/dashboard/requests/confirm-return-modal";
import { RequestCompletedModal } from "@/components/dashboard/requests/request-completed-modal";
import { RequestHistory } from "@/components/dashboard/requests/request-history";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DAYS_OF_WEEK, DayType } from "@/constants/constant";
import { ROUTE } from "@/constants/routes";
import { roomTableHeader } from "@/constants/table/master-data";
import {
  Folder,
  X,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

// Key for storing state in memory (you can use a global state manager like Zustand or Redux instead)
const STUDENT_DETAIL_STATE_KEY = "student_detail_state";

// Global state store (simple in-memory solution)
const globalStateStore = {
  state: null as any,
  setState: (newState: any) => {
    globalStateStore.state = newState;
  },
  getState: () => globalStateStore.state,
};

export default function StudentDetail() {
  // Initialize state from stored values or defaults
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const stored = globalStateStore.getState();
    return stored?.currentPage ?? 1;
  });

  const [selectedDay, setSelectedDay] = useState<DayType | null>(() => {
    const stored = globalStateStore.getState();
    return stored?.selectedDay ?? DAYS_OF_WEEK[0]; // Default to first day instead of null
  });

  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  const [requestStatus, setRequestStatus] = useState<
    "pending" | "accepted" | "completed" | "rejected" | "returned"
  >(() => {
    const stored = globalStateStore.getState();
    return stored?.requestStatus ?? "pending";
  });

  const [completedModalOpen, setCompletedModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Save state whenever important values change
  useEffect(() => {
    const stateToStore = {
      currentPage,
      selectedDay,
      requestStatus,
    };
    globalStateStore.setState(stateToStore);
  }, [currentPage, selectedDay, requestStatus]);

  const leftColumnData = [
    { label: "Student ID", value: "Lorem Text" },
    { label: "Gender", value: "Lorem Text" },
    { label: "Department", value: "Lorem Text" },
    { label: "Degree", value: "Lorem Text" },
    { label: "Phone", value: "Lorem Text" },
  ];

  const rightColumnData = [
    { label: "Student Name", value: "Lorem Text" },
    { label: "Date of Birth", value: "Lorem Text" },
    { label: "Major", value: "Lorem Text" },
    { label: "Current Address", value: "Lorem Text" },
  ];

  const documents = [
    { id: 1, name: "ប្រតិបត្តិពិន្ទុ", icon: "📁" },
    { id: 2, name: "សញ្ញាបត្របណ្តោះអាសន្ន", icon: "📁" },
  ];

  // Sample request history data
  const requestHistoryData = [
    {
      id: 1,
      document1: false,
      document2: true,
      document3: true,
      requestDate: "06-11-2024",
      status: "Done" as const,
      comment: "---",
    },
    {
      id: 2,
      document1: false,
      document2: true,
      document3: true,
      requestDate: "06-11-2024",
      status: "Done" as const,
      comment: "---",
    },
    {
      id: 3,
      document1: false,
      document2: true,
      document3: true,
      requestDate: "06-11-2024",
      status: "Rejected" as const,
      comment: "---",
    },
    {
      id: 4,
      document1: false,
      document2: true,
      document3: true,
      requestDate: "06-11-2024",
      status: "Rejected" as const,
      comment: "---",
    },
    {
      id: 5,
      document1: false,
      document2: true,
      document3: true,
      requestDate: "06-11-2024",
      status: "Pending" as const,
      comment: "---",
    },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleReturn = (message: string) => {
    console.log("Return with message:", message);
    setRequestStatus("returned");
  };

  const handleAccept = () => {
    console.log("Accept request");
    setRequestStatus("accepted");
  };

  const handleReject = (message: string) => {
    console.log("Reject with message:", message);
    setRequestStatus("rejected");
  };

  const handleMarkAsDone = () => {
    setCompletedModalOpen(true);
  };

  const handleRequestCompleted = () => {
    console.log("Request marked as completed");
    setRequestStatus("completed");
  };

  const handleDaySelect = (day: DayType) => {
    setSelectedDay(day);
    setCurrentPage(1);
  };

  // Function to render content based on selected day
  const renderDayContent = () => {
    if (!selectedDay) {
      return (
        <div className="text-center py-8 text-gray-500">
          Please select a day to view content
        </div>
      );
    }

    // Check if Monday is selected (assuming Monday has id 1 or displayName "Monday")
    if (selectedDay.displayName === "Monday" || selectedDay.id === 1) {
      return (
        <Card className="bg-white shadow-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src="/placeholder.svg?height=80&width=80"
                  alt="KSIT Student"
                />
                <AvatarFallback className="text-lg font-semibold">
                  KS
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  KSIT Student
                </h1>
                <p className="bg-green-100 hover:bg-green-200 text-green-900 p-2 rounded-full mt-2">
                  ID: 15099222
                </p>
              </div>
            </div>
          </CardHeader>

          <div className="px-4 md:px-6">
            <hr />
          </div>

          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Left Main Column */}
              <div className="space-y-4 md:space-y-5">
                {leftColumnData.map((item, index) => (
                  <div
                    key={`left-${index}`}
                    className="flex justify-between items-center"
                  >
                    <p className="text-sm text-gray-500 pr-4">{item.label}</p>
                    <p className="text-sm text-gray-900 text-right">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right Main Column */}
              <div className="space-y-4 md:space-y-5">
                {rightColumnData.map((item, index) => (
                  <div
                    key={`right-${index}`}
                    className="flex justify-between items-center"
                  >
                    <p className="text-sm text-gray-500 pr-4">{item.label}</p>
                    <p className="text-sm text-gray-900 text-right">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Check if Tuesday is selected (assuming Tuesday has id 2 or displayName "Tuesday")
    if (selectedDay.displayName === "Tuesday" || selectedDay.id === 2) {
      return (
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <RequestHistory data={requestHistoryData} />
          </CardContent>
        </Card>
      );
    }

    // For other days, show a placeholder or different content
    return (
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Request History
            </h3>

            <Table>
              <TableHeader>
                <TableRow>
                  {roomTableHeader.map((header, index) => (
                    <TableHead key={index} className={header.className}>
                      {header.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={roomTableHeader.length}
                    className="text-center text-muted-foreground py-6"
                  >
                    No records
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
    
  };

  return (
    <div>
      <CardHeaderSection
        title="Request View Details"
        back
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          { label: "Request List", href: ROUTE.REQUESTS_LIST },
          { label: "View Detail", href: ROUTE.STUDENT_DETAIL },
        ]}
      />

      <div className="relative flex items-center my-6 ">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 z-10 rounded-full"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-2 px-16 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {DAYS_OF_WEEK.map((day) => (
            <Button
              key={day.id}
              variant={selectedDay?.id === day.id ? "default" : "outline"}
              className="whitespace-nowrap"
              onClick={() => handleDaySelect(day)}
            >
              {day.displayName}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 z-10 rounded-full"
          onClick={scrollRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="overflow-x-auto mt-4">
        {/* Conditional content based on selected day */}
        {renderDayContent()}

        {/* Request Document Section - only show when Monday is selected */}
        {selectedDay &&
          (selectedDay.displayName === "Monday" || selectedDay.id === 1) && (
            <Card className="bg-white shadow-sm mt-4">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Request Document
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Request Date: 06-11-2024
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {requestStatus === "pending" && (
                      <>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => setRejectModalOpen(true)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-orange-500 text-orange-600 hover:bg-orange-50"
                          onClick={() => setReturnModalOpen(true)}
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Return
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => setAcceptModalOpen(true)}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Accept
                        </Button>
                      </>
                    )}
                    {requestStatus === "accepted" && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={handleMarkAsDone}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Mark As Done
                      </Button>
                    )}
                    {requestStatus === "completed" && (
                      <div className="text-sm text-gray-500">
                        Request completed
                      </div>
                    )}
                  </div>
                </div>

                {/* Separator */}
                <div className="py-2">
                  <hr className="border-gray-300" />
                </div>

                {/* Documents Section */}
                <div className="flex flex-wrap gap-3 w-full md:w-1/2 mt-4">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 transition"
                    >
                      <Folder className="w-5 h-5 text-amber-600" />
                      <span className="text-sm text-gray-900 whitespace-nowrap">
                        {doc.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        {/* Modals */}
        <ConfirmReturnModal
          open={returnModalOpen}
          onOpenChange={setReturnModalOpen}
          onConfirm={handleReturn}
        />
        <ConfirmAcceptModal
          open={acceptModalOpen}
          onOpenChange={setAcceptModalOpen}
          onConfirm={handleAccept}
        />
        <ConfirmRejectModal
          open={rejectModalOpen}
          onOpenChange={setRejectModalOpen}
          onConfirm={handleReject}
        />
        <RequestCompletedModal
          open={completedModalOpen}
          onOpenChange={setCompletedModalOpen}
          onConfirm={handleRequestCompleted}
        />
      </div>
    </div>
  );
}
