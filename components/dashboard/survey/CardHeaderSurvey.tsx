"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface CardHeaderSurveyProps {
  breadcrumbs: BreadcrumbItemType[];
  title?: string;
  backHref?: string;
  buttonHref?: string;
  back?: boolean;
  customSelect?: React.ReactNode;
}

export const CardHeaderSurvey: React.FC<CardHeaderSurveyProps> = ({
  breadcrumbs,
  title,
  backHref,
  back,
  customSelect, // 👈 receive here
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
                      className={index === 0 ? "font-bold" : ""}
                      href={item.href}
                    >
                      {item.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator
                    className={index === 0 ? "font-bold" : ""}
                  />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-start gap-4">
          {backHref ? (
            <Link
              href={backHref}
              className="text-black hover:text-black focus:outline-none"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          ) : back ? (
            <button
              onClick={() => router.back()}
              className="text-black hover:text-black focus:outline-none"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : null}
          <h3 className="text-xl font-bold">{title}</h3>
        </div>

        {customSelect && customSelect}
      </CardContent>
    </Card>
  );
};
