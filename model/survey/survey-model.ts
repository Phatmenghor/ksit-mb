// types/survey.ts

// ✅ RatingOptionDto
export interface RatingOptionDto {
  value: number; // integer
  label: string;
}

// ✅ SurveyQuestionResponseDto
export interface SurveyQuestionResponseDto {
  id: number; // integer ($int64)
  questionText: string;
  questionType: string; // could be enum later
  required: boolean;
  displayOrder: number; // integer ($int32)
  minRating: number; // integer ($int32)
  maxRating: number; // integer ($int32)
  leftLabel: string;
  rightLabel: string;
  ratingOptions: RatingOptionDto[];
}

// ✅ SurveySectionResponseDto
export interface SurveySectionResponseDto {
  id: number; // integer ($int64)
  title: string;
  description: string;
  displayOrder: number; // integer ($int32)
  questions: SurveyQuestionResponseDto[];
}

// ✅ ClassBasicInfoDto
export interface ClassBasicInfoDto {
  id: string;
  code: string;
  createdAt: string;
}

// ✅ UserBasicInfoDto
export interface UserBasicInfoDto {
  id: string;
  username: string;
  khmerFirstName: string;
  khmerLastName: string;
  englishFirstName: string;
  englishLastName: string;
  email: string;
  phoneNumber: string;
  identifyNumber: string;
  degree: string;
  dateOfBirth: string;
  gender: string;
  currentAddress: string;
  profileUrl: string;
  majorName: string;
  departmentName: string;
  userClass: ClassBasicInfoDto;
  createdAt: string;
}

// ✅ SurveyResponseDto
export interface SurveyResponseDto {
  id: string;
  title: string;
  description: string;
  status: string;
  createdBy: UserBasicInfoDto;
  sections: SurveySectionResponseDto[];
  createdAt: string;
}

// ✅ ApiResponseSurveyResponseDto
export interface ApiResponseSurveyResponseDto {
  status: string;
  message: string;
  data: SurveyResponseDto;
}
