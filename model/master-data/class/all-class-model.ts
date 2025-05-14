import { MajorModel } from "../major/all-major-model";

export interface AllClassModel {
  content: ClassModel[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface ClassModel {
  id: number;
  code: string;
  academyYear: number;
  degree: string;
  yearLevel: string;
  status: string;
  major: MajorModel;
  createdAt: string;
}
