"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BadgeCheck, XCircle, Pencil, RefreshCcw, Trash2 } from "lucide-react";

const admins = [
  {
    id: 1,
    fullname: "Vutheaims",
    email: "tongvuthea@gmail.com",
    username: "Vutheaims",
    createdAt: "2024-06-21",
    active: true,
  },
  {
    id: 2,
    fullname: "regadmin",
    email: "regadmin@gmail.com",
    username: "regadmin",
    createdAt: "2024-12-10",
    active: true,
  },
  {
    id: 3,
    fullname: "User01",
    email: "user@gmail.com",
    username: "user01",
    createdAt: "2024-09-18",
    active: false,
  },
];

const staff = [
  {
    id: 202505,
    kh: "គុយ ពុទ្រីន",
    en: "KEO PUTRIN",
    username: "KEO PUTRIN",
    active: true,
  },
  {
    id: 202506,
    kh: "ហុង ចាន់លី",
    en: "HONG CHANNLY",
    username: "HONG CHANNLY",
    active: true,
  },
  {
    id: 202521,
    kh: "ពូ សុវណ្ណេត្រា",
    en: "PO SUVANNETRA",
    username: "PO SUVANNETRA",
    active: true,
  },
];

export default function MembersList() {
  return (
    <>
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">Admins list</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Fullname</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Create date</TableHead>
                <TableHead>Active status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin, index) => (
                <TableRow key={admin.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{admin.fullname}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.username}</TableCell>
                  <TableCell>{admin.createdAt}</TableCell>
                  <TableCell>
                    {admin.active ? (
                      <BadgeCheck className="text-green-600" />
                    ) : (
                      <XCircle className="text-red-600" />
                    )}
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button size="icon" variant="outline">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <RefreshCcw className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">Staffs officer list</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Teacher ID</TableHead>
                <TableHead>Fullname (KH)</TableHead>
                <TableHead>Fullname (EN)</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Active status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((s, index) => (
                <TableRow key={s.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{s.id}</TableCell>
                  <TableCell>{s.kh}</TableCell>
                  <TableCell>{s.en}</TableCell>
                  <TableCell>{s.username}</TableCell>
                  <TableCell>
                    <BadgeCheck className="text-green-600" />
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button size="icon" variant="outline">
                      <RefreshCcw className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
