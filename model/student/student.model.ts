export interface GenerateMultipleStudent {
  classId: number;
  quantity: number;
  status: string;
}

export interface StudentResponse {
  id: number;
  username: string;
  identifyNumber: string;
  password: string;
  classCode: string;
  createdAt: string;
}
