import EducationForm from "@/components/dashboard/users/teachers/add/education";
import PersonalHistoryForm from "@/components/dashboard/users/teachers/add/personal-history";
import TeachingDetailForm from "@/components/dashboard/users/teachers/add/teaching-detail-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, Save } from "lucide-react";
import Link from "next/link";

export default function AddTeacherPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Add new teacher</h1>
          <p className="text-muted-foreground">Institute Management System</p>
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add teacher</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Back Button */}
      <div>
        <Link href="/users/teachers">
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> BACK
          </Button>
        </Link>
      </div>

      {/* Generate Data Card */}
      <Card>
        <CardContent className="p-6 max-w-screen-sm mx-auto">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Generate data
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium"
              >
                Username <span className="text-red-500">*</span>
              </label>
              <Input id="username" placeholder="Username..." required />
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
              <Input id="identify-number" placeholder="-" required />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="department"
                className="block mb-2 text-sm font-medium"
              >
                Department <span className="text-red-500">*</span>
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Please select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">
                    Computer Science
                  </SelectItem>
                  <SelectItem value="food-technology">
                    Food Technology
                  </SelectItem>
                  <SelectItem value="electrical-technology">
                    Electrical Technology
                  </SelectItem>
                  <SelectItem value="animal-science">Animal Science</SelectItem>
                  <SelectItem value="mechanical-technology">
                    Mechanical Technology
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="mr-2 h-4 w-4" /> Generate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full Form Card */}
      <Card>
        <CardContent className="p-8 max-w-screen-lg mx-auto">
          <form className="space-y-10">
            <PersonalHistoryForm />
            <EducationForm />
            <TeachingDetailForm />

            {/* Footer Buttons */}
            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline">
                បោះបង់ការកែប្រែ
              </Button>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Save className="mr-2 h-4 w-4" /> រក្សាទុកទិន្នន័យ
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
