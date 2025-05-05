"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  Circle,
  Database,
  FileCheck,
  Home,
  Menu,
  Palette,
  ShieldCheck,
  Users,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState({
    masterData: true,
    users: false,
    students: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const routes = [
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

  return (
    <div
      className={cn(
        "flex h-screen flex-col bg-white text-gray-900 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-full bg-gray-200 p-1">
              <img
                src="/placeholder.svg?height=40&width=40"
                alt="Logo"
                className="h-8 w-8"
              />
            </div>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-900 hover:bg-gray-100"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="flex flex-col gap-1">
          {routes.map((route) => {
            const isActive = route.href
              ? pathname === route.href
              : pathname.startsWith(
                  `/${route.title
                    .toLowerCase()
                    .replace(/&/g, "")
                    .replace(/ /g, "-")}`
                );

            if (route.subroutes) {
              const isOpen = route.section
                ? openSections[route.section as keyof typeof openSections]
                : false;
              const isActiveSection = route.subroutes.some(
                (subroute) => pathname === subroute.href
              );

              return (
                <div key={route.title} className="w-full">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-gray-900 hover:bg-gray-100",
                      (isActiveSection || isActive) && "bg-gray-100 font-medium"
                    )}
                    onClick={() =>
                      route.section && toggleSection(route.section)
                    }
                  >
                    <div className="flex w-full items-center">
                      <route.icon className="h-5 w-5" />
                      {!collapsed && (
                        <>
                          <span className="ml-3">{route.title}</span>
                          {isOpen ? (
                            <ChevronDown className="ml-auto h-4 w-4" />
                          ) : (
                            <ChevronRight className="ml-auto h-4 w-4" />
                          )}
                        </>
                      )}
                    </div>
                  </Button>
                  {!collapsed && isOpen && (
                    <div className="mt-1 space-y-1">
                      {route.subroutes.map((subroute) => (
                        <Button
                          key={subroute.title}
                          variant="ghost"
                          asChild
                          className={cn(
                            "w-full justify-start pl-9 text-gray-900 hover:bg-gray-100",
                            pathname === subroute.href &&
                              "bg-gray-100 font-medium"
                          )}
                        >
                          <Link
                            href={subroute.href}
                            className="flex items-center gap-2"
                          >
                            <Circle className="h-2 w-2" />
                            <span>{subroute.title}</span>
                          </Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Button
                key={route.title}
                variant="ghost"
                asChild
                className={cn(
                  "justify-start text-gray-900 hover:bg-gray-100",
                  isActive && "bg-gray-100 font-medium"
                )}
              >
                <Link
                  href={route.href || "#"}
                  className="flex items-center gap-3 px-3 py-2"
                >
                  <route.icon className="h-5 w-5" />
                  {!collapsed && <span>{route.title}</span>}
                </Link>
              </Button>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
