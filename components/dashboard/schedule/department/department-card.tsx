import { Card } from "@/components/ui/card";
import { DepartmentIcon } from "./department-icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

function DepartmentCard({
  name,
  imageUrl,
  imageName,
  onClick,
}: {
  name: string;
  imageUrl: string;
  imageName: string;
  onClick?: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <DepartmentIcon imageUrl={imageUrl} imageName={imageName} />
        <div>
          <p className="text-sm text-muted-foreground">Dep.</p>
          <p className="font-medium">{name}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="text-green-600 hover:text-green-700 hover:bg-green-50"
        asChild
      >
        <Link href="#">
          Classes
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </Card>
  );
}

export default DepartmentCard;
