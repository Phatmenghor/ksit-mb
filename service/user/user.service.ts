import { PaginationResponse } from "./../../model/index-model";
import { ApiResponse } from "@/model/index-model";
import { GetStaffByIdResponseModel } from "@/model/user/getById.staff.model";
import { StaffModel } from "@/model/user/stuff.model";
import { AddStaffModel, RequestAllStuff } from "@/model/user/Add.staff.model";
import { UpdateStaffRequest } from "@/model/user/update.Request.staff";
import { UpdateStaffResponse } from "@/model/user/update.Response.staff.model";
import { axiosClientWithAuth } from "@/utils/axios";

const endpoint = "/v1/staff";

export async function getAllStuffService(data: RequestAllStuff) {
  try {
    const response = await axiosClientWithAuth.post<
      ApiResponse<PaginationResponse<StaffModel>>
    >(`${endpoint}/all`, data);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching all stuff:", error);
    return null;
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
    console.error("Error fetching stuff by id:", error);
    return null;
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
    console.error("Error adding staff:", error);
    return null;
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
    console.error("Error updating staff:", error);
    return null;
  }
}
