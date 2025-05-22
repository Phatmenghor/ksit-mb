"use client";
import {
  StudentProfile,
  UserProfileSection,
} from "@/components/dashboard/users/student/view/section/StudentProfile";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { ROUTE } from "@/constants/routes";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React, { useEffect } from "react";
import StudentPersonalInfo from "@/components/dashboard/users/student/view/section/StudentHistoryDetail";
import { useParams } from "next/navigation";
import { getStudentByIdService } from "@/service/user/student.service";
import { toast } from "sonner";
import { StudentByIdModel } from "@/model/user/student/getById.student.model";
import StudentStudyHistory from "@/components/dashboard/users/student/view/section/StudentStudyHistory";
import { CircleAlert, FileText } from "lucide-react";
import StudentTranscript from "@/components/dashboard/users/student/view/section/StudentTranscript";
import StudentFamily from "@/components/dashboard/users/student/view/section/StudentFamily";

export default function StudentViewPage() {
  const [activeTab, setActiveTab] = React.useState("information");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [studentDetail, setStudentDetail] =
    React.useState<StudentByIdModel | null>(null);
  const params = useParams();
  const studentId = params.id as string;

  const loadStudent = async () => {
    setIsLoading(true);
    try {
      const response = await getStudentByIdService(studentId);
      if (response) {
        setStudentDetail(response);
      } else {
        toast.error("Error getting student data");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStudent();
  }, [studentId]);

  const profile = studentDetail
    ? {
        id: studentDetail.id,
        username: studentDetail.username,
        profileUrl: studentDetail.profileUrl,
      }
    : null;

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full space-y-4"
    >
      {/* Header with TabsList injected via prop */}
      <CardHeaderSection
        title="Student View Details"
        back
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          { label: "View Student", href: ROUTE.STUDENTS.VIEW(studentId) },
        ]}
        tabs={
          <div className="container mx-auto mt-3">
            <TabsList className="border-b w-full justify-start rounded-none gap-4 h-auto pb-0 bg-transparent">
              <TabsTrigger
                value="information"
                className={`rounded-none pb-2 px-0 mr-6 data-[state=active]:border-b-2 data-[state=active]:border-primary ${
                  activeTab === "information" ? "text-primary" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <CircleAlert className="h-4 w-4 text-primary" />
                  <span>Student Information</span>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="transcript"
                className={`rounded-none pb-2 px-0 data-[state=active]:border-b-2 data-[state=active]:border-primary ${
                  activeTab === "transcript" ? "text-primary" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span>Transcript</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>
        }
      />

      {/* Tab Content outside the header */}
      <UserProfileSection user={profile} />

      <TabsContent value="information" className="space-y-4 w-full">
        <StudentPersonalInfo student={studentDetail} />
        <StudentStudyHistory student={studentDetail} />
        <StudentFamily student={studentDetail} />
      </TabsContent>

      <TabsContent value="transcript" className=" space-y-4 w-full">
        {/* NOTED: HAVEN'T Integrated with api */}
        <StudentTranscript student={studentDetail} />
      </TabsContent>
    </Tabs>
  );
}
