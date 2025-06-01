"use client";

import {
  Search,
  ChevronDown,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { DAYS_OF_WEEK, DayType, REQUEST_TYPE, RequestListType } from "@/constants/constant";
import { AllRoomModel } from "@/model/master-data/room/all-room-model";
import Loading from "../requests/loading";
import { roomTableHeader } from "@/constants/table/master-data";
import { AllRoomFilterModel } from "@/model/master-data/room/type-room-model";
import { getAllRoomService } from "@/service/master-data/room.service";
import { Constants } from "@/constants/text-string";
import { toast } from "sonner";
import PaginationPage from "@/components/shared/pagination-page";
import { RequestTableHeader } from "@/constants/table/request";

export default function Component() {
  const requests = [
    {
      id: 1,
      studentId: "234012001",
      fullName: "Kao Visal",
      gender: "Male",
      requestType: "ប្រវត្តិរូប និងសញ្ញាបត្របណ្ឌិត",
      requestDate: "11-06-2024",
      status: "pending",
    },
    {
      id: 2,
      studentId: "234012009",
      fullName: "CHIM SIEVI",
      gender: "Female",
      requestType: "ប្រវត្តិរូបការសិក្សា",
      requestDate: "11-04-2024",
      status: "pending",
    },
    {
      id: 3,
      studentId: "234012001",
      fullName: "Kao Visal",
      gender: "Male",
      requestType: "ប្រវត្តិរូបការសិក្សា",
      requestDate: "10-31-2024",
      status: "approved",
    },
    {
      id: 4,
      studentId: "234012007",
      fullName: "CHEA LONG",
      gender: "Female",
      requestType: "សញ្ញាបត្របណ្ឌិត",
      requestDate: "10-28-2024",
      status: "rejected",
    },
  ];


  //   room
  const [allRoomData, setAllRoomtData] = useState<AllRoomModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");


  const loadRooms = useCallback(
    async (param: AllRoomFilterModel) => {
      setIsLoading(true);

      try {
        const response = await getAllRoomService({
          search: searchQuery,
          status: Constants.ACTIVE,
          ...param,
        });

        if (response) {
          setAllRoomtData(response);
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
    loadRooms({});
  }, [searchQuery, loadRooms]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<RequestListType | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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

  const handleTypeSelect = (type: RequestListType) => {
    setSelectedType(type);
    setCurrentPage(1);
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
          <div className="mb-4 flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative w-full md:w-3/2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or ID..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <div className="flex items-center gap-2">
              <YearSelector value={selectedYear} onChange={setSelectedYear} />
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
          {REQUEST_TYPE.map((type) => {
            const IconComponent = type.icon;
            return (
              <Button
                key={type.id}
                variant={selectedType?.id === type.id ? "default" : "outline"}
                className="whitespace-nowrap flex items-center gap-2"
                onClick={() => handleTypeSelect(type)}
              >
                <IconComponent className="w-4 h-4" />
                {type.displayName}
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
              {allRoomData?.content.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No Room found
                  </TableCell>
                </TableRow>
              ) : (
                allRoomData?.content.map((room, index) => {
                  const indexDisplay =
                    ((allRoomData.pageNo || 1) - 1) * 10 + index + 1;
                  return (
                    <TableRow key={room.id}>
                      <TableCell>{indexDisplay}</TableCell>
                      <TableCell>{room?.name}</TableCell>

                      <TableCell>
                        <div className="flex justify-start space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 border-none bg-transparent"
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
      {!isLoading && allRoomData && (
        <div className="mt-4 flex justify-end">
          <PaginationPage
            currentPage={allRoomData.pageNo}
            totalPages={allRoomData.totalPages}
            onPageChange={(page: number) => loadRooms({ pageNo: page })}
          />
        </div>
      )}
    </div>
  );
}