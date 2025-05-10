export interface SubjectType {
  id: string;
  title: string;
  code: string;
  codeDetails: string;
  classId: string;
  department: string;
  major: string;
  semester: string;
  academicYear: string;
  hasScores: boolean;
  totalStudents: number;
  schedule: string;
}

export interface StudentType {
  id: string;
  fullnameKh: string;
  fullnameEn: string;
  gender: string;
  birthDate: string;
  attendance?: number;
  assignment?: number;
  midterm?: number;
  final?: number;
  total?: number;
  grade?: string;
}

export interface ScoreSubmissionType {
  id: string;
  subjectCode: string;
  subjectName: string;
  classId: string;
  semester: string;
  academicYear: string;
  submittedBy: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  students: StudentType[];
  formula: {
    attendance: number;
    assignment: number;
    midterm: number;
    final: number;
  };
}
