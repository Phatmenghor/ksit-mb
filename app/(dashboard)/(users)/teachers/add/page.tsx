import CourseForm from "@/components/dashboard/users/teachers/add/courseForm";
import CulturalLevelForm from "@/components/dashboard/users/teachers/add/Cultural-level";
import EducationForm from "@/components/dashboard/users/teachers/add/education";
import FamilyStatusForm from "@/components/dashboard/users/teachers/add/FamilyStatusForm";
import LanguageForm from "@/components/dashboard/users/teachers/add/LanguageForm";
import PersonalHistoryForm from "@/components/dashboard/users/teachers/add/personal-history";
import RateForm from "@/components/dashboard/users/teachers/add/RateSection";
import ShortCourseForm from "@/components/dashboard/users/teachers/add/shortCourse";
import WorkHistoryForm from "@/components/dashboard/users/teachers/add/workHistorySection";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ROUTE } from "@/constants/routes";
import { Plus, Save, User } from "lucide-react";

export default function AddTeacherPage() {
  return (
    <div className="space-y-6">
      <CardHeaderSection
        title="Add Teacher"
        backHref={ROUTE.USERS.TEACHERS}
        breadcrumbs={[
          { label: "Home", href: ROUTE.DASHBOARD },
          { label: "Add new", href: ROUTE.USERS.ADD_TEACHER },
        ]}
      />

      {/* Generate Data Card */}
      <Card>
        <CardContent className="p-6 w-full">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Generate data
          </h2>
          <Separator className="mb-3" />
          <div className="w-full space-y-3">
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium"
                >
                  Username <span className="text-red-500">*</span>
                </label>
                <Input
                  id="username"
                  placeholder="Username..."
                  className="bg-gray-100"
                  required
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <Input
                  id="password"
                  type="password"
                  className="bg-gray-100"
                  placeholder="Password..."
                  required
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="identify-number"
                  className="block mb-2 text-sm font-medium"
                >
                  Identify number <span className="text-red-500">*</span>
                </label>
                <Input
                  id="identify-number"
                  placeholder="-"
                  className="bg-gray-100"
                  required
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium"
                >
                  Department <span className="text-red-500">*</span>
                </label>
                <Select>
                  <SelectTrigger className="bg-gray-100">
                    <SelectValue placeholder="Please select department" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-100">
                    <SelectItem value="computer-science">
                      Computer Science
                    </SelectItem>
                    <SelectItem value="food-technology">
                      Food Technology
                    </SelectItem>
                    <SelectItem value="electrical-technology">
                      Electrical Technology
                    </SelectItem>
                    <SelectItem value="animal-science">
                      Animal Science
                    </SelectItem>
                    <SelectItem value="mechanical-technology">
                      Mechanical Technology
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="bg-yellow-600 w-full hover:bg-yellow-700">
              <Plus className="mr-2 h-4 w-4" /> Generate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* upload profile Card */}
      <Card>
        <CardContent className="p-4 space-y-2 flex justify-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="relative w-24 h-24">
              <label htmlFor="profile-upload" className="cursor-pointer">
                {/* Profile Circle (placeholder or uploaded image) */}
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 group-hover:opacity-80">
                  <User className="w-10 h-10 text-gray-300" />
                </div>
                {/* Plus Icon Overlay */}
                <div className="absolute bottom-0 right-0 bg-black rounded-full p-1 border-2 border-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              </label>

              {/* Hidden File Input */}
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>
            <Label className="font-medium text-md">Add Profile</Label>
          </div>
        </CardContent>
      </Card>

      {/* Full Form Card */}
      <div className="w-full mx-auto">
        <form className="space-y-5">
          <PersonalHistoryForm />

          <EducationForm />

          <WorkHistoryForm />

          <RateForm />

          <CulturalLevelForm />

          <CourseForm />

          <ShortCourseForm />

          <LanguageForm />

          <FamilyStatusForm />

          {/* Footer Buttons */}
          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline">
              បោះបង់ការកែប្រែ
            </Button>
            <Button
              type="submit"
              className="bg-emerald-800 hover:bg-emerald-900"
            >
              <Save className="mr-2 h-4 w-4" /> រក្សាទុកទិន្នន័យ
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
