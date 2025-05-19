export interface AllScheduleModel {
  content: ScheduleModel[];
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
  classes: Classes;
  teacher: Teacher;
  course: Course;
  room: Room;
  semester: Semester;
  createdAt: string;
}

interface Classes {
  id: number;
  code: string;
  academyYear: number;
  degree: string;
  yearLevel: string;
  status: string;
  major: Major;
  createdAt: string;
}

interface Major {
  id: number;
  code: string;
  name: string;
  status: string;
  department: any;
  createdAt: string;
}

interface Teacher {
  id: number;
  username: string;
  email: string;
  roles: string[];
  status: string;
  department: any;
  khmerFirstName: any;
  profileUrl: any;
  khmerLastName: any;
  englishFirstName: any;
  englishLastName: any;
  gender: any;
  dateOfBirth: any;
  phoneNumber: any;
  identifyNumber: any;
  staffId: any;
  createdAt: string;
}

interface Course {
  id: number;
  code: string;
  nameKH: string;
  nameEn: string;
  credit: number;
  theory: number;
  execute: number;
  apply: number;
  totalHour: number;
  description: string;
  purpose: string;
  expectedOutcome: string;
  status: string;
  department: Department;
  subject: Subject;
  createdAt: string;
}

interface Department {
  id: number;
  code: string;
  name: string;
  urlLogo: string;
  status: string;
  createdAt: string;
}

interface Subject {
  id: number;
  name: string;
  status: string;
  createdAt: string;
}

interface Room {
  id: number;
  name: string;
  status: string;
  createdAt: string;
}

interface Semester {
  id: number;
  semester: string;
  startDate: string;
  endDate: string;
  academyYear: number;
  semesterType: string;
  status: string;
}
