import { z } from "zod";
import { makeNullableStringFields } from "../staff/schema";
import { GenderEnum, StatusEnum } from "@/constants/constant";

const StudentStudiesHistorySchema = z.object({
  id: z.number().optional(),
  typeStudies: z.string().nullable(),
  schoolName: z.string().nullable(),
  location: z.string().nullable(),
  fromYear: z.string().nullable(),
  endYear: z.string().nullable(),
  obtainedCertificate: z.string().nullable(),
  overallGrade: z.string().nullable(),
});

const StudentParentSchema = z.object({
  id: z.number().optional(),
  name: z.string().nullable(),
  age: z.string().nullable(),
  job: z.string().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  parentType: z.string().nullable(),
});

const StudentSiblingSchema = z.object({
  id: z.number().optional(),
  name: z.string().nullable(),
  gender: z.string().nullable(),
  dateOfBirth: z.string().nullable(),
  occupation: z.string().nullable(),
  phoneNumber: z.string().nullable(),
});

export const AddSingleStudentRequestSchema = z.object({
  password: z.string(),
  username: z.string(),
  email: z.string().email(),
  khmerFirstName: z.string(),
  khmerLastName: z.string(),
  englishFirstName: z.string(),
  englishLastName: z.string(),
  gender: z.string(),
  dateOfBirth: z.string(),
  profileUrl: z.string(),
  phoneNumber: z.string(),
  currentAddress: z.string(),
  nationality: z.string(),
  ethnicity: z.string(),
  placeOfBirth: z.string(),
  memberSiblings: z.string(),
  numberOfSiblings: z.string(),
  classId: z.number(),
  studentStudiesHistories: z
    .array(StudentStudiesHistorySchema)
    .default([])
    .nullable(),
  studentParents: z.array(StudentParentSchema).default([]).nullable(),
  studentSiblings: z.array(StudentSiblingSchema).default([]).nullable(),
  status: z.string(),
});

export const StudentFormDataSchema = makeNullableStringFields(
  AddSingleStudentRequestSchema
).partial();

export type StudentFormData = z.infer<typeof StudentFormDataSchema>;

const defaultStudentStudiesHistory = {
  id: undefined,
  typeStudies: "",
  schoolName: "",
  location: "",
  fromYear: "",
  endYear: "",
  obtainedCertificate: "",
  overallGrade: "",
};

const defaultStudentParent = {
  id: undefined,
  name: "",
  age: "",
  job: "",
  phone: "",
  address: "",
  parentType: "",
};

const defaultStudentSibling = {
  id: undefined,
  name: "",
  gender: "",
  dateOfBirth: "",
  occupation: "",
  phoneNumber: "",
};

export const initStudentFormData = {
  password: "",
  username: "",
  email: "",
  khmerFirstName: "",
  khmerLastName: "",
  englishFirstName: "",
  englishLastName: "",
  gender: "",
  dateOfBirth: "",
  phoneNumber: "",
  currentAddress: "",
  nationality: "",
  ethnicity: "",
  placeOfBirth: "",
  memberSiblings: "",
  numberOfSiblings: "",
  classId: 0, // or null, depends on your form usage
  studentStudiesHistories: [defaultStudentStudiesHistory], // start with one empty entry or empty array `[]`
  studentParents: [
    { ...defaultStudentParent, parentType: GenderEnum.MALE },
    { ...defaultStudentParent, parentType: GenderEnum.FEMALE },
  ],
  studentSiblings: [defaultStudentSibling], // empty initially, or [defaultStudentSibling] if you want one row
  status: StatusEnum.ACTIVE,
};
