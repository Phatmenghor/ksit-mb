import React from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScheduleModel } from "@/model/schedules/all-schedule-model";
import { convertToWeeklySchedule } from "@/utils/map-helper/schedule";

const ScheduleTeacherTable = ({
  scheduleList,
}: {
  scheduleList: ScheduleModel[];
}) => {
  const scheduleData = convertToWeeklySchedule(scheduleList);

  const TableHeader = () => (
    <thead>
      <tr className="bg-black text-white">
        <th className="px-4 py-3 text-left font-medium">Subject</th>
        <th className="px-4 py-3 text-left font-medium">Class</th>
        <th className="px-4 py-3 text-left font-medium">Datetime</th>
        <th className="px-4 py-3 text-left font-medium">Room</th>
      </tr>
    </thead>
  );

  const TableRow = ({ classInfo }: any) => (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3 text-gray-700">
        {classInfo.subjectCode || "---"}
      </td>
      <td className="px-4 py-3 text-gray-700">{classInfo.subject || "---"}</td>
      <td className="px-4 py-3 text-gray-700">{classInfo.datetime || "---"}</td>
      <td className="px-4 py-3 text-gray-700">{classInfo.room || "---"}</td>
    </tr>
  );

  return (
    <Card>
      <CardContent className="mx-auto p-6">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3 bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Schedule For teacher
            </h1>
            <p className="text-sm text-gray-600">
              Class: {scheduleData.classInfo?.class || "---"} | Semester:{" "}
              {scheduleData.classInfo?.semester || "---"} | Academic Year:{" "}
              {scheduleData.classInfo?.academicYear || "---"}
            </p>
          </div>
        </div>

        {/* Schedule Tables */}
        <div className="space-y-8">
          {scheduleData.weeklySchedule.map((daySchedule, index) => (
            <div key={index} className="bg-white">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {daySchedule.day}
              </h2>

              <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
                <table className="w-full">
                  <TableHeader />
                  <tbody className="bg-white">
                    {daySchedule.classes.length > 0 ? (
                      daySchedule.classes.map(
                        (classInfo: any, classIndex: number) => (
                          <TableRow key={classIndex} classInfo={classInfo} />
                        )
                      )
                    ) : (
                      <TableRow
                        classInfo={{
                          subjectCode: "---",
                          subject: "---",
                          credit: "---",
                          instructor: "---",
                          datetime: "---",
                          room: "---",
                        }}
                      />
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleTeacherTable;
