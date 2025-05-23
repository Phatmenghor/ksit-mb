import React from "react";
import { Data } from "@/model/user/staff/getById.staff.model";
import { Separator } from "@/components/ui/separator";
import InfoGrid from "../../shared/UserPersonalHistory";
import { Card, CardContent } from "@/components/ui/card";

interface TeacherProps {
  teacher: Data | null;
}
export default function TeacherProfessionalRank({ teacher }: TeacherProps) {
  const infoItems = [
    {
      label: "ឋាននន្តរស័ក្តិ និងថ្នាក់",
      value: teacher?.rankAndClass,
    },
    {
      label: "យោង",
      value: teacher?.referenceNote, //missing
    },
    {
      label: "លេខរៀង",
      value: teacher?.serialNumber, //missing
    },
    {
      label: "ចុះថ្ងៃទី",
      value: teacher?.issuedDate, // missing
    },
    {
      label: "បង្រៀនភាសាអង់គ្លេស",
      value: teacher?.taughtEnglish, // missing
    },
    {
      label: "ប្រធានក្រុមបច្ចេកទេស",
      value: teacher?.technicalTeamLeader, // missing
    },
    {
      label: "ពីរថ្នាក់ណីរពេល",
      value: teacher?.twoLevelClass, // missing
    },
    {
      label: "បង្រៀនឆ្លងសាលា",
      value: teacher?.teachAcrossSchools, // missing
    },
    {
      label: "ថ្នាក់គួប",
      value: teacher?.suitableClass, // missing
    },
    {
      label: "ថ្ងៃខែឡើងការប្រាក់ចុងក្រោយ",
      value: teacher?.lastSalaryIncrementDate, // missing
    },
    {
      label: "បង្រៀននៅឆ្នាំសិក្សា",
      value: teacher?.academicYearTaught, // missing
    },
    {
      label: "ថ្នាក់គួបបីកម្រិត",
      value: teacher?.threeLevelClass, // missing
    },
    {
      label: "ជួយបង្រៀន",
      value: teacher?.assistInTeaching, // missing
    },
    {
      label: "ទទួលបន្ទុកថ្នាក់",
      value: teacher?.classResponsibility, // missing
    },
    {
      label: "ម៉ោងលើស",
      value: teacher?.overtimeHours, // missing
    },
    {
      label: "ពីរភាសា",
      value: teacher?.bilingual, // missing
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
