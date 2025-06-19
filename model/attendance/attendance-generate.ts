export interface AttendanceGenerateModel {
  id: number;
  sessionDate: string;
  qrCode: string;
  qrExpiryTime: string;
  finalizationStatus: string;
  status: string;
  scheduleId: number;
  courseName: string;
  roomName: string;
  className: string;
  teacherId: number;
  teacherName: string;
  totalStudents: number;
  totalPresent: number;
  totalAbsent: number;
  attendances: AttendancModel[];
}

export interface AttendancModel {
  id: number;
  status: string;
  attendanceType: string;
  identifyNumber: string;
  comment: string;
  recordedTime: string;
  finalizationStatus: string;
  studentId: number;
  studentName: string;
  attendanceSessionId: number;
  createdAt: string;
}
