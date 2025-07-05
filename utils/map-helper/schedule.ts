import { DAYS_OF_WEEK } from "@/constants/constant";
import { ScheduleModel } from "@/model/schedules/all-schedule-model";

type WeeklySchedule = {
  day: string;
  classes: {
    subjectCode: string;
    subject: string;
    credit: string;
    instructor: string;
    datetime: string;
    room: string;
  }[];
};

export function convertToWeeklySchedule(scheduleData: ScheduleModel[]): {
  classInfo: {
    class: string;
    semester: string;
    academicYear: string;
  };
  weeklySchedule: WeeklySchedule[];
} {
  const EMPTY_WEEKLY_SCHEDULE: WeeklySchedule[] = DAYS_OF_WEEK.filter(
    (day) => day.value !== "ALL"
  ).map((day) => ({
    day: day.label,
    classes: [],
  }));

  // Add special fallback for entries with no day
  EMPTY_WEEKLY_SCHEDULE.push({
    day: "---",
    classes: [],
  });

  if (!scheduleData || scheduleData.length === 0) {
    return {
      classInfo: {
        class: "---",
        semester: "---",
        academicYear: "---",
      },
      weeklySchedule: EMPTY_WEEKLY_SCHEDULE,
    };
  }

  const schedules: ScheduleModel[] = Array.isArray(scheduleData)
    ? scheduleData
    : [scheduleData];

  const firstSchedule = schedules[0];

  const classInfo = {
    class: firstSchedule?.classes?.code || "---",
    semester: firstSchedule?.semester?.semester || "---",
    academicYear: String(firstSchedule?.classes?.academyYear || "---"),
  };

  const weeklyMap: Record<string, WeeklySchedule["classes"]> = {};

  // Initialize known days + fallback
  DAYS_OF_WEEK.forEach((day) => {
    if (day.value !== "ALL") {
      weeklyMap[day.value] = [];
    }
  });
  weeklyMap["---"] = []; // fallback for missing/invalid days

  const getInstructorName = (teacher: any): string => {
    if (!teacher) return "---";

    const englishName = `${teacher.englishFirstName || ""} ${
      teacher.englishLastName || ""
    }`.trim();
    const khmerName = `${teacher.khmerFirstName || ""} ${
      teacher.khmerLastName || ""
    }`.trim();

    return englishName || khmerName || teacher.username || "---";
  };

  schedules.forEach((schedule) => {
    if (!schedule) return;

    const dayKey = schedule.day || "---"; // fallback if missing
    const instructorName = getInstructorName(schedule.teacher);

    const classItem = {
      subjectCode: schedule.course?.code || "---",
      subject: schedule.course?.nameKH || schedule.course?.nameEn || "---",
      credit: schedule.course?.credit
        ? `${schedule.course.credit}(${schedule.course.totalHour || 0})`
        : "---",
      instructor: instructorName,
      datetime: `${schedule.startTime || "---"} - ${schedule.endTime || "---"}`,
      room: schedule.room?.name || "---",
    };

    if (weeklyMap[dayKey]) {
      weeklyMap[dayKey].push(classItem);
    } else {
      weeklyMap["---"].push(classItem);
    }
  });

  const weeklySchedule: WeeklySchedule[] = DAYS_OF_WEEK.filter(
    (day) => day.value !== "ALL"
  ).map((day) => ({
    day: day.label,
    classes: weeklyMap[day.value] || [],
  }));

  // Always include fallback group at the end (if any)
  if (weeklyMap["---"].length > 0) {
    weeklySchedule.push({
      day: "---",
      classes: weeklyMap["---"],
    });
  }

  return { classInfo, weeklySchedule };
}
