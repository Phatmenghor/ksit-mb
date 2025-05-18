import {
  BookOpen,
  Calendar,
  Database,
  FileCheck,
  Home,
  FileText,
  ShieldCheck,
  Users,
  Palette,
} from "lucide-react";

export const ROUTE = {
  DASHBOARD: "/",
  AUTH: {
    LOGIN: "/login",
  },
  MASTER_DATA: {
    MANAGE_CLASS: "/manage-class",
    MANAGE_SEMESTER: "/manage-semester",
    MANAGE_MAJOR: "/manage-major",
    MANAGE_DEPARTMENT: "/manage-department",
    MANAGE_ROOM: "/manage-room",
    MANAGE_SUBJECT: "/manage-subject",
  },

  USERS: {
    ADMIN: "/admin",
    STUFF_OFFICER: "/stuff-officer",
    TEACHERS: "/teachers",
    ADD_TEACHER: "/teachers/add",
  },

  STUDENTS: {
    ADD_MULTIPLE: "/add-multiple",
    ADD_SINGLE: "/add-single",
    LIST: "/list",
    DROPOUT: "/dropout",
  },

  SCHEDULE: {
    MANAGE: "/schedule/manage",
    ROOT: "/schedule",
  },

  ATTENDANCE: {
    CLASS_SCHEDULE: "/attendance/class-schedule",
    HISTORY_RECORD: "/attendance/history-records",
  },

  COURSES: {
    INDEX: "/courses",
    ADD: "/courses/add",
  },

  SCORES: {
    STUDENT_SCORE: "/student-score",
    SUBMITTED: "/scores-submitted",
  },

  REQUESTS: "/requests",

  SETTINGS: {
    THEME: "/settings/theme",
  },

  PERMISSIONS: "/permissions",
};

export const sidebarRoutes = [
  {
    title: "Dashboard",
    href: ROUTE.DASHBOARD,
    icon: Home,
  },
  {
    title: "Master data",
    icon: Database,
    section: "masterData",
    subroutes: [
      { title: "Manage class", href: ROUTE.MASTER_DATA.MANAGE_CLASS },
      { title: "Manage semester", href: ROUTE.MASTER_DATA.MANAGE_SEMESTER },
      { title: "Manage major", href: ROUTE.MASTER_DATA.MANAGE_MAJOR },
      { title: "Manage department", href: ROUTE.MASTER_DATA.MANAGE_DEPARTMENT },
      { title: "Manage room", href: ROUTE.MASTER_DATA.MANAGE_ROOM },
      { title: "Manage Course", href: ROUTE.COURSES.INDEX },
      { title: "Manage Subject", href: "/manage-subject" },
    ],
  },
  {
    title: "Users",
    icon: Users,
    section: "users",
    subroutes: [
      { title: "Admin", href: ROUTE.USERS.ADMIN },
      { title: "Staff Officer", href: ROUTE.USERS.STUFF_OFFICER },
      { title: "Teachers", href: ROUTE.USERS.TEACHERS },
    ],
  },
  {
    title: "Students",
    icon: Users,
    section: "students",
    subroutes: [
      { title: "Add multiple users", href: ROUTE.STUDENTS.ADD_MULTIPLE },
      { title: "Add single user", href: ROUTE.STUDENTS.ADD_SINGLE },
      { title: "Students list", href: ROUTE.STUDENTS.LIST },
    ],
  },
  {
    title: "Manage schedule",
    href: ROUTE.SCHEDULE.MANAGE,
    icon: Calendar,
  },
  {
    title: "Attendance",
    icon: Users,
    section: "attendance",
    subroutes: [
      { title: "Class Schedule", href: ROUTE.ATTENDANCE.CLASS_SCHEDULE },
      { title: "History Records", href: ROUTE.ATTENDANCE.HISTORY_RECORD },
    ],
  },
  {
    title: "Student score",
    href: ROUTE.SCORES.STUDENT_SCORE,
    icon: Database,
  },
  {
    title: "Score submitted",
    href: ROUTE.SCORES.SUBMITTED,
    icon: FileCheck,
  },
  {
    title: "Request",
    href: ROUTE.REQUESTS,
    icon: FileText,
  },
  {
    title: "Theme setting",
    href: ROUTE.SETTINGS.THEME,
    icon: Palette,
  },
  {
    title: "Schedule",
    href: ROUTE.SCHEDULE.ROOT,
    icon: Calendar,
  },
  {
    title: "Role&User permission",
    href: ROUTE.PERMISSIONS,
    icon: ShieldCheck,
  },
];
