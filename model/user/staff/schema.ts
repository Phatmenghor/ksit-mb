// schemas/teacherSchema.ts
import { z } from "zod";
import { StaffModel } from "./stuff.model";

const TeachersProfessionalRankSchema = z.object({
  id: z.number().optional(),
  typeOfProfessionalRank: z.string().nullable(),
  description: z.string().nullable(),
  announcementNumber: z.string().nullable(),
  dateAccepted: z.string().nullable(),
});

const TeacherExperienceSchema = z.object({
  id: z.number().optional(),
  continuousEmployment: z.string().nullable(),
  workPlace: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
});

const TeacherPraiseOrCriticismSchema = z.object({
  id: z.number().optional(),
  typePraiseOrCriticism: z.string().nullable(),
  giveBy: z.string().nullable(),
  dateAccepted: z.string().nullable(),
});

const TeacherEducationSchema = z.object({
  id: z.number().optional(),
  culturalLevel: z.string().nullable(),
  skillName: z.string().nullable(),
  dateAccepted: z.string().nullable(),
});

const TeacherVocationalSchema = z.object({
  id: z.number().optional(),
  culturalLevel: z.string().nullable(),
  skillOne: z.string().nullable(),
  skillTwo: z.string().nullable(),
  trainingSystem: z.string().nullable(),
  dateAccepted: z.string().nullable(),
});

const TeacherShortCourseSchema = z.object({
  id: z.number().optional(),
  skill: z.string().nullable(),
  skillName: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  duration: z.string().nullable(),
  preparedBy: z.string().nullable(),
  supportBy: z.string().nullable(),
});

const TeacherLanguageSchema = z.object({
  id: z.number().optional(),
  language: z.string().nullable(),
  reading: z.string().nullable(),
  writing: z.string().nullable(),
  speaking: z.string().nullable(),
});

const TeacherFamilySchema = z.object({
  id: z.number().optional(),
  nameChild: z.string().nullable(),
  gender: z.string().nullable(),
  dateOfBirth: z.string().nullable(),
  working: z.string().nullable(),
});

// Main AddStaffModel schema
export const StaffModelSchema = z.object({
  // Required fields (based on common requirements for staff registration)
  username: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email(),
  roles: z.array(z.string()).default([]),

  // Personal information
  khmerFirstName: z.string(),
  khmerLastName: z.string(),
  englishFirstName: z.string(),
  englishLastName: z.string(),
  profileUrl: z.string(),

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
    .default([])
    .nullable(),
  teacherExperiences: z.array(TeacherExperienceSchema).default([]).nullable(),
  teacherPraiseOrCriticisms: z
    .array(TeacherPraiseOrCriticismSchema)
    .default([])
    .nullable(),
  teacherEducations: z.array(TeacherEducationSchema).default([]).nullable(),
  teacherVocationals: z.array(TeacherVocationalSchema).default([]).nullable(),
  teacherShortCourses: z.array(TeacherShortCourseSchema).default([]).nullable(),
  teacherLanguages: z.array(TeacherLanguageSchema).default([]).nullable(),
  teacherFamilies: z.array(TeacherFamilySchema).default([]).nullable(),

  status: z.string(),
});

interface ZodObjectWithShape {
  shape: Record<string, z.ZodTypeAny>;
}

type NullableStringFields<T extends ZodObjectWithShape> = {
  [K in keyof T["shape"]]: T["shape"][K] extends z.ZodString
    ? z.ZodNullable<T["shape"][K]>
    : T["shape"][K];
};

export const makeNullableStringFields = (
  schema: ZodObjectWithShape
): z.ZodObject<NullableStringFields<typeof schema>> => {
  const shape = schema.shape;
  const newShape: Record<string, z.ZodTypeAny> = {};
  for (const key in shape) {
    const field = shape[key];
    if (field._def.typeName === "ZodString") {
      newShape[key] = (field as z.ZodString).nullable();
    } else {
      newShape[key] = field;
    }
  }
  return z.object(newShape) as z.ZodObject<NullableStringFields<typeof schema>>;
};

export const ZodStaffModelBase =
  makeNullableStringFields(StaffModelSchema).partial();

export type ZodStaffModelType = z.infer<typeof ZodStaffModelBase>;

// Base schema shared by both Add and Edit modes
const BaseStaffSchema = StaffModelSchema.pick({
  username: true,
  email: true,
  status: true,
  roles: true,
}).extend({
  fullname: z.string().min(3, "Fullname must be at least 3 characters").max(50),
});

// Unified schema for Add and Edit modes
export const StaffFormSchema = BaseStaffSchema.extend({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters")
    .optional(),
}).refine(
  (data) => {
    // If password is provided, confirmPassword must be provided and equal
    if (data.password || data.confirmPassword) {
      return data.password === data.confirmPassword;
    }
    // If no password provided, skip check
    return true;
  },
  {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  }
);

export type StaffFormData = z.infer<typeof StaffFormSchema> & {
  id?: number;
  selectedStaff?: StaffModel;
};
