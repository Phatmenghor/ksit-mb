import React from "react";
import { Separator } from "@/components/ui/separator";
import InfoGrid from "../../shared/UserPersonalHistory";
import { Card, CardContent } from "@/components/ui/card";
import { StaffRespondModel } from "@/model/user/staff/staff.respond.model";
import { formatValue } from "@/utils/map-helper/student";

interface TeacherProps {
  teacher: StaffRespondModel | null;
}
export default function TeacherProfessionalRank({ teacher }: TeacherProps) {
  const infoItems = [
    {
      label: "ឋាននន្តរស័ក្តិ និងថ្នាក់",
      value: formatValue(teacher?.rankAndClass),
    },
    {
      label: "យោង",
      value: formatValue(teacher?.referenceNote),
    },
    {
      label: "លេខរៀង",
      value: formatValue(teacher?.serialNumber),
    },
    {
      label: "ចុះថ្ងៃទី",
      value: formatValue(teacher?.issuedDate),
    },
    {
      label: "បង្រៀនភាសាអង់គ្លេស",
      value: formatValue(teacher?.taughtEnglish),
    },
    {
      label: "ប្រធានក្រុមបច្ចេកទេស",
      value: formatValue(teacher?.technicalTeamLeader),
    },
    {
      label: "ពីរថ្នាក់ណីរពេល",
      value: formatValue(teacher?.twoLevelClass),
    },
    {
      label: "បង្រៀនឆ្លងសាលា",
      value: formatValue(teacher?.teachAcrossSchools),
    },
    {
      label: "ថ្នាក់គួប",
      value: formatValue(teacher?.suitableClass),
    },
    {
      label: "ថ្ងៃខែឡើងការប្រាក់ចុងក្រោយ",
      value: formatValue(teacher?.lastSalaryIncrementDate),
    },
    {
      label: "បង្រៀននៅឆ្នាំសិក្សា",
      value: formatValue(teacher?.academicYearTaught),
    },
    {
      label: "ថ្នាក់គួបបីកម្រិត",
      value: formatValue(teacher?.threeLevelClass),
    },
    {
      label: "ជួយបង្រៀន",
      value: formatValue(teacher?.assistInTeaching),
    },
    {
      label: "ទទួលបន្ទុកថ្នាក់",
      value: formatValue(teacher?.classResponsibility),
    },
    {
      label: "ម៉ោងលើស",
      value: formatValue(teacher?.overtimeHours),
    },
    {
      label: "ពីរភាសា",
      value: formatValue(teacher?.bilingual),
    },
  ];

  return (
    <Card title="ឋានៈវិជ្ជាជីវៈគ្រូបង្រៀន">
      <CardContent className="p-5">
        <div className="mt-2">
          <div className="overflow-x-auto space-y-7">
            <table className="w-full text-sm border-none">
              <thead>
                <tr className="bg-black text-white text-left">
                  <th className="p-2 border">ប្រភេទឋានៈវិជ្ជាជីវៈ </th>
                  <th className="p-2 border">បរិយាយ</th>
                  <th className="p-2 border">ប្រកាសលេខ</th>
                  <th className="p-2 border">កាលបរិច្ឆេទទទួល</th>
                </tr>
              </thead>
              <tbody>
                {teacher?.teachersProfessionalRank.map((value, index) => {
                  return (
                    <tr key={value.id} className="border-t">
                      <td className="p-2 border">
                        {value?.typeOfProfessionalRank || "---"}
                      </td>
                      <td className="p-2 border">
                        {value?.description || "---"}
                      </td>
                      <td className="p-2 border">
                        {value.announcementNumber || "---"}
                      </td>
                      <td className="p-2 border">
                        {value?.dateAccepted || "---"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Separator />

            <div>
              <InfoGrid data={infoItems} columns={2} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
