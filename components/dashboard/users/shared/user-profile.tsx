import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";

interface ProfileProps {
  user: any;
  className?: string;
}

export const UserProfileSection: React.FC<ProfileProps> = ({
  user,
  className,
}) => {
  const profileUrl = user?.profileUrl
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE}${user?.profileUrl}`
    : undefined;

  return (
    <Card className={clsx("border shadow-sm", className)}>
      <CardContent className="flex flex-col items-center justify-center py-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={profileUrl} alt={user?.username || "User"} />

          <AvatarFallback>
            <AvatarImage
              src={"/assets/profile.png"}
              alt={user?.username || "User"}
            />{" "}
          </AvatarFallback>
        </Avatar>

        <h3 className="font-medium text-lg mt-4">
          {user?.username || "Unknown"}
        </h3>
        <div className="text-sm text-muted-foreground">
          <Badge className="bg-green-100 hover:bg-green-200 text-green-900 p-2">
            ID: {user?.id ?? "N/A"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
