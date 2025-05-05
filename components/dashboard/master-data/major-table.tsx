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
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function MajorTable() {
  const majors = [
    {
      id: 1,
      code: "401",
      name: "បរិញ្ញាបត្រជំនាញ",
      department: "Computer Science",
    },
    {
      id: 2,
      code: "501",
      name: "Business Computer",
      department: "ធនាគារ និងហិរញ្ញវត្ថុ",
    },
    {
      id: 3,
      code: "5011",
      name: "Business Technology and Innovation",
      department: "ធនាគារ និងហិរញ្ញវត្ថុ",
    },
    {
      id: 4,
      code: "2081",
      name: "វិទ្យាសាស្រ្តសត្វ (ជំនាញសត្វគោ)",
      department: "ហេដ្ឋារចនាសម្ព័ន្ធ សត្វចិញ្ចឹម",
    },
    {
      id: 5,
      code: "240",
      name: "បរិញ្ញាបត្រអាហារ",
      department: "Food Technology",
    },
    {
      id: 6,
      code: "224578",
      name: "វិទ្យាសាស្រ្តសត្វ",
      department: "Animal Science",
    },
    {
      id: 7,
      code: "201",
      name: "វិទ្យាសាស្រ្តរុក្ខជាតិ",
      department: "Plant Science",
    },
    {
      id: 8,
      code: "220",
      name: "បរិញ្ញាបត្រអគ្គីសនី",
      department: "Electrical Technology",
    },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-medium">Manage Major</h3>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            ADD NEW
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Major Code</TableHead>
              <TableHead>Major</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {majors.map((major) => (
              <TableRow key={major.id}>
                <TableCell>{major.id}</TableCell>
                <TableCell>
                  <span className="rounded bg-gray-100 px-2 py-1 text-gray-800">
                    {major.code}
                  </span>
                </TableCell>
                <TableCell>{major.name}</TableCell>
                <TableCell>{major.department}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-gray-200"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-red-500 text-white hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
