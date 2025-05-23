import React from "react";
import StudentPersonalInfo from "../section/StudentPersonalInfo";
import StudentStudyHistory from "../section/StudentStudyHistory";
import StudentFamily from "../section/StudentFamily";
import { StudentByIdModel } from "@/model/user/student/getById.student.model";

export default function StudentDetailsTabs({
  studentDetail,
}: {
  studentDetail: StudentByIdModel | null;
}) {
  return (
    <div className="space-y-5">
      <StudentPersonalInfo student={studentDetail} />
      <StudentStudyHistory student={studentDetail} />
      <StudentFamily student={studentDetail} />
    </div>
  );
}
