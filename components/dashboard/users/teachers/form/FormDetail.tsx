import React from "react";
import PersonalHistoryForm from "../add/personal-history";
import EducationForm from "../add/education";
import ExperienceForm from "../add/workHistorySection";
import PraiseCriticismForm from "../add/RateSection";
import VocationalForm from "../add/courseForm";
import ShortCourseForm from "../add/shortCourse";
import LanguageForm from "../add/LanguageForm";
import FamilyStatusForm from "../add/FamilyStatusForm";

export default function FormDetail() {
  return (
    <div className="space-y-5">
      <PersonalHistoryForm />

      <EducationForm />

      <ExperienceForm />

      <PraiseCriticismForm />

      <EducationForm />

      <VocationalForm />

      <ShortCourseForm />

      <LanguageForm />

      <FamilyStatusForm />
    </div>
  );
}
