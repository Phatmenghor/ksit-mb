"use client";

import { sidebarRoutes } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState({
    masterData: false,
    users: false,
    students: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Render navigation items
  const renderNavItems = (isCollapsed = false) => (
    <nav className="flex flex-col gap-1">
      {sidebarRoutes.map((route) => {
        const isActive = route.href
          ? pathname === route.href
          : route.subroutes?.some((sub) => pathname === sub.href);

        if (route.subroutes) {
          const isOpen = route.section
            ? openSections[route.section as keyof typeof openSections]
            : false;

          return (
            <div key={route.title} className="w-full">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-gray-900 hover:bg-gray-100 rounded",
                  isActive && "bg-gray-100 font-medium"
                )}
                onClick={() =>
                  route.section &&
                  toggleSection(route.section as keyof typeof openSections)
                }
                aria-expanded={isOpen}
              >
                <div className="flex w-full items-center">
                  <route.icon className="h-5 w-5" />
                  {!isCollapsed && (
                    <>
                      <span className="ml-3">{route.title}</span>
                      <div className="ml-auto">
                        {isOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    </>
                  )}
                </div>
              </Button>

              {!isCollapsed && isOpen && (
                <div className="ml-6 mt-1 space-y-1">
                  {route.subroutes.map((subroute) => (
                    <Button
                      key={subroute.title}
                      variant="ghost"
                      asChild
                      className={cn(
                        "w-full justify-start text-gray-900 hover:bg-gray-100 pl-6 rounded",
                        pathname === subroute.href && "bg-gray-100 font-medium"
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
              "w-full justify-start text-gray-900 hover:bg-gray-100 rounded",
              pathname === route.href && "bg-gray-100 font-medium"
            )}
          >
            <Link
              href={route.href || "#"}
              className="flex items-center gap-3 px-3 py-2"
            >
              <route.icon className="h-5 w-5" />
              {!isCollapsed && <span>{route.title}</span>}
            </Link>
          </Button>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <div
        className={cn(
          "hidden md:flex h-full flex-col z-50 text-gray-900 transition-all duration-300",
          collapsed ? "w-40" : "w-64"
        )}
      >
        <div className="flex h-16 items-center bg-[#024D3E] justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div>
              <div className="rounded-full bg-white p-1">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Logo"
                  className="h-8 w-8"
                />
              </div>
            </div>
            <span className="font-bold text-white text-lg">Admin</span>
          </Link>
        </div>

        <ScrollArea className="flex-1 px-2 py-4">
          {renderNavItems(collapsed)}
        </ScrollArea>
      </div>
    </>
  );
}
