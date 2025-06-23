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
    <Card>
      <CardContent className="p-6 space-y-3">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink
                      className={index === 0 ? "" : ""}
                      href={item.href}
                    >
                      {item.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator className={index === 0 ? "" : ""} />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-start gap-4">
          {backHref ? (
            <Link href={backHref} className="focus:outline-none">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          ) : back ? (
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="focus:outline-none p-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          ) : null}
          <h3 className="text-xl font-bold">{title}</h3>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          {/* Search input */}
          {onSearchChange && (
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={searchPlaceholder}
                className="pl-8 w-full"
                value={searchValue}
                onChange={onSearchChange}
              />
            </div>
          )}

          {/* Right side */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
            {customSelect && customSelect}

            {customAddNewButton && customAddNewButton}

            {buttonText && buttonHref && (
              <Link href={buttonHref}>
                <Button className="bg-green-900 text-white hover:bg-green-950 flex gap-1 h-10">
                  {buttonIcon}
                  {buttonText}
                </Button>
              </Link>
            )}
            {buttonText && openModal && (
              <Button
                className="bg-green-900 text-white hover:bg-green-950 flex gap-1 h-10"
                onClick={openModal}
              >
                {buttonIcon}
                {buttonText}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
      {tabs && <div className="border-t px-6">{tabs}</div>}
    </Card>
  );
};
