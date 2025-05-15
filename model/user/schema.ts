// schemas/teacherSchema.ts
import {
  GenderEnum as GenderEnumValues,
  StatusEnum as StatusEnumValue,
} from "@/constants/constant";
import { z } from "zod";

// 👤 Gender Enum
const GenderEnum = z.enum(
  Object.values(GenderEnumValues) as [string, ...string[]]
);

// 📊 Status Enum
const StatusEnum = z.enum(
  Object.values(StatusEnumValue) as [string, ...string[]]
);

// 📚 Nested Arrays
const ProfessionalRankSchema = z.object({
  id: z.number(),
  typeOfProfessionalRank: z.string(),
  description: z.string(),
  announcementNumber: z.string(),
  dateAccepted: z.string(), // or z.coerce.date() if you want Date object
});

const ExperienceSchema = z.object({
  id: z.number(),
  continuousEmployment: z.string(),
  workPlace: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

const PraiseCriticismSchema = z.object({
  id: z.number(),
  typePraiseOrCriticism: z.string(),
  giveBy: z.string(),
  dateAccepted: z.string(),
});

const EducationSchema = z.object({
  id: z.number(),
  culturalLevel: z.string(),
  skillName: z.string(),
  dateAccepted: z.string(),
});

const VocationalSchema = z.object({
  id: z.number(),
  culturalLevel: z.string(),
  skillOne: z.string(),
  skillTwo: z.string(),
  trainingSystem: z.string(),
  dateAccepted: z.string(),
});

const ShortCourseSchema = z.object({
  id: z.number(),
  skill: z.string(),
  skillName: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  duration: z.string(),
  preparedBy: z.string(),
  supportBy: z.string(),
});

const LanguageSchema = z.object({
  id: z.number(),
  language: z.string(),
  reading: z.string(),
  writing: z.string(),
  speaking: z.string(),
});

const FamilySchema = z.object({
  id: z.number(),
  nameChild: z.string(),
  gender: GenderEnum,
  dateOfBirth: z.string(),
  working: z.string(),
});

// 🧾 Main Schema
export const TeacherFormSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  roles: z.array(z.string()),

  khmerFirstName: z.string(),
  khmerLastName: z.string(),
  englishFirstName: z.string(),
  englishLastName: z.string(),
  gender: GenderEnum,
  dateOfBirth: z.string(),
  phoneNumber: z.string(),
  currentAddress: z.string(),
  nationality: z.string(),
  ethnicity: z.string(),
  placeOfBirth: z.string(),
  staffId: z.string(),
  nationalId: z.string(),
  identifyNumber: z.string(),
  startWorkDate: z.string(),
  currentPositionDate: z.string(),
  employeeWork: z.string(),
  disability: z.string(),
  payrollAccountNumber: z.string(),
  cppMembershipNumber: z.string(),
  province: z.string(),
  district: z.string(),
  commune: z.string(),
  village: z.string(),
  officeName: z.string(),
  currentPosition: z.string(),
  decreeFinal: z.string(),
  rankAndClass: z.string(),
  departmentId: z.number(),
  workHistory: z.string(),
  maritalStatus: z.string(),
  mustBe: z.string(),
  affiliatedProfession: z.string(),
  federationName: z.string(),
  affiliatedOrganization: z.string(),
  federationEstablishmentDate: z.string(),
  wivesSalary: z.string(),

  teachersProfessionalRanks: z.array(ProfessionalRankSchema),
  teacherExperiences: z.array(ExperienceSchema),
  teacherPraiseOrCriticisms: z.array(PraiseCriticismSchema),
  teacherEducations: z.array(EducationSchema),
  teacherVocationals: z.array(VocationalSchema),
  teacherShortCourses: z.array(ShortCourseSchema),
  teacherLanguages: z.array(LanguageSchema),
  teacherFamilies: z.array(FamilySchema),

  status: StatusEnum,
});

export type TeacherFormSchemaType = z.infer<typeof TeacherFormSchema>;

export const teacherFormDefaultValues = {
  username: "",
  password: "",
  email: "",
  roles: [""],

  khmerFirstName: "",
  khmerLastName: "",
  englishFirstName: "",
  englishLastName: "",
  gender: GenderEnumValues.MALE, // or "FEMALE"
  dateOfBirth: "",
  phoneNumber: "",
  currentAddress: "",
  nationality: "",
  ethnicity: "",
  placeOfBirth: "",
  staffId: "",
  nationalId: "",
  identifyNumber: "",
  startWorkDate: "",
  currentPositionDate: "",
  employeeWork: "",
  disability: "",
  payrollAccountNumber: "",
  cppMembershipNumber: "",
  province: "",
  district: "",
  commune: "",
  village: "",
  officeName: "",
  currentPosition: "",
  decreeFinal: "",
  rankAndClass: "",
  departmentId: 0,
  workHistory: "",
  maritalStatus: "",
  mustBe: "",
  affiliatedProfession: "",
  federationName: "",
  affiliatedOrganization: "",
  federationEstablishmentDate: "",
  wivesSalary: "",

  teachersProfessionalRanks: [
    {
      id: 0,
      typeOfProfessionalRank: "",
      description: "",
      announcementNumber: "",
      dateAccepted: "",
    },
  ],

  teacherExperiences: [
    {
      id: 0,
      continuousEmployment: "",
      workPlace: "",
      startDate: "",
      endDate: "",
    },
  ],

  teacherPraiseOrCriticisms: [
    {
      id: 0,
      typePraiseOrCriticism: "",
      giveBy: "",
      dateAccepted: "",
    },
  ],

  teacherEducations: [
    {
      id: 0,
      culturalLevel: "",
      skillName: "",
      dateAccepted: "",
    },
  ],

  teacherVocationals: [
    {
      id: 0,
      culturalLevel: "",
      skillOne: "",
      skillTwo: "",
      trainingSystem: "",
      dateAccepted: "",
    },
  ],

  teacherShortCourses: [
    {
      id: 0,
      skill: "",
      skillName: "",
      startDate: "",
      endDate: "",
      duration: "",
      preparedBy: "",
      supportBy: "",
    },
  ],

  teacherLanguages: [
    {
      id: 0,
      language: "",
      reading: "",
      writing: "",
      speaking: "",
    },
  ],

  teacherFamilies: [
    {
      id: 0,
      nameChild: "",
      gender: GenderEnumValues.MALE,
      dateOfBirth: "",
      working: "",
    },
  ],

  status: StatusEnumValue.ACTIVE,
};
