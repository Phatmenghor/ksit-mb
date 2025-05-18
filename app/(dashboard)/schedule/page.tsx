import Link from "next/link";
import Image from "next/image";
import { Search, ChevronRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

// Sample data for departments with server image URLs
const departments = [
  {
    id: 1,
    name: "Computer Science",
    icon: "green",
    imageUrl: "https://example.com/images/cs-icon-green.png",
  },
  {
    id: 2,
    name: "Computer Science",
    icon: "green",
    imageUrl: "https://example.com/images/cs-icon-green.png",
  },
  {
    id: 3,
    name: "Computer Science",
    icon: "green",
    imageUrl: "https://example.com/images/cs-icon-green.png",
  },
  {
    id: 4,
    name: "Computer Science",
    icon: "green",
    imageUrl: "https://example.com/images/cs-icon-green.png",
  },
  {
    id: 5,
    name: "Computer Science",
    icon: "green",
    imageUrl: "https://example.com/images/cs-icon-green.png",
  },
  {
    id: 6,
    name: "Computer Science",
    icon: "blue",
    imageUrl: "https://example.com/images/cs-icon-blue.png",
  },
  {
    id: 7,
    name: "Computer Science",
    icon: "blue",
    imageUrl: "https://example.com/images/cs-icon-blue.png",
  },
  {
    id: 8,
    name: "Computer Science",
    icon: "blue",
    imageUrl: "https://example.com/images/cs-icon-blue.png",
  },
  {
    id: 9,
    name: "Computer Science",
    icon: "blue",
    imageUrl: "https://example.com/images/cs-icon-blue.png",
  },
  {
    id: 10,
    name: "Computer Science",
    icon: "blue",
    imageUrl: "https://example.com/images/cs-icon-blue.png",
  },
  {
    id: 11,
    name: "Computer Science",
    icon: "green",
    imageUrl: "https://example.com/images/cs-icon-green.png",
  },
  {
    id: 12,
    name: "Computer Science",
    icon: "green",
    imageUrl: "https://example.com/images/cs-icon-green.png",
  },
  {
    id: 13,
    name: "Computer Science",
    icon: "green",
    imageUrl: "https://example.com/images/cs-icon-green.png",
  },
  {
    id: 14,
    name: "Computer Science",
    icon: "green",
    imageUrl: "https://example.com/images/cs-icon-green.png",
  },
  {
    id: 15,
    name: "Computer Science",
    icon: "green",
    imageUrl: "https://example.com/images/cs-icon-green.png",
  },
  {
    id: 16,
    name: "Computer Science",
    icon: "blue",
    imageUrl: "https://example.com/images/cs-icon-blue.png",
  },
  {
    id: 17,
    name: "Computer Science",
    icon: "blue",
    imageUrl: "https://example.com/images/cs-icon-blue.png",
  },
  {
    id: 18,
    name: "Computer Science",
    icon: "blue",
    imageUrl: "https://example.com/images/cs-icon-blue.png",
  },
  {
    id: 19,
    name: "Computer Science",
    icon: "blue",
    imageUrl: "https://example.com/images/cs-icon-blue.png",
  },
  {
    id: 20,
    name: "Computer Science",
    icon: "blue",
    imageUrl: "https://example.com/images/cs-icon-blue.png",
  },
];

export default function DepartmentListPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard" className="font-medium">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-muted-foreground">
                  Department List
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <h1 className="text-2xl font-bold mb-6">Schedule</h1>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Enter name or ID..." className="pl-10" />
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Total Department: {departments.length}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {departments.map((department) => (
            <DepartmentCard
              key={department.id}
              name={department.name}
              iconType={department.icon}
              imageUrl={department.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DepartmentCard({
  name,
  iconType,
  imageUrl,
}: {
  name: string;
  iconType: string;
  imageUrl: string;
}) {
  return (
    <Card className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors">
      <div className="flex items-center gap-4">
        <DepartmentIcon imageUrl={imageUrl} iconType={iconType} />
        <div>
          <p className="text-sm text-muted-foreground">Dep.</p>
          <p className="font-medium">{name}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="text-green-600 hover:text-green-700 hover:bg-green-50"
        asChild
      >
        <Link href="#">
          View Class
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </Card>
  );
}

function DepartmentIcon({
  imageUrl,
  iconType,
}: {
  imageUrl: string;
  iconType: string;
}) {
  const fallbackImageSrc = "/api/placeholder/48/48";
  const bgColorClass = iconType === "green" ? "bg-green-100" : "bg-blue-100";
  return (
    <div
      className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center ${bgColorClass}`}
    >
      <Image
        src={fallbackImageSrc}
        alt="Department icon"
        width={48}
        height={48}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
