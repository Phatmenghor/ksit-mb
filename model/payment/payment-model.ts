export interface AllPaymentFilterModel {
  pageNo?: number;
  pageSize?: number;
  search?: string;
  type?: string;
  status?: string;
  userId?: number;
}

export interface AllPaymentModel {
  content: PaymentModel[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface PaymentModel {
  id: string;
  item: string;
  type: string;
  amount: string;
  percentage: string;
  date: string;
  status: string;
  commend: string;
  userId: string;
  createdAt: string;
}

export interface PaymentRequest {
  item: string;              // required
  type: string;         // required, use enum
  amount?: string;           // optional
  percentage?: string;       // optional
  date: string;              // required, format: $date (ISO string)
  status?: string;    // optional, use enum
  commend?: string;          // optional
  userId: number;            // required, integer
}