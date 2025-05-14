
import { AlertCircle } from "lucide-react";

const VerificationInfoAlert = () => {
  return (
    <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-md border border-blue-100 dark:bg-blue-950 dark:border-blue-900">
      <AlertCircle size={18} className="text-blue-500 mt-0.5" />
      <div className="text-sm text-blue-700 dark:text-blue-300">
        <p>Your business verification is reviewed by our team within 1-2 business days.</p>
      </div>
    </div>
  );
};

export default VerificationInfoAlert;
