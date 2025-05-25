"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Plus, RotateCcw, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { ROUTE } from "@/constants/routes";
import { getAllStaffService } from "@/service/user/user.service";
import { RoleEnum, StatusEnum } from "@/constants/constant";
import PaginationPage from "@/components/shared/pagination-page";
import ChangePasswordModal from "@/components/dashboard/users/shared/ChangePasswordModal";
import Loading from "../../permissions/loading";
import { StaffTableHeader, TeacherTableHeader } from "@/constants/table/user";
import {
  AllStaffModel,
  StaffModel,
} from "@/model/user/staff/staff.respond.model";
import { useDebounce } from "@/utils/debounce/debounce";
import { StaffListRequest } from "@/model/user/staff/staff.request.model";

export default function TeachersListPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allTeachersData, setallTeachersData] = useState<AllStaffModel | null>(
    null
  );
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<StaffModel | null>(
    null
  );

  const router = useRouter();
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // Debounced version of the searchQuery with 500ms delay to limit API calls
  const iconColor = "text-black";

  // Handler called when the search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Function to load teachers from the backend API.
   * Accepts parameters to specify additional filtering or pagination options.
   */
  const loadTeachers = useCallback(
    async (param: StaffListRequest) => {
      setIsLoading(true); // Show loading indicator
      try {
        // Fetch teachers with role 'TEACHER', active status, and search filter
        const response = await getAllStaffService({
          roles: [RoleEnum.TEACHER],
          search: searchQuery, // Note: searchQuery or debouncedSearchQuery? Here it uses searchQuery.
          status: StatusEnum.ACTIVE,
          ...param, // Spread additional params like pagination if provided
        });

        if (response) {
          setallTeachersData(response); // Update state with fetched data
        } else {
          console.error("Failed to fetch teachers:");
        }
      } catch (error) {
        // Show a toast notification on error
        toast.error("An error occurred while loading teachers");
      } finally {
        setIsLoading(false); // Hide loading indicator regardless of success or failure
      }
    },
    [debouncedSearchQuery] // Recreate function only when debouncedSearchQuery changes
  );

  // Effect to reload teachers whenever the debounced search query or loadTeachers changes
  useEffect(() => {
    loadTeachers({});
  }, [debouncedSearchQuery, loadTeachers]);
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

      <div className="overflow-x-auto">
        {isLoading ? (
          <Loading />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {TeacherTableHeader.map((header, index) => (
                  <TableHead key={index} className={header.className}>
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {allTeachersData?.content.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={StaffTableHeader.length}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No teacher found
                  </TableCell>
                </TableRow>
              ) : (
                allTeachersData?.content.map((teacher, index) => {
                  const indexDisplay =
                    ((allTeachersData.pageNo || 1) - 1) *
                      (allTeachersData.pageSize || 10) +
                    index +
                    1;
                  return (
                    <TableRow key={teacher.id}>
                      <TableCell>{indexDisplay}</TableCell>
                      <TableCell>
                        {teacher.khmerFirstName || ""}{" "}
                        {teacher.khmerLastName || ""}
                      </TableCell>
                      <TableCell>
                        {" "}
                        {teacher.englishFirstName ?? ""}{" "}
                        {teacher.englishLastName ?? ""}
                      </TableCell>
                      <TableCell>{teacher.username || ""}</TableCell>
                      <TableCell>{teacher.identifyNumber || ""}</TableCell>
                      <TableCell>{teacher.gender || ""}</TableCell>
                      <TableCell>{teacher.dateOfBirth || ""}</TableCell>
                      <TableCell>{teacher.phoneNumber || ""}</TableCell>
                      <TableCell>{teacher.department?.name || ""}</TableCell>
                      <TableCell>
                        <div className="flex justify-start">
                          <Button
                            onClick={() => {
                              router.push(
                                ROUTE.USERS.VIEW_TEACHER(String(teacher.id))
                              );
                            }}
                            variant="ghost"
                            size="icon"
                            className={iconColor}
                            title="View"
                          >
                            <Eye className="w-7 h-7 text-black" />
                          </Button>
                          <Button
                            onClick={() => {
                              router.push(
                                ROUTE.USERS.EDIT_TEACHER(String(teacher.id))
                              );
                            }}
                            variant="ghost"
                            size="icon"
                            className={iconColor}
                            title="Edit"
                          >
                            <Pencil className="w-7 h-7 text-black" />
                          </Button>

                          <Button
                            variant="ghost"
                            onClick={() => {
                              setIsChangePasswordDialogOpen(true);
                              setSelectedTeacher(teacher);
                            }}
                            className={iconColor}
                            size="sm"
                          >
                            <RotateCcw className="w-7 h-7 text-black" />
                          </Button>
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

      <ChangePasswordModal
        isOpen={isChangePasswordDialogOpen}
        onClose={() => {
          setIsChangePasswordDialogOpen(false);
          setSelectedTeacher(null);
        }}
        userId={selectedTeacher?.id}
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
