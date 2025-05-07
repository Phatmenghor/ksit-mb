"use client";

import { useState, useEffect } from "react";
import { X, ChevronDown, ChevronUp, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarRoutes } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    masterData: false, // Default expanded section
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    // Prevent body scrolling when sidebar is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col h-screen w-70 overflow-hidden">
      <div
        className={`relative flex flex-col h-full bg-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-4">
            <Menu className="h-5 w-5 stroke-[2.5]" />
            <span className="font-semibold text-xl">Menu</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="stroke-[2.5]" />
          </Button>
        </div>

        <Separator className="mx-4 w-[calc(100%-2rem)] bg-gray-300" />

        {/* Scrollable content */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {sidebarRoutes.map((route) => {
              const isActive = route.href
                ? pathname === route.href
                : route.subroutes?.some((sub) => pathname === sub.href);

              const isOpen = route.section
                ? openSections[route.section]
                : false;

              return (
                <div key={route.title} className="mb-1">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-between text-gray-900 hover:bg-gray-100 rounded py-3",
                      isActive && "bg-gray-100 font-medium"
                    )}
                    onClick={() => {
                      if (route.subroutes) {
                        route.section && toggleSection(route.section);
                      } else if (route.href) {
                        onClose();
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <route.icon className="h-5 w-5" />
                      <span>{route.title}</span>
                    </div>
                    {route.subroutes && (
                      <div>
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    )}
                  </Button>

                  {route.subroutes && isOpen && (
                    <div className="ml-10 mt-1 space-y-1 border-l pl-2 border-gray-200">
                      {route.subroutes.map((subroute) => (
                        <Button
                          key={subroute.title}
                          variant="ghost"
                          asChild
                          className={cn(
                            "w-full justify-start text-gray-900 hover:bg-gray-100 rounded py-2",
                            pathname === subroute.href &&
                              "bg-gray-100 font-medium"
                          )}
                        >
                          <Link href={subroute.href} onClick={onClose}>
                            <span>{subroute.title}</span>
                          </Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
