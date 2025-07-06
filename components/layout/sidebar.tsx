"use client";

import { sidebarRoutes } from "@/constants/routes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const route = useRouter();

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

  const renderNavItems = (isCollapsed = false) => (
    <nav className="flex flex-col gap-1">
      {sidebarRoutes.map((route) => {
        const isActive = route.href ? pathname === route.href : false;

        if (route.subroutes) {
          const isOpen = route.section
            ? openSections[route.section as keyof typeof openSections]
            : false;

          return (
            <div key={route.title} className="w-full">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-gray-900 hover:bg-primary/10 hover:text-primary rounded",
                  isActive &&
                    "bg-primary/15 text-primary font-medium border-l-2 border-primary"
                )}
                onClick={() =>
                  route.section &&
                  toggleSection(route.section as keyof typeof openSections)
                }
                aria-expanded={isOpen}
              >
                <div className="flex w-full items-center">
                  <img
                    src={route.image}
                    alt={`${route.title} Icon`}
                    className="h-5 w-5"
                  />
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
                <div className="relative ml-6 mt-1 space-y-1">
                  {/* Vertical connecting line */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300"></div>

                  {route.subroutes.map((subroute, index) => (
                    <div key={subroute.title} className="relative">
                      {/* Horizontal connecting line */}
                      <div className="absolute left-0 top-1/2 w-4 h-px bg-gray-300"></div>

                      {/* Corner connector for last item - stops vertical line */}
                      {index === route.subroutes!.length - 1 && (
                        <div
                          className="absolute left-0 top-1/2 w-px bg-white"
                          style={{ height: "50%" }}
                        ></div>
                      )}

                      <Button
                        variant="ghost"
                        asChild
                        className={cn(
                          "w-full justify-start text-gray-900 hover:bg-primary/10 hover:text-primary pl-6 rounded",
                          pathname === subroute.href &&
                            "bg-primary/15 text-primary font-medium border-l-2 border-primary"
                        )}
                      >
                        <Link
                          href={{
                            pathname: subroute.href,
                            query: { from: "sidebar" },
                          }}
                          className="flex items-center gap-2"
                        >
                          <span>{subroute.title}</span>
                        </Link>
                      </Button>
                    </div>
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
              "w-full justify-start text-gray-900 hover:bg-primary/10 hover:text-primary rounded",
              pathname === route.href &&
                "bg-primary/15 text-primary font-medium border-l-2 border-primary"
            )}
          >
            <Link
              href={{
                pathname: route.href || "#",
                query: { from: "sidebar" },
              }}
              className="flex items-center gap-3 px-3 py-2"
            >
              <img
                src={route.image}
                alt={`${route.title} Icon`}
                className="h-5 w-5"
              />
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
          "hidden md:flex shadow-xl h-full flex-col z-50 text-gray-900 transition-all duration-300",
          collapsed ? "w-40" : "w-64"
        )}
      >
        <div className="flex h-16 items-center bg-primary justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-white text-lg">KSIT</span>
          </Link>
        </div>

        <ScrollArea className="flex-1 px-2 py-4">
          {renderNavItems(collapsed)}
        </ScrollArea>
      </div>
    </>
  );
}
