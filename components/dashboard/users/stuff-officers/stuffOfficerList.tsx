"use client";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { Column, CustomTable } from "@/components/shared/layout/TableSection";
import PaginationPage from "@/components/shared/pagination-page";
import { Button } from "@/components/ui/button";
import { RoleEnum, StatusEnum } from "@/constants/constant";
import { ROUTE } from "@/constants/routes";
import { AllStaffModel, StaffModel } from "@/model/user/stuff.model";
import { RequestAllStuff } from "@/model/user/Add.staff.model";
import { getAllStuffService } from "@/service/user/user.service";
import { Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function StuffOfficerList() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<AllStaffModel | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const loadData = useCallback(
    async (
      data: RequestAllStuff = {
        pageNo: 1,
        pageSize: 10,
        roles: [RoleEnum.STAFF],
        search: searchQuery,
        status: StatusEnum.ACTIVE,
      }
    ) => {
      setIsLoading(true);
      try {
        const response = await getAllStuffService(data);
        if (response) {
          setData(response);
        } else {
          console.error("Failed to fetch officer:");
        }
      } catch (error) {
        toast.error("An error occurred while loading officers");
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    loadData();
  }, [searchQuery, loadData]);
  const iconColor = "text-black";

  const columns: Column<StaffModel>[] = [
    {
      key: "stuff#",
      header: "#",
      render: (_: any, index: number) => index + 1,
    },
    {
      key: "id",
      header: "Stuff ID",
    },
    {
      key: "fullname(kh)",
      header: "Fullname (KH)",
      render: (stuff: StaffModel) =>
        `${stuff.khmerFirstName} ${stuff.khmerLastName}`,
    },
    {
      key: "fullname(en)",
      header: "Fullname (EN)",
      render: (stuff: StaffModel) =>
        `${stuff.englishFirstName} ${stuff.englishLastName}`,
    },
    {
      key: "username",
      header: "Username",
    },
    {
      key: "status",
      header: "Status",
      render: (StuffOfficers: any) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            StuffOfficers.status === StatusEnum.ACTIVE
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {StuffOfficers.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (StuffOfficers: any) => (
        <>
          <Button variant="ghost" className={iconColor} size="sm">
            <RotateCcw />
          </Button>
          <Button variant="ghost" className={iconColor} size="sm">
            <Pencil />
          </Button>
          <Button variant="ghost" className={iconColor} size="sm">
            <Trash2 />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <CardHeaderSection
        breadcrumbs={[
          { label: "Home", href: ROUTE.DASHBOARD },
          { label: "Stuff-Officer-List", href: ROUTE.USERS.STUFF_OFFICER },
        ]}
        title="Stuff Officers"
        searchValue={searchQuery}
        searchPlaceholder="Search..."
        onSearchChange={handleSearchChange}
        buttonText="Add New"
        buttonHref={ROUTE.USERS.ADD_TEACHER}
        buttonIcon={<Plus className="mr-2 h-2 w-2" />}
      />

      <CustomTable
        data={data?.content ?? []}
        isLoading={isLoading}
        columns={columns}
      />

      {!isLoading && data && (
        <div className="mt-4 flex justify-end">
          <PaginationPage
            currentPage={data.pageNo}
            totalPages={data.totalPages}
            onPageChange={(page: number) => loadData({ pageNo: page })}
          />
        </div>
      )}
    </div>
  );
}
