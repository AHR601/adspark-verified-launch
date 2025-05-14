
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

interface VerificationFooterProps {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const VerificationFooter = ({ onCancel, onSubmit, isSubmitting }: VerificationFooterProps) => {
  return (
    <CardFooter className="flex justify-between pt-6 border-t">
      <Button
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      
      <Button
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
            Submitting...
          </>
        ) : (
          "Submit for Verification"
        )}
      </Button>
    </CardFooter>
  );
};

export default VerificationFooter;
