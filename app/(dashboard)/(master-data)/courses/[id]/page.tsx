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
import { Card, CardContent } from "@/components/ui/card";
import { DetialCourseModel } from "@/model/master-data/course/type-course-model";
import { useEffect, useState } from "react";
import { DetailCourseService } from "@/service/master-data/course.service";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AppIcons } from "@/constants/icons/icon";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CourseDetailPage() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;
  const [courseData, setCourseData] = useState<DetialCourseModel | null>(null);

  const isMobile = useIsMobile();
  const router = useRouter();
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
    <div className="container space-y-6">
      <Card className="md:p-3 py-2 rounded-md shadow-sm">
        <CardContent>
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
          <div className="flex items-center mt-2 justify-between">
            <div className="flex items-center min-w-0 flex-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                asChild
                className="rounded-full flex-shrink-0"
              >
                <img
                  src={AppIcons.Back}
                  alt="back Icon"
                  className="h-4 w-4 mr-3 sm:mr-5 text-muted-foreground"
                />
              </Button>
              <h1 className="text-2xl font-semibold">
                Course Detail ({courseData?.code})
              </h1>
            </div>
          </div>
        </CardContent>
      </Card>
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
      {isMobile ? (
        <Card className="p-4 sm:p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Description
              </h3>
              <p className="text-sm sm:text-base leading-relaxed break-words hyphens-auto">
                {courseData?.description || "Not specified"}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Purpose
              </h3>
              <p className="text-sm sm:text-base leading-relaxed break-words hyphens-auto">
                {courseData?.purpose || "Not specified"}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Anticipated Outcome
              </h3>
              <p className="text-sm sm:text-base leading-relaxed break-words hyphens-auto">
                {courseData?.expectedOutcome || "Not specified"}
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-6">
          <div className="grid grid-cols-1 gap-4">
            <CourseInfoRow
              label="Description"
              value={courseData?.description}
            />
            <CourseInfoRow label="Purpose" value={courseData?.purpose} />
            <CourseInfoRow
              label="Anticipated Outcome"
              value={courseData?.expectedOutcome}
            />
          </div>
        </Card>
      )}
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
    <div className="flex flex-col md:grid md:grid-cols-[200px_1fr_200px_1fr] gap-y-2 md:gap-4">
      <div className="text-muted-foreground font-medium">{label}</div>
      <div className="break-words">{value ?? "-"}</div>

      {additionalLabel && additionalValue !== undefined && (
        <>
          <div className="text-muted-foreground font-medium">
            {additionalLabel}
          </div>
          <div className="break-words">{additionalValue}</div>
        </>
      )}
    </div>
  );
}
