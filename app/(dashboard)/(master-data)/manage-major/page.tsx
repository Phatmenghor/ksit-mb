"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { ROUTE } from "@/constants/routes";

import { getAllMajorService } from "@/service/master-data/major.service";
import { toast } from "sonner";
import { Constants } from "@/constants/text-string";
import { AllMajorFilterModel } from "@/model/master-data/major/type-major-model";
import {
  AllMajorModel,
  MajorModel,
} from "@/model/master-data/major/all-major-model";
import {
  MajorFormData,
  MajorFormModal,
} from "@/components/dashboard/master-data/manage-major/major-form-modal";
import { majorTableHeader } from "@/constants/table/master-data";
import Loading from "@/components/shared/loading";
import PaginationPage from "@/components/shared/pagination-page";

export default function ManageMajorPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [majors, setMajors] = useState<MajorModel | null>(null);
  const [allMajorData, setAllMajorData] = useState<AllMajorModel | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState<MajorFormData | undefined>(
    undefined
  );

  const loadMajors = useCallback(
    async (param: AllMajorFilterModel) => {
      setIsLoading(true);

      try {
        const response = await getAllMajorService({
          search: searchQuery,
          status: Constants.ACTIVE,
          ...param,
        });

        if (response) {
          setAllMajorData(response);
        } else {
          console.error("Failed to fetch rooms:");
        }
      } catch (error) {
        toast.error("An error occurred while loading rooms");
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    loadMajors({});
  }, [searchQuery, loadMajors]);

  const handleOpenAddModal = () => {
    setModalMode("add");
    setInitialData(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (majorData: MajorModel) => {
    const formData: MajorFormData = {
      id: majorData.id,
      name: majorData.name,
      code: majorData.code,
      departmentId: majorData.department.id,
      status: Constants.ACTIVE,
    };

    setModalMode("edit");
    setInitialData(formData);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: MajorFormData) => {
    console.log("### ===data", data);
    // if (modalMode === "add") {
    //   setMajors([...majors, data]);
    // } else {
    //   setMajors(majors.map((c) => (c.id === initialData?.id ? data : c)));
    // }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
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
                <BreadcrumbPage>Manage major</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h3 className="text-xl font-bold">Manage Major</h3>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search major..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <Button
              onClick={handleOpenAddModal}
              className="bg-green-900 text-white hover:bg-green-950"
            >
              <Plus className="mr-2 h-2 w-2" />
              Add New
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="overflow-x-auto mt-4">
        {isLoading ? (
          <Loading />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {majorTableHeader.map((header, index) => (
                  <TableHead key={index} className={header.className}>
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {allMajorData?.content.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No Major found
                  </TableCell>
                </TableRow>
              ) : (
                allMajorData?.content.map((major) => (
                  <TableRow key={major.id}>
                    <TableCell>{major.id}</TableCell>
                    <TableCell>
                      <span className="rounded bg-gray-100 px-2 py-1">
                        {major.code}
                      </span>
                    </TableCell>
                    <TableCell>{major.name}</TableCell>
                    <TableCell>{major.department.name}</TableCell>
                    <TableCell>
                      <div className="flex justify-end space-x-2">
                        <Button
                          onClick={() => handleOpenEditModal(major)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-gray-200"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-red-500 text-white hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && allMajorData && (
        <div className="mt-4 flex justify-end">
          <PaginationPage
            currentPage={allMajorData.pageNo}
            totalPages={allMajorData.totalPages}
            onPageChange={(page: number) => loadMajors({ pageNo: page })}
          />
        </div>
      )}

      <MajorFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={initialData}
        mode={modalMode}
      />
    </div>
  );
}
