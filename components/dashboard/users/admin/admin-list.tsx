"use client";

import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { CustomTable } from "@/components/shared/layout/TableSection";
import { Button } from "@/components/ui/button";
import { ROUTE } from "@/constants/routes";
import { Pencil, Trash2, Plus, RotateCcw } from "lucide-react";
import { useState } from "react";

const admins = [
  {
    id: 1,
    fullname: "Vutheaims",
    email: "tongvuthea@gmail.com",
    username: "Vutheaims",
    createdAt: "2024-06-21",
    status: "Active",
  },
  {
    id: 2,
    fullname: "regadmin",
    email: "regadmin@gmail.com",
    username: "regadmin",
    createdAt: "2024-12-10",
    status: "Active",
  },
  {
    id: 3,
    fullname: "User01",
    email: "user@gmail.com",
    username: "user01",
    createdAt: "2024-09-18",
    status: "InActive",
  },
];

export default function AdminsList() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const iconColor = "text-black";

  const columns = [
    {
      key: "id",
      header: "#",
    },
    {
      key: "fullname",
      header: "fullName",
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "username",
      header: "Username",
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (item: any) => new Date(item.createdAt).toLocaleDateString(),
    },
    {
      key: "status",
      header: "Status",
      render: (admin: any) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            admin.status === "Active"
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

      <CustomTable columns={columns} data={admins} />
    </div>
  );
}
