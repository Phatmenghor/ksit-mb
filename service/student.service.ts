import { GetAllClassModel } from "./../model/class/class-model";
import { ApiResponse, PaginationResponse } from "@/model/index-model";
import { AllClassModel } from "@/model/master-data/class/all-class-model";
import {
  AllStudentModel,
  GenerateMultipleStudent,
  RequestAllStudent,
  StudentModel,
  StudentResponse,
} from "@/model/student/student.model";
import { axiosClient, axiosClientWithAuth } from "@/utils/axios";

const endpoint = "/v1/students";

export async function getAllStudentsService(data: RequestAllStudent) {
  try {
    const response = await axiosClientWithAuth.post<
      ApiResponse<AllStudentModel>
    >(`${endpoint}/all`, data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching all students:", error);
    return null;
  }
}

export async function generateMultipleStudentService(
  data: GenerateMultipleStudent
) {
  try {
    const response = await axiosClientWithAuth.post<
      ApiResponse<StudentResponse[]>
    >(`${endpoint}/register/batch`, data);
    return response.data;
  } catch (error) {
    console.error("Error add multiple students: ", error);
  }
}

export async function getAllClassService(data: GetAllClassModel) {
  try {
    const response = await axiosClientWithAuth.post<ApiResponse<AllClassModel>>(
      "/v1/classes/all",
      data
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching all classes", error);
  }
}
