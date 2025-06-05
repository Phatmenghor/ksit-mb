"use client";

import { Search, Eye, ChevronLeft, ChevronRight, Logs } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCallback, useEffect, useRef, useState } from "react";
import { ROUTE } from "@/constants/routes";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { YearSelector } from "@/components/shared/year-selector";
import { REQUEST_TYPES, RequestType } from "@/constants/constant";

import { toast } from "sonner";
import PaginationPage from "@/components/shared/pagination-page";
import { RequestTableHeader } from "@/constants/table/request";
import Loading from "@/components/shared/loading";
import { AllRequestModel } from "@/model/request/request-model";
import { useDebounce } from "@/utils/debounce/debounce";
import { RequestFilterModel } from "@/model/request/request-filter";
import { getAllRequestService } from "@/service/request/request.service";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/date/dd-mm-yyyy-format";
import { truncateText } from "@/utils/format/format-width-text";

export default function RequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<RequestType>({
    label: "All Requests",
    value: "PENDING",
    icon: Logs,
  });
  const [requestData, setRequestData] = useState<AllRequestModel | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // New state for storing counts
  const [requestCounts, setRequestCounts] = useState<Record<string, number>>(
    {}
  );
  const [isLoadingCounts, setIsLoadingCounts] = useState<boolean>(false);

  const router = useRouter();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchRequests = useCallback(
    async (filters: RequestFilterModel) => {
      setIsLoading(true);
      try {
        const response = await getAllRequestService({
          search: debouncedSearchQuery,
          status: selectedType?.value,
          ...filters,
        });
        setRequestData(response);
      } catch (error: any) {
        console.error("Error fetching requests:", error);
        toast.error("An error occurred while loading classes");
        setRequestData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedSearchQuery, selectedType]
  );

  // New function to fetch counts for all request types
  const fetchRequestCounts = useCallback(async () => {
    setIsLoadingCounts(true);
    try {
      const counts: Record<string, number> = {};

      // Fetch count for each request type
      for (const type of REQUEST_TYPES) {
        try {
          const response = await getAllRequestService({
            status: type.value,
            pageNo: 1,
            pageSize: 1, // We only need the total count, not the actual data
          });
          counts[type.value] = response?.totalElements || 0;
        } catch (error) {
          console.error(`Error fetching count for ${type.value}:`, error);
          counts[type.value] = 0;
        }
      }

      setRequestCounts(counts);
    } catch (error) {
      console.error("Error fetching request counts:", error);
    } finally {
      setIsLoadingCounts(false);
    }
  }, []);

  // Fetch requests
  useEffect(() => {
    if (selectedType) {
      fetchRequests({ pageNo: currentPage });
    }
  }, [selectedType, debouncedSearchQuery, currentPage, fetchRequests]);

  // Fetch counts on component mount and when search query changes
  useEffect(() => {
    fetchRequestCounts();
  }, [fetchRequestCounts, debouncedSearchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleTypeSelect = (type: RequestType) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Check in history
  const getStatusBadge = (status: string) => {
    const baseBadgeClasses =
      "w-24 h-8 flex items-center justify-center text-sm font-medium rounded-full border-0";

    switch (status.toUpperCase()) {
      case "DONE":
        return (
          <Badge
            className={`bg-green-100 text-green-800 hover:bg-green-100 ${baseBadgeClasses}`}
          >
            Done
          </Badge>
        );
      case "ACCEPTED":
        return (
          <div
            className={`bg-blue-100 text-blue-800 hover:bg-blue-100 ${baseBadgeClasses}`}
          >
            Accepted
          </div>
        );
      case "REJECTED":
        return (
          <Badge
            className={`bg-red-100 text-red-800 hover:bg-red-100 ${baseBadgeClasses}`}
          >
            Rejected
          </Badge>
        );
      case "PENDING":
        return (
          <Badge
            className={`bg-orange-100 text-orange-800 hover:bg-orange-100 hover:text-orange-800 ${baseBadgeClasses}`}
          >
            Pending
          </Badge>
        );
      case "RETURN":
        return (
          <Badge
            className={`bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800 ${baseBadgeClasses}`}
          >
            Returned
          </Badge>
        );
      default:
        return (
          <Badge
            variant="secondary"
            className={`bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800 ${baseBadgeClasses}`}
          >
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="p-15">
      <Card>
        <CardContent className="p-6 space-y-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={ROUTE.DASHBOARD}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Request List</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h3 className="text-xl font-bold">Request List</h3>
          <div className="mb-4 ">
            <div className="relative w-[60%] md:w-3/2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or ID..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="relative flex items-center my-6 ">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 z-10 rounded-full"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-2 px-16 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {REQUEST_TYPES.map((type) => {
            const IconComponent = type.icon;
            const count = requestCounts[type.value] || 0;
            const isActive = selectedType?.value === type.value;

            return (
              <Button
                key={type.label}
                variant={isActive ? "default" : "outline"}
                className="whitespace-nowrap flex items-center gap-2 relative"
                onClick={() => handleTypeSelect(type)}
                disabled={isLoadingCounts}
              >
                <IconComponent className="w-4 h-4" />
                <span>
                  {type.label} {isLoadingCounts ? "..." : `(${count})`}
                </span>
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 z-10 rounded-full"
          onClick={scrollRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        {isLoading ? (
          <Loading />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {RequestTableHeader.map((header, index) => (
                  <TableHead key={index} className={header.className}>
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {requestData?.content.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No Record
                  </TableCell>
                </TableRow>
              ) : (
                requestData?.content.map((req, index) => {
                  const indexDisplay =
                    ((requestData.pageNo || 1) - 1) * 10 + index + 1;
                  return (
                    <TableRow key={req.id}>
                      <TableCell>{indexDisplay}</TableCell>
                      <TableCell>
                        {req.user
                          ? `${req.user?.identifyNumber || "---"}`
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {req.user
                          ? `${req.user?.englishFirstName || "---"} ${
                              req.user?.englishLastName || "---"
                            }`
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {req.user ? `${req.user?.gender || "---"}` : "N/A"}
                      </TableCell>
                      <TableCell>{truncateText(req?.title, 20)}</TableCell>
                      <TableCell>
                        {formatDate(req?.createdAt || "---")}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(req?.status || "---")}
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-start space-x-2">
                          <Button
                            onClick={() => {
                              router.push(
                                `${ROUTE.REQUEST_DETAIL(String(req.id))}`
                              );
                            }}
                            variant="outline"
                            className="flex items-center gap-2 border-none bg-transparent"
                            disabled={isSubmitting}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="border-b-2">Detail</span>
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
      {!isLoading && requestData && requestData.totalPages > 1 && (
        <div className="mt-8 flex justify-end">
          <PaginationPage
            currentPage={requestData.pageNo}
            totalPages={requestData.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
