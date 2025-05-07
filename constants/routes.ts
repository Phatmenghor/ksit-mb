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
  DASHBOARD: "/dashboard",
};

export const ROUTE_COURSES = {
  COURSES_ADD: "/courses/add",
};

export const ROUTE_DEPARTMENT = {
  COURSES_ADD: "/courses/add",
};

export const sidebarRoutes = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Master data",
    icon: Database,
    section: "masterData",
    subroutes: [
      { title: "Manage class", href: "/master-data/manage-class" },
      { title: "Manage semester", href: "/master-data/manage-semester" },
      { title: "Manage major", href: "/master-data/manage-major" },
      { title: "Manage department", href: "/master-data/manage-department" },
      { title: "Manage room", href: "/master-data/manage-room" },
    ],
  },
  {
    title: "Users",
    icon: Users,
    section: "users",
    subroutes: [
      { title: "Members", href: "/users/members" },
      { title: "Teachers", href: "/users/teachers" },
    ],
  },
  {
    title: "Students",
    icon: Users,
    section: "students",
    subroutes: [
      { title: "Add multiple users", href: "/students/add-multiple" },
      { title: "Add single user", href: "/students/add-single" },
      { title: "Students list", href: "/students/list" },
      { title: "Dropout students", href: "/students/dropout" },
    ],
  },
  {
    title: "Manage schedule",
    href: "/schedule/manage",
    icon: Calendar,
  },
  {
    title: "Courses",
    href: "/courses",
    icon: BookOpen,
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
