import { ImageResponse } from "@/model/user/staff/stuff.model";
import { uploadProfileRequest } from "@/model/user/staff/Add.staff.model";
import { axiosClientWithAuth } from "@/utils/axios";

const endpoint = "/images";

export async function uploadProfileService(data: uploadProfileRequest) {
  try {
    const response = await axiosClientWithAuth.post<ImageResponse>(
      `${endpoint}`,
      data
    );
    return response.data;
  } catch (error: any) {
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error uploading image:", error);
    throw error;
  }
}
