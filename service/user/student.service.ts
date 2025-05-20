import { ApiResponse } from "@/model/index-model";
import {
  AddStudentData,
  EditStudentData,
  EditStudentFormData,
} from "@/model/user/student/add-edit.student.model";
import { GetStudentByIdModel } from "@/model/user/student/getById.student.model";
import {
  AllStudentModel,
  GenerateMultipleStudent,
  RequestAllStudent,
  StudentModel,
  StudentResponse,
} from "@/model/user/student/student.model";
import { axiosClientWithAuth } from "@/utils/axios";

const endpoint = "/v1/students";

export async function getAllStudentsService(data: RequestAllStudent) {
  try {
    const response = await axiosClientWithAuth.post<
      ApiResponse<AllStudentModel>
    >(`${endpoint}/all`, data);
    return response.data.data;
  } catch (error: any) {
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error get all student:", error);
    throw error;
  }
}

export async function getStudentByIdService(id: string) {
  try {
    const response = await axiosClientWithAuth.get<GetStudentByIdModel>(
      `${endpoint}/${id}`
    );
    return response.data.data;
  } catch (error: any) {
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error get student by id:", error);
    throw error;
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
  } catch (error: any) {
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error generate multiple student:", error);
    throw error;
  }
}

export async function addStudentService(data: AddStudentData) {
  try {
    const response = await axiosClientWithAuth.post<ApiResponse<StudentModel>>(
      `${endpoint}/register`,
      data
    );
    return response.data.data;
  } catch (error: any) {
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error adding student:", error);
    throw error;
  }
}

export async function editStudentService(data: EditStudentData) {
  try {
    const response = await axiosClientWithAuth.put<ApiResponse<StudentModel>>(
      `${endpoint}/${data.id}`,
      data
    );
    return response.data.data;
  } catch (error: any) {
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error editing student:", error);
    throw error;
  }
}
