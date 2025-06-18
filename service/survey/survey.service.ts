import {
  SurveyResponseDto,
  ApiResponseSurveyResponseDto,
} from "@/model/survey/survey-model";
import { SurveyAnswerSubmitDto } from "@/model/survey/survey-submit-model";
import { axiosClientWithAuth } from "@/utils/axios";

export async function getAllSurveySectionService(): Promise<SurveyResponseDto | null> {
  try {
    const response =
      await axiosClientWithAuth.get<ApiResponseSurveyResponseDto>(
        "/v1/surveys/main"
      );
    console.log("Full request URL:");
    console.log("Full response:", response);
    return response.data.data;
  } catch (error: any) {
    console.error(
      "getAllSurveySectionService error:",
      error.message,
      error.code,
      error.config
    );
    return null;
  }
}


export async function submitAnswerService(
 payload: { sectionId: number; answers: SurveyResponseDto[] }) {
  try {
   // console.log("Submitting answer:", sect,scheduleId);

  
    const response = await axiosClientWithAuth.post(
      `/v1/surveys/schedule/${payload.sectionId}/submit`,
      payload
    );

    return response.data.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error submitting answer:", error);
    throw error;
  }
}
