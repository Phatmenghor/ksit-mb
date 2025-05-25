"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Check, Pencil, Plus, RotateCcw, StopCircle, X } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  getAllStaffService,
  updateStaffService,
} from "@/service/user/user.service";
import Loading from "../../permissions/loading";
import { StaffTableHeader } from "@/constants/table/user";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import ChangePasswordModal from "@/components/dashboard/users/shared/ChangePasswordModal";
import { useDebounce } from "@/utils/debounce/debounce";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import PaginationPage from "@/components/shared/pagination-page";
import { RoleEnum, StatusEnum } from "@/constants/constant";
import { ROUTE } from "@/constants/routes";
import {
  AllStaffModel,
  StaffModel,
} from "@/model/user/staff/staff.respond.model";
import { StaffListRequest } from "@/model/user/staff/staff.request.model";

export default function StuffOfficerListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  // Local state management for component
  const [isLoading, setIsLoading] = useState(true); // Tracks if data is currently loading
  const [data, setData] = useState<AllStaffModel | null>(null); // Stores fetched staff data
  const [isSubmitting, setIsSubmitting] = useState(false); // Tracks if a submission (e.g., update) is in progress
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false); // Controls visibility of change password dialog
  const [statusFilter, setStatusFilter] = useState("ACTIVE"); // Current status filter for staff list
  const [selectedStaff, setSelectedStaff] = useState<StaffModel | null>(null); // Currently selected staff item for operations
  const [isDisableDialogOpen, setIsDisableDialogOpen] = useState(false); // Controls visibility of disable confirmation dialog

  const router = useRouter();
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // Debounce search input to avoid excessive requests

  /**
   * Handler for search input changes
   * Updates the searchQuery state on user input
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Loads staff data from the backend API with filters and pagination
   * Uses useCallback to memoize the function and avoid unnecessary re-creations
   *
   * @param data - Request parameters with pagination, roles, search term, and status filter
   */
  const loadData = useCallback(
    async (
      data: StaffListRequest = {
        pageNo: 1,
        pageSize: 10,
        roles: [RoleEnum.STAFF],
        search: searchQuery,
        status: statusFilter,
      }
    ) => {
      setIsLoading(true);
      try {
        const response = await getAllStaffService(data);
        if (response) {
          setData(response); // Update local data state with response
        } else {
          console.error("Failed to fetch staff:");
        }
      } catch (error) {
        toast.error("An error occurred while loading staff"); // Show error notification on failure
      } finally {
        setIsLoading(false); // Always reset loading state after fetch attempt
      }
    },
    [debouncedSearchQuery, statusFilter] // Reload data when debounced search query or status filter changes
  );

  /**
   * Effect to automatically reload data when search query, loadData, or status filter changes
   */
  useEffect(() => {
    loadData();
  }, [debouncedSearchQuery, loadData, statusFilter]);

  /**
   * Disables the selected staff member by updating their status to INACTIVE
   * Provides user feedback via toast notifications
   */
  const handleDisableStaff = async () => {
    setIsLoading(true);
    setIsSubmitting(true);
    try {
      await updateStaffService(Number(selectedStaff?.id), {
        status: StatusEnum.INACTIVE,
      });

      toast.success("Teacher disabled successfully");
    } catch (error) {
      console.error("Failed to disable teacher:", error);
      toast.error("Failed to disable teacher");
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <CardHeaderSection
        breadcrumbs={[
          { label: "Home", href: ROUTE.DASHBOARD },
          { label: "Stuff-Officer-List", href: ROUTE.USERS.STUFF_OFFICER },
        ]}
        searchValue={searchQuery}
        buttonHref={ROUTE.USERS.ADD_STAFF}
        searchPlaceholder="Search..."
        onSearchChange={handleSearchChange}
        buttonText="Add New"
        buttonIcon={<Plus className="mr-2 h-2 w-2" />}
        customSelect={
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
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
              {data?.content.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={StaffTableHeader.length}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No staff found
                  </TableCell>
                </TableRow>
              ) : (
                data?.content.map((staff, index) => {
                  const indexDisplay =
                    ((data.pageNo || 1) - 1) * (data.pageSize || 10) +
                    index +
                    1;
                  return (
                    <TableRow key={staff.id}>
                      <TableCell>{indexDisplay}</TableCell>
                      <TableCell>{staff.username.trim() || "---"}</TableCell>
                      <TableCell>
                        {`${staff.khmerFirstName || ""} ${
                          staff.khmerLastName || ""
                        }`.trim() || "---"}
                      </TableCell>
                      <TableCell>
                        {`${staff.englishFirstName ?? ""}
                        ${staff.englishLastName ?? ""}`.trim() || "---"}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-start space-x-2">
                          <Button
                            onClick={() => {
                              router.push(
                                ROUTE.USERS.EDIT_STAFF(String(staff.id))
                              );
                            }}
                            variant="ghost"
                            size="icon"
                            className="text-black"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            onClick={() => {
                              setIsChangePasswordDialogOpen(true);
                              setSelectedStaff(staff);
                            }}
                            className="text-black"
                            size="sm"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              setIsDisableDialogOpen(true);
                              setSelectedStaff(staff);
                            }}
                            variant="ghost"
                            size="icon"
                            className="text-black"
                            disabled={isSubmitting}
                            title="Delete"
                          >
                            <StopCircle className="h-4 w-4" />
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
          setSelectedStaff(null);
        }}
        userId={selectedStaff?.id}
      />

      <DeleteConfirmationDialog
        isOpen={isDisableDialogOpen}
        onClose={() => {
          setIsDisableDialogOpen(false);
          setSelectedStaff(null);
        }}
        onDelete={handleDisableStaff}
        title="Disable Staff"
        description={`Are you sure you want to disable the staff: ${selectedStaff?.username}?`}
        itemName={selectedStaff?.username}
        isSubmitting={isSubmitting}
      />

      {!isLoading && data && (
        <div className="mt-4 flex justify-end">
          <PaginationPage
            currentPage={data.pageNo}
            totalPages={data.totalPages}
            onPageChange={(page: number) => loadData({ pageNo: page })}
          />
        </div>
      )}
    </div>
  );
}
