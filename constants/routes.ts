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
  },

  USERS: {
    MEMBERS: "/members",
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
    href: "/",
    icon: Home,
  },
  {
    title: "Master data",
    icon: Database,
    section: "masterData",
    subroutes: [
      { title: "Manage class", href: "/manage-class" },
      { title: "Manage semester", href: "/manage-semester" },
      { title: "Manage major", href: "/manage-major" },
      { title: "Manage department", href: "/manage-department" },
      { title: "Manage room", href: "/manage-room" },
      { title: "Manage Course", href: "/courses" },
    ],
  },
  {
    title: "Users",
    icon: Users,
    section: "users",
    subroutes: [
      { title: "Members", href: "/members" },
      { title: "Teachers", href: "/teachers" },
    ],
  },
  {
    title: "Students",
    icon: Users,
    section: "students",
    subroutes: [
      { title: "Add multiple users", href: "/add-multiple" },
      { title: "Add single user", href: "/add-single" },
      { title: "Students list", href: "/list" },
      { title: "Dropout students", href: "/dropout" },
    ],
  },
  {
    title: "Manage schedule",
    href: "/manage-schedule",
    icon: Calendar,
  },
  {
    title: "Student score",
    href: "/student-score",
    icon: Database,
  },
  {
    title: "Score submitted",
    href: "/scores-submitted",
    icon: FileCheck,
  },
  {
    title: "Request",
    href: "/requests",
    icon: FileText,
  },
  {
    title: "Theme setting",
    href: "/settings/theme",
    icon: Palette,
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: Calendar,
  },
  {
    title: "Role&User permission",
    href: "/permissions",
    icon: ShieldCheck,
  },
];
