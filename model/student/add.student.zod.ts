import { z } from "zod";

const StudentStudiesHistorySchema = z.object({
  id: z.number().optional(),
  typeStudies: z.string(),
  schoolName: z.string(),
  location: z.string(),
  fromYear: z.string(),
  endYear: z.string(),
  obtainedCertificate: z.string(),
  overallGrade: z.string(),
});

const StudentParentSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  age: z.string(),
  job: z.string(),
  phone: z.string(),
  address: z.string(),
  parentType: z.string(),
});

const StudentSiblingSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  gender: z.string(),
  dateOfBirth: z.string(),
  occupation: z.string(),
  phoneNumber: z.string(),
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
  phoneNumber: z.string(),
  currentAddress: z.string(),
  nationality: z.string(),
  ethnicity: z.string(),
  placeOfBirth: z.string(),
  memberSiblings: z.string(),
  numberOfSiblings: z.string(),
  classId: z.number(),
  studentStudiesHistories: z.array(StudentStudiesHistorySchema).default([]),
  studentParents: z.array(StudentParentSchema).default([]),
  studentSiblings: z.array(StudentSiblingSchema).default([]),
  status: z.string(),
});

const AddSingleStudentSchema = AddSingleStudentRequestSchema.partial();

export type AddSingleStudentRequestType = z.infer<
  typeof AddSingleStudentSchema
>;

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

export const defaultAddSingleStudentRequest = {
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
    { ...defaultStudentParent, parentType: "FATHER" },
    { ...defaultStudentParent, parentType: "MOTHER" },
  ],
  studentSiblings: [], // empty initially, or [defaultStudentSibling] if you want one row
  status: "",
};
