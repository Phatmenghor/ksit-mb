export interface AllDepartmentFilterModel {
  search?: string;
  status?: string;
  pageNo?: number;
  pageSize?: number;
}

export interface CreateDepartmentModel {
  name: string;
  status: string;
}

export interface UpdateDepartmentModel {
  name?: string;
  status?: string;
}
