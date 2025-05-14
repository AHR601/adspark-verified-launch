
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface WebsiteVerificationProps {
  businessWebsite: string;
  setBusinessWebsite: (value: string) => void;
  error?: string;
}

const WebsiteVerification = ({ 
  businessWebsite, 
  setBusinessWebsite, 
  error 
}: WebsiteVerificationProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="businessWebsite">Business Website<span className="text-red-500">*</span></Label>
        <Input
          id="businessWebsite"
          placeholder="www.yourbusiness.com"
          value={businessWebsite}
          onChange={(e) => setBusinessWebsite(e.target.value)}
          className={error ? "border-red-500" : ""}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <p className="text-sm text-muted-foreground">We'll verify your business by checking your website for contact details.</p>
      </div>
    </div>
  );
};

export default WebsiteVerification;
