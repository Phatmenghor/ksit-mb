import { ClassModel } from "../master-data/class/all-class-model";
import { CourseModel } from "../master-data/course/all-course-model";
import { RoomModel } from "../master-data/room/all-room-model";
import { SemesterModel } from "../master-data/semester/semester-model";
import { StaffModel } from "../user/staff/stuff.model";

export interface AllScheduleodel {
  content: RoomModel[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface ScheduleModel {
  id: number;
  startTime: string;
  endTime: string;
  academyYear: any;
  day: string;
  status: string;
  classes: ClassModel;
  teacher: StaffModel;
  course: CourseModel;
  room: RoomModel;
  semester: SemesterModel;
  createdAt: string;
}
