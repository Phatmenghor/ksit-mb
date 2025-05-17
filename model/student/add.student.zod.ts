import { z } from "zod";

const StudentStudiesHistorySchema = z.object({
  id: z.number().optional(),
  typeStudies: z.string().optional(),
  schoolName: z.string().optional(),
  location: z.string().optional(),
  fromYear: z.string().optional(),
  endYear: z.string().optional(),
  obtainedCertificate: z.string().optional(),
  overallGrade: z.string().optional(),
});

const StudentParentSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  age: z.string().optional(),
  job: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  parentType: z.string().optional(),
});

const StudentSiblingSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
  occupation: z.string().optional(),
});

export const AddSingleStudentRequestSchema = z.object({
  password: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  khmerFirstName: z.string().optional(),
  khmerLastName: z.string().optional(),
  englishFirstName: z.string().optional(),
  englishLastName: z.string().optional(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
  phoneNumber: z.string().optional(),
  currentAddress: z.string().optional(),
  nationality: z.string().optional(),
  ethnicity: z.string().optional(),
  placeOfBirth: z.string().optional(),
  memberSiblings: z.string().optional(),
  numberOfSiblings: z.string().optional(),
  classId: z.number().optional(),
  studentStudiesHistories: z.array(StudentStudiesHistorySchema).optional(),
  studentParents: z.array(StudentParentSchema).optional(),
  studentSiblings: z.array(StudentSiblingSchema).optional(),
  status: z.string().optional(),
});

export type AddSingleStudentRequestType = z.infer<
  typeof AddSingleStudentRequestSchema
>;
