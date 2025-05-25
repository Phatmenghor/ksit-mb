import { axiosClientWithAuth } from "@/utils/axios";
import {
  AddStaffModel,
  EditStaffModel,
  StaffListRequest,
} from "@/model/user/staff/staff.request.model";

// Base API endpoint for staff-related requests
const endpoint = "/v1/staff";

/**
 * Fetch all staff members with optional filters and pagination.
 * @param data - Request parameters such as search, status, roles, pagination.
 * @returns List of staff data wrapped inside the response.
 * @throws Error with message from API or logs error on failure.
 */
export async function getAllStaffService(data: StaffListRequest) {
  try {
    // POST request to fetch all staff matching the filters
    const response = await axiosClientWithAuth.post(`${endpoint}/all`, data);
    return response.data.data; // Return the actual staff list data
  } catch (error: any) {
    // Check if the error response contains a message, throw it as Error
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error get all staff:", error); // Log error for debugging
    throw error; // Re-throw the error for further handling
  }
}

/**
 * Fetch staff details by their unique ID.
 * @param id - Staff member's ID as a string.
 * @returns Staff detail data.
 * @throws Error with message from API or logs error on failure.
 */
export async function getStaffByIdService(id: string) {
  try {
    // GET request to fetch a staff by ID
    const response = await axiosClientWithAuth.get(`${endpoint}/${id}`);
    return response.data.data; // Return staff detail data
  } catch (error: any) {
    // Extract and throw API error message if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error get staff by id:", error);
    throw error;
  }
}

/**
 * Add a new staff member.
 * @param data - Staff data including username, password, and other details.
 * @returns Newly created staff data from API response.
 * @throws Error with message from API or logs error on failure.
 */
export async function addStaffService(data: AddStaffModel) {
  try {
    // POST request to register/add a new staff
    const response = await axiosClientWithAuth.post(
      `${endpoint}/register`,
      data
    );
    return response.data.data; // Return created staff data
  } catch (error: any) {
    // Extract error message from response and throw it
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error adding staff:", error);
    throw error;
  }
}

/**
 * Update an existing staff member's information.
 * @param staffId - The unique ID of the staff to update.
 * @param data - The updated staff data fields.
 * @returns Updated staff data from API response.
 * @throws Error with message from API or logs error on failure.
 */
export async function updateStaffService(
  staffId: number,
  data: EditStaffModel
) {
  try {
    // PUT request to update staff by ID
    const response = await axiosClientWithAuth.put(
      `${endpoint}/${staffId}`,
      data
    );
    return response.data.data; // Return updated staff data
  } catch (error: any) {
    // Handle and throw API error message if present
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error updating staff:", error);
    throw error;
  }
}
