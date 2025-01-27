import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const WarningBanner = () => {
  return (
   <Alert className="rounded-none">
      <div className="flex items-center justify-center gap-2 text-yellow-500">
        <AlertCircle className="h-4 w-4" />
        <div>
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            Please ensure you have filled out all required fields before proceeding.
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default WarningBanner;
