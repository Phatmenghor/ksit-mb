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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

export default function AddMultipleStudentsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Add multi students</h1>
          <p className="text-muted-foreground">Institute Management System</p>
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add student</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mb-4">
        <Link href="/students">
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> BACK
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="rounded-md bg-gray-50 p-6">
              <h2 className="mb-4 text-lg font-medium text-gray-700">Multi generate student</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
                    Quantity number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Please input number to generate..."
                    className="max-w-full"
                  />
                </div>

                <div>
                  <label htmlFor="class" className="mb-2 block text-sm font-medium">
                    Class <span className="text-red-500">*</span>
                  </label>
                  <Select>
                    <SelectTrigger className="max-w-full">
                      <SelectValue placeholder="Please Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs101">CS101 - Computer Science Year 1</SelectItem>
                      <SelectItem value="cs201">CS201 - Computer Science Year 2</SelectItem>
                      <SelectItem value="cs301">CS301 - Computer Science Year 3</SelectItem>
                      <SelectItem value="ft101">FT101 - Food Technology Year 1</SelectItem>
                      <SelectItem value="et201">ET201 - Electrical Technology Year 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="mr-2 h-4 w-4" /> Generate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
