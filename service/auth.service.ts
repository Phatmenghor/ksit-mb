import { ApiResponse } from "./../model/index-model";
import { LoginRequest, LoginResponse } from "@/model/auth/auth.model";
import { axiosClient } from "@/utils/axios";
import { storeRoles } from "@/utils/local-storage/user-info/roles";
import { storeToken } from "@/utils/local-storage/user-info/token";
import { storeUserId } from "@/utils/local-storage/user-info/userId";
import { storeUsername } from "@/utils/local-storage/user-info/username";
import axios from "axios";

export const loginService = async (credentail: LoginRequest) => {
  try {
    const response = await axiosClient.post<ApiResponse<LoginResponse>>(
      "/v1/auth/login",
      credentail
    );

    const data = response.data.data;

    storeUserId(data.userId);
    storeToken(data.accessToken);
    storeRoles(data.roles);
    storeUsername(data.username);

    return data;
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
