import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Calendar,
  CheckSquare,
  Database,
  FileText,
  Home,
  Users,
} from "lucide-react";

export default function Permissions() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Apply role permission */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-6 flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium">Apply role permission</h3>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                - User role *
              </h4>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Please Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                - Functions to apply
              </h4>

              <div className="space-y-4">
                {/* Dashboard */}
                <div className="flex items-start gap-2">
                  <div className="w-6 text-right">1.</div>
                  <Checkbox id="dashboard" />
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <label
                      htmlFor="dashboard"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Dashboard
                    </label>
                  </div>
                </div>

                {/* Master data */}
                <div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 text-right">2.</div>
                    <Checkbox id="master-data" />
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-muted-foreground" />
                      <label
                        htmlFor="master-data"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Master data
                      </label>
                    </div>
                  </div>

                  <div className="ml-12 mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="manage-class" />
                      <label
                        htmlFor="manage-class"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Manage class
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="manage-semester" />
                      <label
                        htmlFor="manage-semester"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Manage semester
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="manage-major" />
                      <label
                        htmlFor="manage-major"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Manage major
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="manage-department" />
                      <label
                        htmlFor="manage-department"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Manage department
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="manage-room" />
                      <label
                        htmlFor="manage-room"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Manage room
                      </label>
                    </div>
                  </div>
                </div>

                {/* Users */}
                <div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 text-right">3.</div>
                    <Checkbox id="users" />
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <label
                        htmlFor="users"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Users
                      </label>
                    </div>
                  </div>

                  <div className="ml-12 mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="members" />
                      <label
                        htmlFor="members"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Members
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="teachers" />
                      <label
                        htmlFor="teachers"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Teachers
                      </label>
                    </div>
                  </div>
                </div>

                {/* Students */}
                <div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 text-right">4.</div>
                    <Checkbox id="students" />
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <label
                        htmlFor="students"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Students
                      </label>
                    </div>
                  </div>

                  <div className="ml-12 mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="add-multiple-users" />
                      <label
                        htmlFor="add-multiple-users"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Add multiple users
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="add-single-user" />
                      <label
                        htmlFor="add-single-user"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Add single user
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="students-list" />
                      <label
                        htmlFor="students-list"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Students list
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="dropout-students" />
                      <label
                        htmlFor="dropout-students"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Dropout students
                      </label>
                    </div>
                  </div>
                </div>

                {/* Manage schedule */}
                <div className="flex items-start gap-2">
                  <div className="w-6 text-right">5.</div>
                  <Checkbox id="manage-schedule" />
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <label
                      htmlFor="manage-schedule"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Manage schedule
                    </label>
                  </div>
                </div>

                {/* Courses */}
                <div className="flex items-start gap-2">
                  <div className="w-6 text-right">6.</div>
                  <Checkbox id="courses" />
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <label
                      htmlFor="courses"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Courses
                    </label>
                  </div>
                </div>

                {/* Student score */}
                <div className="flex items-start gap-2">
                  <div className="w-6 text-right">7.</div>
                  <Checkbox id="student-score" />
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <label
                      htmlFor="student-score"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Student score
                    </label>
                  </div>
                </div>

                {/* Score submitted */}
                <div className="flex items-start gap-2">
                  <div className="w-6 text-right">8.</div>
                  <Checkbox id="score-submitted" />
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <label
                      htmlFor="score-submitted"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Score submitted
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Apply user permission */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium">Apply user permission</h3>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                - User *
              </h4>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Please Select User" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith</SelectItem>
                  <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
                  <SelectItem value="emily-davis">Emily Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                - Apply user role *
              </h4>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 text-right">1.</div>
                  <Checkbox id="admin-role" />
                  <label
                    htmlFor="admin-role"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Admin
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 text-right">2.</div>
                  <Checkbox id="officer-role" />
                  <label
                    htmlFor="officer-role"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Officer
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 text-right">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                APPLY
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
