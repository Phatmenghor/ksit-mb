import { SemesterEnum } from "@/constants/constant";

export interface AllSemesterModel {
  content: SemetsterModel[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface SemetsterModel {
  id?: number;
  semester: SemesterEnum;
  startDate: string;
  endDate: string;
  academyYear: number;
  status: string;
}
