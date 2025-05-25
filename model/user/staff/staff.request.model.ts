// Request parameters for fetching staff list with optional filters and pagination
export interface StaffListRequest {
  search?: string; // Search keyword for filtering staff by name, email, etc.
  status?: string; // Filter by staff status (e.g., active, inactive)
  roles?: string[]; // Filter by one or more roles
  departmentId?: number; // Filter by department ID
  pageNo?: number; // Page number for pagination
  pageSize?: number; // Number of items per page for pagination
}

// Base interface with optional fields representing staff properties used for add/edit operations
interface BaseStaffModel {
  email?: string;
  roles?: string[]; // List of role strings assigned to staff
  khmerFirstName?: string; // Khmer first name
  khmerLastName?: string; // Khmer last name
  englishFirstName?: string; // English first name
  englishLastName?: string; // English last name
  gender?: string; // Gender of the staff member
  dateOfBirth?: string; // Date of birth (ISO string)
  phoneNumber?: string; // Contact phone number
  currentAddress?: string; // Current residential address
  nationality?: string; // Nationality
  ethnicity?: string; // Ethnicity
  placeOfBirth?: string; // Birthplace
  profileUrl?: string; // URL to profile picture
  taughtEnglish?: string; // Info about teaching English
  threeLevelClass?: string; // Details about three-level class (if any)
  referenceNote?: string; // Additional notes or references
  technicalTeamLeader?: string; // Is this person a technical team leader?
  assistInTeaching?: string; // Role in assisting teaching
  serialNumber?: string; // Serial number or staff identifier
  twoLevelClass?: string; // Details about two-level class (if any)
  classResponsibility?: string; // Responsibility related to classes taught
  lastSalaryIncrementDate?: string; // Date of last salary increment
  teachAcrossSchools?: string; // Information on teaching across multiple schools
  overtimeHours?: string; // Overtime hours worked
  issuedDate?: string; // Date of some issued document or certificate
  suitableClass?: string; // Suitable class for the staff member
  bilingual?: string; // Bilingual capabilities
  academicYearTaught?: string; // Academic years during which staff taught
  workHistory?: string; // Work history summary
  staffId?: string; // Unique staff ID
  nationalId?: string; // National ID number
  startWorkDate?: string; // Date when staff started working
  currentPositionDate?: string; // Date when staff took current position
  employeeWork?: string; // Description of employee's work
  disability?: string; // Disability information if applicable
  payrollAccountNumber?: string; // Payroll bank account number
  cppMembershipNumber?: string; // CPP (social security) membership number
  province?: string; // Province of residence
  district?: string; // District of residence
  commune?: string; // Commune of residence
  village?: string; // Village of residence
  officeName?: string; // Name of the office where staff works
  currentPosition?: string; // Current job position
  decreeFinal?: string; // Final decree or official document number
  rankAndClass?: string; // Rank and class information
  maritalStatus?: string; // Marital status
  mustBe?: string; // Other mandatory info (context-dependent)
  affiliatedProfession?: string; // Profession affiliation details
  federationName?: string; // Name of affiliated federation
  affiliatedOrganization?: string; // Affiliated organization name
  federationEstablishmentDate?: string; // Date federation was established
  wivesSalary?: string; // Salary information of spouse
  // Arrays for related nested entities about staff professional background
  teachersProfessionalRanks?: TeachersProfessionalRank[];
  teacherExperiences?: TeacherExperience[];
  teacherPraiseOrCriticisms?: TeacherPraiseOrCriticism[];
  teacherEducations?: TeacherEducation[];
  teacherVocationals?: TeacherVocational[];
  teacherShortCourses?: TeacherShortCourse[];
  teacherLanguages?: TeacherLanguage[];
  teacherFamilies?: TeacherFamily[];
  status?: string; // Employment status (active/inactive/etc.)
}

// Nested interfaces representing various detailed info related to a staff member

interface TeachersProfessionalRank {
  id?: number;
  typeOfProfessionalRank?: string; // Type/category of professional rank
  description?: string; // Description or notes
  announcementNumber?: string; // Official announcement or decree number
  dateAccepted?: string; // Date when rank was accepted/granted
}

interface TeacherExperience {
  id?: number;
  continuousEmployment?: string; // Duration of continuous employment
  workPlace?: string; // Name of workplace
  startDate?: string; // Start date of experience
  endDate?: string; // End date of experience
}

interface TeacherPraiseOrCriticism {
  id?: number;
  typePraiseOrCriticism?: string; // Type: praise or criticism
  giveBy?: string; // Person who gave praise or criticism
  dateAccepted?: string; // Date when it was accepted/recorded
}

interface TeacherEducation {
  id?: number;
  culturalLevel?: string; // Educational level (e.g., Bachelor, Master)
  skillName?: string; // Name of skill/degree obtained
  dateAccepted?: string; // Date degree or skill was obtained
  country?: string; // Country where education was received
}

interface TeacherVocational {
  id?: number;
  culturalLevel?: string; // Vocational education level
  skillOne?: string; // Primary skill learned
  skillTwo?: string; // Secondary skill learned
  trainingSystem?: string; // Type of vocational training system
  dateAccepted?: string; // Date training was completed
}

interface TeacherShortCourse {
  id?: number;
  skill?: string; // Skill taught in the course
  skillName?: string; // Name of the course
  startDate?: string; // Course start date
  endDate?: string; // Course end date
  duration?: string; // Duration of the course
  preparedBy?: string; // Organizing body or preparer
  supportBy?: string; // Supporting organizations
}

interface TeacherLanguage {
  id?: number;
  language?: string; // Language name (e.g., English, Khmer)
  reading?: string; // Reading proficiency level
  writing?: string; // Writing proficiency level
  speaking?: string; // Speaking proficiency level
}

interface TeacherFamily {
  id?: number;
  nameChild?: string; // Name of child family member
  gender?: string; // Gender of family member
  dateOfBirth?: string; // DOB of family member
  working?: string; // Employment status of family member
}

// Interface to represent a staff member creation request
export interface AddStaffModel extends BaseStaffModel {
  password: string; // Password (required for new staff)
  username: string; // Username (required for new staff)
  departmentId?: number; // Department ID staff belongs to
  identifyNumber?: string; // Identification number (optional override)
}

// Interface to represent a staff member update request (all fields optional)
export interface EditStaffModel extends BaseStaffModel {}

// Interface for changing a staff member's password by an admin
export interface ChangePasswordByAdminModel {
  id: number; // Staff member's ID
  newPassword: string; // New password
  confirmNewPassword: string; // Confirmation of the new password
}

export const initialStaffValues: AddStaffModel = {
  email: "",
  roles: [""],
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
  profileUrl: "",
  taughtEnglish: "",
  threeLevelClass: "",
  referenceNote: "",
  technicalTeamLeader: "",
  assistInTeaching: "",
  serialNumber: "",
  twoLevelClass: "",
  classResponsibility: "",
  lastSalaryIncrementDate: "",
  teachAcrossSchools: "",
  overtimeHours: "",
  issuedDate: "",
  suitableClass: "",
  bilingual: "",
  academicYearTaught: "",
  workHistory: "",
  staffId: "",
  nationalId: "",
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
  maritalStatus: "",
  mustBe: "",
  affiliatedProfession: "",
  federationName: "",
  affiliatedOrganization: "",
  federationEstablishmentDate: "",
  wivesSalary: "",
  teachersProfessionalRanks: [
    {
      id: undefined,
      typeOfProfessionalRank: "",
      description: "",
      announcementNumber: "",
      dateAccepted: "",
    },
  ],
  teacherExperiences: [
    {
      id: undefined,
      continuousEmployment: "",
      workPlace: "",
      startDate: "",
      endDate: "",
    },
  ],
  teacherPraiseOrCriticisms: [
    {
      id: undefined,
      typePraiseOrCriticism: "",
      giveBy: "",
      dateAccepted: "",
    },
  ],
  teacherEducations: [
    {
      id: undefined,
      culturalLevel: "",
      skillName: "",
      dateAccepted: "",
      country: "",
    },
  ],
  teacherVocationals: [
    {
      id: undefined,
      culturalLevel: "",
      skillOne: "",
      skillTwo: "",
      trainingSystem: "",
      dateAccepted: "",
    },
  ],
  teacherShortCourses: [
    {
      id: undefined,
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
      id: undefined,
      language: "",
      reading: "",
      writing: "",
      speaking: "",
    },
  ],
  teacherFamilies: [
    {
      id: undefined,
      nameChild: "",
      gender: "",
      dateOfBirth: "",
      working: "",
    },
  ],
  status: "",
  password: "",
  username: "",
  departmentId: 0,
  identifyNumber: "",
};
