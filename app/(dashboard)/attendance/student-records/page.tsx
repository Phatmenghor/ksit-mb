"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Check,
  Download,
  Eye,
  Filter,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  StopCircle,
  Trash2,
  X,
} from "lucide-react";
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
  deletedStaffService,
  getAllStaffService,
} from "@/service/user/user.service";
import {
  StaffTableHeader,
  StudentAttendanceTableHeader,
} from "@/constants/table/user";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { YearSelector } from "@/components/shared/year-selector";
import { ClassModel } from "@/model/master-data/class/all-class-model";
import { ComboboxSelectClass } from "@/components/shared/ComboBox/combobox-class";
import { ComboboxSelectSemester } from "@/components/shared/ComboBox/combobox-semester";
import { SemesterModel } from "@/model/master-data/semester/semester-model";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function StudentAttendanceRecordPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<AllStaffModel | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);
  const [statusFilter, setStatusFilter] = useState("ACTIVE");
  const [selectedStaff, setSelectedStaff] = useState<StaffModel | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedSemester, setSelectedSemester] =
    useState<SemesterModel | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassModel | null>(null);

  const router = useRouter();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const loadData = useCallback(
    async (param: StaffListRequest) => {
      setIsLoading(true);
      try {
        const response = await getAllStaffService({
          ...param,
          roles: [RoleEnum.STAFF],
          search: searchQuery,
          status: statusFilter,
        });
        if (response) {
          setData(response);
        } else {
          console.error("Failed to fetch staff:");
        }
      } catch (error) {
        toast.error("An error occurred while loading staff");
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedSearchQuery, statusFilter]
  );

  useEffect(() => {
    loadData({});
  }, [debouncedSearchQuery, loadData, statusFilter]);

  const handleDeleteStaff = async () => {
    if (!selectedStaff) return;

    setIsSubmitting(true);
    try {
      const originalData = data;
      setData((prevData) => {
        if (!prevData) return null;
        const updatedContent = prevData.content.filter(
          (item) => item.id !== selectedStaff.id
        );
        return {
          ...prevData,
          content: updatedContent,
          totalElements: prevData.totalElements - 1,
        };
      });

      const response = await deletedStaffService(selectedStaff.id);

      if (response) {
        toast.success(
          `Staff ${selectedStaff.username ?? ""} deleted successfully`
        );
      } else {
        setData(originalData);
        toast.error("Failed to delete staff");
      }
    } catch (error) {
      console.error("Error deleting teacher:", error);
      toast.error("An error occurred while deleting the staff");
      loadData({});
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleSemesterChange = (semester: SemesterModel) => {
    setSelectedSemester(semester);
  };

  const handleClassChange = (selectedClass: ClassModel) => {
    setSelectedClass(selectedClass);
  };

  return (
    <div className="space-y-2">
      <Card>
        <CardContent className="p-6 bg-white">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <span className="text-black font-medium">Dashboard</span>
            <span>{">"}</span>
            <span>History Records</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl font-semibold text-black mb-8">
            History Records
          </h1>

          {/* Search and Filters Section */}
          <div className="space-y-4">
            {/* First Row - Search and Main Filters */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Search Input */}
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  onChange={handleSearchChange}
                  value={debouncedSearchQuery}
                  placeholder="Enter name or ID..."
                  className="pl-10 h-12 border-gray-200"
                />
              </div>

              {/* Class Filter */}
              <div className="flex items-center gap-2">
                <ComboboxSelectClass
                  dataSelect={selectedClass}
                  onChangeSelected={handleClassChange}
                />
              </div>

              {/* Academy Year Filter */}
              <div className="flex items-center gap-2">
                <YearSelector
                  onChange={handleYearChange}
                  value={selectedYear}
                />
              </div>

              {/* Semester Filter */}
              <div className="flex items-center gap-2">
                <ComboboxSelectSemester
                  dataSelect={selectedSemester}
                  onChangeSelected={handleSemesterChange}
                />
              </div>
            </div>

            {/* Second Row - Date Filters and Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Start Date Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Start Date:</span>
                  <Select defaultValue="select">
                    <SelectTrigger className="w-[120px] h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="select">Select</SelectItem>
                      <SelectItem value="2025-01-01">Jan 1, 2025</SelectItem>
                      <SelectItem value="2025-02-01">Feb 1, 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* End Date Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">End Date:</span>
                  <Select defaultValue="select">
                    <SelectTrigger className="w-[120px] h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="select">Select</SelectItem>
                      <SelectItem value="2025-12-31">Dec 31, 2025</SelectItem>
                      <SelectItem value="2025-06-30">Jun 30, 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <Button className="h-12 w-12 bg-black hover:bg-gray-800">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {/* Export Section */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">
                  Export Data By Class
                </span>
                <Button
                  variant="outline"
                  className="h-12 px-4 border-green-200 text-green-700 hover:bg-green-50"
                >
                  <div className="w-4 h-4 bg-green-600 rounded-sm mr-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">X</span>
                  </div>
                  Excel
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center py-8 text-muted-foreground">
            Loading...
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {StudentAttendanceTableHeader.map((header, index) => (
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
                    Empty Data
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
                      <TableCell>{staff.gender || "---"}</TableCell>

                      <TableCell>
                        <div className="flex justify-start space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => {
                                    router.push(
                                      `${ROUTE.USERS.VIEW_STAFF(
                                        String(staff.id)
                                      )}`
                                    );
                                  }}
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                                  disabled={isSubmitting}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Staff Detail</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() =>
                                    router.push(
                                      ROUTE.USERS.EDIT_STAFF(String(staff.id))
                                    )
                                  }
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                                  disabled={isSubmitting}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() =>
                                    setIsChangePasswordDialogOpen(true)
                                  }
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                                  disabled={isSubmitting}
                                >
                                  <RotateCcw className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Reset Password</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => {
                                    setSelectedStaff(staff);
                                    setIsDeleteDialogOpen(true);
                                  }}
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 bg-red-500 text-white hover:text-gray-100 hover:bg-red-600"
                                  disabled={isSubmitting}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
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
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedStaff(null);
        }}
        onDelete={handleDeleteStaff}
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
