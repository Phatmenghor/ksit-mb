/**
 * Represents the base data model for a Student.
 * All fields are optional to allow flexibility in partial updates or form initialization.
 */
export interface StudentBaseModel {
  email?: string; // Optional email address
  khmerFirstName?: string; // Student's first name in Khmer language
  khmerLastName?: string; // Student's last name in Khmer language
  englishFirstName?: string; // Student's first name in English
  englishLastName?: string; // Student's last name in English
  gender?: string; // Gender of the student
  profileUrl?: string; // URL to student's profile picture
  dateOfBirth?: string; // Date of birth (ISO format string)
  phoneNumber?: string; // Contact phone number
  currentAddress?: string; // Current residential address
  nationality?: string; // Nationality of the student
  ethnicity?: string; // Ethnic group
  placeOfBirth?: string; // Place of birth
  memberSiblings?: string; // Description or list of siblings (optional textual info)
  numberOfSiblings?: string; // Number of siblings as string (could be numeric)
  studentStudiesHistories?: StudentStudiesHistory[]; // Array of past study records
  studentParents?: StudentParent[]; // Array of parent/guardian info
  studentSiblings?: StudentSibling[]; // Array of sibling info
  status?: string; // Current status (e.g., active, graduated, inactive)
}

/**
 * Represents an individual record of a student's study history.
 * Used to track schools, duration, and grades/certificates obtained.
 */
interface StudentStudiesHistory {
  id?: number; // Unique identifier of the study record
  typeStudies?: string; // Type or level of study (e.g., Primary, Secondary)
  schoolName?: string; // Name of the institution/school
  location?: string; // Location/address of the school
  fromYear?: string; // Starting year of the study period (string for flexibility)
  endYear?: string; // Ending year of the study period
  obtainedCertificate?: string; // Certificate or qualification obtained
  overallGrade?: string; // Overall grade or GPA
}

/**
 * Represents a student's parent or guardian information.
 */
interface StudentParent {
  id?: number; // Unique identifier for the parent record
  name?: string; // Parent's full name
  phone?: string; // Contact phone number
  job?: string; // Occupation/job title
  address?: string; // Residential address
  age?: string; // Age (string to allow non-numeric or unknown values)
  parentType?: string; // Relationship type (e.g., Father, Mother, Guardian)
}

/**
 * Represents a sibling of the student.
 */
interface StudentSibling {
  id?: number; // Unique identifier for sibling record
  name?: string; // Sibling's full name
  gender?: string; // Sibling's gender
  dateOfBirth?: string; // Sibling's date of birth (ISO string)
  occupation?: string; // Sibling's occupation/job title
  phoneNumber?: string; // Sibling's contact phone number
}

/**
 * Extends StudentBaseModel for adding new students.
 * Requires password, username, and classId.
 */
export interface AddStudentModel extends StudentBaseModel {
  classId?: number; // Required class ID the student belongs to
  password: string; // Required password for new student
  username: string; // Required username for new student
}

/**
 * Extends StudentBaseModel for editing existing student data.
 * All fields optional to allow partial updates.
 */
export interface EditStudentModel extends StudentBaseModel {}

/**
 * Request model to generate multiple students at once.
 * Includes class ID, number of students, and their status.
 */
export interface GenerateMultipleStudent {
  classId: number; // Target class ID
  quantity: number; // Number of students to generate
  status: string; // Status to assign to generated students
}

/**
 * Standardized response interface for fetching all students via API.
 */
export interface RequestAllStudentApi {
  status: string; // API response status (e.g., "success", "error")
  message: string; // Response message, possibly error or info
  data: RequestAllStudent; // Request parameters used for filtering/pagination
}

/**
 * Request parameters for fetching students.
 * All optional to allow flexible filtering and pagination.
 */
export interface RequestAllStudent {
  search?: string; // Search query string
  status?: string; // Filter by status
  classId?: number; // Filter by class ID
  academicYear?: number; // Filter by academic year
  pageNo?: number; // Page number for pagination (zero-based)
  pageSize?: number; // Number of items per page
}

/**
 * Paginated response model for a list of students.
 */
export interface AllStudentModel {
  content: StudentModel[]; // Array of student items for the current page
  pageNo: number; // Current page number (zero-based)
  pageSize: number; // Number of items per page
  totalElements: number; // Total number of student records available
  totalPages: number; // Total number of pages
  last: boolean; // Whether this is the last page
}

/**
 * Represents a student record returned by the API with key details.
 */
export interface StudentModel {
  id: number; // Unique student identifier
  username: string; // Student's username
  email: string; // Student's email address
  status: string; // Student status (active, graduated, etc.)
  khmerFirstName: string; // Khmer first name
  studentClass: StudentClass; // Associated class info
  khmerLastName: string; // Khmer last name
  englishFirstName: string; // English first name
  englishLastName: string; // English last name
  gender: string; // Gender
  dateOfBirth: string; // Date of birth
  phoneNumber: string; // Contact number
  createdAt: string; // Timestamp when student record was created
}

/**
 * Represents a class to which a student belongs.
 */
interface StudentClass {
  id: number; // Class unique ID
  code: string; // Class code or identifier
  academyYear: number; // Academic year for this class
  degree: string; // Degree program name
  yearLevel: string; // Year level (e.g., 1st year, 2nd year)
  status: string; // Status of the class (active/inactive)
  major: Major; // Associated major details
  createdAt: string; // Timestamp of class creation
}

/**
 * Represents a major within a department.
 */
interface Major {
  id: number; // Major ID
  code: string; // Major code
  name: string; // Major name
  status: string; // Status (active/inactive)
  department: Department; // Associated department info
  createdAt: string; // Timestamp of major creation
}

/**
 * Represents a department within the academic institution.
 */
interface Department {
  id: number; // Department ID
  code: string; // Department code
  name: string; // Department name
  urlLogo: string; // URL to department logo image
  status: string; // Department status (active/inactive)
  createdAt: string; // Timestamp of department creation
}

/**
 * Initial form data for a student.
 * Populates all fields with empty or default values including nested arrays.
 * Useful to initialize form state in UI.
 */
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
  profileUrl: "",
  memberSiblings: "",
  numberOfSiblings: "",
  classId: 0,
  studentStudiesHistories: [
    {
      id: undefined,
      typeStudies: "",
      schoolName: "",
      location: "",
      fromYear: "",
      endYear: "",
      obtainedCertificate: "",
      overallGrade: "",
    },
  ],
  studentParents: [
    {
      id: undefined,
      name: "",
      phone: "",
      job: "",
      address: "",
      age: "",
      parentType: "",
    },
  ],
  studentSiblings: [
    {
      id: undefined,
      name: "",
      gender: "",
      dateOfBirth: "",
      occupation: "",
      phoneNumber: "",
    },
  ],
  status: "",
};
