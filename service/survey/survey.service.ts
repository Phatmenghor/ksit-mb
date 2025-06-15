import { SurveyResponseDto, ApiResponseSurveyResponseDto } from "@/model/survey/survey-model";
import { axiosClientWithAuth } from "@/utils/axios";


export async function getAllSurveySectionService(): Promise<SurveyResponseDto | null> {
  try {
    const response = await axiosClientWithAuth.get<ApiResponseSurveyResponseDto>("/v1/surveys/main");
    console.log("Full request URL:", );
    console.log("Full response:", response);
    return response.data.data;
  } catch (error: any) {
    console.error("getAllSurveySectionService error:", error.message, error.code, error.config);
    return null;
  }
}
