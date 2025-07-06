"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { CircleAlert, DollarSign, FileText } from "lucide-react";

import { UserProfileSection } from "@/components/dashboard/users/shared/user-profile";
import { CardHeaderSection } from "@/components/shared/layout/card-header-section";
import { ROUTE } from "@/constants/routes";
import { getStudentByIdService } from "@/service/user/student.service";
import StudentDetails from "@/components/dashboard/users/student/view/tab/student-detail-tab";
import StudentDetailsTabs from "@/components/dashboard/users/student/view/tab/student-detail-tab";
import PaymentTabs from "@/components/dashboard/users/student/view/tab/student-payment-tab";
import { StudentByIdModel } from "@/model/user/student/student.respond.model";
import { Card } from "@/components/ui/card";
import { TranscriptTabs } from "@/components/dashboard/users/student/view/tab/student-transcript-tab";

const tabs = [
  {
    value: "information",
    label: "Student Information",
    icon: CircleAlert,
  },
  {
    value: "transcript",
    label: "Transcript",
    icon: FileText,
  },
];

export default function StudentViewPage() {
  const [activeTab, setActiveTab] = useState("information");
  const [isLoading, setIsLoading] = useState(false);
  const [studentDetail, setStudentDetail] = useState<StudentByIdModel | null>(
    null
  );
  const { type, id } = useParams<{ type: string; id: string }>();

  const loadInfo = async () => {
    setIsLoading(true);
    try {
      const response = await getStudentByIdService(id);
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
    // If `type` is one of the valid tabs, use it
    if (["student", "payment", "transcript"].includes(type)) {
      if (type === "student") {
        setActiveTab("information");
      } else {
        setActiveTab(type);
      }
    }
  }, [type]);

  useEffect(() => {
    loadInfo();
  }, [id]);

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
          { label: "View Student", href: ROUTE.STUDENTS.VIEW(id) },
        ]}
        tabs={
          <div className="container mx-auto mt-3">
            <TabsList className="flex w-full border-b gap-6 pb-1 bg-transparent justify-start">
              {tabs.map(({ value, label, icon: Icon }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className={`relative pb-2 text-sm font-medium transition-colors duration-200 px-1 hover:text-primary data-[state=active]:text-primary`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </div>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 transition-all duration-200 ${
                      activeTab === value ? "bg-primary" : "bg-transparent"
                    }`}
                  />
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        }
      />

      {/* Tab Content outside the header */}
      <UserProfileSection user={profile} />
      <TabsContent value="information" className="space-y-4 w-full">
        <StudentDetails studentDetail={studentDetail} />
        <StudentDetailsTabs studentDetail={studentDetail} />
      </TabsContent>
      <TabsContent value="transcript" className="space-y-4 w-full">
        <TranscriptTabs studentId={studentDetail?.id} />
      </TabsContent>
    </Tabs>
  );
}
