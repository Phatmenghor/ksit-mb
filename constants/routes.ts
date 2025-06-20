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
  ScrollText,
  FileQuestion,
  ListCheck,
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
    ADMIN_PROFILE: "/admin/profile",
    ADMIN_VIEW: (id: string) => `/admin/view/${id}`,
    EDIT_STAFF: (id: string) => `/staff-officer/edit/${id}`,
    VIEW_STAFF: (id: string) => `/staff-officer/view/${id}`,
    ADD_STAFF: "/staff-officer/add",
    STUFF_OFFICER: "/staff-officer",
    TEACHERS: "/teachers",
    ADD_TEACHER: "/teachers/add",
    EDIT_TEACHER: (id: string) => `/teachers/edit/${id}`,
    EDIT_TEACHER_PROFILE: "/profile/teacher/edit",
    EDIT_ADMIN_PROFILE: "/profile/admin/edit",
    VIEW_TEACHER: (id: string) => `/teachers/view/${id}`,
    SETTING_CHANGE_PASSWORD: "/change-password",
  },

  STUDENTS: {
    ADD_MULTIPLE: "/add-multiple",
    ADD_SINGLE: "/add-single",
    LIST: "/student-list",
    EDIT_STUDENT_PROFILE: "/profile/student/edit",
    VIEW: (id: string) => `/view/${id}`,
    EDIT_STUDENT: (id: string) => `/edit/${id}`,
  },

  MANAGE_SCHEDULE: {
    DEPARTMENT: "/manage-schedule/department",
    DEPARTMENT_CLASS: "/manage-schedule/class",
    UPDATE_SCHEDULE: "/manage-schedule/all-schedule/update",
    ROOT: "/schedule",
  },

  SCHEDULE: {
    DEPARTMENT: "/manage-schedule/department",
    ROOT: "/schedule",
  },

  ATTENDANCE: {
    CLASS_SCHEDULE: "/attendance/schedule",
    ATTENDANCE_CHECK: "/attendance/schedule/check",
    HISTORY_RECORD: "/attendance/history-records",
    STUDENT_RECORD: "/attendance/student-records",
    HISTORY_RECORD_DETAIL: (id: string) =>
      `/attendance/history-records/view/${id}`,
  },

  COURSES: {
    INDEX: "/courses",
    ADD: "/courses/add",
  },

  SCORES: {
    STUDENT_SCORE: "/student-score",
    SUBMITTED: "/submitted-list",
    SUBMITTED_DETAIL: (id: string) => `/submitted-list/${id}`,
    STUDENT_SCORE_DETAIL: (id: string) => `/student-score/edit/${id}`,
    SETTINGS: "/score-setting",
  },

  REQUESTS: "/requests",
  REQUEST_DETAIL: (id: string) => `/requests/${id}`,
  REQUEST_UPDATE: (id: string) => `/request/${id}`,

  SETTINGS: {
    THEME: "/settings/theme",
  },

  MY_CLASS: {
    CLASS: "/my-class",
    MY_SCHEDULE: "/my-schedule",
  },

  PERMISSIONS: "/permissions",
  PAYMENT: {
    ADD_NEW_PAYMENT: "/add-new",
    LIST: "/student-payment",
    VIEW_PAYMENT: (id: string) => `/view-payment/${id}`,
  },
  SURVEY: {
    RESULT_LIST: "/result-list",
    MANAGE_QA: "/manage-question",
  },
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
    title: "Attendance",
    icon: Users,
    section: "attendance",
    subroutes: [
      { title: "Class Schedule", href: ROUTE.ATTENDANCE.CLASS_SCHEDULE },
      { title: "History Records", href: ROUTE.ATTENDANCE.HISTORY_RECORD },
      { title: "Student Records", href: ROUTE.ATTENDANCE.STUDENT_RECORD },
    ],
  },
  {
    title: "Manage schedule",
    href: ROUTE.MANAGE_SCHEDULE.DEPARTMENT,
    icon: Calendar,
  },
  {
    title: "Student score",
    href: ROUTE.SCORES.STUDENT_SCORE,
    icon: Database,
  },
  {
    title: "Score submitted",
    section: "Score Submitted",
    icon: ListCheck,
    subroutes: [
      { title: "Submitted List", href: ROUTE.SCORES.SUBMITTED },
      { title: "Score Setting", href: ROUTE.SCORES.SETTINGS },
    ],
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
    title: "Payment",
    href: ROUTE.PAYMENT.LIST,
    icon: ScrollText,
  },
  {
    title: "Survey",
    icon: FileQuestion,
    section: "users",
    subroutes: [
      { title: "Result List", href: ROUTE.SURVEY.RESULT_LIST },
      { title: "Manage Q&As", href: ROUTE.SURVEY.MANAGE_QA },
    ],
  },
  {
    title: "Role&User permission",
    href: ROUTE.PERMISSIONS,
    icon: ShieldCheck,
  },
];
