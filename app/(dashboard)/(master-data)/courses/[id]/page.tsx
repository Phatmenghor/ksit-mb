"use client";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  User,
  Building,
  GraduationCap,
  FileText,
  Target,
  Lightbulb,
  Award,
  Calendar,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DetialCourseModel } from "@/model/master-data/course/type-course-model";
import { DetailCourseService } from "@/service/master-data/course.service";
import { AppIcons } from "@/constants/icons/icon";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const isMobile = useIsMobile();

  const [courseData, setCourseData] = useState<DetialCourseModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const courseId = params?.id ? Number(params.id) : null;

  const fetchCourseData = useCallback(async () => {
    if (!courseId) return;

    try {
      setIsLoading(true);
      const data = await DetailCourseService(courseId);
      if (data) {
        setCourseData(data);
      }
    } catch (err: any) {
      console.error("Error fetching course detail:", err);
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!courseData) {
    return <div>Course not found</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        {/* Header Section */}
        <Card className="transition-shadow duration-200">
          <CardContent className="p-6">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/dashboard"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/courses"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Courses
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink className="text-gray-500">
                    View Course Detail
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  onClick={() => router.back()}
                  className="rounded-full flex-shrink-0"
                >
                  <img
                    src={AppIcons.Back}
                    alt="back Icon"
                    className="h-4 w-4 mr-3 sm:mr-5 text-muted-foreground"
                  />
                </Button>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {courseData.nameEn || courseData.nameKH}
                  </h1>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700"
                    >
                      {courseData.code}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-gray-300 text-gray-600"
                    >
                      {courseData.credit} Credits
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Overview */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="border-b bg-gray-50 dark:bg-gray-800">
                <CardTitle className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-gray-600" />
                  <span>Course Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard
                    icon={<FileText className="h-4 w-4" />}
                    label="Subject Code"
                    value={courseData.code}
                  />
                  <InfoCard
                    icon={<GraduationCap className="h-4 w-4" />}
                    label="Subject Name (KH)"
                    value={courseData.nameKH}
                  />
                  <InfoCard
                    icon={<Award className="h-4 w-4" />}
                    label="Credits"
                    value={courseData.credit}
                  />
                  <InfoCard
                    icon={<Clock className="h-4 w-4" />}
                    label="Total Hours"
                    value={courseData.totalHour}
                  />
                  <InfoCard
                    icon={<BookOpen className="h-4 w-4" />}
                    label="Theory Hours"
                    value={courseData.theory}
                  />
                  <InfoCard
                    icon={<Users className="h-4 w-4" />}
                    label="Applied Hours"
                    value={courseData.apply}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Course Details */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="border-b bg-gray-50 dark:bg-gray-800">
                <CardTitle className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-gray-600" />
                  <span>Academic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard
                    icon={<Building className="h-4 w-4" />}
                    label="Department"
                    value={courseData.department?.name}
                  />
                  <InfoCard
                    icon={<User className="h-4 w-4" />}
                    label="Instructor"
                    value={courseData.user?.username}
                  />
                  <InfoCard
                    icon={<BookOpen className="h-4 w-4" />}
                    label="Subject Type"
                    value={courseData.subject?.name}
                  />
                  <InfoCard
                    icon={<Calendar className="h-4 w-4" />}
                    label="Execute"
                    value={courseData.subject?.id}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Description */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="border-b bg-gray-50 dark:bg-gray-800">
                <CardTitle className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <span>Description</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {courseData.description || "No description provided"}
                </p>
              </CardContent>
            </Card>

            {/* Purpose */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="border-b bg-gray-50 dark:bg-gray-800">
                <CardTitle className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-gray-600" />
                  <span>Purpose</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {courseData.purpose || "No purpose specified"}
                </p>
              </CardContent>
            </Card>

            {/* Expected Outcome */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="border-b bg-gray-50 dark:bg-gray-800">
                <CardTitle className="flex items-center space-x-3">
                  <Lightbulb className="h-5 w-5 text-gray-600" />
                  <span>Expected Outcome</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {courseData.expectedOutcome ||
                    "No expected outcome specified"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simplified Info Card Component
function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number;
}) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {label}
          </p>
          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {value ?? "Not specified"}
          </p>
        </div>
      </div>
    </div>
  );
}

// Loading Skeleton Component
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-32 bg-white dark:bg-gray-800 rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-white dark:bg-gray-800 rounded-lg"></div>
              <div className="h-48 bg-white dark:bg-gray-800 rounded-lg"></div>
            </div>
            <div className="space-y-6">
              <div className="h-32 bg-white dark:bg-gray-800 rounded-lg"></div>
              <div className="h-32 bg-white dark:bg-gray-800 rounded-lg"></div>
              <div className="h-32 bg-white dark:bg-gray-800 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
