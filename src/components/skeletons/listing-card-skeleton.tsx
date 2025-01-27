import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ListingCardSkeleton = () => {
  return (
    <Card className="overflow-clip h-full w-full">
      <CardContent className="relative h-[280px] mb-3">
        <Skeleton className="absolute top-0 left-0 w-full h-full" />
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-6">
          <div className="flex gap-1">
            <Skeleton className="w-16 h-6 rounded-md" />
            <Skeleton className="w-16 h-6 rounded-md" />
            <Skeleton className="w-16 h-6 rounded-md" />
            <Skeleton className="w-16 h-6 rounded-md" />
          </div>
          <Skeleton className="w-3/4 h-8 rounded-md" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-full h-5 rounded-md" />
            <Skeleton className="w-5/6 h-5 rounded-md" />
            <Skeleton className="w-3/4 h-5 rounded-md" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ListingCardSkeleton;
