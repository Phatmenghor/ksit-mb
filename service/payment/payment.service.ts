import { AllPaymentFilterModel } from "@/model/payment/payment-model";
import { axiosClientWithAuth } from "@/utils/axios";
const filterDto = {
  pageNo: 1,
  pageSize: 10,
  search: '',
  type: 'FREE',
  status: 'ACTIVE',
  userId: 10,
};
export async function getAllPaymentService(data: AllPaymentFilterModel) {
  try {
    const response = await axiosClientWithAuth.post(
      "/v1/payments/all",
      {}, // This is the request body (empty in your case)
      {
        params: {
         filterDto: JSON.stringify(filterDto),
        },
      }
    );

    console.log("this payment >>", response);
    return response.data.data;
  } catch (error: any) {
    console.error("AllPaymentService error:", error);
    return null;
  }
}

