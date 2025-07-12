"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Permissions from "@/components/dashboard/Role&Permission/RolePermission";
import { useIsMobile } from "@/hooks/use-mobile";

export default function PermissionsPage() {
  const isMobile = useIsMobile();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="p-3">
          {isMobile && (
            <Breadcrumb className="mb-2">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Role permission</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}
          <h1 className="lg:text-2xl text-base font-bold">
            User and Role permission
          </h1>
          <p className="text-muted-foreground lg:text-base text-sm">
            Institute Management System
          </p>
        </div>

        {!isMobile && (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Role permission</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>

      <Permissions />
    </div>
  );
}
