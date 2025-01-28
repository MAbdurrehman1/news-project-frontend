import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const WarningBanner = () => {
  return (
   <Alert className="rounded-none">
      <div className="flex items-center justify-center gap-2 text-yellow-500">
        <AlertCircle className="h-4 w-4" />
        <div>
          <AlertDescription>
            Use the search button and filters to find news articles
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default WarningBanner;
