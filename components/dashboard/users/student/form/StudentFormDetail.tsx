import React from "react";
import StudentPersonalDetailSection from "../add-single-student/StuPersonalDetail";
import { StudentStudiesHistorySection } from "../add-single-student/studentStudiesHistories";
import StudentFamilyBackgroundSection from "../add-single-student/StuFamilyBackground";

export default function StudentFormDetail() {
  return (
    <div className="space-y-5">
      <StudentPersonalDetailSection />

      <StudentStudiesHistorySection />

      <StudentFamilyBackgroundSection />
    </div>
  );
}
