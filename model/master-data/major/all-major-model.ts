export interface AllMajorModel {
  content: MajorModel[]
  pageNo: number
  pageSize: number
  totalElements: number
  totalPages: number
  last: boolean
}

export interface MajorModel {
  id: number
  code: string
  name: string
  departmentName: string
  status: string
}