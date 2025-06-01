export interface StudentScoreInitModel {
  status: string;
  message: string;
  data: SessionScoreModel;
}

export interface SessionScoreModel {
  id: number;
  scheduleId: number;
  className: string;
  courseName: string;
  teacherId: number;
  teacherName: string;
  reviewerId: number;
  reviewerName: string;
  status: string;
  teacherComments: string;
  staffComments: string;
  submissionDate: string;
  reviewDate: string;
  studentScores: StudentScoreModel[];
}

export interface StudentScoreModel {
  id: number;
  studentId: number;
  studentName: string;
  studentCode: string;
  attendanceScore: number;
  assignmentScore: number;
  midtermScore: number;
  finalScore: number;
  totalScore: number;
  grade: string;
  comments: string;
}
