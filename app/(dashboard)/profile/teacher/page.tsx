"use client";
import { UserProfileSection } from "@/components/dashboard/users/shared/UserProfile";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { ROUTE } from "@/constants/routes";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import TeacherPersonal from "@/components/dashboard/users/teachers/view/TeacherPersonalInfo";
import TeacherProfessionalRank from "@/components/dashboard/users/teachers/view/TeacherProfessionalRank";
import TeacherExperienceSection from "@/components/dashboard/users/teachers/view/TeacherExperience";
import TeacherPraiseOrCriticismSection from "@/components/dashboard/users/teachers/view/TeacherPraiseOrCriticism";
import TeacherEducationSection from "@/components/dashboard/users/teachers/view/TeacherEducation";
import TeacherVocationalSection from "@/components/dashboard/users/teachers/view/TeacherVocational";
import TeacherShortCourseSection from "@/components/dashboard/users/teachers/view/TeacherShortCourse";
import TeacherLanguageSection from "@/components/dashboard/users/teachers/view/TeacherLanguage";
import TeacherFamilySection from "@/components/dashboard/users/teachers/view/TeacherFamily";
import { StaffRespondModel } from "@/model/user/staff/staff.respond.model";
import {
  getStaffByIdService,
  getStaffByTokenService,
} from "@/service/user/user.service";
import { Pencil } from "lucide-react";

export default function TeacherViewPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [teacher, setteacher] = React.useState<StaffRespondModel | null>(null);
  const params = useParams();
  const teacherId = params.id as string;
  const router = useRouter();
  const loadTeacher = async () => {
    setIsLoading(true);
    try {
      const response = await getStaffByTokenService();
      if (response) {
        setteacher(response);
      } else {
        toast.error("Error getting teacher data");
      }
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTeacher();
  }, [teacherId]);

  const profile = teacher
    ? {
        id: teacher.identifyNumber,
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
        buttonHref={ROUTE.USERS.EDIT_TEACHER(String(teacher?.id))}
        buttonText="Update your profile"
        buttonIcon={<Pencil className="w-4 h-4" />}
      />

      {/* Tab Content outside the header */}
      <div className="mt-4 space-y-4">
        <UserProfileSection user={profile} />
        <TeacherPersonal teacher={teacher} />
        <TeacherProfessionalRank teacher={teacher} />
        <TeacherExperienceSection
          teacher={teacher?.teacherExperience || null}
        />
        <TeacherPraiseOrCriticismSection
          teacher={teacher?.teacherPraiseOrCriticism || null}
        />
        <TeacherEducationSection teacher={teacher?.teacherEducation || null} />
        <TeacherVocationalSection
          teacher={teacher?.teacherVocational || null}
        />
        <TeacherShortCourseSection
          teacher={teacher?.teacherShortCourse || null}
        />
        <TeacherLanguageSection teacher={teacher?.teacherLanguage || null} />{" "}
        <TeacherFamilySection
          familyStatus={teacher}
          teacher={teacher?.teacherFamily || null}
        />{" "}
      </div>
    </div>
  );
}
