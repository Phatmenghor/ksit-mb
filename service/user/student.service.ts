import {
  AddStudentModel,
  EditStudentModel,
  GenerateMultipleStudent,
  RequestAllStudent,
} from "@/model/user/student/student.request.model";
import { axiosClientWithAuth } from "@/utils/axios";

// Base API endpoint for student-related requests
const endpoint = "/v1/students";

/**
 * Fetch all students with optional filters and pagination.
 * @param data - Request parameters such as search, status, roles, pagination.
 * @returns List of students data wrapped inside the response.
 * @throws Error with message from API or logs error on failure.
 */
export async function getAllStudentsService(data: RequestAllStudent) {
  try {
    // POST request to fetch all students matching the filters
    const response = await axiosClientWithAuth.post(`${endpoint}/all`, data);
    return response.data.data; // Return the actual student list data
  } catch (error: any) {
    // Check if the error response contains a message, throw it as Error
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error get all student:", error); // Log error for debugging
    throw error; // Re-throw the error for further handling
  }
}

/**
 * Fetch student details by their unique ID.
 * @param id - Student's ID as a string.
 * @returns Student detail data.
 * @throws Error with message from API or logs error on failure.
 */
export async function getStudentByIdService(id: string) {
  try {
    // GET request to fetch a student by ID
    const response = await axiosClientWithAuth.get(`${endpoint}/${id}`);
    return response.data.data; // Return student detail data
  } catch (error: any) {
    // Extract and throw API error message if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error get student by id:", error);
    throw error;
  }
}

/**
 * Generate multiple students in batch.
 * @param data - Batch data for generating multiple students.
 * @returns API response for the batch generation.
 * @throws Error with message from API or logs error on failure.
 */
export async function generateMultipleStudentService(
  data: GenerateMultipleStudent
) {
  try {
    // POST request to register multiple students in batch
    const response = await axiosClientWithAuth.post(
      `${endpoint}/register/batch`,
      data
    );
    return response.data; // Return full response data (may include metadata)
  } catch (error: any) {
    // Extract error message from response and throw it
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error generate multiple student:", error);
    throw error;
  }
}

/**
 * Add a new student.
 * @param data - Student data including personal and registration details.
 * @returns Newly created student data from API response.
 * @throws Error with message from API or logs error on failure.
 */
export async function addStudentService(data: AddStudentModel) {
  try {
    // POST request to register/add a new student
    const response = await axiosClientWithAuth.post(
      `${endpoint}/register`,
      data
    );
    return response.data.data; // Return created student data
  } catch (error: any) {
    // Extract error message from response and throw it
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error adding student:", error);
    throw error;
  }
}

/**
 * Update an existing student's information.
 * @param id - The unique ID of the student to update.
 * @param data - The updated student data fields.
 * @returns Updated student data from API response.
 * @throws Error with message from API or logs error on failure.
 */
export async function editStudentService(id: number, data: EditStudentModel) {
  try {
    // PUT request to update student by ID
    const response = await axiosClientWithAuth.put(`${endpoint}/${id}`, data);
    return response.data.data; // Return updated student data
  } catch (error: any) {
    // Handle and throw API error message if present
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error editing student:", error);
    throw error;
  }
}
