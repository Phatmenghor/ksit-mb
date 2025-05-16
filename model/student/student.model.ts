export interface GenerateMultipleStudent {
  classId: number;
  quantity: number;
  status: string;
}

export interface StudentResponse {
  id: number;
  username: string;
  identifyNumber: string;
  password: string;
  classCode: string;
  createdAt: string;
}

export interface RequestAllStudent {
  search?: string;
  status?: string;
  classId?: number;
  academicYear?: number;
  pageNo?: number;
  pageSize?: number;
}

export interface AllStudentModel {
  content: StudentModel[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface StudentModel {
  id: number;
  username: string;
  email: string;
  status: string;
  khmerFirstName: string;
  studentClass: StudentClass;
  khmerLastName: string;
  englishFirstName: string;
  englishLastName: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  createdAt: string;
}

export interface StudentClass {
  id: number;
  code: string;
  academyYear: number;
  degree: string;
  yearLevel: string;
  status: string;
  major: Major;
  createdAt: string;
}

export interface Major {
  id: number;
  code: string;
  name: string;
  status: string;
  department: Department;
  createdAt: string;
}

export interface Department {
  id: number;
  code: string;
  name: string;
  urlLogo: string;
  status: string;
  createdAt: string;
}
