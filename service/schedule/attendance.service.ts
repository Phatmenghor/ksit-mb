import { AttendanceGenerateParamModel } from "@/model/schedule/attendance/attendance-filter";
import { UpdateAttendanceModel } from "@/model/schedule/attendance/update-attendance";
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

// update attendance session
export async function updateAttendanceSessionService(
  data: UpdateAttendanceModel
) {
  try {
    const response = await axiosClientWithAuth.put(
      `/v1/attendance/update`,
      data
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Error updating attendance session:", error);
    return null;
  }
}
