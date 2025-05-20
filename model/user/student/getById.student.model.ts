export interface GetStudentByIdModel {
  status: string;
  message: string;
  data: StudentByIdModel;
}

export interface StudentByIdModel {
  id: number;
  username: string;
  email: string;
  status: string;
  khmerFirstName: string;
  khmerLastName: string;
  englishFirstName: string;
  englishLastName: string;
  gender: string;
  profileUrl: string;
  dateOfBirth: string;
  phoneNumber: string;
  currentAddress: string;
  nationality: string;
  ethnicity: string;
  placeOfBirth: string;
  memberSiblings: string;
  numberOfSiblings: string;
  studentClass: StudentClass;
  studentStudiesHistory: StudentStudiesHistory[];
  studentParent: StudentParent[];
  studentSibling: StudentSibling[];
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

export interface StudentStudiesHistory {
  id: number;
  typeStudies: string;
  schoolName: string;
  location: string;
  fromYear: string;
  endYear: string;
  obtainedCertificate: string;
  overallGrade: string;
}

export interface StudentParent {
  id: number;
  name: string;
  phone: string;
  job: string;
  address: string;
  age: string;
  parentType: string;
}

export interface StudentSibling {
  id: number;
  name: string;
  gender: string;
  dateOfBirth: string;
  occupation: string;
  phoneNumber: string;
  address: string;
}
