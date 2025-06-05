import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { DateTimeFormatter } from "@/utils/date/date-time-format";
import { SubmittedScoreModel } from "@/model/score/submitted-score/submitted-score.response.model";
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable?: {
      finalY: number;
      [key: string]: any;
    };
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
  // Enhanced course information
  subjectName?: string;
  subjectCode?: string;
  credit?: number;
  department?: string;
  major?: string;
  degree?: string;
  levelYear?: string;
  totalStudents?: number;
  yearOfStudy?: string;
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
    // Enhanced options
    subjectName,
    subjectCode,
    credit,
    department,
    major,
    degree,
    levelYear,
    totalStudents,
    yearOfStudy,
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

  // Add enhanced header section
  yPosition = addEnhancedHeader(doc, pageWidth, yPosition, {
    title,
    subtitle,
    teacherName,
    courseName,
    semester,
    classCode,
    subjectName,
    subjectCode,
    credit,
    department,
    major,
    degree,
    levelYear,
    totalStudents: totalStudents || students.length,
    yearOfStudy,
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

  let finalY = 0;
  // Use autoTable function directly instead of doc.autoTable
  let totalPages = 0;
  // Use doc.autoTable instead of the direct autoTable function
  doc.autoTable({
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
      totalPages = data.pageNumber;

      // Add regular footer (without date/receiver info)
      addRegularFooter(doc, pageWidth, pageHeight, data.pageNumber);
    },
  });

  finalY = (doc as any).lastAutoTable.finalY;
  const lastTablePage = (doc as any).lastAutoTable.pageNumber;
  const Height = doc.internal.pageSize.getHeight();
  const marginBottom = 20;
  const estimatedHeight = 30; // estimate your footer height

  // 3. Check if there's space to add the info
  if (finalY + estimatedHeight + marginBottom > Height) {
    doc.addPage();
    addDateReceiverInfo(doc, pageWidth, 30); // new page
  } else {
    doc.setPage(lastTablePage); // go back to table page
    addDateReceiverInfo(doc, pageWidth, finalY + 10); // push below table
  }
  // 🟨 Add Summary Stats
  const summaryEndY = addSummaryStats(doc, students, pageWidth, finalY + 10);
  // Debug logging on last table page

  // ✅ Add footer again if new page was added
  addRegularFooter(
    doc,
    pageWidth,
    pageHeight,
    doc.getCurrentPageInfo().pageNumber
  );
  // Save the PDF
  doc.save(fileName);
};

// Enhanced header function with comprehensive course information
const addEnhancedHeader = (
  doc: jsPDF,
  pageWidth: number,
  yPosition: number,
  headerInfo: any
): number => {
  const {
    title,
    subtitle,
    teacherName,
    courseName,
    semester,
    classCode,
    subjectName,
    subjectCode,
    credit,
    department,
    major,
    degree,
    levelYear,
    totalStudents,
    yearOfStudy,
  } = headerInfo;

  // Main title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(title, pageWidth / 2, yPosition, { align: "center" });
  yPosition += 12;

  // Subtitle
  if (subtitle) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(subtitle, pageWidth / 2, yPosition, { align: "center" });
    yPosition += 10;
  }

  // Add line separator after title
  doc.setLineWidth(0.5);
  doc.line(15, yPosition, pageWidth - 15, yPosition);
  yPosition += 8;

  // Course Information Section - Two columns layout
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const leftColumnX = 15;
  const rightColumnX = pageWidth / 2 + 10;
  let leftY = yPosition;
  let rightY = yPosition;

  // Left Column Information
  const leftColumnInfo = [
    { label: "Subject name", value: subjectName || courseName },
    { label: "Subject code", value: subjectCode },
    { label: "Credit", value: credit },
    { label: "Instructor", value: teacherName },
    { label: "Total student", value: totalStudents },
    { label: "Year of study", value: yearOfStudy },
  ];

  // Right Column Information
  const rightColumnInfo = [
    { label: "Department", value: department },
    { label: "Major", value: major || "Computer Science" },
    { label: "Degree", value: degree },
    { label: "Level year", value: levelYear },
    { label: "Semester", value: semester },
    { label: "Class Code", value: classCode },
  ];

  // Draw left column
  leftColumnInfo.forEach((info) => {
    if (info.value) {
      doc.setFont("helvetica", "bold");
      doc.text(`${info.label}:`, leftColumnX, leftY);
      doc.setFont("helvetica", "normal");
      doc.text(String(info.value), leftColumnX + 35, leftY);
      leftY += 6;
    }
  });

  // Draw right column
  rightColumnInfo.forEach((info) => {
    if (info.value) {
      doc.setFont("helvetica", "bold");
      doc.text(`${info.label}:`, rightColumnX, rightY);
      doc.setFont("helvetica", "normal");
      doc.text(String(info.value), rightColumnX + 35, rightY);
      rightY += 6;
    }
  });

  // Calculate the maximum Y position from both columns
  const maxY = Math.max(leftY, rightY);
  yPosition = maxY + 5;

  // Add bottom line separator
  doc.setLineWidth(0.5);
  doc.line(15, yPosition, pageWidth - 15, yPosition);

  return yPosition + 8;
};

// Keep the original addHeader function for backward compatibility
const addHeader = (
  doc: jsPDF,
  pageWidth: number,
  yPosition: number,
  headerInfo: any
): number => {
  const {
    title,
    subtitle,
    teacherName,
    courseName,
    semester,
    classCode,
    subjectName,
  } = headerInfo;

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
  if (courseName || teacherName || subjectName || semester || classCode) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const leftInfo = [];
    const rightInfo = [];

    if (courseName) leftInfo.push(`Course: ${courseName}`);
    if (subjectName) leftInfo.push(`Subject: ${subjectName}`);
    if (classCode) leftInfo.push(`Class: ${classCode}`);
    if (teacherName) rightInfo.push(`Instructor: ${teacherName}`);
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

// Regular footer for all pages except the last
const addRegularFooter = (
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

// Date and receiver info positioned on the right side below table content
const addDateReceiverInfo = (
  doc: jsPDF,
  pageWidth: number,
  startY: number,
  receiverName?: string
) => {
  const rightStartX = pageWidth - 120;
  let yPos = startY; // <-- use startY directly

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  // Date
  const now = new Date();
  const year = now.getFullYear();

  doc.text(
    `Date: Day.................. Month.................. Year ${year}`,
    rightStartX,
    yPos
  );

  yPos += 20;

  // Receiver section
  doc.text("Receiver", rightStartX + 40, yPos);

  yPos += 20;

  // Dotted line for receiver signature
  doc.text("....................................", rightStartX + 30, yPos);
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
): number => {
  if (students.length === 0) return yPosition;

  const totalStudents = students.length;
  const averageScore =
    students.reduce((sum, student) => sum + student.totalScore, 0) /
    totalStudents;
  const gradeDistribution = students.reduce((acc: any, student) => {
    acc[student.grade] = (acc[student.grade] || 0) + 1;
    return acc;
  }, {});

  // Check if we need a new page
  const pageHeight = doc.internal.pageSize.getHeight();
  if (yPosition + 25 > pageHeight - 20) {
    // If summary won't fit
    doc.addPage();
    yPosition = 20; // Reset to top of new page
  }

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

  return yPosition + 20; // Return the end Y position
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
