"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTE } from "@/constants/routes";
import { useCallback, useEffect, useState } from "react";
import {
  AllRoomModel,
  RoomModel,
} from "@/model/master-data/room/all-room-model";
import { AllRoomFilterModel } from "@/model/master-data/room/type-room-model";
import {
  createRoomService,
  deletedRoomService,
  getAllRoomService,
  updateRoomService,
} from "@/service/master-data/room.service";
import { Constants } from "@/constants/text-string";
import { toast } from "sonner";
import { RoomFormData as SubjectFormData } from "@/components/dashboard/master-data/manage-room/room-form-model";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import { subjectTableHeader } from "@/constants/table/master-data";
import PaginationPage from "@/components/shared/pagination-page";
import Loading from "@/components/shared/loading";
import {
  AllSubjectModel,
  SubjectModel,
} from "@/model/master-data/subject/all-subject-model";
import { AllSubjectFilterModel } from "@/model/master-data/subject/type-subject-mode";
import {
  createSubjectService,
  deletedSubjectService,
  getAllSubjectService,
  updateSubjectService,
} from "@/service/master-data/subject.service";
import { SubjectModal } from "@/components/dashboard/master-data/manage-subject/subject-form-model";

export default function ManageRSubjectPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [subject, setSubject] = useState<SubjectModel | null>(null);
  const [allSubjectData, setAllSubjectData] = useState<AllSubjectModel | null>(
    null
  );
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState<SubjectFormData | undefined>(
    undefined
  );

  const loadSubjects = useCallback(
    async (param: AllSubjectFilterModel) => {
      setIsLoading(true);

      try {
        const response = await getAllSubjectService({
          search: searchQuery,
          status: Constants.ACTIVE,
          ...param,
        });

        if (response) {
          setAllSubjectData(response);
        } else {
          console.error("Failed to fetch subject:");
        }
      } catch (error) {
        toast.error("An error occurred while loading subject");
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    loadSubjects({});
  }, [searchQuery, loadSubjects]);

  const handleOpenAddModal = () => {
    setModalMode("add");
    setInitialData(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (room: SubjectModel) => {
    const formData: SubjectFormData = {
      id: room.id,

      name: room.name,

      status: room.status,
    };
    console.log(formData);

    setModalMode("edit");
    setInitialData(formData);
    setIsModalOpen(true);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  async function handleSubmit(formData: SubjectFormData) {
    setIsSubmitting(true);

    try {
      const roomtData = {
        name: formData.name.trim(),

        status: formData.status,
      };

      let response: RoomModel | null = null;

      if (modalMode === "add") {
        try {
          response = await createSubjectService(roomtData);

          if (response) {
            setAllSubjectData((prevData) => {
              if (!prevData) return null;
              const updatedContent = response
                ? [response, ...prevData.content]
                : [...prevData.content];

              return {
                ...prevData,
                content: updatedContent,
                totalElements: prevData.totalElements + 1,
              } as AllSubjectModel;
            });

            toast.success("Subject added successfully");
            setIsModalOpen(false);
          }
        } catch (error: any) {
          toast.error(error.message || "Failed to add subject");
        }
      } else if (modalMode === "edit" && formData.id) {
        try {
          response = await updateSubjectService(formData.id, roomtData);
          if (response) {
            setAllSubjectData((prevData) => {
              if (!prevData) return null;

              const updatedContent = prevData.content.map((dept) =>
                dept.id === formData.id && response ? response : dept
              );

              return {
                ...prevData,
                content: updatedContent,
              } as AllSubjectModel;
            });

            toast.success("Subject updated successfully");
            setIsModalOpen(false);
          }
        } catch (error: any) {
          toast.error(error.message || "Failed to update subject");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteSubject() {
    if (!subject) return;

    setIsSubmitting(true);
    try {
      const response = await deletedSubjectService(subject.id);

      if (response) {
        setAllSubjectData((prevData) => {
          if (!prevData) return null;

          const updatedContent = prevData.content.filter(
            (item) => item.id !== subject.id
          );

          return {
            ...prevData,
            content: updatedContent,
            totalElements: prevData.totalElements - 1,
          };
        });

        toast.success("Subject deleted successfully");
      } else {
        toast.error("Failed to delete subject");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the subject.");
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
    }
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
                <BreadcrumbPage>Manage Subject</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h3 className="text-xl font-bold">Manage Subject</h3>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search subject..."
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
                {subjectTableHeader.map((header, index) => (
                  <TableHead key={index} className={header.className}>
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {allSubjectData?.content.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No Room found
                  </TableCell>
                </TableRow>
              ) : (
                allSubjectData?.content.map((subject, index) => {
                  const indexDisplay =
                    ((allSubjectData.pageNo || 1) - 1) * 10 + index + 1;
                  return (
                    <TableRow key={subject.id}>
                      <TableCell>{indexDisplay}</TableCell>
                      <TableCell>{subject.name}</TableCell>

                      <TableCell>
                        <div className="flex justify-end space-x-2">
                          <Button
                            onClick={() => handleOpenEditModal(subject)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                            disabled={isSubmitting}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              setSubject(subject);
                              setIsDeleteDialogOpen(true);
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-red-500 text-white hover:bg-red-600"
                            disabled={isSubmitting}
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

      {/* Pagination */}
      {!isLoading && allSubjectData && (
        <div className="mt-4 flex justify-end">
          <PaginationPage
            currentPage={allSubjectData.pageNo}
            totalPages={allSubjectData.totalPages}
            onPageChange={(page: number) => loadSubjects({ pageNo: page })}
          />
        </div>
      )}

      {/* Subject Edit/Add Modal */}
      <SubjectModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={initialData}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteSubject}
        title="Delete Subject"
        description="Are you sure you want to delete the subject:"
        itemName={subject?.name}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
