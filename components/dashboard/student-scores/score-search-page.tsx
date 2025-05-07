"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import type { SubjectType } from "@/model/score-types";

interface ScoreSearchPageProps {
  selectedYear: string;
  selectedSemester: string;
  subjects: SubjectType[];
  onSearch: (year: string, semester: string) => void;
  onSelectSubject: (subject: SubjectType) => void;
}

export function ScoreSearchPage({
  selectedYear = "2025",
  selectedSemester = "1",
  subjects = [],
  onSearch,
  onSelectSubject,
}: ScoreSearchPageProps) {
  const [year, setYear] = useState(selectedYear);
  const [semester, setSemester] = useState(selectedSemester);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    onSearch(year, semester);
    setHasSearched(true);
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Search your subject here
          </label>
          <div className="flex gap-2">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">ឆ្នាំសិក្សា 2025</SelectItem>
                <SelectItem value="2024">ឆ្នាំសិក្សា 2024</SelectItem>
                <SelectItem value="2023">ឆ្នាំសិក្សា 2023</SelectItem>
              </SelectContent>
            </Select>

            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">ឆមាសទី 1</SelectItem>
                <SelectItem value="2">ឆមាសទី 2</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {hasSearched && (
          <div className="mt-6">
            <div className="flex items-center gap-1 mb-2">
              <Search className="h-4 w-4" />
              <span className="font-medium">Your subject</span>
            </div>
            <div className="text-sm mb-4">
              Semester: {semester} - Academy year: {year}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {subjects.length > 0 ? (
                subjects.map((subject) => (
                  <Card
                    key={subject.id}
                    className="border border-l-4 border-l-emerald-600 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onSelectSubject(subject)}
                  >
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <span className="font-medium">Subj: </span>
                        <span className="text-emerald-700">
                          {subject.title}
                        </span>
                      </div>
                      <div className="mb-2">
                        <span className="font-medium">Code: </span>
                        <span>
                          {subject.code} - {subject.codeDetails}
                        </span>
                      </div>
                      <div className="mb-2">
                        <span className="font-medium">Class: </span>
                        <span className="text-blue-600">{subject.classId}</span>
                      </div>
                      <div className="mb-2">
                        <span className="font-medium">Major: </span>
                        <span>{subject.major}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-2">
                        {subject.schedule}
                      </div>
                      <div className="mt-3 text-right">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            subject.hasScores
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {subject.hasScores ? "Has Scores" : "No Scores"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-gray-500">
                  No subjects found for the selected year and semester.
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
