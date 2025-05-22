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
  attendances: AttendancModel[];
}

export interface AttendancModel {
  id: number;
  status: any;
  attendanceType: string;
  comment: string;
  recordedTime: string;
  finalizationStatus: string;
  studentId: number;
  studentName: string;
  studentCode: string;
  attendanceSessionId: number;
}
