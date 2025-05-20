import { PaginationResponse } from "./../../model/index-model";
import { ApiResponse } from "@/model/index-model";
import { GetStaffByIdResponseModel } from "@/model/user/staff/getById.staff.model";
import { StaffModel } from "@/model/user/staff/stuff.model";
import {
  AddStaffModel,
  RequestAllStuff,
} from "@/model/user/staff/Add.staff.model";
import { UpdateStaffRequest } from "@/model/user/staff/update.Request.staff";
import { UpdateStaffResponse } from "@/model/user/staff/update.Response.staff.model";
import { axiosClientWithAuth } from "@/utils/axios";

const endpoint = "/v1/staff";

export async function getAllStuffService(data: RequestAllStuff) {
  try {
    const response = await axiosClientWithAuth.post<
      ApiResponse<PaginationResponse<StaffModel>>
    >(`${endpoint}/all`, data);
    return response.data.data;
  } catch (error: any) {
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error get all staff:", error);
    throw error;
  }
}

export async function getStuffByIdService(id: string) {
  try {
    console.log("🔍 Sending GET request to /api/staff/", id);

    const response = await axiosClientWithAuth.get<GetStaffByIdResponseModel>(
      `${endpoint}/${id}`
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error: any) {
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error get staff by id:", error);
    throw error;
  }
}

export async function addStaffService(data: Partial<AddStaffModel>) {
  try {
    const response = await axiosClientWithAuth.post<ApiResponse<AddStaffModel>>(
      `${endpoint}/register`,
      data
    );
    return response.data.data;
  } catch (error: any) {
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error adding staff:", error);
    throw error;
  }
}

export async function updateStaffService(
  staffId: number,
  data: Partial<UpdateStaffRequest>
) {
  try {
    const response = await axiosClientWithAuth.put<UpdateStaffResponse>(
      `${endpoint}/${staffId}`,
      data
    );
    return response.data.data;
  } catch (error: any) {
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error updating staff:", error);
    throw error;
  }
}
