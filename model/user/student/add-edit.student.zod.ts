import { z } from "zod";
import { StatusEnum } from "@/constants/constant";
import { StudentByIdModel } from "./getById.student.model";
import { profile } from "console";

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

export const StudentFormSchema = z.object({
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
  nationality: z
    .string()
    .nullable()
    .transform((val) => val ?? ""),
  ethnicity: z
    .string()
    .nullable()
    .transform((val) => val ?? ""),
  placeOfBirth: z.string(),
  memberSiblings: z
    .string()
    .nullable()
    .transform((val) => val ?? ""),
  numberOfSiblings: z
    .string()
    .nullable()
    .transform((val) => val ?? ""),
  classId: z.number(),
  studentStudiesHistories: z
    .array(StudentStudiesHistorySchema)
    .default([])
    .nullable(),
  studentParents: z.array(StudentParentSchema).default([]).nullable(),
  studentSiblings: z.array(StudentSiblingSchema).default([]).nullable(),
  status: z.string(),
});

// Add
export const AddStudentSchema = StudentFormSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type AddStudentFormData = z.infer<typeof AddStudentSchema>;

// Edit
export const EditStudentSchema = StudentFormSchema.partial().extend({
  id: z.number(),
});
export type EditStudentFormData = z.infer<typeof EditStudentSchema>;

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
  profileUrl: "",
  ethnicity: "",
  placeOfBirth: "",
  memberSiblings: "",
  numberOfSiblings: "",
  classId: 0, // or null, depends on your form usage
  studentStudiesHistories: [defaultStudentStudiesHistory], // start with one empty entry or empty array `[]`
  studentParents: [],
  studentSiblings: [defaultStudentSibling], // empty initially, or [defaultStudentSibling] if you want one row
  status: StatusEnum.ACTIVE,
};
