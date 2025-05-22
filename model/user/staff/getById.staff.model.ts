export interface GetStaffByIdResponseModel {
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  username: string;
  email: string;
  roles: string[];
  status: string;
  khmerFirstName: string;
  khmerLastName: string;
  profileUrl: string;
  englishFirstName: string;
  englishLastName: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  currentAddress: string;
  nationality: string;
  ethnicity: string;
  placeOfBirth: string;
  identifyNumber: string;
  staffId: string;
  nationalId: string;
  startWorkDate: string;
  currentPositionDate: string;
  employeeWork: string;
  disability: string;
  payrollAccountNumber: string;
  cppMembershipNumber: string;
  province: string;
  district: string;
  commune: string;
  village: string;
  officeName: string;
  currentPosition: string;
  decreeFinal: string;
  rankAndClass: string;
  department: Department;
  workHistory: string;
  maritalStatus: string;
  mustBe: string;
  affiliatedProfession: string;
  federationName: string;
  affiliatedOrganization: string;
  federationEstablishmentDate: string;
  wivesSalary: string;
  teachersProfessionalRank: TeachersProfessionalRank[];
  teacherExperience: TeacherExperience[];
  teacherPraiseOrCriticism: TeacherPraiseOrCriticism[];
  teacherEducation: TeacherEducation[];
  teacherVocational: TeacherVocational[];
  teacherShortCourse: TeacherShortCourse[];
  teacherLanguage: TeacherLanguage[];
  teacherFamily: TeacherFamily[];
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

export interface TeachersProfessionalRank {
  id: number;
  typeOfProfessionalRank: string;
  description: string;
  announcementNumber: string;
  dateAccepted: string;
}

export interface TeacherExperience {
  id: number;
  continuousEmployment: string;
  workPlace: string;
  startDate: string;
  endDate: string;
}

export interface TeacherPraiseOrCriticism {
  id: number;
  typePraiseOrCriticism: string;
  giveBy: string;
  dateAccepted: string;
}

export interface TeacherEducation {
  id: number;
  culturalLevel: string;
  skillName: string;
  dateAccepted: string;
  country: string;
}

export interface TeacherVocational {
  id: number;
  culturalLevel: string;
  skillOne: string;
  skillTwo: string;
  trainingSystem: string;
  dateAccepted: string;
}

export interface TeacherShortCourse {
  id: number;
  skill: string;
  skillName: string;
  startDate: string;
  endDate: string;
  duration: string;
  preparedBy: string;
  supportBy: string;
}

export interface TeacherLanguage {
  id: number;
  language: string;
  reading: string;
  writing: string;
  speaking: string;
}

export interface TeacherFamily {
  id: number;
  nameChild: string;
  gender: string;
  dateOfBirth: string;
  working: string;
}
