import type React from "react"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 space-y-4">
      <Tabs defaultValue="list" className="w-full">
        <div className="border-b">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <Link href="/students/list" className="w-full max-w-[200px]">
              <TabsTrigger
                value="list"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Students List
              </TabsTrigger>
            </Link>
            <Link href="/students/add-single" className="w-full max-w-[200px]">
              <TabsTrigger
                value="add-single"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Add Single
              </TabsTrigger>
            </Link>
            <Link href="/students/add-multiple" className="w-full max-w-[200px]">
              <TabsTrigger
                value="add-multiple"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Add Multiple
              </TabsTrigger>
            </Link>
            <Link href="/students/dropout" className="w-full max-w-[200px]">
              <TabsTrigger
                value="dropout"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Dropout Students
              </TabsTrigger>
            </Link>
          </TabsList>
        </div>
      </Tabs>
      {children}
    </div>
  )
}
