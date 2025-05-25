/**
 * Response model for fetching a student by their ID.
 * Contains status, message, and the detailed student data.
 */
export interface GetStudentByIdModel {
  status: string; // API response status, e.g., "success" or "error"
  message: string; // Additional message, e.g., error or success details
  data: StudentByIdModel; // Detailed student information
}

/**
 * Detailed model representing a student fetched by ID.
 * Includes personal info, class details, studies, parents, siblings, and timestamps.
 */
export interface StudentByIdModel {
  id: number; // Unique identifier for the student
  username: string; // Username used for login/authentication
  email: string; // Student's email address
  status: string; // Current status of the student (e.g., active, inactive)
  khmerFirstName: string; // First name in Khmer language
  khmerLastName: string; // Last name in Khmer language
  englishFirstName: string; // First name in English
  englishLastName: string; // Last name in English
  gender: string; // Gender of the student
  profileUrl: string; // URL to the student's profile picture
  dateOfBirth: string; // Date of birth (ISO string or formatted date)
  phoneNumber: string; // Contact phone number
  currentAddress: string; // Current residential address
  nationality: string; // Nationality of the student
  ethnicity: string; // Ethnicity of the student
  placeOfBirth: string; // Place where the student was born
  memberSiblings: string; // Description or count of siblings (optional)
  numberOfSiblings: string; // Number of siblings
  studentClass: StudentClass; // Detailed class info associated with the student
  studentStudiesHistory: StudentStudiesHistory[]; // Array of past studies history
  studentParent: StudentParent[]; // Array of parent/guardian information
  studentSibling: StudentSibling[]; // Array of siblings information
  createdAt: string; // Timestamp of student record creation
}

/**
 * Model representing the class a student belongs to.
 */
interface StudentClass {
  id: number; // Unique class ID
  code: string; // Class code identifier
  academyYear: number; // Academic year for the class
  degree: string; // Degree level (e.g., Bachelor, Master)
  yearLevel: string; // Year level within the degree (e.g., 1, 2, 3)
  status: string; // Status of the class (e.g., active, archived)
  major: Major; // Major or specialization for the class
  createdAt: string; // Timestamp of class record creation
}

/**
 * Model representing a major or specialization.
 */
interface Major {
  id: number; // Major ID
  code: string; // Code for the major
  name: string; // Major name
  status: string; // Status (e.g., active, inactive)
  department: Department; // Department to which this major belongs
  createdAt: string; // Creation timestamp
}

/**
 * Model representing a department within the academic institution.
 */
interface Department {
  id: number; // Department ID
  code: string; // Department code
  name: string; // Department name
  urlLogo: string; // URL to department logo/image
  status: string; // Status of the department
  createdAt: string; // Timestamp when department record was created
}

/**
 * Represents a historical study record for a student.
 */
interface StudentStudiesHistory {
  id: number; // Unique ID for the study history entry
  typeStudies: string; // Type of studies (e.g., High School, Bachelor)
  schoolName: string; // Name of the educational institution
  location: string; // Location of the school
  fromYear: string; // Starting year of study
  endYear: string; // Ending year of study
  obtainedCertificate: string; // Certificate or degree obtained
  overallGrade: string; // Overall grade or GPA
}

/**
 * Represents a parent or guardian of a student.
 */
interface StudentParent {
  id: number; // Unique ID for the parent record
  name: string; // Full name of the parent
  phone: string; // Contact phone number
  job: string; // Occupation/job title
  address: string; // Address of the parent/guardian
  age: string; // Age of the parent
  parentType: string; // Type of parent (e.g., father, mother, guardian)
}

/**
 * Represents a sibling of the student.
 */
interface StudentSibling {
  id: number; // Unique ID for the sibling record
  name: string; // Sibling's full name
  gender: string; // Gender
  dateOfBirth: string; // Date of birth
  occupation: string; // Current occupation
  phoneNumber: string; // Contact phone number
  address: string; // Sibling's address
}

/**
 * Simplified response model for some student-related API.
 */
export interface StudentResponse {
  id: number; // Student unique ID
  username: string; // Student's username
  identifyNumber: string; // Student's identification number (e.g., national ID)
  password: string; // Student's password (handle carefully!)
  classCode: string; // Code of the class student belongs to
  createdAt: string; // Timestamp of record creation
}
