import { AdminChangePassword } from "@/models/dashboard/user.model";
import { LoginRequest, LoginResponse } from "@/model/auth/auth.model";
import { ApiResponse } from "@/model/index-model";
import { axiosClient, axiosClientWithAuth } from "@/utils/axios";
import { storeRoles } from "@/utils/local-storage/user-info/roles";
import { storeToken } from "@/utils/local-storage/user-info/token";
import { storeUserId } from "@/utils/local-storage/user-info/userId";
import { storeUsername } from "@/utils/local-storage/user-info/username";
import axios from "axios";
import { ChangePasswordByAdminModel } from "@/model/user/staff/stuff.model";

const endpoint = "/v1/auth";
export const loginService = async (credentail: LoginRequest) => {
  try {
    const response = await axiosClient.post<ApiResponse<LoginResponse>>(
      `${endpoint}/login`,
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

export const AdminChangePasswordService = async (
  data: ChangePasswordByAdminModel
) => {
  try {
    const response = await axiosClientWithAuth.post(
      `${endpoint}/change-password-by-admin`,
      data
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Extract error message from backend if available
      const message =
        error.response?.data?.message ||
        "Change password failed. Please try again.";
      throw new Error(message);
    }

    // Unexpected (non-Axios) error
    throw new Error("An unexpected error occurred. Please try again.");
  }
};
