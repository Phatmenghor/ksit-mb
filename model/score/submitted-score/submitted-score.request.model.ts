export interface SubmittedScoreParam {
  search?: string;
  status?: string;
  teacherId?: number;
  scheduleId?: number;
  classId?: number;
  courseId?: number;
  studentId?: number;
  pageNo?: number;
  pageSize?: number;
}
export interface ConfigureScoreModel {
  attendancePercentage?: number;
  assignmentPercentage?: number;
  midtermPercentage?: number;
  finalPercentage?: number;
  totalPercentage?: number;
}
