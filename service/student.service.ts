import { GetAllClassModel } from "./../model/class/class-model";
import { ApiResponse } from "@/model/index-model";
import { AllClassModel } from "@/model/master-data/class/all-class-model";
import {
  GenerateMultipleStudent,
  StudentResponse,
} from "@/model/student/student.model";
import { axiosClient, axiosClientWithAuth } from "@/utils/axios";

const endpoint = "/v1/students";
// export async function getStudents(page: number, pageSize: number) {
//   await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
//   if (page < 1 || pageSize < 1) {
//     throw new Error("Page and page size must be greater than 0");
//   }
//   const start = (page - 1) * pageSize;
//   const end = start + pageSize;
//   const paginatedStudents = students.slice(start, end);
//   const totalElements = students.length;
//   const totalPages = Math.ceil(totalElements / pageSize);

//   const response: AllPaginationStudentResponse = {
//     content: paginatedStudents,
//     pageNo: page,
//     pageSize: pageSize,
//     totalElements: totalElements,
//     totalPages: totalPages,
//     last: page === totalPages,
//   };
//   return response;
// }

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
