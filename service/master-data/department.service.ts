import {
  AllDepartmentFilterModel,
  CreateDepartmentModel,
  UpdateDepartmentModel,
} from "@/model/master-data/department/type-department-model";
import { axiosClientWithAuth } from "@/utils/axios";

export async function getAllDepartmentService(data: AllDepartmentFilterModel) {
  try {
    const response = await axiosClientWithAuth.post(
      `/v1/departments/all`,
      data
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching all departments:", error);
    return null;
  }
}

export async function createDepartmentService(data: CreateDepartmentModel) {
  try {
    const response = await axiosClientWithAuth.post(`/v1/departments`, data);
    return response.data.data;
  } catch (error: any) {
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error creating department:", error);
    throw error;
  }
}

export async function updateDepartmentService(
  departmentId: number,
  data: UpdateDepartmentModel
) {
  try {
    const response = await axiosClientWithAuth.post(
      `/v1/departments/updateById/${departmentId}`,
      data
    );
    return response.data.data;
  } catch (error: any) {
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    console.error("Error updating department:", error);
    throw error;
  }
}
