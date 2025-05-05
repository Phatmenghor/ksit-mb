import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, FileText, History, Info, XCircle } from "lucide-react"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function RequestDetailPage({ params }: { params: { id: string } }) {
  // This would normally come from an API or database
  const request = {
    id: params.id,
    studentId: "234012001",
    studentName: "កៅ វិសាល - KAO VISAL",
    gender: "Male",
    dateOfBirth: "13-06-2002",
    department: "Computer Science",
    major: "បរិញ្ញាវិទ្យាសាស្ត្រ",
    degree: "Associate Degree - ឆ្នាំ 4323",
    currentAddress: "",
    phone: "088457896",
    requestDate: "06-11-2024",
    requestTypes: ["ប្រវត្តិរូប", "សញ្ញាបត្របណ្ឌិត"],
    status: "pending",
  }

  const historyItems = [
    {
      date: "06-11-2024 09:15 AM",
      action: "Request submitted",
      user: "Kao Visal",
      role: "Student",
    },
    {
      date: "06-11-2024 10:30 AM",
      action: "Request viewed",
      user: "Admin",
      role: "Staff",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Request Detail</h1>
          <p className="text-muted-foreground">Institute Management System</p>
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/requests">Request</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Request Detail</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mb-4">
        <Link href="/requests">
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> BACK
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="bg-muted/50 pb-2">
          <CardTitle className="text-lg font-medium">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-600" />
              <span>
                Request #{params.id} - {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="information" className="w-full">
            <div className="border-b px-6 pt-2">
              <TabsList className="w-full justify-start rounded-none border-b-0 bg-transparent p-0">
                <TabsTrigger
                  value="information"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-emerald-600 data-[state=active]:shadow-none"
                >
                  <Info className="mr-2 h-4 w-4" />
                  Information
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-emerald-600 data-[state=active]:shadow-none"
                >
                  <History className="mr-2 h-4 w-4" />
                  History
                </TabsTrigger>
                <TabsTrigger
                  value="transcript"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-emerald-600 data-[state=active]:shadow-none"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Transcript
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="information" className="m-0 p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                  <div className="flex flex-col items-center rounded-lg bg-muted/30 p-6">
                    <Avatar className="h-24 w-24 border-2 border-emerald-600">
                      <AvatarImage src={`/placeholder.svg?height=96&width=96`} alt={request.studentName} />
                      <AvatarFallback className="text-xl">KV</AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 text-center text-lg font-medium">{request.studentName}</h3>
                    <p className="text-center text-sm text-muted-foreground">{request.studentId}</p>
                    <div className="mt-4 w-full">
                      <div className="rounded-md bg-emerald-50 p-3 text-center text-sm text-emerald-800">
                        {request.department} - {request.degree}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="rounded-lg bg-muted/30 p-6">
                    <h3 className="mb-4 text-lg font-medium">Student Information</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                        <p>{request.studentId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                        <p>{request.studentName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Gender</p>
                        <p>{request.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                        <p>{request.dateOfBirth}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Department</p>
                        <p>{request.department}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Major</p>
                        <p>{request.major}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Degree</p>
                        <p>{request.degree}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                        <p>{request.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg bg-muted/30 p-6">
                    <h3 className="mb-4 text-lg font-medium">Request Information</h3>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-muted-foreground">Request Date</p>
                      <p>{request.requestDate}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-muted-foreground">Requested Documents</p>
                      <div className="mt-2 space-y-2">
                        {request.requestTypes.map((type, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Switch id={`document-${index}`} defaultChecked />
                            <Label htmlFor={`document-${index}`}>{type}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                      <Button className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700">
                        <CheckCircle className="h-4 w-4" /> ACCEPT
                      </Button>
                      <Button variant="destructive" className="flex-1 gap-2">
                        <XCircle className="h-4 w-4" /> REJECT
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="m-0 p-6">
              <div className="rounded-lg bg-muted/30 p-6">
                <h3 className="mb-4 text-lg font-medium">Request History</h3>
                <div className="space-y-4">
                  {historyItems.map((item, index) => (
                    <div key={index} className="flex gap-4 rounded-lg border p-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <History className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{item.action}</p>
                        <p className="text-sm text-muted-foreground">
                          By {item.user} ({item.role}) on {item.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transcript" className="m-0 p-6">
              <div className="rounded-lg bg-muted/30 p-6">
                <h3 className="mb-4 text-lg font-medium">Transcript Preview</h3>
                <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed">
                  <p className="text-muted-foreground">Transcript preview will be displayed here</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
