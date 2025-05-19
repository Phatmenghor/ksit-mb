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
    console.error("Error uploading image:", error);
    return null;
  }
}
