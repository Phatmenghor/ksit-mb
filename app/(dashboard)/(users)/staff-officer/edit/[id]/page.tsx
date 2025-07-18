"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import {
  getStaffByIdService,
  updateStaffService,
} from "@/service/user/user.service";
import TeacherForm from "@/components/dashboard/users/teachers/form/teacher-form";
import { ROUTE } from "@/constants/routes";
import { EditStaffFormData } from "@/model/user/staff/staff.schema";
import { EditStaffModel } from "@/model/user/staff/staff.request.model";
import { cleanField } from "@/utils/map-helper/student";

export default function EditStaffOfficerPage() {
  const [loading, setLoading] = useState(false);

  const [initialValues, setInitialValues] = useState<EditStaffFormData>();

  const router = useRouter();
  const params = useParams();
  const teacherId = params?.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStaffByIdService(teacherId);

        const payload: EditStaffFormData = {
          email: response?.email ?? "",
          roles: response?.roles ?? [],
          khmerFirstName: response?.khmerFirstName ?? "",
          khmerLastName: response?.khmerLastName ?? "",
          englishFirstName: response?.englishFirstName ?? "",
          englishLastName: response?.englishLastName ?? "",
          gender: response?.gender ?? "",
          dateOfBirth: response?.dateOfBirth ?? "",
          phoneNumber: response?.phoneNumber ?? "",
          currentAddress: response?.currentAddress ?? "",
          nationality: response?.nationality ?? "",
          ethnicity: response?.ethnicity ?? "",
          placeOfBirth: response?.placeOfBirth ?? "",
          profileUrl: response?.profileUrl ?? "",
          taughtEnglish: response?.taughtEnglish ?? "",
          threeLevelClass: response?.threeLevelClass ?? "",
          referenceNote: response?.referenceNote ?? "",
          technicalTeamLeader: response?.technicalTeamLeader ?? "",
          assistInTeaching: response?.assistInTeaching ?? "",
          serialNumber: response?.serialNumber ?? "",
          twoLevelClass: response?.twoLevelClass ?? "",
          classResponsibility: response?.classResponsibility ?? "",
          lastSalaryIncrementDate: response?.lastSalaryIncrementDate ?? "",
          teachAcrossSchools: response?.teachAcrossSchools ?? "",
          overtimeHours: response?.overtimeHours ?? "",
          issuedDate: response?.issuedDate ?? "",
          suitableClass: response?.suitableClass ?? "",
          bilingual: response?.bilingual ?? "",
          academicYearTaught: response?.academicYearTaught ?? "",
          workHistory: response?.workHistory ?? "",
          staffId: response?.staffId ?? "",
          nationalId: response?.nationalId ?? "",
          startWorkDate: response?.startWorkDate ?? "",
          currentPositionDate: response?.currentPositionDate ?? "",
          employeeWork: response?.employeeWork ?? "",
          disability: response?.disability ?? "",
          payrollAccountNumber: response?.payrollAccountNumber ?? "",
          cppMembershipNumber: response?.cppMembershipNumber ?? "",
          province: response?.province ?? "",
          district: response?.district ?? "",
          commune: response?.commune ?? "",
          village: response?.village ?? "",
          officeName: response?.officeName ?? "",
          currentPosition: response?.currentPosition ?? "",
          decreeFinal: response?.decreeFinal ?? "",
          rankAndClass: response?.rankAndClass ?? "",
          maritalStatus: response?.maritalStatus ?? "",
          mustBe: response?.mustBe ?? "",
          affiliatedProfession: response?.affiliatedProfession ?? "",
          federationName: response?.federationName ?? "",
          affiliatedOrganization: response?.affiliatedOrganization ?? "",
          federationEstablishmentDate:
            response?.federationEstablishmentDate ?? "",
          wivesSalary: response?.wivesSalary ?? "",
          status: response?.status ?? "",

          teachersProfessionalRanks: response?.teachersProfessionalRank ?? [],
          teacherExperiences: response?.teacherExperience ?? [],
          teacherPraiseOrCriticisms: response?.teacherPraiseOrCriticism ?? [],
          teacherEducations: response?.teacherEducation ?? [],
          teacherVocationals: response?.teacherVocational ?? [],
          teacherShortCourses: response?.teacherShortCourse ?? [],
          teacherLanguages: response?.teacherLanguage ?? [],
          teacherFamilies: response?.teacherFamily ?? [],
        };

        setInitialValues(payload);
      } catch (error) {
        console.error("Failed to fetch teacher:", error);
        toast.error("Failed to load teacher data");
      }
    };

    fetchData();
  }, [teacherId]);

  const onSubmit = async (data: EditStaffFormData) => {
    setLoading(true);

    try {
      const payload: EditStaffModel = {
        email: cleanField(data.email),
        khmerFirstName: cleanField(data.khmerFirstName),
        khmerLastName: cleanField(data.khmerLastName),
        englishFirstName: cleanField(data.englishFirstName),
        englishLastName: cleanField(data.englishLastName),
        gender: cleanField(data.gender),
        profileUrl: cleanField(data.profileUrl),
        dateOfBirth: cleanField(data.dateOfBirth),
        phoneNumber: cleanField(data.phoneNumber),
        currentAddress: cleanField(data.currentAddress),
        nationality: cleanField(data.nationality),
        ethnicity: cleanField(data.ethnicity),
        placeOfBirth: cleanField(data.placeOfBirth),
        status: cleanField(data.status),

        teachersProfessionalRanks: (data.teachersProfessionalRanks ?? []).map(
          (rank) => ({
            typeOfProfessionalRank: cleanField(rank.typeOfProfessionalRank),
            description: cleanField(rank.description),
            announcementNumber: cleanField(rank.announcementNumber),
            dateAccepted: cleanField(rank.dateAccepted),
          })
        ),

        teacherExperiences: (data.teacherExperiences ?? []).map((exp) => ({
          continuousEmployment: cleanField(exp.continuousEmployment),
          workPlace: cleanField(exp.workPlace),
          startDate: cleanField(exp.startDate),
          endDate: cleanField(exp.endDate),
        })),

        teacherPraiseOrCriticisms: (data.teacherPraiseOrCriticisms ?? []).map(
          (item) => ({
            typePraiseOrCriticism: cleanField(item.typePraiseOrCriticism),
            giveBy: cleanField(item.giveBy),
            dateAccepted: cleanField(item.dateAccepted),
          })
        ),

        teacherEducations: (data.teacherEducations ?? []).map((edu) => ({
          culturalLevel: cleanField(edu.culturalLevel),
          skillName: cleanField(edu.skillName),
          country: cleanField(edu.country),
          dateAccepted: cleanField(edu.dateAccepted),
        })),

        teacherVocationals: (data.teacherVocationals ?? []).map((voc) => ({
          culturalLevel: cleanField(voc.culturalLevel),
          skillOne: cleanField(voc.skillOne),
          skillTwo: cleanField(voc.skillTwo),
          trainingSystem: cleanField(voc.trainingSystem),
          dateAccepted: cleanField(voc.dateAccepted),
        })),

        teacherShortCourses: (data.teacherShortCourses ?? []).map((course) => ({
          skill: cleanField(course.skill),
          skillName: cleanField(course.skillName),
          startDate: cleanField(course.startDate),
          endDate: cleanField(course.endDate),
          duration: cleanField(course.duration),
          preparedBy: cleanField(course.preparedBy),
          supportBy: cleanField(course.supportBy),
        })),

        teacherLanguages: (data.teacherLanguages ?? []).map((lang) => ({
          language: cleanField(lang.language),
          reading: cleanField(lang.reading),
          writing: cleanField(lang.writing),
          speaking: cleanField(lang.speaking),
        })),

        teacherFamilies: (data.teacherFamilies ?? []).map((fam) => ({
          nameChild: cleanField(fam.nameChild),
          gender: cleanField(fam.gender),
          dateOfBirth: cleanField(fam.dateOfBirth),
          working: cleanField(fam.working),
        })),
      };
      await updateStaffService(Number(teacherId), payload);

      toast.success("Teacher updated successfully");
    } catch (error) {
      console.error("Failed to update teacher:", error);
      toast.error("Failed to update teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TeacherForm
      mode="Edit"
      title="Edit Staff"
      onSubmit={onSubmit}
      initialValues={initialValues}
      loading={loading}
      back={ROUTE.DASHBOARD}
      onDiscard={() => {
        router.back();
      }}
    />
  );
}
