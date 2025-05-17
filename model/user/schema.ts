// schemas/teacherSchema.ts
import { z } from "zod";

// Helper schemas for nested types
const TeachersProfessionalRankSchema = z.object({
  id: z.number().optional(),
  typeOfProfessionalRank: z.string(),
  description: z.string(),
  announcementNumber: z.string(),
  dateAccepted: z.string(),
});

const TeacherExperienceSchema = z.object({
  id: z.number().optional(),
  continuousEmployment: z.string(),
  workPlace: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

const TeacherPraiseOrCriticismSchema = z.object({
  id: z.number().optional(),
  typePraiseOrCriticism: z.string(),
  giveBy: z.string(),
  dateAccepted: z.string(),
});

const TeacherEducationSchema = z.object({
  id: z.number().optional(),
  culturalLevel: z.string(),
  skillName: z.string(),
  dateAccepted: z.string(),
});

const TeacherVocationalSchema = z.object({
  id: z.number().optional(),
  culturalLevel: z.string(),
  skillOne: z.string(),
  skillTwo: z.string(),
  trainingSystem: z.string(),
  dateAccepted: z.string(),
});

const TeacherShortCourseSchema = z.object({
  id: z.number().optional(),
  skill: z.string(),
  skillName: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  duration: z.string(),
  preparedBy: z.string(),
  supportBy: z.string(),
});

const TeacherLanguageSchema = z.object({
  id: z.number().optional(),
  language: z.string(),
  reading: z.string(),
  writing: z.string(),
  speaking: z.string(),
});

const TeacherFamilySchema = z.object({
  id: z.number().optional(),
  nameChild: z.string(),
  gender: z.string(),
  dateOfBirth: z.string(),
  working: z.string(),
});

// Main AddStaffModel schema
export const AddStaffModelSchema = z.object({
  // Required fields (based on common requirements for staff registration)
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  roles: z.array(z.string()).default([]),

  // Personal information
  khmerFirstName: z.string(),
  khmerLastName: z.string(),
  englishFirstName: z.string(),
  englishLastName: z.string(),
  gender: z.string(),
  dateOfBirth: z.string(),
  phoneNumber: z.string(),
  currentAddress: z.string(),
  nationality: z.string(),
  ethnicity: z.string(),
  placeOfBirth: z.string(),

  // ID information
  staffId: z.string(),
  nationalId: z.string(),
  identifyNumber: z.string(),

  // Employment information
  startWorkDate: z.string(),
  currentPositionDate: z.string(),
  employeeWork: z.string(),
  disability: z.string(),
  payrollAccountNumber: z.string(),
  cppMembershipNumber: z.string(),

  // Location information
  province: z.string(),
  district: z.string(),
  commune: z.string(),
  village: z.string(),

  // Position information
  officeName: z.string(),
  currentPosition: z.string(),
  decreeFinal: z.string(),
  rankAndClass: z.string(),
  departmentId: z.number(),

  // Teaching information
  taughtEnglish: z.string(),
  threeLevelClass: z.string(),
  referenceNote: z.string(),
  technicalTeamLeader: z.string(),
  assistInTeaching: z.string(),
  serialNumber: z.string(),
  twoLevelClass: z.string(),
  classResponsibility: z.string(),
  lastSalaryIncrementDate: z.string(),
  teachAcrossSchools: z.string(),
  overtimeHours: z.string(),
  issuedDate: z.string(),
  suitableClass: z.string(),
  bilingual: z.string(),
  academicYearTaught: z.string(),

  // Employment history
  workHistory: z.string(),

  // Personal details
  maritalStatus: z.string(),
  mustBe: z.string(),

  // Affiliation information
  affiliatedProfession: z.string(),
  federationName: z.string(),
  affiliatedOrganization: z.string(),
  federationEstablishmentDate: z.string(),
  wivesSalary: z.string(),

  // Nested arrays of related information
  teachersProfessionalRanks: z
    .array(TeachersProfessionalRankSchema)

    .default([]),
  teacherExperiences: z.array(TeacherExperienceSchema).default([]),
  teacherPraiseOrCriticisms: z
    .array(TeacherPraiseOrCriticismSchema)

    .default([]),
  teacherEducations: z.array(TeacherEducationSchema).default([]),
  teacherVocationals: z.array(TeacherVocationalSchema).default([]),
  teacherShortCourses: z.array(TeacherShortCourseSchema).default([]),
  teacherLanguages: z.array(TeacherLanguageSchema).default([]),
  teacherFamilies: z.array(TeacherFamilySchema).default([]),

  status: z.string(),
});

export const AddStaffModelBase = AddStaffModelSchema.partial();

// Type definition based on the schema
export type AddStaffModelType = z.infer<typeof AddStaffModelBase>;
