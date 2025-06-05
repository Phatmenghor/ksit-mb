"use client";

import type React from "react";

import { useCallback, useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { YearSelector } from "@/components/shared/year-selector";
import Loading from "@/components/shared/loading";
import PaginationPage from "@/components/shared/pagination-page";
import DepartmentCard from "@/components/dashboard/schedule/department/department-card";
import { AllDepartmentModel } from "@/model/master-data/department/all-department-model";
import { ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { AllDepartmentFilterModel } from "@/model/master-data/department/type-department-model";
import { getAllDepartmentService } from "@/service/master-data/department.service";
import { Constants } from "@/constants/text-string";
import { toast } from "sonner";
import { getAllStatisticService } from "@/service/statistic/statistic.service";
import { StatisticModel } from "@/model/statistic/statistic-model";

interface MetricCardProps {
  title: string;
  value: number;
  borderColor?: string;
}

// Mock data for demonstration
const mockOverviewData = {
  totalStudent: 1247,
  totalTeacher: 89,
  totalRequest: 23,
  totalCourses: 156,
  totalClass: 45,
  totalMajor: 12,
  totalDepartment: 8,
};

const MetricCard = ({
  title,
  value,
  borderColor = "bg-orange-400",
}: MetricCardProps) => (
  <div className="relative bg-amber-50 rounded-md overflow-hidden h-full">
    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${borderColor}`} />
    <div className="absolute left-8  top-[18px] h-[35px] w-1 bg-amber-500 rounded-xl " />
    <div className="py-2 px-2 text-center">
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  </div>
);

export default function ManageClassPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [allDepartmentData, setAllDepartmentData] =
    useState<AllDepartmentModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statisticsData, setStatisticsData] = useState<StatisticModel | null>(
    null
  );
  const router = useRouter();

  const loadDepartments = useCallback(
    async (param: AllDepartmentFilterModel) => {
      setIsLoading(true);

      try {
        const response = await getAllDepartmentService({
          search: searchQuery,
          status: Constants.ACTIVE,
          ...param,
        });

        if (response) {
          setAllDepartmentData(response);
        } else {
          console.error("Failed to fetch departments:");
        }
      } catch (error) {
        toast.error("An error occurred while loading departments");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const loadStatistics = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllStatisticService();
      if (response) {
        setStatisticsData(response);
      } else {
        console.error("Failed to fetch statistics");
      }
    } catch (error) {
      console.error("Error loading statistics:", error);
      toast.error("An error occurred while loading statistics");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDepartments({});
    loadStatistics();
  }, [loadDepartments, loadStatistics]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  function onClickDepartmentCard(departmentId: number) {
    router.push(ROUTE.MANAGE_SCHEDULE.DEPARTMENT_CLASS + `/${departmentId}`);
  }
  return (
    <div className="">
      {/* Header Section */}

      {/* Manage Class Section */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>

          {/* Overview Data Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between w-full py-2 border-t border-gray-300">
              <h2 className="text-lg font-semibold text-gray-900">
                Overview Data
              </h2>
              <div>
                <YearSelector
                  value={selectedYear}
                  onChange={handleYearChange}
                />
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <MetricCard
                title="Total Student"
                value={mockOverviewData.totalStudent}
                borderColor="border-l-orange-400"
              />
              <MetricCard
                title="Total Teacher"
                value={mockOverviewData.totalTeacher}
                borderColor="border-l-blue-400"
              />
              <MetricCard
                title="Total Request"
                value={mockOverviewData.totalRequest}
                borderColor="border-l-green-400"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Total Courses"
                value={mockOverviewData.totalCourses}
                borderColor="border-l-purple-400"
              />
              <MetricCard
                title="Total Class"
                value={mockOverviewData.totalClass}
                borderColor="border-l-red-400"
              />
              <MetricCard
                title="Total Major"
                value={mockOverviewData.totalMajor}
                borderColor="border-l-yellow-400"
              />
              <MetricCard
                title="Total Department"
                value={mockOverviewData.totalDepartment}
                borderColor="border-l-indigo-400"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Section */}
      {/* <Card>
        <CardContent className="p-0"> */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="bg-white rounded-lg p-6 shadow-sm border mt-4">
            <div className="mb-6">
              <p className="text-muted-foreground font-bold">Department List</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allDepartmentData?.content?.length === 0 ? (
                <p>No Department found</p>
              ) : (
                allDepartmentData?.content?.map((department) => (
                  <DepartmentCard
                    onClick={() => onClickDepartmentCard(department.id)}
                    key={department.id}
                    name={department.name}
                    imageUrl={department.urlLogo}
                    imageName={department.name}
                  />
                ))
              )}
            </div>
          </div>
        )}
        {!isLoading && allDepartmentData && (
          <div className="mt-4 flex justify-end">
            <PaginationPage
              currentPage={allDepartmentData.pageNo}
              totalPages={allDepartmentData.totalPages}
              onPageChange={(page: number) => loadDepartments({ pageNo: page })}
            />
          </div>
        )}
      </div>
      {/* </CardContent>
      </Card> */}
    </div>
  );
}
