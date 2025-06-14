import { AttendanceGenerateParamModel } from "@/model/schedule/attendance/attendance-filter";
import { AttendanceHistoryFilter } from "@/model/schedule/attendance/attendance-history";
import { UpdateAttendanceModel } from "@/model/schedule/attendance/update-attendance";
import { axiosClientWithAuth } from "@/utils/axios";
import { error } from "console";
import { any } from "zod";

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

export async function getAllAttedanceHistoryService (data: AttendanceHistoryFilter) {
  try {
    const response = await axiosClientWithAuth.post(`/v1/attendance/history`, data)
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching requests:", error);
    return null;
  }
}