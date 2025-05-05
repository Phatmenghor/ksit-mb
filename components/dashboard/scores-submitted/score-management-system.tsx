"\"use client";

import { useState } from "react";
import { ScoreSearchPage } from "../student-scores/score-search-page";
import { StudentScoreInput } from "../student-scores/student-score-input";
import type { SubjectType, StudentType } from "@/model/student/score-types";

interface ScoreManagementSystemProps {
  onSubmissionComplete?: () => void;
}

// Sample data for demonstration
const sampleSubjects2024 = [
  {
    id: "1",
    title: "Project in Computer Science 1",
    code: "401220",
    codeDetails: "9(6.3.0)",
    classId: "234012",
    department: "Computer Science",
    major: "បច្ចេកវិទ្យាព័ត៌មាន",
    semester: "2",
    academicYear: "2024",
    hasScores: true,
    totalStudents: 49,
    schedule: "Friday (08:00:00 - 11:00:00) - LAB.COM2",
  },
  {
    id: "2",
    title: "Data Communication and Network",
    code: "401204",
    codeDetails: "3(2.1.0)",
    classId: "234012",
    department: "Computer Science",
    major: "បច្ចេកវិទ្យាព័ត៌មាន",
    semester: "2",
    academicYear: "2024",
    hasScores: true,
    totalStudents: 45,
    schedule: "Wednesday (08:00:00 - 12:00:00) - LAB.COM2",
  },
];

const sampleSubjects2025 = [
  {
    id: "3",
    title: "Computer Assembly and Software Installation",
    code: "401101",
    codeDetails: "3(2.1.0)",
    classId: "234012",
    department: "Computer Science",
    major: "បច្ចេកវិទ្យាព័ត៌មាន",
    semester: "1",
    academicYear: "2025",
    hasScores: false,
    totalStudents: 0,
    schedule: "Monday (08:00:00 - 12:00:00) - LAB.COM1",
  },
  {
    id: "4",
    title: "Operating Systems",
    code: "401121",
    codeDetails: "3(2.1.0)",
    classId: "234012",
    department: "Computer Science",
    major: "បច្ចេកវិទ្យាព័ត៌មាន",
    semester: "1",
    academicYear: "2025",
    hasScores: false,
    totalStudents: 0,
    schedule: "Tuesday (13:00:00 - 16:00:00) - LAB.COM2",
  },
];

// Sample students for 2024 subjects
const sampleStudents2024 = [
  {
    id: "234012001",
    fullnameKh: "រ៉ូ វិសាល",
    fullnameEn: "KAO VISAL",
    gender: "Male",
    birthDate: "13-Jun-2002",
    attendance: 90,
    assignment: 85,
    midterm: 78,
    final: 82,
    total: 82.5,
    grade: "B",
  },
  {
    id: "234012002",
    fullnameKh: "ខន កុសល",
    fullnameEn: "KHORN KOSORL",
    gender: "Male",
    birthDate: "20-Jun-2005",
    attendance: 95,
    assignment: 88,
    midterm: 85,
    final: 87,
    total: 87.8,
    grade: "B+",
  },
  {
    id: "234012003",
    fullnameKh: "ខាន ភារ៉ុម",
    fullnameEn: "KHAN PHEARUM",
    gender: "Male",
    birthDate: "17-Jun-2005",
    attendance: 92,
    assignment: 90,
    midterm: 82,
    final: 88,
    total: 87.2,
    grade: "B+",
  },
  {
    id: "234012004",
    fullnameKh: "ឃឿន មេសា",
    fullnameEn: "KHOEURN MESA",
    gender: "Male",
    birthDate: "08-Apr-2005",
    attendance: 88,
    assignment: 85,
    midterm: 80,
    final: 85,
    total: 84.1,
    grade: "B+",
  },
];

// Sample students for 2025 subjects (empty for now)
const sampleStudents2025: StudentType[] = [];

export default function ScoreManagementSystem({
  onSubmissionComplete,
}: ScoreManagementSystemProps) {
  const [view, setView] = useState<"search" | "input">("search");
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [selectedSemester, setSelectedSemester] = useState<string>("1");
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | null>(
    null
  );
  const [students, setStudents] = useState<StudentType[]>([]);

  // Handle year and semester selection
  const handleSearch = (year: string, semester: string) => {
    setSelectedYear(year);
    setSelectedSemester(semester);
  };

  // Handle subject selection
  const handleSelectSubject = (subject: SubjectType) => {
    setSelectedSubject(subject);

    // Load appropriate students based on subject
    if (subject.academicYear === "2024") {
      setStudents(sampleStudents2024);
    } else {
      setStudents(sampleStudents2025);
    }

    setView("input");
  };

  // Handle back to search
  const handleBackToSearch = () => {
    setView("search");
    setSelectedSubject(null);
  };

  // Handle save scores
  const handleSaveScores = (updatedStudents: StudentType[]) => {
    // In a real app, this would save to a database
    console.log("Saving scores:", updatedStudents);
    setStudents(updatedStudents);

    // Update the subject's hasScores property
    if (selectedSubject && selectedSubject.academicYear === "2025") {
      const updatedSubject = {
        ...selectedSubject,
        hasScores: true,
        totalStudents: updatedStudents.length,
      };
      setSelectedSubject(updatedSubject);
    }

    // Notify parent component that submission is complete
    if (onSubmissionComplete) {
      onSubmissionComplete();
    } else {
      // Go back to search view if no completion handler
      handleBackToSearch();
    }
  };

  return (
    <div className="w-full">
      {view === "search" ? (
        <ScoreSearchPage
          selectedYear={selectedYear}
          selectedSemester={selectedSemester}
          onSearch={handleSearch}
          onSelectSubject={handleSelectSubject}
          subjects={
            selectedYear === "2024" ? sampleSubjects2024 : sampleSubjects2025
          }
        />
      ) : (
        <StudentScoreInput
          subject={selectedSubject!}
          students={students}
          onBack={handleBackToSearch}
          onSave={handleSaveScores}
        />
      )}
    </div>
  );
}
