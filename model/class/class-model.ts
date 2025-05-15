export interface ClassFormData {
  id?: number;
  classCode: string;
  major: string;
  degree: string;
  yearLevel: string;
  academicYear: string;
}

export interface GetAllClassModel {
  search: string;
  academyYear?: number;
  majorId?: number;
  status: string;
  pageNo: number;
  pageSize: number;
}
