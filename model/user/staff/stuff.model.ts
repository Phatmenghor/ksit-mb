export interface AllStaffModel {
  content: StaffModel[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
export interface StaffModel {
  id: number;
  username: string;
  email: string;
  roles: string[];
  status: string;
  department: Department;
  khmerFirstName: string;
  khmerLastName: string;
  englishFirstName: string;
  englishLastName: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  identifyNumber: string;
  staffId: string;
  createdAt: string;
}

export interface Department {
  id: number;
  code: string;
  name: string;
  urlLogo: string;
  status: string;
  createdAt: string;
}

export interface ImageResponse {
  id: string;
  imageUrl: string;
  type: string;
}

export interface ChangePasswordByAdminModel {
  id: number;
  newPassword: string;
  confirmNewPassword: string;
}
