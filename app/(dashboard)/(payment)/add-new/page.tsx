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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Edit, Filter, Pencil, Plus, Search, Trash2, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { ROUTE } from "@/constants/routes";
import { YearSelector } from "@/components/shared/year-selector";
import { AllMajorFilterModel } from "@/model/master-data/major/type-major-model";
import {
  createClassService,
  deleteClassService,
  getAllClassService,
  updateClassService,
} from "@/service/master-data/class.service";
import { Constants } from "@/constants/text-string";
import {
  AllClassModel,
  ClassModel,
} from "@/model/master-data/class/all-class-model";
import { toast } from "sonner";
import { classTableHeader } from "@/constants/table/master-data";
import PaginationPage from "@/components/shared/pagination-page";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import {
  ClassFormData,
  ClassFormModal,
} from "@/components/dashboard/master-data/manage-class/class-form-modal";
import { DegreeEnum } from "@/constants/constant";
import Loading from "@/components/shared/loading";
import { useDebounce } from "@/utils/debounce/debounce";
import {
  PaymentTableHeader,
  PaymentTableHeaderList,
} from "@/constants/payment/payment";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { getAllPaymentService } from "@/service/payment/payment.service";
import {
  AllPaymentFilterModel,
  AllPaymentModel,
} from "@/model/payment/payment-model";
import { error } from "console";
import { PaymentFormData, PaymentFormModal } from "@/components/dashboard/payment/payment-form-model";
const courseFormSchema = z.object({
  subjectCode: z.string().min(1, "Subject code is required"),
  subjectNameKh: z.string().optional(),
  subjectNameEn: z.string().min(1, "Subject name in English is required"),
  credit: z.string().min(1, "Credit is required"),
  theory: z.string().min(1, "Theory is required"),
  execute: z.string().min(1, "Execute is required"),
  apply: z.string().min(1, "Apply is required"),
  departmentId: z.number().min(1, "Department is required"),
  subjectTypeId: z.number().min(1, "Subject type is required"),
  instructorId: z.number().min(1, "Instructor is required"),
  totalHours: z.string().min(1, "Total hours is required"),
  description: z.string().optional(),
  purpose: z.string().optional(),
  expectedOutcome: z.string().optional(),
});
export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassModel | null>(null);
  const [allPaymentData, setAllPaymentData] = useState<AllPaymentModel | null>(
    null
  );
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [isAddNew, setIsAddNew] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<PaymentFormData | undefined>(
    undefined
  );
  const [rows, setRows] = useState<PaymentRequest[]>([]);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const loadClass = useCallback(
    async (param: AllMajorFilterModel = {}) => {
      setIsLoading(true);
      try {
        const response = await getAllClassService({
          search: debouncedSearchQuery,
          status: Constants.ACTIVE,
          academyYear: selectedYear,
          ...param,
        });

        if (response) {
          setAllPaymentData(response);
        } else {
          toast.error("Failed to fetch class data");
        }
      } catch (error) {
        console.error("Error fetching class data:", error);
        toast.error("An error occurred while loading class data");
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedSearchQuery, selectedYear]
  );
  const form = useForm({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      item: "",
      type: "",
      percentage: "",
      amount: "",
      comment: "",
      date: "",
    },
  });
  // useEffect(() => {
  //   loadClass();
  // }, [loadClass, debouncedSearchQuery, selectedYear]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenAddModal = () => {
    setModalMode("add");
    setInitialData(undefined);
    setIsModalOpen(true);
  };

  // const handleOpenEditModal = (classData: ClassModel) => {
  //   setSelectedClass(classData);
  //   const formData: ClassFormData = {
  //     id: classData.id,
  //     academyYear: Number(classData.academyYear),
  //     code: classData.code,
  //     degree: classData.degree as DegreeEnum,
  //     status: Constants.ACTIVE,
  //     yearLevel: classData.yearLevel,
  //     majorId: classData.major.id,
  //     selectedMajor: classData.major,
  //   };
  //   setInitialData(formData);
  //   setModalMode("edit");
  //   setIsModalOpen(true);
  // };

  //   async function handleDeleteClass() {
  //     if (!selectedClass) return;

  //     setIsSubmitting(true);
  //     try {
  //       const originalData = allPaymentData
  // ;
  //       setallPaymentData
  // ((prevData) => {
  //         if (!prevData) return null;
  //         const updatedContent = prevData.content.filter(
  //           (item) => item.id !== selectedClass.id
  //         );
  //         return {
  //           ...prevData,
  //           content: updatedContent,
  //           totalElements: prevData.totalElements - 1,
  //         };
  //       });

  //       const response = await deleteClassService(selectedClass.id);

  //       if (response) {
  //         toast.success(`Class ${selectedClass.code} deleted successfully`);
  //       } else {
  //         setallPaymentData
  //   (originalData);
  //         toast.error("Failed to delete class");
  //       }
  //     } catch (error) {
  //       console.error("Error deleting class:", error);
  //       toast.error("An error occurred while deleting the class");
  //       loadClass({});
  //     } finally {
  //       setIsSubmitting(false);
  //       setIsDeleteDialogOpen(false);
  //     }
  //   }

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };
  const handleAddNew = () => {
    setIsAddNew(false);
     setModalMode("add");
    setInitialData(undefined);
  };
  const handleSubmited = async (
    data: PaymentFormData
  ) => {
    alert("click");
    setIsSubmitting(true);

    // try {
    //   setRows((prev) => [...prev, data]); // ⬅️ Add the new row
    //   form.reset(); // Optional: reset form after adding
    // } catch (error: any) {
    //   toast.error(error.message || "Failed to add row");
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const handleSave = () => {
    //setIsAddNew(true);
    setIsEdit(true);
  };

  const payment = useCallback(async (param: AllPaymentFilterModel) => {
    setIsLoading(true);

    try {
      const response = await getAllPaymentService({
        search: searchQuery,
        status: Constants.ACTIVE,
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
  console.log("set data", allPaymentData);
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 space-y-2 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-3">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 overflow-hidden">
              <img
                src="./image"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
                draggable={false} // optional
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 space-y-2">
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <p>ការបង់ថ្លៃផ្សេងៗ</p>
            </div>

            <div className="flex items-center gap-2">
              {isAddNew && (
                <Button
                  onClick={handleAddNew}
                  className="bg-green-900 text-white hover:bg-green-950"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New
                </Button>
              )}
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
              isAddNew && (
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
                          colSpan={classTableHeader.length}
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
                            {/* <TableCell>{indexDisplay}</TableCell> */}

                            <TableCell>{pay.item}</TableCell>

                            <TableCell>{pay.type}</TableCell>
                            <TableCell>{pay.percentage}</TableCell>
                            <TableCell>{pay.amount}</TableCell>
                            <TableCell>{pay.date}</TableCell>
                            <TableCell>{pay.commend}</TableCell>
                            <TableCell>
                              <div className="flex  ">
                                <Button
                                  onClick={() => {
                                    setIsDeleteDialogOpen(true);
                                  }}
                                  variant="link"
                                  size="icon"
                                  className="flex  text-red-500 "
                                  disabled={isSubmitting}
                                  title="Delete"
                                >
                                  <span className="flex items-center gap-1 underline">
                                    <Trash2 className="" size="icon" />
                                    Delete
                                  </span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              )
            )}
          </div>
        </CardContent>
      </Card>
      {/* {!isAddNew && (
        <Card>
          <CardContent className="flex gap-2 justify-end items-end py-2">
            <Button
              size="sm"
              type="submit"
              className="bg-white border text-gray-700 border-gray-300 hover:bg-transparent"
              color="primary"
            >
              Discard
            </Button>
            <Button size="sm" onClick={handleSave} className="">
              Save
            </Button>
          </CardContent>
        </Card>
      )} */}

         <PaymentFormModal
        isOpen={isAddNew}
        mode={modalMode}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmited}
        initialData={initialData}
        isSubmitting={isSubmitting}
      />

      {/* Pagination */}
      {!isLoading && allPaymentData && allPaymentData.totalPages > 1 && (
        <div className="mt-4 flex justify-end">
          <PaginationPage
            currentPage={allPaymentData.pageNo}
            totalPages={allPaymentData.totalPages}
            onPageChange={(page: number) => loadClass({ pageNo: page })}
          />
        </div>
      )}

      {/* Modals */}
      {/* <ClassFormModal
        isOpen={isModalOpen}
        mode={modalMode}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={initialData}
        isSubmitting={isSubmitting}
      /> */}

      {/* <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteClass}
        title="Delete Class"
        description={`Are you sure you want to delete the class: ${selectedClass?.code}?`}
        itemName={selectedClass?.code}
        isSubmitting={isSubmitting}
      /> */}
    </div>
  );
}
