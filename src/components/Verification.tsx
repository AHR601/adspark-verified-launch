
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useVerification } from "@/hooks/useVerification";
import { VerificationProps, VerificationMethod } from "@/types/verification";

import VerificationHeader from "./verification/VerificationHeader";
import VerificationMethods from "./verification/VerificationMethods";
import LicenseVerification from "./verification/VerificationMethodLicense";
import WebsiteVerification from "./verification/VerificationMethodWebsite";
import AddressVerification from "./verification/VerificationMethodAddress";
import PhoneVerification from "./verification/VerificationMethodPhone";
import EmailVerification from "./verification/VerificationMethodEmail";
import VerificationInfoAlert from "./verification/VerificationInfoAlert";
import VerificationFooter from "./verification/VerificationFooter";

const Verification = ({ onComplete, onCancel }: VerificationProps) => {
  const {
    activeTab,
    setActiveTab,
    businessLicense,
    setBusinessLicense,
    businessWebsite,
    setBusinessWebsite,
    businessAddress,
    setBusinessAddress,
    businessPhone,
    setBusinessPhone,
    businessEmail,
    setBusinessEmail,
    verificationCode,
    setVerificationCode,
    codeSent,
    setCodeSent,
    isSubmitting,
    uploadProgress,
    errors,
    handleSendCode,
    handleSubmit,
    resetErrors
  } = useVerification(onComplete);

  const handleTabChange = (value: string) => {
    setActiveTab(value as VerificationMethod);
    setCodeSent(false);
    setVerificationCode("");
    resetErrors();
  };

  const renderVerificationMethod = () => {
    switch (activeTab) {
      case "license":
        return (
          <LicenseVerification
            businessLicense={businessLicense}
            setBusinessLicense={setBusinessLicense}
            error={errors.license}
            isSubmitting={isSubmitting}
            uploadProgress={uploadProgress}
          />
        );
      case "website":
        return (
          <WebsiteVerification
            businessWebsite={businessWebsite}
            setBusinessWebsite={setBusinessWebsite}
            error={errors.website}
          />
        );
      case "address":
        return (
          <AddressVerification
            businessAddress={businessAddress}
            setBusinessAddress={setBusinessAddress}
            error={errors.address}
          />
        );
      case "phone":
        return (
          <PhoneVerification
            businessPhone={businessPhone}
            setBusinessPhone={setBusinessPhone}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            codeSent={codeSent}
            setCodeSent={setCodeSent}
            handleSendCode={handleSendCode}
            errors={{ phone: errors.phone, code: errors.code }}
          />
        );
      case "email":
        return (
          <EmailVerification
            businessEmail={businessEmail}
            setBusinessEmail={setBusinessEmail}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            codeSent={codeSent}
            setCodeSent={setCodeSent}
            handleSendCode={handleSendCode}
            errors={{ email: errors.email, code: errors.code }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button 
        variant="ghost" 
        className="mb-6 pl-2"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Dashboard
      </Button>
      
      <Card className="border-0 shadow-lg">
        <VerificationHeader />
        
        <CardContent>
          <Tabs 
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <VerificationMethods activeTab={activeTab} onTabChange={handleTabChange} />
            
            <div className="space-y-6">
              {renderVerificationMethod()}
              <VerificationInfoAlert />
            </div>
          </Tabs>
        </CardContent>
        
        <VerificationFooter
          onCancel={onCancel}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </Card>
    </div>
  );
};

export default Verification;
