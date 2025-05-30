import {
  RequestStudentScoreModel,
  UpdateScoreModel,
} from "@/model/student-score/student-score.request";
import { StudentScoreInitModel } from "@/model/student-score/student-score.response";
import { axiosClientWithAuth } from "@/utils/axios";

export async function intiStudentsScoreService(data: RequestStudentScoreModel) {
  try {
    const response = await axiosClientWithAuth.post<StudentScoreInitModel>(
      `/v1/score-sessions/initialize`,
      data
    );
    console.log("##API data: ", response.data.data);
    return response.data.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error init all student score:", error); // Log error for debugging
    throw error; // Re-throw the error for further handling
  }
}

export async function updateStudentsScoreService(data: UpdateScoreModel) {
  try {
    const response = await axiosClientWithAuth.put(
      `/v1/student-scores/update`,
      data
    );
    return response.data.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error update student score:", error); // Log error for debugging
    throw error; // Re-throw the error for further handling
  }
}
