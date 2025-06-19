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
import { Edit, Filter, Pencil, Plus, Search, Trash2, User } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ROUTE } from "@/constants/routes";
import { Constants } from "@/constants/text-string";
import { toast } from "sonner";
import PaginationPage from "@/components/shared/pagination-page";
import Loading from "@/components/shared/loading";
import { useDebounce } from "@/utils/debounce/debounce";
import { PaymentTableHeader } from "@/constants/payment/payment";
import {
  createPaymentService,
  deletedPaymentService,
  getAllPaymentService,
  updatePaymentService,
} from "@/service/payment/payment.service";
import {
  AllPaymentFilterModel,
  AllPaymentModel,
  PaymentModel,
} from "@/model/payment/payment-model";
import {
  PaymentFormData,
  PaymentFormModal,
} from "@/components/dashboard/payment/payment-form-model";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useParams } from "next/navigation";
import { UserProfileSection } from "@/components/dashboard/users/shared/user-profile";
import { CardHeaderSection } from "@/components/shared/layout/card-header-section";
import { StudentByIdModel } from "@/model/user/student/student.respond.model";
import { getStudentByIdService } from "@/service/user/student.service";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";

export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentModel | null>(
    null
  );
  const [allPaymentData, setAllPaymentData] = useState<AllPaymentModel | null>(
    null
  );
  const params = useParams();
  const id = params?.id ? Number(params.id) : 0;
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<PaymentFormData | undefined>(
    undefined
  );
  const [studentDetail, setStudentDetail] = useState<StudentByIdModel | null>(
    null
  );

  const [rows, setRows] = useState<PaymentRequest[]>([]);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenAddModal = () => {
    setModalMode("add");
    setInitialData(undefined);
    setIsModalOpen(true);
  };
  console.log("idd", id);
  const handleOpenEditModal = (data: PaymentModel) => {
    const formData: PaymentFormData = {
      id: data.id,
      amount: data.amount,
      comment: data.commend,
      item: data.item,
      percentage: data.percentage,
      type: data.type,
    };
    console.log("This data update", formData);

    setModalMode("edit");
    setInitialData(formData);
    setIsModalOpen(true);
  };
  const handleAddNew = () => {
    setIsModalOpen(true);
    setModalMode("add");
    setInitialData(undefined);
  };
  async function handleSubmit(formData: PaymentFormData) {
    setIsSubmitting(true);
    let response: any;
    try {
      if (modalMode === "add") {
        try {
          const payload = {
            item: formData.item, // required
            type: formData.type, // required, use enum
            amount: formData.amount, // optional
            percentage: formData.percentage, // optional
            date: new Date().toISOString().split("T")[0], // required, format: $date (ISO string)
            status: "ACTIVE", // optional, use enum
            commend: formData.comment, // optional
            userId: id,
          };
          response = await createPaymentService(payload);
          if (response) {
            setAllPaymentData((prevData) => {
              if (!prevData) return null;
              const updatedContent = response
                ? [response, ...prevData.content]
                : [...prevData.content];

              return {
                ...prevData,
                content: updatedContent,
                totalElements: prevData.totalElements + 1,
              } as AllPaymentModel;
            });

            toast.success("Payment added successfully");
            setIsModalOpen(false);
          }
        } catch (error: any) {
          toast.error(error.message || "Failed to add payment");
        }
      } else if (modalMode === "edit" && formData.id) {
        const payload = {
          item: formData.item,
          type: formData.type,
          amount: formData.amount,
          percentage: formData.percentage,
          date: new Date().toISOString().split("T")[0],
          status: "ACTIVE",
          commend: formData.comment,
          userId: id,
        };
        console.log("here is id :", formData.id);
        try {
          response = await updatePaymentService(formData.id, payload);
          if (response) {
            setAllPaymentData((prevData) => {
              if (!prevData) return null;

              const updatedContent = prevData.content.map((dept) =>
                dept.id === formData.id && response ? response : dept
              );

              return {
                ...prevData,
                content: updatedContent,
              } as AllPaymentModel;
            });

            toast.success("Payment updated successfully");
            setIsModalOpen(false);
          }
        } catch (error: any) {
          toast.error(error.message || "Failed to update payment");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }
  const loadInfo = async () => {
    setIsLoading(true);
    try {
      const response = await getStudentByIdService(id.toString());
      if (response) {
        setStudentDetail(response);
      } else {
        toast.error("Error getting student data");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadInfo();
  }, [id]);
  const payment = useCallback(async (param: AllPaymentFilterModel) => {
    setIsLoading(true);

    try {
      const response = await getAllPaymentService({
        search: searchQuery,
        status: Constants.ACTIVE,
        userId: id,
        ...param,
      });

      if (response) {
        setAllPaymentData(response);
        console.log("reapone :", response);
      } else {
        console.error("Failed to fetch :");
      }
    } catch (error) {
      toast.error("An error occurred while loading departments");
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    payment({});
  }, [searchQuery, payment]);
  async function handleDeletePayment() {
    if (!selectedPayment) return;
    setIsSubmitting(true);
    try {
      const response = await deletedPaymentService(selectedPayment.id);

      if (response) {
        setAllPaymentData((prevData) => {
          if (!prevData) return null;

          const updatedContent = prevData.content.filter(
            (item) => item.id !== selectedPayment.id
          );

          return {
            ...prevData,
            content: updatedContent,
            totalElements: prevData.totalElements - 1,
          };
        });

        toast.success("Payment deleted successfully");
      } else {
        toast.error("Failed to delete payment");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the subject.");
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
    }
  }
  const profile = studentDetail
    ? {
        id: studentDetail.id,
        username: studentDetail.username,
        profileUrl: studentDetail.profileUrl,
      }
    : null;
  console.log("set data", allPaymentData);
  return (
    <div className="space-y-4">
      {/* Header with TabsList injected via prop */}
      <CardHeaderSection
        title={`View Student ${studentDetail?.englishFirstName ?? "N/A"}`}
        back
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          {
            label: "Student payment",
            href: ROUTE.PAYMENT.VIEW_PAYMENT(id.toString()),
          },
        ]}
      />

      {/* Tab Content outside the header */}
      <UserProfileSection user={profile} />
      <Card>
        <CardContent className="p-6 space-y-2">
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <p>ការបង់ថ្លៃផ្សេងៗ</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={handleAddNew}
                className="bg-green-900 text-white hover:bg-green-950"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>

              {isEdit && (
                <Button
                  onClick={handleAddNew}
                  className="bg-orange-400 text-white hover:bg-orange-500"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Update
                </Button>
              )}
            </div>
          </div>
          <div className="overflow-x-auto">
            {isLoading ? (
              <Loading />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    {PaymentTableHeader.map((header, index) => (
                      <TableHead key={index} className={header.className}>
                        {header.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allPaymentData?.content.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={PaymentTableHeader.length}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No Records
                      </TableCell>
                    </TableRow>
                  ) : (
                    allPaymentData?.content.map((pay, index) => {
                      const indexDisplay =
                        ((allPaymentData.pageNo || 1) - 1) *
                          (allPaymentData.pageSize || 10) +
                        index +
                        1;
                      return (
                        <TableRow key={pay.id}>
                          <TableCell>{indexDisplay}</TableCell>

                          <TableCell>{pay.item}</TableCell>

                          <TableCell>{pay.type}</TableCell>
                          <TableCell>{pay.percentage}</TableCell>
                          <TableCell>{pay.amount}</TableCell>
                          <TableCell>{pay.date}</TableCell>
                          <TableCell>{pay.commend}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      onClick={() => handleOpenEditModal(pay)}
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
                                      onClick={() => {
                                        setSelectedPayment(pay);
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
        </CardContent>
      </Card>

      {/* Pagination */}
      {!isLoading && allPaymentData && allPaymentData.totalPages > 1 && (
        <div className="mt-4 flex justify-end">
          <PaginationPage
            currentPage={allPaymentData.pageNo}
            totalPages={allPaymentData.totalPages}
            onPageChange={(page: number) => payment({ pageNo: page })}
          />
        </div>
      )}

      {/* Modals */}
      <PaymentFormModal
        isOpen={isModalOpen}
        mode={modalMode}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={initialData}
        isSubmitting={isSubmitting}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeletePayment}
        title="Delete payment"
        description="Are you sure you want to delete the payment : "
        itemName={selectedPayment?.item}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
