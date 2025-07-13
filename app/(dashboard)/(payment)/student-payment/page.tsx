"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import { getAllStudentsService } from "@/service/user/student.service";
import { StatusEnum } from "@/constants/constant";
import { CardHeaderSection } from "@/components/shared/layout/card-header-section";
import { ROUTE } from "@/constants/routes";
import { YearSelector } from "@/components/shared/year-selector";
import { ClassModel } from "@/model/master-data/class/all-class-model";
import { BreadcrumbLink } from "@/components/ui/breadcrumb";
import PaginationPage from "@/components/shared/pagination-page";
import {
  AllStudentModel,
  RequestAllStudent,
} from "@/model/user/student/student.request.model";
import { useDebounce } from "@/utils/debounce/debounce";
import { ComboboxSelectClass } from "@/components/shared/ComboBox/combobox-class";
import Loading from "@/components/shared/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StudentTablePaymentHeader } from "@/constants/payment/payment";
import { useIsMobile } from "@/hooks/use-mobile";

export default function StudentsListPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectAcademicYear, setSelectAcademicYear] = useState<
    number | undefined
  >();
  const [selectedClass, setSelectedClass] = useState<ClassModel>();
  const [allStudentData, setAllStudentData] = useState<AllStudentModel | null>(
    null
  );
  const isMobile = useIsMobile();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const loadStudents = useCallback(
    async (param: RequestAllStudent) => {
      setIsLoading(true);

      try {
        const response = await getAllStudentsService({
          ...param,
          academicYear: selectAcademicYear,
          search: debouncedSearchQuery,
          status: StatusEnum.ACTIVE,
          classId: selectedClass?.id,
        });

        if (response) {
          setAllStudentData(response);
          console.log(">>>", response);
        } else {
          console.error("Failed to fetch departments:");
        }
      } catch (error) {
        toast.error("An error occurred while loading departments");
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedSearchQuery, selectedClass, selectAcademicYear]
  );

  useEffect(() => {
    loadStudents({});
  }, [searchQuery, loadStudents, debouncedSearchQuery, selectAcademicYear]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleYearChange = (e: number) => {
    setSelectAcademicYear(e);
  };

  const handleClassChange = (e: ClassModel | null) => {
    setSelectedClass(e ?? undefined);
  };

  const iconColor = "text-black";

  return (
    <div className="space-y-4">
      <CardHeaderSection
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          { label: "Payment", href: ROUTE.PAYMENT.LIST },
        ]}
        title="Payment"
        searchValue={searchQuery}
        searchPlaceholder="Search..."
        onSearchChange={handleSearchChange}
        customSelect={
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-4">
            <div className="w-full min-w-[200px] md:w-1/2">
              <div className="w-full min-w-[200px]">
                <YearSelector
                  title="Select Year"
                  onChange={handleYearChange}
                  value={selectAcademicYear || 0}
                />
              </div>
            </div>

            <div className="w-full min-w-[200px] md:w-1/2">
              <ComboboxSelectClass
                dataSelect={selectedClass ?? null}
                onChangeSelected={handleClassChange}
                disabled={isSubmitting}
              />
            </div>
          </div>
        }
      />

      <div className={`overflow-x-auto mt-4 ${isMobile ? "pl-4" : ""}`}>
        {isLoading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {StudentTablePaymentHeader.map((header, index) => (
                  <TableHead key={index} className={header.className}>
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {allStudentData?.totalElements === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={StudentTablePaymentHeader.length}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No student found
                  </TableCell>
                </TableRow>
              ) : (
                allStudentData?.content.map((student, index) => {
                  const indexDisplay =
                    ((allStudentData.pageNo || 1) - 1) *
                      (allStudentData.pageSize || 10) +
                    index +
                    1;
                  return (
                    <TableRow key={student.id}>
                      <TableCell>{indexDisplay}</TableCell>
                      <TableCell>{student.username || "---"}</TableCell>
                      <TableCell>
                        {`${student.khmerFirstName || ""} ${
                          student.khmerLastName || ""
                        }`.trim() || "---"}
                      </TableCell>
                      <TableCell>
                        {`${student.englishFirstName || ""} ${
                          student.englishLastName || ""
                        }`.trim() || "---"}
                      </TableCell>

                      <TableCell>{student.gender || "---"}</TableCell>
                      <TableCell>{student.dateOfBirth || "---"}</TableCell>

                      <TableCell>
                        <div className="flex justify-start space-x-2">
                          <BreadcrumbLink
                            href={ROUTE.PAYMENT.VIEW_PAYMENT(
                              String(student.id)
                            )}
                          >
                            <Button
                              variant="link"
                              size="icon"
                              className={`${iconColor} underline hover:text-blue-600 flex items-center`}
                            >
                              <Eye className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                              <span className="text-sm transition-all duration-200">
                                {" "}
                                Detail
                              </span>
                            </Button>
                          </BreadcrumbLink>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {!isLoading && allStudentData && (
        <div className="mt-8 flex justify-end animate-in slide-in-from-bottom-4 duration-500 delay-1000">
          <PaginationPage
            currentPage={allStudentData.pageNo}
            totalPages={allStudentData.totalPages}
            onPageChange={(page: number) => loadStudents({ pageNo: page })}
          />
        </div>
      )}
    </div>
  );
}
