"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import { ROUTE } from "@/constants/routes";
import { useState } from "react";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { CustomTable } from "@/components/shared/layout/TableSection";

export default function TeachersList() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const teachers = [
    {
      id: "T001",
      name: "Dr. John Smith",
      department: "Computer Science",
      position: "Professor",
      email: "john.smith@example.com",
      status: "Active",
    },
    {
      id: "T002",
      name: "Dr. Jane Johnson",
      department: "Food Technology",
      position: "Associate Professor",
      email: "jane.johnson@example.com",
      status: "Active",
    },
    {
      id: "T003",
      name: "Dr. Robert Williams",
      department: "Electrical Technology",
      position: "Assistant Professor",
      email: "robert.williams@example.com",
      status: "Active",
    },
    {
      id: "T004",
      name: "Dr. Emily Brown",
      department: "Animal Science",
      position: "Lecturer",
      email: "emily.brown@example.com",
      status: "Active",
    },
    {
      id: "T005",
      name: "Dr. Michael Davis",
      department: "Mechanical Technology",
      position: "Professor",
      email: "michael.davis@example.com",
      status: "Inactive",
    },
  ];

  const iconColor = "text-black";

  const columns = [
    {
      key: "id",
      header: "#",
    },
    {
      key: "name",
      header: "Name",
    },
    {
      key: "department",
      header: "Department",
    },
    {
      key: "position",
      header: "Position",
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "status",
      header: "Status",
      render: (teacher: any) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            teacher.status === "Active"
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
      render: (teacher: any) => (
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

      <CustomTable columns={columns} data={teachers} />
    </div>
  );
}
