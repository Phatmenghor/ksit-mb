import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { ROUTE } from "@/constants/routes";
import { GenerateDataForm } from "@/components/dashboard/users/teachers/add/GenerateDataForm";
import ProfileUploadCard from "@/components/dashboard/users/teachers/add/profileUploadCard";

export default function AddSingleStudentPage() {
  return (
    <div className="space-y-4">
      <CardHeaderSection
        title="Add New Student"
        breadcrumbs={[
          { label: "Dashboard", href: ROUTE.DASHBOARD },
          { label: "Add Student", href: ROUTE.STUDENTS.ADD_SINGLE },
        ]}
      />

      <GenerateDataForm onGenerate={} />

      <ProfileUploadCard />

      <Card className="rounded-2xl shadow-sm border">
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <Input id="firstName" placeholder="First Name" required />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <Input id="lastName" placeholder="Last Name" required />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <Input id="email" type="email" placeholder="Email" required />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                Phone Number
              </label>
              <Input id="phone" type="tel" placeholder="Phone Number" />
            </div>
            <div>
              <label htmlFor="class" className="mb-2 block text-sm font-medium">
                Class <span className="text-red-500">*</span>
              </label>
              <Select>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs101">
                    CS101 - Computer Science Year 1
                  </SelectItem>
                  <SelectItem value="cs201">
                    CS201 - Computer Science Year 2
                  </SelectItem>
                  <SelectItem value="cs301">
                    CS301 - Computer Science Year 3
                  </SelectItem>
                  <SelectItem value="ft101">
                    FT101 - Food Technology Year 1
                  </SelectItem>
                  <SelectItem value="et201">
                    ET201 - Electrical Technology Year 2
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium"
              >
                Status
              </label>
              <Select defaultValue="active">
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md shadow"
            >
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
