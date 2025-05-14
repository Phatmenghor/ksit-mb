"use client";

import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { CustomTable } from "@/components/shared/layout/TableSection";
import { Button } from "@/components/ui/button";
import { RoleEnum, StatusEnum } from "@/constants/constant";
import { ROUTE } from "@/constants/routes";
import { StaffModel } from "@/model/user/stuff.model";
import { RequestAllStuff } from "@/model/user/stuff.request.model";
import { getAllStuffService } from "@/service/user/user.service";
import { Pencil, Trash2, Plus, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminsList() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<StaffModel[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const loadData = useCallback(
    async (
      data: RequestAllStuff = {
        departmentId: 1,
        pageNo: 1,
        pageSize: 10,
        roles: [RoleEnum.ADMIN],
        search: searchQuery,
        status: StatusEnum.ACTIVE,
      }
    ) => {
      setIsLoading(true);
      try {
        const response = await getAllStuffService(data);
        if (response) {
          setData(response.content);
        } else {
          console.error("Failed to fetch admin:");
        }
      } catch (error) {
        toast.error("An error occurred while loading admins");
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

  const columns = [
    {
      key: "id",
      header: "#",
      render: (_: any, index: number) => index + 1,
    },
    {
      key: "adminid",
      header: "Admin ID",
    },
    {
      key: "fullname(kh)",
      header: "Fullname (KH)",
      render: (admin: StaffModel) =>
        `${admin.khmerFirstName} ${admin.khmerLastName}`,
    },
    {
      key: "fullname(en)",
      header: "Fullname (EN)",
      render: (admin: StaffModel) =>
        `${admin.englishFirstName} ${admin.englishLastName}`,
    },
    {
      key: "username",
      header: "Username",
    },
    {
      key: "status",
      header: "Status",
      render: (admin: any) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            admin.status === StatusEnum.ACTIVE
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {admin.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (admin: any) => (
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
          { label: "Admin List", href: ROUTE.USERS.ADMIN },
        ]}
        title="Admins"
        searchValue={searchQuery}
        searchPlaceholder="Search..."
        onSearchChange={handleSearchChange}
        buttonText="Add New"
        buttonHref={ROUTE.USERS.ADD_TEACHER}
        buttonIcon={<Plus className="mr-2 h-2 w-2" />}
      />

      <CustomTable isLoading={isLoading} columns={columns} data={data} />
    </div>
  );
}
