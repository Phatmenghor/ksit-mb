"use client";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import { ROUTE } from "@/constants/routes";
import { useCallback, useEffect, useState } from "react";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { Column, CustomTable } from "@/components/shared/layout/TableSection";
import { getAllStuffService } from "@/service/user/user.service";
import { RequestAllStuff } from "@/model/user/staff/Add.staff.model";
import { RoleEnum, StatusEnum } from "@/constants/constant";
import { AllStaffModel, StaffModel } from "@/model/user/staff/stuff.model";
import { toast } from "sonner";
import PaginationPage from "@/components/shared/pagination-page";
import { useRouter } from "next/navigation";

export default function TeachersListPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allTeachersData, setallTeachersData] = useState<AllStaffModel>();

  const router = useRouter();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const loadTeachers = useCallback(
    async (param: RequestAllStuff) => {
      setIsLoading(true);
      try {
        const response = await getAllStuffService({
          roles: [RoleEnum.TEACHER],
          search: searchQuery,
          status: StatusEnum.ACTIVE,
          ...param,
        });
        if (response) {
          setallTeachersData(response);
        } else {
          console.error("Failed to fetch teachers:");
        }
      } catch (error) {
        toast.error("An error occurred while loading teachers");
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    loadTeachers({});
  }, [searchQuery, loadTeachers]);

  const iconColor = "text-black";

  const columns: Column<StaffModel>[] = [
    {
      key: "teacher#",
      header: "#",
    },

    {
      key: "fullname(kh)",
      header: "Fullname (KH)",
      render: (teacher: StaffModel) =>
        `${teacher?.khmerFirstName ?? ""} ${teacher?.khmerLastName ?? ""}`,
    },
    {
      key: "fullname(en)",
      header: "Fullname (EN)",
      render: (teacher: StaffModel) =>
        `${teacher?.englishFirstName ?? ""} ${teacher?.englishLastName ?? ""}`,
    },
    {
      key: "username",
      header: "Username",
      render: (teacher: StaffModel) => `${teacher?.username ?? ""}`,
    },
    {
      key: "status",
      header: "Status",
      render: (teacher: any) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            teacher.status === StatusEnum.ACTIVE
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {teacher.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (teacher: StaffModel) => {
        return (
          <>
            <Button
              variant="ghost"
              onClick={() => {
                router.push(ROUTE.USERS.VIEW_TEACHER(String(teacher.id)));
              }}
              className={iconColor}
              size="sm"
            >
              <RotateCcw />
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                router.push(ROUTE.USERS.EDIT_TEACHER(String(teacher.id)));
              }}
              className={iconColor}
              size="sm"
            >
              <Pencil />
            </Button>
            <Button variant="ghost" className={iconColor} size="sm">
              <Trash2 />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <CardHeaderSection
        breadcrumbs={[
          { label: "Home", href: ROUTE.DASHBOARD },
          { label: "Teacher List", href: ROUTE.USERS.TEACHERS },
        ]}
        title="Teachers"
        searchValue={searchQuery}
        searchPlaceholder="Search..."
        onSearchChange={handleSearchChange}
        buttonText="Add New"
        buttonHref={ROUTE.USERS.ADD_TEACHER}
        buttonIcon={<Plus className="mr-2 h-2 w-2" />}
      />

      <CustomTable
        columns={columns}
        isLoading={isLoading}
        data={allTeachersData?.content ?? []}
      />

      {!isLoading && allTeachersData && (
        <div className="mt-4 flex justify-end">
          <PaginationPage
            currentPage={allTeachersData.pageNo}
            totalPages={allTeachersData.totalPages}
            onPageChange={(page: number) => loadTeachers({ pageNo: page })}
          />
        </div>
      )}
    </div>
  );
}
