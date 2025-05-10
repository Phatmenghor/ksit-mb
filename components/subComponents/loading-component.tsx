import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingComponent() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-md space-y-4 p-6">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}
