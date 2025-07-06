"use client";

import { useCallback, useEffect, useState } from "react";
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
import { Eye } from "lucide-react";
import { CardHeaderSection } from "@/components/shared/layout/card-header-section";
import { ROUTE } from "@/constants/routes";
import { YearSelector } from "@/components/shared/year-selector";
import { ComboboxSelectSemester } from "@/components/shared/ComboBox/combobox-semester";
import { SemesterModel } from "@/model/master-data/semester/semester-model";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScoreSubmittedTableHeader } from "@/constants/table/score";
import { toast } from "sonner";
import { SubmittedScoreParam } from "@/model/score/submitted-score/submitted-score.request.model";
import { useDebounce } from "@/utils/debounce/debounce";
import { getAllSubmittedScoreService } from "@/service/score/score.service";
import { SubmissionEnum, tabs } from "@/constants/constant";
import { useRouter } from "next/navigation";
import PaginationPage from "@/components/shared/pagination-page";
import { AllStudentScoreModel } from "@/model/score/student-score/student-score.response";

export default function ScoreSubmittedPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [submissions, setSubmissions] = useState<AllStudentScoreModel | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectAcademicYear, setSelectAcademicYear] = useState<
    number | undefined
  >();
  const [selectedSemester, setSelectedSemester] = useState<
    SemesterModel | undefined
  >(undefined);
  const router = useRouter();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Get current tab's status
  const getCurrentTabStatus = useCallback(() => {
    const currentTab = tabs.find((tab) => tab.value === activeTab);
    return currentTab?.status || SubmissionEnum.SUBMITTED;
  }, [activeTab]);

  const loadSubmittedScore = useCallback(
    async (param: SubmittedScoreParam) => {
      setIsLoading(true);

      try {
        const currentStatus = getCurrentTabStatus();
        const response = await getAllSubmittedScoreService({
          ...param,
          status: currentStatus,
          search: debouncedSearchQuery,
        });
        console.log("Submission: ", response);

        if (response) {
          setSubmissions(response);
        } else {
          console.error("Failed to fetch submissions:");
        }
      } catch (error) {
        console.error("Error loading submissions:", error);
        toast.error("An error occurred while loading submissions");
      } finally {
        setIsLoading(false);
      }
    },
    [
      debouncedSearchQuery,
      getCurrentTabStatus,
      selectAcademicYear,
      selectedSemester,
    ]
  );

  // Load data when dependencies change
  useEffect(() => {
    loadSubmittedScore({});
  }, [loadSubmittedScore]);

  // Reset pagination when tab changes
  useEffect(() => {
    setSubmissions(null); // Clear current data
    loadSubmittedScore({ pageNo: 1 }); // Load first page of new tab
  }, [activeTab]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleYearChange = (e: number) => {
    setSelectAcademicYear(e);
  };

  const handleSemesterChange = (e: SemesterModel | null) => {
    setSelectedSemester(e ?? undefined);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Get table content based on active tab
  const renderTableContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
        </div>
      );
    }

    if ((submissions?.content?.length ?? 0) === 0) {
      const emptyMessage =
        activeTab === "all"
          ? "No submitted scores found."
          : "No approved scores found.";

      return (
        <div className="w-full flex justify-center items-center text-center p-4 text-gray-500">
          <p>{emptyMessage}</p>
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            {ScoreSubmittedTableHeader.map((header) => (
              <TableHead key={header.id} className={header.className}>
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions?.content.map((submission, index) => {
            const indexDisplay =
              ((submissions.pageNo || 1) - 1) * (submissions.pageSize || 10) +
              index +
              1;

            return (
              <TableRow key={submission.id}>
                <TableCell>{indexDisplay}</TableCell>
                <TableCell>{submission.teacherId}</TableCell>
                <TableCell className="font-medium">
                  {submission.teacherName}
                </TableCell>
                <TableCell>{submission.courseName}</TableCell>
                <TableCell>{submission.semester}</TableCell>
                <TableCell>{submission.classCode}</TableCell>
                <TableCell>{submission.submissionDate}</TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      router.push(
                        ROUTE.SCORES.SUBMITTED_DETAIL(String(submission.id))
                      )
                    }
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full space-y-4"
    >
      <CardHeaderSection
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          { label: "Score Submitted", href: ROUTE.STUDENTS.LIST },
        ]}
        searchValue={searchQuery}
        searchPlaceholder="Search..."
        onSearchChange={handleSearchChange}
        customSelect={
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-4">
            <div className="w-full min-w-[200px] md:w-1/2">
              <YearSelector
                title="Select Year"
                onChange={handleYearChange}
                value={selectAcademicYear || 0}
              />
            </div>
            <div className="w-full min-w-[200px] md:w-1/2">
              <ComboboxSelectSemester
                dataSelect={selectedSemester ?? null}
                onChangeSelected={handleSemesterChange}
              />
            </div>
          </div>
        }
        tabs={
          <div className="container mx-auto mt-3">
            <TabsList className="flex w-full border-b gap-6 pb-1 bg-transparent justify-start">
              {tabs.map(({ value, label, icon: Icon }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className={`relative pb-2 text-sm font-medium transition-colors duration-200 px-1 hover:text-primary data-[state=active]:text-primary`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </div>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 transition-all duration-200 ${
                      activeTab === value ? "bg-primary" : "bg-transparent"
                    }`}
                  />
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        }
      />

      {/* All Submitted Tab */}
      <TabsContent value="all" className="space-y-4 w-full">
        <Card>
          <CardContent className="p-0">{renderTableContent()}</CardContent>
        </Card>

        {!isLoading && submissions && (
          <div className="mt-4 flex justify-end">
            <PaginationPage
              currentPage={submissions.pageNo}
              totalPages={submissions.totalPages}
              onPageChange={(page: number) =>
                loadSubmittedScore({ pageNo: page })
              }
            />
          </div>
        )}
      </TabsContent>

      {/* Accept List Tab */}
      <TabsContent value="accept" className="space-y-4 w-full">
        {renderTableContent()}

        {!isLoading && submissions && (
          <div className="mt-4 flex justify-end">
            <PaginationPage
              currentPage={submissions.pageNo}
              totalPages={submissions.totalPages}
              onPageChange={(page: number) =>
                loadSubmittedScore({ pageNo: page })
              }
            />
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
