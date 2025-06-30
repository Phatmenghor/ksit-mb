"use client";
// components/CardHeaderSection.tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft, Ghost } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface CardHeaderSectionProps {
  breadcrumbs: BreadcrumbItemType[];
  title?: string;
  searchPlaceholder?: string;
  backHref?: string;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  customAddNewButton?: React.ReactNode;
  buttonHref?: string;
  back?: boolean;
  openModal?: () => void;
  customSelect?: React.ReactNode;
  tabs?: React.ReactNode;
}

export const CardHeaderSection: React.FC<CardHeaderSectionProps> = ({
  breadcrumbs,
  title,
  searchPlaceholder = "Search...",
  searchValue,
  customAddNewButton,
  onSearchChange,
  buttonText,
  buttonIcon,
  backHref,
  back,
  buttonHref,
  openModal,
  customSelect,
  tabs,
}) => {
  const router = useRouter();

  return (
    <div className="animate-in fade-in duration-600">
      <Card className="animate-in slide-in-from-top-4 duration-500 shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6 space-y-3">
          {/* Breadcrumb Section */}
          <Breadcrumb className="animate-in fade-in duration-400 delay-100">
            <BreadcrumbList>
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem
                    className="animate-in fade-in duration-300"
                    style={{
                      animationDelay: `${200 + index * 100}ms`,
                      animationFillMode: "backwards",
                    }}
                  >
                    {item.href ? (
                      <BreadcrumbLink
                        className="transition-all duration-300 hover:text-amber-600 hover:underline hover:underline-offset-4 hover:scale-105"
                        href={item.href}
                      >
                        {item.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="transition-colors duration-200">
                        {item.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator
                      className="animate-in fade-in duration-300"
                      style={{
                        animationDelay: `${250 + index * 100}ms`,
                        animationFillMode: "backwards",
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          {/* Title Section with Back Button */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-start gap-4 animate-in slide-in-from-left-3 duration-500 delay-300">
            {backHref ? (
              <Link
                href={backHref}
                className="focus:outline-none transition-all duration-200 hover:scale-110 hover:text-amber-600"
              >
                <ArrowLeft className="w-5 h-5 transition-transform duration-200" />
              </Link>
            ) : back ? (
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="focus:outline-none p-0 transition-all duration-200 hover:scale-110 hover:text-amber-600 hover:bg-transparent"
              >
                <ArrowLeft className="w-5 h-5 transition-transform duration-200" />
              </Button>
            ) : null}

            {title && (
              <h3 className="text-xl font-bold animate-in slide-in-from-left-4 duration-600 delay-400 transition-colors duration-200">
                {title}
              </h3>
            )}
          </div>

          {/* Search and Actions Section */}
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-in slide-in-from-bottom-4 duration-600 delay-500">
            {/* Search input */}
            {onSearchChange && (
              <div className="relative w-full md:flex-1 group animate-in fade-in duration-400 delay-600">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-all duration-300 group-focus-within:text-amber-500 group-focus-within:scale-110" />
                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  className="pl-8 w-full transition-all duration-300 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:shadow-lg focus:shadow-amber-100/50 hover:shadow-md hover:border-amber-300/50"
                  value={searchValue}
                  onChange={onSearchChange}
                />
              </div>
            )}

            {/* Right side actions */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto animate-in slide-in-from-right-3 duration-500 delay-700">
              {customSelect && (
                <div className="animate-in fade-in duration-300 delay-750 transition-all duration-200 hover:scale-105">
                  {customSelect}
                </div>
              )}

              {customAddNewButton && (
                <div className="animate-in fade-in duration-300 delay-800">
                  {customAddNewButton}
                </div>
              )}

              {buttonText && buttonHref && (
                <div className="animate-in slide-in-from-right-2 duration-400 delay-850">
                  <Link href={buttonHref}>
                    <Button className="bg-green-900 text-white hover:bg-green-950 flex gap-1 h-10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-900/25">
                      {buttonIcon && (
                        <span className="transition-transform duration-200 group-hover:scale-110">
                          {buttonIcon}
                        </span>
                      )}
                      {buttonText}
                    </Button>
                  </Link>
                </div>
              )}

              {buttonText && openModal && (
                <div className="animate-in slide-in-from-right-2 duration-400 delay-850">
                  <Button
                    className="bg-green-900 text-white hover:bg-green-950 flex gap-1 h-10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-900/25 group"
                    onClick={openModal}
                  >
                    {buttonIcon && (
                      <span className="transition-transform duration-200 group-hover:scale-110">
                        {buttonIcon}
                      </span>
                    )}
                    {buttonText}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        {/* Tabs Section */}
        {tabs && (
          <div className="border-t px-6 animate-in fade-in slide-in-from-bottom-2 duration-400 delay-900">
            {tabs}
          </div>
        )}
      </Card>
    </div>
  );
};
