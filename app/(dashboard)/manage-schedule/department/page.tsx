"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DepartmentCard from "@/components/dashboard/schedule/department/department-card";
import { AllDepartmentModel } from "@/model/master-data/department/all-department-model";
import { useCallback, useEffect, useState } from "react";
import { getAllDepartmentService } from "@/service/master-data/department.service";
import { toast } from "sonner";
import { ROUTE } from "@/constants/routes";
import { AllDepartmentFilterModel } from "@/model/master-data/department/type-department-model";
import { Constants } from "@/constants/text-string";
import PaginationPage from "@/components/shared/pagination-page";
import { useRouter } from "next/navigation";
import Loading from "@/components/shared/loading";

export default function DepartmentListPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allDepartmentData, setAllDepartmentData] =
    useState<AllDepartmentModel | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
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
    [searchQuery]
  );

  useEffect(() => {
    loadDepartments({});
  }, [loadDepartments]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  function onClickDepartmentCard(departmentId: number) {
    router.push(ROUTE.MANAGE_SCHEDULE.DEPARTMENT_CLASS + `/${departmentId}`);
  }
  return (
    <div>
      <Card>
        <CardContent className="p-6 space-y-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={ROUTE.DASHBOARD}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Departmemt List</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h3 className="text-xl font-bold">Manage Schedule</h3>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search department..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-white rounded-lg p-6 shadow-sm border mt-4">
          <div className="mb-6">
            <p className="text-muted-foreground font-bold">
              Total Department: {allDepartmentData?.totalElements || 0}
            </p>
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
  );
}
