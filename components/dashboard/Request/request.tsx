import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Requests() {
  // Sample data for requests
  const requests = [
    {
      id: 1,
      studentId: "234012001",
      fullName: "Kao Visal",
      gender: "Male",
      requestType: "ប្រវត្តិរូប និងសញ្ញាបត្របណ្ឌិត",
      requestDate: "11-06-2024",
      status: "pending",
    },
    {
      id: 2,
      studentId: "234012009",
      fullName: "CHIM SIEVI",
      gender: "Female",
      requestType: "ប្រវត្តិរូបការសិក្សា",
      requestDate: "11-04-2024",
      status: "pending",
    },
    {
      id: 3,
      studentId: "234012001",
      fullName: "Kao Visal",
      gender: "Male",
      requestType: "ប្រវត្តិរូបការសិក្សា",
      requestDate: "10-31-2024",
      status: "approved",
    },
    {
      id: 4,
      studentId: "234012007",
      fullName: "CHEA LONG",
      gender: "Female",
      requestType: "សញ្ញាបត្របណ្ឌិត",
      requestDate: "10-28-2024",
      status: "rejected",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between bg-muted/50 pb-2">
        <CardTitle className="text-lg font-medium">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-600" />
            <span>Request Management</span>
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search requests..."
              className="w-64 pl-8"
            />
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            New
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="all" className="w-full">
          <div className="border-b px-6 pt-2">
            <TabsList className="w-full justify-start rounded-none border-b-0 bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-emerald-600 data-[state=active]:shadow-none"
              >
                All Requests
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-emerald-600 data-[state=active]:shadow-none"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="approved"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-emerald-600 data-[state=active]:shadow-none"
              >
                Approved
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-emerald-600 data-[state=active]:shadow-none"
              >
                Rejected
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="m-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[50px] text-center">#</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Full name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Request type</TableHead>
                    <TableHead>Request date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request, index) => (
                    <TableRow key={request.id}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell>{request.studentId}</TableCell>
                      <TableCell>{request.fullName}</TableCell>
                      <TableCell>{request.gender}</TableCell>
                      <TableCell>{request.requestType}</TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            request.status === "approved"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : request.status === "rejected"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          }
                        >
                          {request.status.charAt(0).toUpperCase() +
                            request.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Link href={`/requests/${request.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                          >
                            Detail
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="pending" className="m-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[50px] text-center">#</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Full name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Request type</TableHead>
                    <TableHead>Request date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests
                    .filter((request) => request.status === "pending")
                    .map((request, index) => (
                      <TableRow key={request.id}>
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell>{request.studentId}</TableCell>
                        <TableCell>{request.fullName}</TableCell>
                        <TableCell>{request.gender}</TableCell>
                        <TableCell>{request.requestType}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Link href={`/requests/${request.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                            >
                              Detail
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="approved" className="m-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[50px] text-center">#</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Full name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Request type</TableHead>
                    <TableHead>Request date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests
                    .filter((request) => request.status === "approved")
                    .map((request, index) => (
                      <TableRow key={request.id}>
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell>{request.studentId}</TableCell>
                        <TableCell>{request.fullName}</TableCell>
                        <TableCell>{request.gender}</TableCell>
                        <TableCell>{request.requestType}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Approved
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Link href={`/requests/${request.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                            >
                              Detail
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="m-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[50px] text-center">#</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Full name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Request type</TableHead>
                    <TableHead>Request date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests
                    .filter((request) => request.status === "rejected")
                    .map((request, index) => (
                      <TableRow key={request.id}>
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell>{request.studentId}</TableCell>
                        <TableCell>{request.fullName}</TableCell>
                        <TableCell>{request.gender}</TableCell>
                        <TableCell>{request.requestType}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                            Rejected
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Link href={`/requests/${request.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                            >
                              Detail
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
