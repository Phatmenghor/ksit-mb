import { SemesterModel } from "@/model/master-data/semester/semester-model";

export interface StudentScoreInitModel {
  status: string;
  message: string;
  data: SessionScoreModel;
}

export interface SessionScoreModel {
  id: number;
  scheduleId: number;
  classCode: string;
  courseName: string;
  teacherId: number;
  teacherName: string;
  status: string;
  teacherComments: string;
  staffComments: string;
  submissionDate: string;
  createdAt: string;
  updatedAt: string;
  semester: SemesterModel;
  studentScores: StudentScoreModel[];
}

export interface StudentScoreModel {
  id: number;
  studentNameKhmer: string;
  studentNameEnglish: string;
  studentIdentityNumber: number;
  gender: string;
  studentId: number;
  dateOfBirth: string;
  attendanceScore: number;
  assignmentScore: number;
  midtermScore: number;
  finalScore: number;
  totalScore: number;
  grade: string;
  comments: string;
  createdAt: string;
}
