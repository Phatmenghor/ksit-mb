export interface AllPaginationStudentResponse {
  content: Student[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface Student {
  id: string;
  nameKh: string;
  nameEn: string;
  gender: string;
  dob: string;
  classCode: string;
}
