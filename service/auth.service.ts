import { ApiResponse } from "./../model/index-model";
import { LoginRequest, LoginResponse } from "@/model/auth/auth.model";
import { axiosClient } from "@/utils/axios";
import { storeToken } from "@/utils/local-storage/token";
import axios from "axios";

export const loginService = async (credentail: LoginRequest) => {
  try {
    const response = await axiosClient.post<ApiResponse<LoginResponse>>(
      "/v1/auth/login",
      credentail
    );

    storeToken(response.data.data.accessToken);
    return response.data.data;
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
