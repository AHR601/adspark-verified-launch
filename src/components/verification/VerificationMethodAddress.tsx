
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AddressVerificationProps {
  businessAddress: string;
  setBusinessAddress: (value: string) => void;
  error?: string;
}

const AddressVerification = ({ 
  businessAddress, 
  setBusinessAddress, 
  error 
}: AddressVerificationProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="businessAddress">Business Address<span className="text-red-500">*</span></Label>
        <Input
          id="businessAddress"
          placeholder="123 Main St, City, State, ZIP"
          value={businessAddress}
          onChange={(e) => setBusinessAddress(e.target.value)}
          className={error ? "border-red-500" : ""}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <p className="text-sm text-muted-foreground">We'll verify your address against Google Maps, Yelp, and business listings.</p>
      </div>
    </div>
  );
};

export default AddressVerification;
