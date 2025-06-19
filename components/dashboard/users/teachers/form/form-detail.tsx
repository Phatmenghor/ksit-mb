import React from "react";
import PersonalHistoryForm from "../detail-section/TeacherPersonalInfo";
import ExperienceForm from "../detail-section/TeacherExperiences";
import PraiseCriticismForm from "../detail-section/TeacherPraiseOrCriticisms";
import ShortCourseForm from "../detail-section/TeacherShortCourses";
import LanguageForm from "../detail-section/TeacherLanguages";
import FamilyStatusForm from "../detail-section/TeacherFamilies";
import VocationalForm from "../detail-section/TeacherVocational";
import EducatonForm from "../detail-section/TeacherEducations";

export default function FormDetail() {
  return (
    <div className="space-y-5">
      <PersonalHistoryForm />

      <ExperienceForm />

      <PraiseCriticismForm />

      <EducatonForm />

      <VocationalForm />

      <ShortCourseForm />

      <LanguageForm />

      <FamilyStatusForm />
    </div>
  );
}
