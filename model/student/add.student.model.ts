export interface AddSingleStudentRequest {
  password: string;
  username: string;
  email: string;
  khmerFirstName: string;
  khmerLastName: string;
  englishFirstName: string;
  englishLastName: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  currentAddress: string;
  nationality: string;
  ethnicity: string;
  placeOfBirth: string;
  memberSiblings: string;
  numberOfSiblings: string;
  classId: number;
  studentStudiesHistories: StudentStudiesHistory[];
  studentParents: StudentParent[];
  studentSiblings: StudentSibling[];
  status: string;
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
}
