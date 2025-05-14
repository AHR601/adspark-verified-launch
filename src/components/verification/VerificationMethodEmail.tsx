
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EmailVerificationProps {
  businessEmail: string;
  setBusinessEmail: (value: string) => void;
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  codeSent: boolean;
  setCodeSent: (value: boolean) => void;
  handleSendCode: () => void;
  errors: {
    email?: string;
    code?: string;
  };
}

const EmailVerification = ({
  businessEmail,
  setBusinessEmail,
  verificationCode,
  setVerificationCode,
  codeSent,
  setCodeSent,
  handleSendCode,
  errors
}: EmailVerificationProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="businessEmail">Business Email<span className="text-red-500">*</span></Label>
        <div className={`flex gap-2 ${codeSent ? "mb-4" : ""}`}>
          <Input
            id="businessEmail"
            type="email"
            placeholder="contact@yourbusiness.com"
            value={businessEmail}
            onChange={(e) => setBusinessEmail(e.target.value)}
            className={errors.email ? "border-red-500" : ""}
            disabled={codeSent}
          />
          {!codeSent ? (
            <Button type="button" onClick={handleSendCode}>
              Send Code
            </Button>
          ) : (
            <Button variant="outline" type="button" onClick={() => setCodeSent(false)}>
              Change
            </Button>
          )}
        </div>
        {errors.email && !codeSent && <p className="text-sm text-red-500">{errors.email}</p>}
        <p className="text-xs text-muted-foreground mb-4">
          Please use a business email address matching your website domain for faster verification.
        </p>
        
        {codeSent && (
          <div>
            <Label htmlFor="verificationCode">Verification Code<span className="text-red-500">*</span></Label>
            <Input
              id="verificationCode"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className={`mt-1 ${errors.code ? "border-red-500" : ""}`}
            />
            {errors.code && <p className="text-sm text-red-500 mt-1">{errors.code}</p>}
            <Button variant="link" className="p-0 h-auto text-sm" onClick={handleSendCode}>
              Resend code
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
