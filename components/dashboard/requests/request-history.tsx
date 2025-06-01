import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Loading from "@/components/shared/loading";

interface RequestHistoryItem {
  id: number;
  document1: boolean;
  document2: boolean;
  document3: boolean;
  requestDate: string;
  status: "Done" | "Rejected" | "Pending";
  comment: string;
}

interface RequestHistoryProps {
  data?: RequestHistoryItem[];
  isLoading?: boolean;
}


export function RequestHistory({
  data = [],
  isLoading = false,
}: RequestHistoryProps) {
  const requestTableHeader = [
    { label: "#", className: "" },
    { label: "ប្រតិបត្តិសិក្សា", className: "" },
    { label: "ប្រតិប័ត្រ", className: "" },
    { label: "សាលាបណ្ណាល័យ", className: "" },
    { label: "Request Date", className: "" },
    { label: "Status", className: "" },
    { label: "Comment", className: "" },
  ];

  const getStatusBadge = (status: string) => {
    const baseBadgeClasses =
      "w-24 h-8 flex items-center justify-center text-sm font-medium rounded-full";

    switch (status) {
      case "Done":
        return (
          <Badge
            className={`bg-green-100 text-green-800 hover:bg-green-100 ${baseBadgeClasses}`}
          >
            Done
          </Badge>
        );
      case "Rejected":
        return (
          <Badge
            className={`bg-red-100 text-red-800 hover:bg-red-100 ${baseBadgeClasses}`}
          >
            Rejected
          </Badge>
        );
      case "Pending":
        return (
          <Badge
            className={`bg-orange-100 text-orange-800 hover:bg-orange-100 ${baseBadgeClasses}`}
          >
            Pending
          </Badge>
        );
      default:
        return (
          <Badge
            className={`bg-gray-100 text-gray-800 hover:bg-gray-100 ${baseBadgeClasses}`}
          >
            {status}
          </Badge>
        );
    }
  };
  
  

  return (
    <div className="">
      <div className="">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Request History
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        {isLoading ? (
          <Loading />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {requestTableHeader.map((header, index) => (
                  <TableHead key={index} className={header.className}>
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No Records
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item, index) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.document1 || "---"}</TableCell>
                      <TableCell>
                        {item.document2 ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <span className="text-gray-400">---</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.document3 ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <span className="text-gray-400">---</span>
                        )}
                      </TableCell>
                      <TableCell>{item.requestDate}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{item.comment || "---"}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
