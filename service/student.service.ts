import { AllPaginationStudentResponse } from "../../model/student/student.model";
const students = [
  {
    id: "234012001",
    nameKh: "កៅ វិសាល",
    nameEn: "KAO VISAL",
    gender: "Male",
    dob: "2002-06-13",
    classCode: "234012",
  },
  {
    id: "234012002",
    nameKh: "ខន គីសរ",
    nameEn: "KHORN KISORL",
    gender: "Male",
    dob: "2005-06-20",
    classCode: "234012",
  },
  {
    id: "234012003",
    nameKh: "ខាន ភារម្យ",
    nameEn: "KHAN PHEARUM",
    gender: "Male",
    dob: "2005-06-17",
    classCode: "234012",
  },
  {
    id: "234012004",
    nameKh: "ឃឿន មេសា",
    nameEn: "KHOEURN MESA",
    gender: "Male",
    dob: "08-April-2005",
    classCode: "234012",
  },
  {
    id: "234012005",
    nameKh: "ចាន បូរចនាយ",
    nameEn: "CHHAN BUNCHAY",
    gender: "Male",
    dob: "19.Mar.2004",
    classCode: "234012",
  },
  {
    id: "234012006",
    nameKh: "ចាន ស្រីឡាក់",
    nameEn: "CHHORN SREYLAK",
    gender: "Female",
    dob: "2002-09-08",
    classCode: "234012",
  },
  {
    id: "234012007",
    nameKh: "ជា ឡុង",
    nameEn: "CHEA LONG",
    gender: "Female",
    dob: "01-Jan-2005",
    classCode: "234012",
  },
  {
    id: "234012008",
    nameKh: "ឈិម សុខហឿម",
    nameEn: "CHIM SOKKHIM",
    gender: "Female",
    dob: "2006-01-01",
    classCode: "234012",
  },
  {
    id: "234012009",
    nameKh: "ឈិម សេវី",
    nameEn: "CHIM SIEVI",
    gender: "Female",
    dob: "06-June-2005",
    classCode: "234012",
  },
  {
    id: "234012009",
    nameKh: "ឈិម សេវី",
    nameEn: "CHIM SIEVI",
    gender: "Female",
    dob: "06-June-2005",
    classCode: "234012",
  },
  {
    id: "234012009",
    nameKh: "ឈិម សេវី",
    nameEn: "CHIM SIEVI",
    gender: "Female",
    dob: "06-June-2005",
    classCode: "234012",
  },
  {
    id: "234012009",
    nameKh: "ឈិម សេវី",
    nameEn: "CHIM SIEVI",
    gender: "Female",
    dob: "06-June-2005",
    classCode: "234012",
  },
];

export async function getStudents(page: number, pageSize: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
  if (page < 1 || pageSize < 1) {
    throw new Error("Page and page size must be greater than 0");
  }
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedStudents = students.slice(start, end);
  const totalElements = students.length;
  const totalPages = Math.ceil(totalElements / pageSize);

  const response: AllPaginationStudentResponse = {
    content: paginatedStudents,
    pageNo: page,
    pageSize: pageSize,
    totalElements: totalElements,
    totalPages: totalPages,
    last: page === totalPages,
  };
  return response;
}
