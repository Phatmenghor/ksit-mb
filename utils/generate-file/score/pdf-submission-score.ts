import { jsPDF } from "jspdf";
// Try this import instead
import autoTable from "jspdf-autotable";
import { DateTimeFormatter } from "@/utils/date/date-time-format";
import { SubmittedScoreModel } from "@/model/score/submitted-score/submitted-score.response.model";

// Extend jsPDF type to include autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export interface PDFExportOptions {
  title?: string;
  subtitle?: string;
  includeComments?: boolean;
  includeCreatedAt?: boolean;
  orientation?: "portrait" | "landscape";
  pageSize?: "a4" | "a3" | "letter";
  showGradeColors?: boolean;
  teacherName?: string;
  courseName?: string;
  semester?: string;
  classCode?: string;
}

export const exportSubmissionStudentsToPDF = async (
  students: SubmittedScoreModel[],
  fileName: string = "submitted-score.pdf",
  options: PDFExportOptions = {}
) => {
  const {
    title = "Student Score Report",
    subtitle,
    includeComments = true,
    includeCreatedAt = false,
    orientation = "landscape",
    pageSize = "a4",
    showGradeColors = true,
    teacherName,
    courseName,
    semester,
    classCode,
  } = options;

  // Create PDF document
  const doc = new jsPDF({
    orientation: orientation,
    unit: "mm",
    format: pageSize,
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;

  // Set up fonts and colors
  doc.setFont("helvetica");

  let yPosition = margin;

  // Add header section
  yPosition = addHeader(doc, pageWidth, yPosition, {
    title,
    subtitle,
    teacherName,
    courseName,
    semester,
    classCode,
  });

  // Prepare table columns
  const columns = [
    { header: "#", dataKey: "no" },
    { header: "Student ID", dataKey: "studentId" },
    { header: "Name (KH)", dataKey: "studentNameKhmer" },
    { header: "Name (EN)", dataKey: "studentNameEnglish" },
    { header: "Attend.", dataKey: "attendanceScore" },
    { header: "Assign.", dataKey: "assignmentScore" },
    { header: "Midterm", dataKey: "midtermScore" },
    { header: "Final", dataKey: "finalScore" },
    { header: "Total", dataKey: "totalScore" },
    { header: "Grade", dataKey: "grade" },
  ];

  if (includeComments) {
    columns.push({ header: "Comments", dataKey: "comments" });
  }

  if (includeCreatedAt) {
    columns.push({ header: "Created", dataKey: "createdAt" });
  }

  // Prepare table data
  const tableData = students.map((student, index) => {
    const rowData: any = {
      no: index + 1,
      studentId: student.studentId,
      studentNameKhmer: student.studentNameKhmer || "-",
      studentNameEnglish: student.studentNameEnglish || "-",
      attendanceScore: student.attendanceScore,
      assignmentScore: student.assignmentScore,
      midtermScore: student.midtermScore,
      finalScore: student.finalScore,
      totalScore: student.totalScore,
      grade: student.grade,
    };

    if (includeComments) {
      rowData.comments = student.comments || "-";
    }

    if (includeCreatedAt) {
      rowData.createdAt = DateTimeFormatter(student.createdAt);
    }

    return rowData;
  });

  // Calculate column widths based on orientation
  const columnWidths = calculateColumnWidths(
    columns.length,
    pageWidth - margin * 2,
    orientation
  );

  // Use autoTable function directly instead of doc.autoTable
  autoTable(doc, {
    startY: yPosition + 5,
    head: [columns.map((col) => col.header)],
    body: tableData.map((row) => columns.map((col) => row[col.dataKey])),
    theme: "grid",
    styles: {
      fontSize: orientation === "landscape" ? 8 : 7,
      cellPadding: 2,
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [70, 130, 180], // Steel blue
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: orientation === "landscape" ? 9 : 8,
    },
    columnStyles: getColumnStyles(showGradeColors),
    didParseCell: function (data: any) {
      // Color coding for grades
      if (showGradeColors && data.column.dataKey === "grade") {
        const grade = data.cell.text[0];
        if (grade === "A" || grade === "A+") {
          data.cell.styles.fillColor = [144, 238, 144]; // Light green
        } else if (grade === "F") {
          data.cell.styles.fillColor = [255, 182, 193]; // Light pink
        } else if (grade === "B" || grade === "B+") {
          data.cell.styles.fillColor = [173, 216, 230]; // Light blue
        }
      }
    },
    didDrawPage: function (data: any) {
      // Add footer with page numbers
      addFooter(doc, pageWidth, pageHeight, data.pageNumber);
    },
  });

  // Add summary statistics
  addSummaryStats(doc, students, pageWidth, pageHeight - 30);

  // Save the PDF
  doc.save(fileName);
};

// Helper function to add header
const addHeader = (
  doc: jsPDF,
  pageWidth: number,
  yPosition: number,
  headerInfo: any
): number => {
  const { title, subtitle, teacherName, courseName, semester, classCode } =
    headerInfo;

  // Main title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(title, pageWidth / 2, yPosition, { align: "center" });
  yPosition += 10;

  // Subtitle
  if (subtitle) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(subtitle, pageWidth / 2, yPosition, { align: "center" });
    yPosition += 8;
  }

  // Course information
  if (courseName || teacherName || semester || classCode) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const leftInfo = [];
    const rightInfo = [];

    if (courseName) leftInfo.push(`Course: ${courseName}`);
    if (classCode) leftInfo.push(`Class: ${classCode}`);
    if (teacherName) rightInfo.push(`Teacher: ${teacherName}`);
    if (semester) rightInfo.push(`Semester: ${semester}`);

    leftInfo.forEach((info, index) => {
      doc.text(info, 15, yPosition + index * 5);
    });

    rightInfo.forEach((info, index) => {
      doc.text(info, pageWidth - 15, yPosition + index * 5, { align: "right" });
    });

    yPosition += Math.max(leftInfo.length, rightInfo.length) * 5 + 5;
  }

  // Add line separator
  doc.setLineWidth(0.5);
  doc.line(15, yPosition, pageWidth - 15, yPosition);

  return yPosition + 5;
};

// Helper function to add footer
const addFooter = (
  doc: jsPDF,
  pageWidth: number,
  pageHeight: number,
  pageNumber: number
) => {
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");

  // Date generated
  const now = new Date();
  const dateStr = now.toLocaleDateString() + " " + now.toLocaleTimeString();
  doc.text(`Generated: ${dateStr}`, 15, pageHeight - 10);

  // Page number
  doc.text(`Page ${pageNumber}`, pageWidth - 15, pageHeight - 10, {
    align: "right",
  });
};

// Helper function to calculate column widths
const calculateColumnWidths = (
  columnCount: number,
  availableWidth: number,
  orientation: string
) => {
  const baseWidth = availableWidth / columnCount;
  return Array(columnCount).fill(baseWidth);
};

// Helper function to get column styles
const getColumnStyles = (showGradeColors: boolean) => {
  return {
    0: { halign: "center" as const }, // #
    4: { halign: "center" as const }, // Attendance
    5: { halign: "center" as const }, // Assignment
    6: { halign: "center" as const }, // Midterm
    7: { halign: "center" as const }, // Final
    8: { halign: "center" as const }, // Total
    9: { halign: "center" as const, fontStyle: "bold" as const }, // Grade
  };
};

// Helper function to add summary statistics
const addSummaryStats = (
  doc: jsPDF,
  students: SubmittedScoreModel[],
  pageWidth: number,
  yPosition: number
) => {
  if (students.length === 0) return;

  const totalStudents = students.length;
  const averageScore =
    students.reduce((sum, student) => sum + student.totalScore, 0) /
    totalStudents;
  const gradeDistribution = students.reduce((acc: any, student) => {
    acc[student.grade] = (acc[student.grade] || 0) + 1;
    return acc;
  }, {});

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Summary Statistics:", 15, yPosition);

  doc.setFont("helvetica", "normal");
  doc.text(`Total Students: ${totalStudents}`, 15, yPosition + 5);
  doc.text(`Average Score: ${averageScore.toFixed(2)}`, 15, yPosition + 10);

  const gradeText = Object.entries(gradeDistribution)
    .map(([grade, count]) => `${grade}: ${count}`)
    .join(", ");
  doc.text(`Grade Distribution: ${gradeText}`, 15, yPosition + 15);
};

// Advanced PDF export with multiple sheets/sections
export const exportStudentsToPDFAdvanced = async (
  students: SubmittedScoreModel[],
  fileName: string = "detailed-score-report.pdf",
  options: PDFExportOptions & {
    includeCharts?: boolean;
    includeIndividualPages?: boolean;
    groupByGrade?: boolean;
  } = {}
) => {
  const {
    includeCharts = false,
    includeIndividualPages = false,
    groupByGrade = false,
    ...baseOptions
  } = options;

  // First, create the main summary report
  await exportSubmissionStudentsToPDF(students, fileName, baseOptions);

  // If advanced features are requested, you can extend this
  // For now, using the base export function
  console.log("Advanced PDF export completed");
};
