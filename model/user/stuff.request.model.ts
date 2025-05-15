export interface RequestAllStuff {
  search: string;
  status: string;
  roles: string[];
  departmentId?: number;
  pageNo: number;
  pageSize: number;
}

export interface AddStaffModel {
  username: string;
  password: string;
  email: string;
  roles: string[];
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
  staffId: string;
  nationalId: string;
  identifyNumber: string;
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
  departmentId: number;
  workHistory: string;
  maritalStatus: string;
  mustBe: string;
  affiliatedProfession: string;
  federationName: string;
  affiliatedOrganization: string;
  federationEstablishmentDate: string;
  wivesSalary: string;
  teachersProfessionalRanks: TeachersProfessionalRank[];
  teacherExperiences: TeacherExperience[];
  teacherPraiseOrCriticisms: TeacherPraiseOrCriticism[];
  teacherEducations: TeacherEducation[];
  teacherVocationals: TeacherVocational[];
  teacherShortCourses: TeacherShortCourse[];
  teacherLanguages: TeacherLanguage[];
  teacherFamilies: TeacherFamily[];
  status: string;
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
