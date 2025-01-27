import { Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const NoResultsBanner = () => {
  return (
    <Alert className="rounded-none">
      <div className="flex items-center justify-center gap-2 text-red-500">
        <Search className="h-4 w-4" />
        <div>
          <AlertTitle>No Results Found</AlertTitle>
          <AlertDescription>
            Your search did not match any results. Try using different keywords or filters.
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default NoResultsBanner;
