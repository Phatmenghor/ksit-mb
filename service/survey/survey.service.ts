import { SurveyMainModel } from "@/model/survey/survey-main-model";
import { axiosClientWithAuth } from "@/utils/axios";

export async function getAllSurveySectionService() {
  try {
    const response = await axiosClientWithAuth.get("/v1/surveys/main");
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching survey sections:", error);
    return null;
  }
}

export async function updateSurveyService(data: SurveyMainModel) {
  try {
    const response = await axiosClientWithAuth.put(`/v1/surveys/main`, data);
    return response.data.data;
  } catch (error: any) {
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    console.error("Error updating survey:", error);
    throw error;
  }
}
