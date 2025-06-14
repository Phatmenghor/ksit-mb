import { UpdateSemesterModel } from "@/model/master-data/semester/type-semester-model";
import { ScheduleFilterModel } from "@/model/schedule/schedule/schedule-filter";
import { CreateScheduleModel } from "@/model/schedules/type-schedule-model";
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

export async function getAllMyScheduleService(data: ScheduleFilterModel) {
  try {
    const response = await axiosClientWithAuth.post(
      `/v1/schedules/my-schedules`,
      data
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching all my schedule:", error);
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
export async function createScheduleService(data: CreateScheduleModel) {
  try {
    const response = await axiosClientWithAuth.post(`/v1/schedules`, data);
    return response.data.data;
  } catch (error: any) {
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error creating course:", error);
    throw error;
  }
}

export async function updateScheduleService(
  scheduleId: number,
  data: UpdateSemesterModel
) {
  try {
    const response = await axiosClientWithAuth.post(
      `/v1/schedules/updateById/${scheduleId}`,
      data
    );
    return response.data.data;
  } catch (error: any) {
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    console.error("Error updating schedule:", error);
    throw error;
  }
}

export async function DetailScheduleService(scheduleId: number) {
  try {
    const response = await axiosClientWithAuth.get(
      `/v1/schedules/${scheduleId}`
    );
    return response.data.data;
  } catch (error: any) {
    return null;
  }
}
export async function getScheduleByIdService(scheduleId: number) {
  try {
    const response = await axiosClientWithAuth.get(
      `/v1/schedules/${scheduleId}`
    );
    console.log("#", response.data.data);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching get schedule by id:", error);
    return null;
  }
}
