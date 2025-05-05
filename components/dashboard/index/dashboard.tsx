import { DepartmentCard } from "@/components/department-card";

import Link from "next/link";

export default function Dashboard() {
  const departments = [
    {
      id: 1,
      name: "Dep. Computer Science",
      totalMajor: 1,
      color: "bg-blue-500",
      textColor: "text-white",
    },
    {
      id: 2,
      name: "Dep. Food Technology",
      totalMajor: 1,
      color: "bg-amber-500",
      textColor: "text-white",
    },
    {
      id: 3,
      name: "Dep. Animal Science",
      totalMajor: 1,
      color: "bg-emerald-500",
      textColor: "text-white",
    },
    {
      id: 4,
      name: "Dep. Plant Science",
      totalMajor: 1,
      color: "bg-amber-500",
      textColor: "text-white",
    },
    {
      id: 5,
      name: "Dep. Electrical Technology",
      totalMajor: 1,
      color: "bg-emerald-500",
      textColor: "text-white",
    },
    {
      id: 6,
      name: "Dep. Mechanical Technology",
      totalMajor: 0,
      color: "bg-amber-500",
      textColor: "text-white",
    },
  ];

  return (
    <>
      {departments.map((department) => (
        <Link key={department.id} href={`/departments/${department.id}/majors`}>
          <DepartmentCard
            name={department.name}
            totalMajor={department.totalMajor}
            color={department.color}
            textColor={department.textColor}
          />
        </Link>
      ))}
    </>
  );
}
