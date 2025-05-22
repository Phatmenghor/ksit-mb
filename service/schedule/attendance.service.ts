import { AttendanceGenerateParamModel } from "@/model/schedule/attendance/attendance-filter";
import { axiosClientWithAuth } from "@/utils/axios";

export async function getAllAttedanceGenerateService(
  data: AttendanceGenerateParamModel
) {
  try {
    const response = await axiosClientWithAuth.post(
      `/v1/attendance-sessions/generate`,
      data
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching all schedule:", error);
    return null;
  }
}
