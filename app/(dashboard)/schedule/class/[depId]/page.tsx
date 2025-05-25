"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTE } from "@/constants/routes";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { AllMajorFilterModel } from "@/model/master-data/major/type-major-model";
import { getAllMajorService } from "@/service/master-data/major.service";
import { Constants } from "@/constants/text-string";
import { toast } from "sonner";
import { AllMajorModel } from "@/model/master-data/major/all-major-model";
import { AllClassModel } from "@/model/master-data/class/all-class-model";
import { getAllClassService } from "@/service/master-data/class.service";
import { ClassCard } from "@/components/dashboard/schedule/class/classCard";

const ClassSchedulePage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [allMajorData, setAllMajorData] = useState<AllMajorModel | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<number | null>(null);
  const [allClassData, setAllClassData] = useState<AllClassModel | null>(null);
  const [isLoadingClasses, setIsLoadingClasses] = useState<boolean>(false);
  const params = useParams();
  const depId = params?.depId ? Number(params.depId) : null;

  const loadMajors = useCallback(
    async (param: AllMajorFilterModel) => {
      console.log("#", param);
      try {
        const response = await getAllMajorService({
          search: searchQuery,
          status: Constants.ACTIVE,
          departmentId: depId || undefined,
          ...param,
        });

        if (response) {
          setAllMajorData(response);
          if (
            !selectedMajor &&
            response.content &&
            response.content.length > 0
          ) {
            setSelectedMajor(response.content[0].id);
            console.log("####", response.content[0].id);

            setIsLoadingClasses(true);
            try {
              const responseListClass = await getAllClassService({
                status: Constants.ACTIVE,
                majorId: response.content[0].id || undefined,
              });
              setAllClassData(responseListClass);
              console.log("##hi", responseListClass);
            } catch (error) {
              console.error("Failed to fetch initial classes", error);
              toast.error("Failed to load classes");
            } finally {
              setIsLoadingClasses(false);
            }
          }
        } else {
          console.error("Failed to fetch majors:");
          toast.error("Failed to load majors");
        }
      } catch (error) {
        toast.error("An error occurred while loading majors");
      }
    },
    [searchQuery, selectedMajor, depId]
  );

  useEffect(() => {
    loadMajors({});
  }, [searchQuery, loadMajors]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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

  const handleMajorSelect = async (majorId: number) => {
    setSelectedMajor(majorId);
    console.log(`Selected major ID: ${majorId}`);

    setIsLoadingClasses(true);
    try {
      const responseListClass = await getAllClassService({
        status: Constants.ACTIVE,
        majorId: majorId || undefined,
      });
      setAllClassData(responseListClass);
      console.log("##hi", responseListClass);
    } catch (error) {
      console.error("Failed to fetch classes", error);
      toast.error("Failed to load classes for selected major");
    } finally {
      setIsLoadingClasses(false);
    }
  };

  const handleViewSchedule = (classData: any) => {
    console.log("View schedule for class:", classData);
    toast.info(`Viewing schedule for Class ${classData.code}`);
  };

  const handleAddSchedule = (classData: any) => {
    console.log("Add schedule for class:", classData);
    toast.info(`Adding schedule for Class ${classData.code}`);
  };

  const formatYearLevel = (yearLevel: string) => {
    return yearLevel
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatDegree = (degree: string) => {
    return degree.charAt(0).toUpperCase() + degree.slice(1).toLowerCase();
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
                <BreadcrumbPage>Department List</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Class List</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {allMajorData?.content?.[0]?.department?.name && (
            <h3 className="text-xl font-bold">
              {allMajorData.content[0].department.name}
            </h3>
          )}

          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search class..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Majors Selection */}
      <div className="relative flex items-center my-6">
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
          {allMajorData?.content?.map((major) => (
            <Button
              key={major.id}
              variant={selectedMajor === major.id ? "default" : "outline"}
              className="whitespace-nowrap"
              onClick={() => handleMajorSelect(major.id)}
            >
              {major.name}
            </Button>
          ))}
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

      {/* Display Classes */}
      {selectedMajor && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">
                Classes for{" "}
                {allMajorData?.content?.find((m) => m.id === selectedMajor)
                  ?.name || "Selected Major"}
              </h4>

              {isLoadingClasses ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-sm text-muted-foreground">
                    Loading classes...
                  </div>
                </div>
              ) : allClassData?.content && allClassData.content.length > 0 ? (
                <div className="space-y-4">
                  {allClassData.content.map((classItem: any) => (
                    <ClassCard
                      key={classItem.id}
                      classNumber={classItem.code}
                      degree={formatDegree(classItem.degree)}
                      year={formatYearLevel(classItem.yearLevel)}
                      academyYear={classItem.academyYear.toString()}
                      onViewSchedule={() => handleViewSchedule(classItem)}
                      onAddSchedule={() => handleAddSchedule(classItem)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <div className="text-sm text-muted-foreground">
                    No classes found for this major. Try selecting a different
                    major.
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Show message when no major is selected */}
      {!selectedMajor &&
        allMajorData?.content &&
        allMajorData.content.length === 0 && (
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground">
                  No majors found. Try adjusting your search criteria.
                </div>
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  );
};

export default ClassSchedulePage;
