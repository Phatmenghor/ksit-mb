import React from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ScheduleTeacherTable = () => {
  const scheduleData = {
    classInfo: {
      class: "25401",
      semester: "1",
      academicYear: "2025",
    },
    weeklySchedule: [
      {
        day: "Monday",
        classes: [
          {
            subjectCode: "123412421",
            subject: "Name Subject",
            credit: "3(210)",
            instructor: "Name Instructor",
            datetime: "08:00:00 - 12:00:00",
            room: "Name Room",
          },
          {
            subjectCode: "123412421",
            subject: "Name Subject",
            credit: "3(210)",
            instructor: "Name Instructor",
            datetime: "08:00:00 - 12:00:00",
            room: "Name Room",
          },
        ],
      },
      {
        day: "Tuesday",
        classes: [
          {
            subjectCode: "123412421",
            subject: "Name Subject",
            credit: "3(210)",
            instructor: "Name Instructor",
            datetime: "08:00:00 - 12:00:00",
            room: "Name Room",
          },
        ],
      },
      {
        day: "Wednesday",
        classes: [
          {
            subjectCode: "123412421",
            subject: "Name Subject",
            credit: "3(210)",
            instructor: "Name Instructor",
            datetime: "08:00:00 - 12:00:00",
            room: "Name Room",
          },
        ],
      },
      {
        day: "Thursday",
        classes: [
          {
            subjectCode: "123412421",
            subject: "Name Subject",
            credit: "3(210)",
            instructor: "Name Instructor",
            datetime: "08:00:00 - 12:00:00",
            room: "Name Room",
          },
        ],
      },
      {
        day: "Friday",
        classes: [
          {
            subjectCode: "123412421",
            subject: "Name Subject",
            credit: "3(210)",
            instructor: "Name Instructor",
            datetime: "08:00:00 - 12:00:00",
            room: "Name Room",
          },
        ],
      },
      {
        day: "Saturday",
        classes: [
          {
            subjectCode: "123412421",
            subject: "Name Subject",
            credit: "3(210)",
            instructor: "Name Instructor",
            datetime: "08:00:00 - 12:00:00",
            room: "Name Room",
          },
        ],
      },
      {
        day: "Sunday",
        classes: [],
      },
    ],
  };

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
      <td className="px-4 py-3 text-gray-700">{classInfo.subjectCode}</td>
      <td className="px-4 py-3 text-gray-700">{classInfo.subject}</td>
      <td className="px-4 py-3 text-gray-700">{classInfo.datetime}</td>
      <td className="px-4 py-3 text-gray-700">{classInfo.room}</td>
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
              Class: {scheduleData.classInfo.class} | Semester:{" "}
              {scheduleData.classInfo.semester} | Academy year:{" "}
              {scheduleData.classInfo.academicYear}
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

              {daySchedule.classes.length > 0 ? (
                <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
                  <table className="w-full">
                    <TableHeader />
                    <tbody className="bg-white">
                      {daySchedule.classes.map((classInfo, classIndex) => (
                        <TableRow key={classIndex} classInfo={classInfo} />
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
                  <table className="w-full">
                    <TableHeader />
                    <tbody className="bg-white">
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-8 text-center text-gray-500"
                        >
                          Schedule no record
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleTeacherTable;
