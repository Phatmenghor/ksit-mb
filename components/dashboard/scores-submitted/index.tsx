"use client";

import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Filter,
  Plus,
  FileText,
  Eye,
  Download,
  Trash2,
  Check,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { ROUTE } from "@/constants/routes";
import { YearSelector } from "@/components/shared/year-selector";
import { ComboboxSelectSemester } from "@/components/shared/ComboBox/combobox-semester";
import { SemesterModel } from "@/model/master-data/semester/semester-model";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScoreSubmittedTableHeader } from "@/constants/table/score";

interface ScoreSubmission {
  id: string;
  subjectCode: string;
  subjectName: string;
  classId: string;
  semester: string;
  academicYear: string;
  submittedBy: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
}
interface ScoreSubmittedPageProps {
  onViewSubmission: (id: string) => void;
  onNewSubmission: () => void;
}

const tabs = [
  {
    value: "all",
    label: "All Submitted",
    icon: MenuIcon,
  },
  {
    value: "accept",
    label: "Accept List",
    icon: Check,
  },
];

export function ScoreSubmittedPage({
  onViewSubmission,
  onNewSubmission,
}: ScoreSubmittedPageProps) {
  const [year, setYear] = useState("2025");
  const [activeTab, setActiveTab] = useState("all");
  const [semester, setSemester] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [submissions, setSubmissions] = useState<ScoreSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectAcademicYear, setSelectAcademicYear] = useState<
    number | undefined
  >();
  const [selectedSemester, setSelectedSemester] = useState<
    SemesterModel | undefined
  >(undefined);

  // Function to handle search/filter
  const handleSearch = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, we'll show some data if specific filters are applied
      if (year === "2024" && semester === "2") {
        setSubmissions([
          {
            id: "1",
            subjectCode: "401220",
            subjectName: "Project in Computer Science 1",
            classId: "234012",
            semester: "2",
            academicYear: "2024",
            submittedBy: "Tong Vuthea",
            submittedDate: "2024-04-15 14:30:22",
            status: "approved",
          },
          {
            id: "2",
            subjectCode: "401204",
            subjectName: "Data Communication and Network",
            classId: "234012",
            semester: "2",
            academicYear: "2024",
            submittedBy: "Tong Vuthea",
            submittedDate: "2024-04-10 09:15:45",
            status: "approved",
          },
        ]);
      } else if (year === "2025" && semester === "1") {
        setSubmissions([
          {
            id: "3",
            subjectCode: "401101",
            subjectName: "Computer Assembly and Software Installation",
            classId: "254013",
            semester: "1",
            academicYear: "2025",
            submittedBy: "Tong Vuthea",
            submittedDate: "2025-05-03 16:42:10",
            status: "pending",
          },
        ]);
      } else {
        setSubmissions([]);
      }

      setIsLoading(false);
    }, 500);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleYearChange = (e: number) => {
    setSelectAcademicYear(e);
  };

  const handleSmesterChange = (e: SemesterModel | null) => {
    setSelectedSemester(e ?? undefined);
  };

  // Function to handle new submission
  const handleNewSubmission = () => {
    // Navigate to score input page
    console.log("Navigate to new score submission page");
  };

  // Function to handle accept list
  const handleAcceptList = () => {
    // Logic to accept selected submissions
    console.log("Accept selected submissions");
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full space-y-4"
    >
      {" "}
      <CardHeaderSection
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          { label: "Score Submitted", href: ROUTE.STUDENTS.LIST },
        ]}
        searchValue={searchQuery}
        searchPlaceholder="Search..."
        onSearchChange={handleSearchChange}
        buttonText="Submitted List"
        buttonHref={ROUTE.STUDENTS.ADD_SINGLE}
        buttonIcon={<Plus className="mr-2 h-2 w-2" />}
        customSelect={
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-4">
            <div className="w-full min-w-[200px] md:w-1/2">
              <div className="w-full min-w-[200px]">
                <YearSelector
                  title="Select Year"
                  onChange={handleYearChange}
                  value={selectAcademicYear || 0}
                />
              </div>
            </div>

            <div className="w-full min-w-[200px] md:w-1/2">
              <ComboboxSelectSemester
                dataSelect={selectedSemester ?? null}
                onChangeSelected={handleSmesterChange}
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
      <TabsContent value="all" className="space-y-4 w-full">
        <Card>
          <CardContent className="p-0">
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
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
                </div>
              ) : submissions.length > 0 ? (
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <Input type="checkbox" className="rounded" />
                      </TableCell>
                      <TableCell>{submission.subjectCode}</TableCell>
                      <TableCell className="font-medium text-blue-600">
                        {submission.subjectName}
                      </TableCell>
                      <TableCell>{submission.classId}</TableCell>
                      <TableCell>{submission.semester}</TableCell>
                      <TableCell>{submission.academicYear}</TableCell>
                      <TableCell>{submission.submittedBy}</TableCell>
                      <TableCell>{submission.submittedDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            submission.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : submission.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {submission.status.charAt(0).toUpperCase() +
                            submission.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <div className="w-full flex justify-center items-center text-center p-4 text-gray-500">
                  <p>Score submitted no record.</p>
                </div>
              )}
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
