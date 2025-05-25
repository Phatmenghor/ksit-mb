/**
 * API response structure when fetching a single staff record.
 */
export interface StaffRespondApi {
  status: string; // Response status (e.g., "success", "error")
  message: string; // Response message or error description
  data: StaffRespondModel; // The detailed staff data
}

/**
 * Detailed staff information returned from the API.
 * Includes personal info, job-related info, education, experience, and related collections.
 */
export interface StaffRespondModel {
  id: number; // Unique staff ID
  username: string; // Staff username for login/authentication
  email: string; // Staff email address
  roles: string[]; // List of roles assigned to the staff (e.g., admin, teacher)
  status: string; // Employment or account status
  khmerFirstName: string; // Khmer first name
  khmerLastName: string; // Khmer last name
  englishFirstName: string; // English first name
  englishLastName: string; // English last name
  gender: string; // Gender (e.g., Male, Female)
  dateOfBirth: string; // Date of birth (ISO string)
  phoneNumber: string; // Contact phone number
  currentAddress: string; // Current residential address
  nationality: string; // Nationality
  ethnicity: string; // Ethnicity
  placeOfBirth: string; // Place of birth
  identifyNumber: string; // ID card number or equivalent
  staffId: string; // Internal staff identifier
  nationalId: string; // National ID card number
  startWorkDate: string; // Date when staff started working
  currentPositionDate: string; // Date when current position was assigned
  employeeWork: string; // Description of the employee's work
  disability: string; // Disability status or description if any
  payrollAccountNumber: string; // Payroll bank account number
  cppMembershipNumber: string; // Membership number for CPP (pension/social security)
  province: string; // Province of residence or work
  district: string; // District of residence or work
  commune: string; // Commune of residence or work
  village: string; // Village of residence or work
  officeName: string; // Name of office or department
  currentPosition: string; // Current job title or position
  decreeFinal: string; // Reference to final decree or decision document
  rankAndClass: string; // Rank and class of the staff (government grading)
  department: Department; // Department details (see below)
  profileUrl: string; // URL to profile image or avatar
  taughtEnglish: string; // Indicates if taught English (yes/no or details)
  threeLevelClass: string; // Three level class details (teaching category)
  referenceNote: string; // Reference notes about the staff
  technicalTeamLeader: string; // Flag or description if staff is a team leader
  assistInTeaching: string; // Indicates if assists in teaching
  serialNumber: string; // Serial number for staff record
  twoLevelClass: string; // Two level class details (teaching category)
  classResponsibility: string; // Class(es) the staff is responsible for
  lastSalaryIncrementDate: string; // Date of last salary increment
  teachAcrossSchools: string; // Indicates if teaching across multiple schools
  overtimeHours: string; // Overtime hours worked
  issuedDate: string; // Date of issue of official documents
  suitableClass: string; // Suitable class for teaching
  bilingual: string; // Indicates bilingual skills (yes/no or languages)
  academicYearTaught: string; // Academic years taught
  workHistory: string; // Summary of work history
  maritalStatus: string; // Marital status
  mustBe: string; // Required qualifications or criteria
  affiliatedProfession: string; // Affiliated profession details
  federationName: string; // Name of affiliated federation or union
  affiliatedOrganization: string; // Affiliated organization name
  federationEstablishmentDate: string; // Date federation was established
  wivesSalary: string; // Salary info related to spouse (if applicable)
  teachersProfessionalRank: TeachersProfessionalRank[]; // List of professional ranks
  teacherExperience: TeacherExperience[]; // List of teacher’s work experience
  teacherPraiseOrCriticism: TeacherPraiseOrCriticism[]; // Records of praise or criticism
  teacherEducation: TeacherEducation[]; // Educational background
  teacherVocational: TeacherVocational[]; // Vocational training records
  teacherShortCourse: TeacherShortCourse[]; // Short courses attended
  teacherLanguage: TeacherLanguage[]; // Language skills
  teacherFamily: TeacherFamily[]; // Family details
  createdAt: string; // Record creation date
}

/**
 * Represents a department within the organization.
 */
interface Department {
  id: number; // Department ID
  code: string; // Department code (short identifier)
  name: string; // Department name
  urlLogo: string; // URL to the department's logo image
  status: string; // Status (active/inactive)
  createdAt: string; // Creation timestamp
}

/**
 * Professional rank details for a teacher.
 */
interface TeachersProfessionalRank {
  id: number; // Rank record ID
  typeOfProfessionalRank: string; // Type/category of rank
  description: string; // Description or notes
  announcementNumber: string; // Official announcement number or reference
  dateAccepted: string; // Date rank was accepted/granted
}

/**
 * Work experience details for a teacher.
 */
interface TeacherExperience {
  id: number; // Experience record ID
  continuousEmployment: string; // Description of employment period or continuity
  workPlace: string; // Employer or workplace name
  startDate: string; // Employment start date
  endDate: string; // Employment end date (or current if ongoing)
}

/**
 * Records of praise or criticism related to the teacher.
 */
interface TeacherPraiseOrCriticism {
  id: number; // Record ID
  typePraiseOrCriticism: string; // Either "Praise" or "Criticism"
  giveBy: string; // Name or entity who gave the praise/criticism
  dateAccepted: string; // Date when recorded or accepted
}

/**
 * Educational qualifications and achievements of the teacher.
 */
interface TeacherEducation {
  id: number; // Education record ID
  culturalLevel: string; // Level of education (e.g., Bachelor, Master)
  skillName: string; // Name of the skill or subject
  dateAccepted: string; // Date qualification was accepted/granted
  country: string; // Country where education was obtained
}

/**
 * Vocational training records.
 */
interface TeacherVocational {
  id: number; // Vocational training record ID
  culturalLevel: string; // Level or category of vocational training
  skillOne: string; // Primary skill acquired
  skillTwo: string; // Secondary skill acquired
  trainingSystem: string; // System or program of training
  dateAccepted: string; // Date training completed
}

/**
 * Short course records attended by the teacher.
 */
interface TeacherShortCourse {
  id: number; // Short course record ID
  skill: string; // Skill category of the course
  skillName: string; // Name of the course or skill
  startDate: string; // Course start date
  endDate: string; // Course end date
  duration: string; // Duration of the course
  preparedBy: string; // Organization or person who prepared the course
  supportBy: string; // Supporting organization/person
}

/**
 * Language proficiency of the teacher.
 */
interface TeacherLanguage {
  id: number; // Language record ID
  language: string; // Language name (e.g., English, Khmer)
  reading: string; // Reading proficiency level
  writing: string; // Writing proficiency level
  speaking: string; // Speaking proficiency level
}

/**
 * Family information related to the teacher.
 */
interface TeacherFamily {
  id: number; // Family record ID
  nameChild: string; // Name of child or family member
  gender: string; // Gender of family member
  dateOfBirth: string; // Date of birth of family member
  working: string; // Working status or occupation
}

/**
 * Pagination response for multiple staff records.
 */
export interface AllStaffModel {
  content: StaffModel[]; // Array of staff records on current page
  pageNo: number; // Current page number (zero-based)
  pageSize: number; // Number of records per page
  totalElements: number; // Total number of records available
  totalPages: number; // Total number of pages available
  last: boolean; // True if this is the last page
}

/**
 * Summary model for staff records used in lists.
 */
export interface StaffModel {
  id: number; // Staff unique ID
  username: string; // Staff username
  email: string; // Staff email
  roles: string[]; // Roles assigned to staff
  status: string; // Staff status
  department: Department; // Department info
  khmerFirstName: string; // Khmer first name
  profileUrl: string; // Profile picture URL
  khmerLastName: string; // Khmer last name
  englishFirstName: string; // English first name
  englishLastName: string; // English last name
  gender: string; // Gender
  dateOfBirth: string; // Date of birth
  phoneNumber: string; // Contact phone number
  identifyNumber: string; // ID number
  staffId: string; // Internal staff ID
  createdAt: string; // Creation date of the record
}

/**
 * Department interface reused in multiple places.
 * Declared again here to avoid duplication in your code,
 * consider defining this once and importing where needed.
 */
interface Department {
  id: number;
  code: string;
  name: string;
  urlLogo: string;
  status: string;
  createdAt: string;
}
