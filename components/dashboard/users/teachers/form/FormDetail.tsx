import React from "react";
import PersonalHistoryForm from "../detail-section/personal-history";
import EducationForm from "../detail-section/education";
import ExperienceForm from "../detail-section/ExperienceForm";
import PraiseCriticismForm from "../detail-section/PraiseCriticismForm";
import VocationalForm from "../detail-section/VocationalForm";
import ShortCourseForm from "../detail-section/ShortCourseForm";
import LanguageForm from "../detail-section/LanguageForm";
import FamilyStatusForm from "../detail-section/FamilyStatusForm";
import { Mode } from "@/constants/constant";

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
