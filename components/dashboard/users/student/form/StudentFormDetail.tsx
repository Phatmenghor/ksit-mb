import React from "react";
import StudentPersonalDetailSection from "../add-single-student/StuPersonalDetail";
import StudentFamilyBackgroundSection from "../add-single-student/StuFamilyBackground";
import { StudentStudiesHistorySection } from "../add-single-student/studentStudiesHistories";

export default function StudentFormDetail() {
  return (
    <div className="space-y-5">
      <StudentPersonalDetailSection />

      <StudentStudiesHistorySection />

      <StudentFamilyBackgroundSection />
    </div>
  );
}
