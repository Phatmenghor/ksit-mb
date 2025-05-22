"use client";
import { UserProfileSection } from "@/components/dashboard/users/student/view/section/StudentProfile";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { ROUTE } from "@/constants/routes";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { getStuffByIdService } from "@/service/user/user.service";
import { Data } from "@/model/user/staff/getById.staff.model";

export default function TeacherViewPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [teacher, setteacher] = React.useState<Data | null>(null);
  const params = useParams();
  const teacherId = params.id as string;

  const loadStudent = async () => {
    setIsLoading(true);
    try {
      const response = await getStuffByIdService(teacherId);
      if (response) {
        setteacher(response);
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
  }, [teacherId]);

  const profile = teacher
    ? {
        id: teacher.id,
        username: teacher.username,
        profileUrl: teacher.profileUrl,
      }
    : null;

  return (
    <div>
      {/* Header with TabsList injected via prop */}
      <CardHeaderSection
        title="Teacher View Details"
        back
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          { label: "View Teacher", href: ROUTE.USERS.VIEW_TEACHER(teacherId) },
        ]}
      />

      {/* Tab Content outside the header */}
      <div className="mt-4">
        <UserProfileSection user={teacher} />
      </div>
    </div>
  );
}
