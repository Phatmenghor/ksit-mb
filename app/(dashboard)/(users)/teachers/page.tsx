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
import { Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import { ROUTE } from "@/constants/routes";
import { useCallback, useEffect, useState } from "react";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { Column, CustomTable } from "@/components/shared/layout/TableSection";
import {
  getAllStuffService,
  updateStaffService,
} from "@/service/user/user.service";
import { RequestAllStuff } from "@/model/user/staff/Add.staff.model";
import { RoleEnum, StatusEnum } from "@/constants/constant";
import { AllStaffModel, StaffModel } from "@/model/user/staff/stuff.model";
import { toast } from "sonner";
import PaginationPage from "@/components/shared/pagination-page";
import { useRouter } from "next/navigation";
import ChangePasswordModal from "@/components/dashboard/users/shared/ChangePasswordModal";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import Loading from "../../permissions/loading";
import { StaffTableHeader } from "@/constants/table/user";

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  async function handleDeleteStaff() {
    if (!selectedTeacher) return;

    setIsSubmitting(true);
    try {
      const originalData = allTeachersData;
      setallTeachersData((prevData) => {
        if (!prevData) return null;
        const updatedContent = prevData.content.filter(
          (item) => item.id !== selectedTeacher.id
        );
        return {
          ...prevData,
          content: updatedContent,
          totalElements: prevData.totalElements - 1,
        };
      });

      const response = await updateStaffService(selectedTeacher.id, {
        status: StatusEnum.INACTIVE,
      });

      if (response) {
        toast.success(
          `Teacher ${selectedTeacher.username ?? ""} deleted successfully`
        );
      } else {
        setallTeachersData(originalData);
        toast.error("Failed to delete staff");
      }
    } catch (error) {
      console.error("Error deleting staff:", error);
      toast.error("An error occurred while deleting the staff");
      loadTeachers({});
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
    }
  }

  return (
    <div className="space-y-4">
      <CardHeaderSection
        back
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
                {StaffTableHeader.map((header, index) => (
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
                    No classes found
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
                        {teacher.khmerFirstName} {teacher.khmerLastName}
                      </TableCell>
                      <TableCell>
                        {" "}
                        {teacher.englishFirstName ?? ""}{" "}
                        {teacher.englishLastName ?? ""}
                      </TableCell>
                      <TableCell>{teacher.username}</TableCell>
                      <TableCell>{teacher.status}</TableCell>
                      <TableCell>
                        <div className="flex justify-start space-x-2">
                          <Button
                            onClick={() => {
                              router.push(
                                ROUTE.USERS.EDIT_TEACHER(String(teacher.id))
                              );
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-black hover:text-gray-900"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
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
                            <RotateCcw />
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedTeacher(teacher);
                              setIsDeleteDialogOpen(true);
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600"
                            disabled={isSubmitting}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
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
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteStaff}
        title="Delete Staff"
        description={`Are you sure you want to delete the staff: ${selectedTeacher?.username}?`}
        itemName={selectedTeacher?.username}
        isSubmitting={isSubmitting}
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
