
import { Shield } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const VerificationHeader = () => {
  return (
    <CardHeader>
      <div className="h-12 w-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4 dark:bg-blue-900 dark:text-blue-300">
        <Shield size={24} />
      </div>
      <CardTitle className="text-2xl">Business Verification</CardTitle>
      <CardDescription>
        Before your ads can go live, we need to verify your business. Choose one of the following verification methods.
      </CardDescription>
    </CardHeader>
  );
};

export default VerificationHeader;
