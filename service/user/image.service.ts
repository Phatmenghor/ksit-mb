import { ImageResponse } from "@/model/user/stuff.model";
import { uploadProfileRequest } from "@/model/user/Add.staff.model";
import { axiosClientWithAuth } from "@/utils/axios";

const endpoint = "/images";

export async function uploadTeacherProfileService(data: uploadProfileRequest) {
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
