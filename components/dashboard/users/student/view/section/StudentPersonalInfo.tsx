// components/student/StudentPersonalInfo.tsx
import CollapsibleCard from "@/components/shared/collapsibleCard";
import { StudentByIdModel } from "@/model/user/student/getById.student.model";
import InfoGrid from "../../../shared/UserPersonalHistory";

interface StudentProfileProps {
  student: StudentByIdModel | null;
}

export default function StudentPersonalInfo({ student }: StudentProfileProps) {
  const infoItems = [
    {
      label: "គោត្តនាម និងនាម",
      value: `${student?.khmerFirstName ?? ""} ${student?.khmerLastName ?? ""}`,
    },
    {
      label: "អក្សរឡាតាំង",
      value: `${student?.englishFirstName ?? ""} ${
        student?.englishLastName ?? ""
      }`,
    },
    {
      label: "អត្តលេខនិស្សិត",
      value: student?.id,
    },
    { label: "ភេទ", value: student?.gender },
    { label: "ថ្ងៃខែឆ្នាំកំណើត", value: student?.dateOfBirth },
    { label: "ជនជាតិ", value: student?.ethnicity },
    { label: "សញ្ជាតិ", value: student?.nationality },
    { label: "កម្រឺតសិក្សា", value: student?.studentClass?.degree },
    {
      label: "ដេប៉ាតឺម៉ង",
      value: student?.studentClass?.major?.department?.name ?? "",
    },
    {
      label: "ជំនាញសិក្សា",
      value: student?.studentClass?.major?.name ?? "",
    },
    { label: "លេខទូរស័ព្ទ", value: student?.phoneNumber },
    { label: "អ៊ីមែល", value: student?.email },
    { label: "ទីកន្លែងកំណើត", value: student?.placeOfBirth },
    { label: "អាសយដ្ឋានបច្ចុប្បន្ន", value: student?.currentAddress },
  ];

  return (
    <CollapsibleCard title="ព័ត៍មានទាក់ទងនឹងគ្រួសារសិស្ស">
      <InfoGrid data={infoItems} columns={2} />
    </CollapsibleCard>
  );
}
