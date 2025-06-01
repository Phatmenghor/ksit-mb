//Major
export const majors = [
  { value: "Computer Science", label: "វិទ្យាសាស្ត្រកុំព្យូទ័រ" },
  { value: "Food Technology", label: "បច្ចេកវិទ្យាអាហារ" },
  { value: "Crop Science", label: "វិទ្យាសាស្រ្តដំណាំ" },
  { value: "Electrical Technology", label: "បច្ចេកវិទ្យាអគ្គិសនី" },
  { value: "Animal Science", label: "វិទ្យាសាស្រ្តសត្វ" },
  {
    value: "Animal Science (General)",
    label: "វិទ្យាសាស្រ្តសត្វ​​ (អប់រំបច្ចេកទេស)",
  },
  { value: "Mechanical Technology", label: "បច្ចេកវិទ្យយានកម្ម" },
  { value: "Business Computer", label: "កុំព្យូទ័រសម្រាប់អាជីវកម្ម" },
  {
    value: "Business Technology and Innovation",
    label: "បច្ចេកវិទ្យា និងនវានុវត្តន៍ក្នុងអាជីវកម្ម",
  },
];

export const departments = [
  { label: "Computer Science", value: "Computer Science" },
  { label: "Food Technology", value: "Food Technology" },
  { label: "Animal Science", value: "Animal Science" },
  { label: "Plant Science", value: "Plant Science" },
  { label: "Electrical Technology", value: "Electrical Technology" },
  { label: "Mechanical Technology", value: "Mechanical Technology" },
  { label: "បច្ចេកវិទ្យាព័ត៌មាន", value: "បច្ចេកវិទ្យាព័ត៌មាន" },
  {
    label: "សេដ្ឋកិច្ច និងរដ្ឋបាលសាធារណៈ",
    value: "សេដ្ឋកិច្ច និងរដ្ឋបាលសាធារណៈ",
  },
  { label: "ទេសចរណ៍ និងអភិវឌ្ឍន៍", value: "ទេសចរណ៍ និងអភិវឌ្ឍន៍" },
  { label: "សាធារណការនិងសំណង់ស៊ីវិល", value: "សាធារណការនិងសំណង់ស៊ីវិល" },
  { label: "បច្ចេកវិទ្យាសំណង់", value: "បច្ចេកវិទ្យាសំណង់" },
  { label: "វិទ្យាសាស្ត្រកសិកម្ម", value: "វិទ្យាសាស្ត្រកសិកម្ម" },
  {
    label: "បច្ចេកវិទ្យាព័ត៌មានគ្រប់គ្រង",
    value: "បច្ចេកវិទ្យាព័ត៌មានគ្រប់គ្រង",
  },
  { label: "ហិរញ្ញវត្ថុ និងគណនេយ្យ", value: "ហិរញ្ញវត្ថុ និងគណនេយ្យ" },
];

export const degrees = [
  { value: "Bachelor's Degree", label: "Bachelor's Degree" },
  { value: "Associate Degree", label: "Associate's Degree" },
];

export const years = [
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
  { value: "2027", label: "2027" },
  { value: "2028", label: "2028" },
  { value: "2029", label: "2029" },
  { value: "2030", label: "2030" },
];

export const yearLevels = [
  { value: 1, label: "ឆ្នាំទី 1" },
  { value: 2, label: "ឆ្នាំទី 2" },
  { value: 3, label: "ឆ្នាំទី 3" },
  { value: 4, label: "ឆ្នាំទី 4" },
];

export enum StatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const status = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];

export enum RoleEnum {
  DEVELOPER = "DEVELOPER", // System developer with full access
  ADMIN = "ADMIN", // School administrator
  STAFF = "STAFF", // School staff (teachers, office staff)
  TEACHER = "TEACHER", // School staff (teachers, office staff)
  STUDENT = "STUDENT",
}

export enum SemesterEnum {
  SEMESTER_1 = "SEMESTER_1",
  SEMESTER_2 = "SEMESTER_2",
}
export enum SemesterEnumFilter {
  All_SEMESTER = "All_SEMESTER",
  SEMESTER_1 = "SEMESTER_1",
  SEMESTER_2 = "SEMESTER_2",
}
export enum DayEnum {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
  SUNDAY = "Sunday",
}

export enum SemesterType {
  PROGRESS = "PROGRESS",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
}

export enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum YearLevelEnum {
  FIRST_YEAR = "FIRST_YEAR",
  SECOND_YEAR = "SECOND_YEAR",
  THIRD_YEAR = "THIRD_YEAR",
  FOURTH_YEAR = "FOURTH_YEAR",
}

export enum DegreeEnum {
  BACHELOR = "BACHELOR",
  ASSOCIATE = "ASSOCIATE",
}

export const educationLevels = [
  { label: "បឋមសិក្សា", value: "PRIMARY_SCHOOL" },
  { label: "បឋមភូមិ	", value: "LOWER_SECONDARY_SCHOOL" },
  { label: "ទុតិយភូមិ", value: "UPPER_SECONDARY_SCHOOL" },
];

export interface DayType {
  displayName: string;
  name: string;
  id: number;
}

export const DAYS_OF_WEEK = [
  {
    displayName: "All",
    name: "ALL",
    id: 7,
  },
  {
    displayName: "Monday",
    name: "MONDAY",
    id: 1,
  },
  {
    displayName: "Tuesday",
    name: "TUESDAY",
    id: 2,
  },
  {
    displayName: "Wednesday",
    name: "WEDNESDAY",
    id: 3,
  },
  {
    displayName: "Thursday",
    name: "THURSDAY",
    id: 4,
  },
  {
    displayName: "Friday",
    name: "FRIDAY",
    id: 5,
  },
  {
    displayName: "Saturday",
    name: "SATURDAY",
    id: 6,
  },
  {
    displayName: "Sunday",
    name: "SUNDAY",
    id: 0,
  },
];

export enum Mode {
  VIEW = "VIEW",
  ADD = "ADD",
  EDIT = "EDIT",
}
