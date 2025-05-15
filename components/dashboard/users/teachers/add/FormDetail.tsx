import React from "react";
import PersonalHistoryForm from "./personal-history";
import EducationForm from "./education";
import ExperienceForm from "./workHistorySection";
import PraiseCriticismForm from "./RateSection";
import CulturalLevelForm from "./Cultural-level";
import ShortCourseForm from "./shortCourse";
import LanguageForm from "./LanguageForm";
import FamilyStatusForm from "./FamilyStatusForm";
import VocationalForm from "./courseForm";

export default function FormDetail() {
  return (
    <div>
      <PersonalHistoryForm />

      <EducationForm />

      <ExperienceForm />

      <PraiseCriticismForm />

      <CulturalLevelForm />

      <VocationalForm />

      <ShortCourseForm />

      <LanguageForm />

      <FamilyStatusForm />
    </div>
  );
}
