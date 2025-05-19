export interface ScheduleFilterModel {
  search?: string;
  classId?: number;
  roomId?: number;
  teacherId?: number;
  academyYear?: number;
  semester?: string;
  dayOfWeek?: string;
  status?: string;
  pageNo?: number;
  pageSize?: number;
}
