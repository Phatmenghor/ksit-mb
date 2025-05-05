import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function AddCoursePage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Add course</h1>
          <p className="text-muted-foreground">Institute Management System</p>
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add course</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mb-4">
        <Link href="/courses">
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> BACK
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-6">
          <form className="space-y-4">
            <div>
              <label htmlFor="subject-code" className="mb-2 block text-sm font-medium">
                Subject code <span className="text-red-500">*</span>
              </label>
              <Input id="subject-code" placeholder="Subject code..." required />
            </div>

            <div>
              <label htmlFor="subject-name-kh" className="mb-2 block text-sm font-medium">
                Subject name (KH)
              </label>
              <Input id="subject-name-kh" placeholder="Subject name (KH)..." />
            </div>

            <div>
              <label htmlFor="subject-name-en" className="mb-2 block text-sm font-medium">
                Subject name (EN) <span className="text-red-500">*</span>
              </label>
              <Input id="subject-name-en" placeholder="Subject name (EN)..." required />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label htmlFor="credit" className="mb-2 block text-sm font-medium">
                  Credit <span className="text-red-500">*</span>
                </label>
                <Input id="credit" type="number" placeholder="Credit..." required />
              </div>
              <div>
                <label htmlFor="theory" className="mb-2 block text-sm font-medium">
                  Theory <span className="text-red-500">*</span>
                </label>
                <Input id="theory" type="number" placeholder="Theory..." required />
              </div>
              <div>
                <label htmlFor="execute" className="mb-2 block text-sm font-medium">
                  Execute <span className="text-red-500">*</span>
                </label>
                <Input id="execute" type="number" placeholder="Execute..." required />
              </div>
              <div>
                <label htmlFor="apply" className="mb-2 block text-sm font-medium">
                  Apply <span className="text-red-500">*</span>
                </label>
                <Input id="apply" type="number" placeholder="Apply..." required />
              </div>
            </div>

            <div>
              <label htmlFor="department" className="mb-2 block text-sm font-medium">
                Department <span className="text-red-500">*</span>
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Please Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="food-technology">Food Technology</SelectItem>
                  <SelectItem value="electrical-technology">Electrical Technology</SelectItem>
                  <SelectItem value="animal-science">Animal Science</SelectItem>
                  <SelectItem value="mechanical-technology">Mechanical Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="subject-type" className="mb-2 block text-sm font-medium">
                Subject type <span className="text-red-500">*</span>
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Please Select Subject Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="core">Core</SelectItem>
                  <SelectItem value="elective">Elective</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="specialized">Specialized</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="instructor" className="mb-2 block text-sm font-medium">
                Instructor <span className="text-red-500">*</span>
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Please Select Instructor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                  <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                  <SelectItem value="dr-williams">Dr. Williams</SelectItem>
                  <SelectItem value="dr-brown">Dr. Brown</SelectItem>
                  <SelectItem value="dr-davis">Dr. Davis</SelectItem>
                  <SelectItem value="add-new">Add new instructor here...</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="total-hours" className="mb-2 block text-sm font-medium">
                Total hours <span className="text-red-500">*</span>
              </label>
              <Input id="total-hours" type="number" placeholder="Total hours..." required />
            </div>

            <div>
              <label htmlFor="description" className="mb-2 block text-sm font-medium">
                Description
              </label>
              <Textarea id="description" placeholder="Description..." className="min-h-[100px]" />
            </div>

            <div>
              <label htmlFor="purpose" className="mb-2 block text-sm font-medium">
                Purpose
              </label>
              <Textarea id="purpose" placeholder="Purpose..." className="min-h-[100px]" />
            </div>

            <div>
              <label htmlFor="expected-outcome" className="mb-2 block text-sm font-medium">
                Expected Outcome
              </label>
              <Textarea id="expected-outcome" placeholder="Anticipated Outcome..." className="min-h-[100px]" />
            </div>

            <div>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                <Save className="mr-2 h-4 w-4" /> Save course
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
