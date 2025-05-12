export interface MajorModel {
  id: number;
  code: string;
  name: string;
  departmentName: string;
  status: string;
}
export interface MajorFormData {
  code: string;
  name: string;
  departmentId: number;
  status: string;
}

export interface MajorComboBoxRequest {
  search: string;
  status: string;
  departmentId?: number;
  pageNo: number;
  pageSize: number;
}
