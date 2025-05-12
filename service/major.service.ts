import { PaginationResponse } from "./../model/index-model";
import { MajorModel, MajorComboBoxRequest } from "@/model/major/major-model";
import { axiosClientWithAuth } from "@/utils/axios";
import axios from "axios";

export const getAllMajorService = async (request: MajorComboBoxRequest) => {
  try {
    const response = await axiosClientWithAuth.post<
      PaginationResponse<MajorModel>
    >("/v1/majors/all", request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Extract error message from backend if available
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      throw new Error(message);
    }

    // Unexpected (non-Axios) error
    throw new Error("An unexpected error occurred. Please try again.");
  }
};
