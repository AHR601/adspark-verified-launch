
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PhoneVerificationProps {
  businessPhone: string;
  setBusinessPhone: (value: string) => void;
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  codeSent: boolean;
  setCodeSent: (value: boolean) => void;
  handleSendCode: () => void;
  errors: {
    phone?: string;
    code?: string;
  };
}

const PhoneVerification = ({
  businessPhone,
  setBusinessPhone,
  verificationCode,
  setVerificationCode,
  codeSent,
  setCodeSent,
  handleSendCode,
  errors
}: PhoneVerificationProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="businessPhone">Business Phone<span className="text-red-500">*</span></Label>
        <div className={`flex gap-2 ${codeSent ? "mb-4" : ""}`}>
          <Input
            id="businessPhone"
            placeholder="(123) 456-7890"
            value={businessPhone}
            onChange={(e) => setBusinessPhone(e.target.value)}
            className={errors.phone ? "border-red-500" : ""}
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
        {errors.phone && !codeSent && <p className="text-sm text-red-500">{errors.phone}</p>}
        
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

export default PhoneVerification;
