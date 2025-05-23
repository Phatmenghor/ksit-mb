import React from "react";
import PersonalHistoryForm from "../detail-section/TeacherPersonalInfo";
import ExperienceForm from "../detail-section/TeacherExperiences";
import PraiseCriticismForm from "../detail-section/TeacherPraiseOrCriticisms";
import VocationalForm from "../detail-section/VocationalForm";
import ShortCourseForm from "../detail-section/TeacherShortCourses";
import LanguageForm from "../detail-section/TeacherLanguages";
import FamilyStatusForm from "../detail-section/TeacherFamilies";
import { Mode } from "@/constants/constant";
import EducationForm from "../detail-section/TeachersProfessionalRanks";

export default function FormDetail({ mode }: { mode: Mode }) {
  return (
    <div className="space-y-5">
      <PersonalHistoryForm mode={mode} />

      <ExperienceForm mode={mode} />

      <PraiseCriticismForm mode={mode} />

      <EducationForm mode={mode} />

      <VocationalForm mode={mode} />

      <ShortCourseForm mode={mode} />

      <LanguageForm mode={mode} />

      <FamilyStatusForm mode={mode} />
    </div>
  );
}
