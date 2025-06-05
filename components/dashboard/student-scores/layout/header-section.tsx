"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScheduleModel } from "@/model/schedules/all-schedule-model";
import { ArrowLeft, Clock, MapPin, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  title: string;
  schedule: ScheduleModel | null;
}

export default function StudentScoreHeader({ title, schedule }: Props) {
  const router = useRouter();

  return (
    <Card className="shadow-md rounded-2xl">
      <CardContent className="p-6 space-y-3">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-sm text-muted-foreground space-x-2">
          <Link href="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
          <span>&gt;</span>
          <Link href="/student-score" className="hover:text-foreground">
            Student Score
          </Link>
          <span>&gt;</span>
          <span className="text-foreground font-medium">{title}</span>
        </nav>

        {/* Header Section */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            {schedule?.course?.subject.name || "---"}
          </h1>
        </div>

        <Separator />

        {/* Class Details */}
        <div className="grid grid-cols-2 md:grid-cols-5">
          <DetailBlock label="Class" value={schedule?.classes.code} />
          <DetailBlock
            label="Department"
            value={schedule?.course.department.name}
          />
          <DetailBlock label="Major" value={schedule?.classes.major.name} />
          <DetailBlock label="Degree" value={schedule?.classes.degree} />
          <DetailBlock label="Year Level" value={schedule?.academyYear} />
        </div>

        {/* Course Details */}
        <div className="bg-amber-50 border- border-amber-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <div className="flex border-l-4 border-amber-500 rounded-xl" />
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1 justify-between">
                  <div className="text-sm font-medium text-amber-600">
                    {schedule?.course?.code || "- - -"}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {schedule?.day || "- - -"}
                  </span>
                </div>
                <div className="text-sm font-medium">
                  {schedule?.course?.nameEn ||
                    schedule?.course?.nameKH ||
                    "- - -"}
                </div>
              </div>
            </div>
            <div className="text-sm font-medium text-foreground">
              {schedule?.course?.subject.name || "- - -"} —{" "}
              {`${schedule?.course.totalHour} hrs / ${
                schedule?.course.credit || "- - -"
              } credits`}
            </div>
          </div>

          <Separator />

          <div className="flex flex-wrap gap-6">
            <InfoItem
              icon={<Clock className="h-5 w-5 text-muted-foreground" />}
              text={`${schedule?.startTime} - ${schedule?.endTime}`}
            />
            <InfoItem
              icon={<User className="h-5 w-5 text-muted-foreground" />}
              text={
                `${schedule?.teacher.khmerFirstName ?? ""} ${
                  schedule?.teacher.khmerLastName ?? ""
                }`.trim() || "---"
              }
            />
            <InfoItem
              icon={<MapPin className="h-5 w-5 text-muted-foreground" />}
              text={schedule?.room.name || "---"}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DetailBlock({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <h3 className="text-xs text-muted-foreground font-medium uppercase">
        {label}
      </h3>
      <p className="text-sm font-semibold text-foreground">{value || "---"}</p>
    </div>
  );
}

function InfoItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-foreground">
      {icon}
      <span>{text}</span>
    </div>
  );
}
