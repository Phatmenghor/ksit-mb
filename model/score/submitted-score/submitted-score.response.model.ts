import { StudentScoreModel } from "../student-score/student-score.response";

export interface AllScoreSubmittedAPI {
  status: string;
  message: string;
  data: AllScoreSubmittedModel;
}

export interface AllScoreSubmittedModel {
  content: ScoreSubmittedModel[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface ScoreSubmittedModel {
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
  semester: Semester;
  studentScores: SubmittedScoreModel[];
}

interface Semester {
  id: number;
  semester: string;
  startDate: string;
  endDate: string;
  academyYear: number;
  semesterType: string;
  status: string;
  createdAt: string;
}

export interface SubmittedScoreModel {
  id: number;
  studentId: string;
  studentNameKhmer: string;
  studentNameEnglish: string;
  attendanceScore: number;
  assignmentScore: number;
  midtermScore: number;
  finalScore: number;
  totalScore: number;
  grade: string;
  comments: string;
  createdAt: string;
}
