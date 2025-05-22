import { ScheduleFilterModel } from "@/model/schedule/schedule/schedule-filter";
import { axiosClientWithAuth } from "@/utils/axios";

export async function getAllScheduleService(data: ScheduleFilterModel) {
  try {
    const response = await axiosClientWithAuth.post(`/v1/schedules/all`, data);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching all schedule:", error);
    return null;
  }
}

export async function getDetailScheduleService(scheduleId: number) {
  try {
    const response = await axiosClientWithAuth.get(
      `/v1/schedules/${scheduleId}`
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching schedule detail:", error);
    return null;
  }
}
