"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { DetialCourseModel } from "@/model/master-data/course/type-course-model";
import { useEffect, useState } from "react";
import { DetailCourseService } from "@/service/master-data/course.service";
import { useParams, useRouter } from "next/navigation";

export default function CourseDetailPage() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;
  const [courseData, setCourseData] = useState<DetialCourseModel | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await DetailCourseService(Number(id));
        if (data) {
          setCourseData(data);
        }
      } catch (err: any) {
        console.error("Error fetching course detail:", err);
      } finally {
      }
    }

    fetchData();
  }, [id]);

  return (
    <div className="container  space-y-6">
      <div className="bg-white p-4 rounded-md shadow-sm">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>View Course Detail</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-2 mt-4">
          <Link
            href="/courses"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold">
            Course Detail ({courseData?.code})
          </h1>
        </div>
      </div>
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CourseInfoRow label="Subject Code" value={courseData?.code} />
          <CourseInfoRow label="Subject Name (KH)" value={courseData?.nameKH} />

          <CourseInfoRow label="Credit" value={courseData?.credit} />
          <CourseInfoRow label="Execute" value={courseData?.subject.id} />

          <CourseInfoRow
            label="Department"
            value={courseData?.department.name}
          />
          <CourseInfoRow label="Instructor" value={courseData?.user.username} />

          <CourseInfoRow label="Subject Name (EN)" value={courseData?.nameEn} />
          <CourseInfoRow label="Thoery" value={courseData?.theory} />

          <CourseInfoRow label="Apply" value={courseData?.apply} />
          <CourseInfoRow
            label="Subject Type"
            value={courseData?.subject.name}
          />

          <CourseInfoRow label="Total Hours" value={courseData?.totalHour} />
        </div>
      </Card>

      {/* Course Additional Information Card */}
      <Card className="p-6">
        <div className="grid grid-cols-1 gap-4">
          <CourseInfoRow label="Description" value={courseData?.description} />
          <CourseInfoRow label="Purpose" value={courseData?.purpose} />
          <CourseInfoRow
            label="Anticipated Outcome"
            value={courseData?.expectedOutcome}
          />
        </div>
      </Card>
    </div>
  );
}

// Helper component for displaying course information rows
function CourseInfoRow({
  label,
  value,
  additionalLabel,
  additionalValue,
}: {
  label: string;
  value?: string | number;
  additionalLabel?: string | "";
  additionalValue?: string | number;
}) {
  return (
    <div className="grid grid-cols-[200px_1fr_200px_1fr] gap-4">
      <div className="text-muted-foreground">{label}</div>
      <div>{value ?? "-"}</div>
      {additionalLabel && additionalValue !== undefined && (
        <>
          <div className="text-muted-foreground">{additionalLabel}</div>
          <div>{additionalValue}</div>
        </>
      )}
    </div>
  );
}
