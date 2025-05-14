import { useState } from "react";
import { toast } from "sonner";
import { VerificationFormErrors, VerificationMethod } from "@/types/verification";

export const useVerification = (onComplete: (data: any) => void) => {
  const [activeTab, setActiveTab] = useState<VerificationMethod>("license");
  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod>("license");
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);
  const [businessWebsite, setBusinessWebsite] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<VerificationFormErrors>({});

  const handleSendCode = () => {
    let hasErrors = false;
    const newErrors: VerificationFormErrors = {};
    
    if (activeTab === "phone" && !businessPhone) {
      newErrors.phone = "Please enter a valid phone number";
      hasErrors = true;
    } else if (activeTab === "email" && !businessEmail) {
      newErrors.email = "Please enter a valid business email";
      hasErrors = true;
    } else if (activeTab === "email" && !businessEmail.includes("@")) {
      newErrors.email = "Please enter a valid email address";
      hasErrors = true;
    } else if (activeTab === "website" && !businessWebsite) {
      newErrors.website = "Please enter your business website";
      hasErrors = true;
    } else if (activeTab === "address" && !businessAddress) {
      newErrors.address = "Please enter your business address";
      hasErrors = true;
    }
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    
    toast.success(`Verification code sent to your ${activeTab === "phone" ? "phone" : "email"}`);
    setCodeSent(true);
  };

  const validateForm = () => {
    const newErrors: VerificationFormErrors = {};
    
    if (activeTab === "license" && !businessLicense) {
      newErrors.license = "Please upload your business license";
    } else if (activeTab === "website" && !businessWebsite) {
      newErrors.website = "Please enter your business website";
    } else if (activeTab === "address" && !businessAddress) {
      newErrors.address = "Please enter your business address";
    } else if (activeTab === "phone" && !businessPhone) {
      newErrors.phone = "Please enter a valid phone number";
    } else if (activeTab === "email" && !businessEmail) {
      newErrors.email = "Please enter a valid business email";
    }
    
    if (codeSent && !verificationCode) {
      newErrors.code = "Please enter the verification code";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate file upload if we have a license file
    if (businessLicense) {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              completeVerification();
            }, 500);
            return 100;
          }
          return newProgress;
        });
      }, 100);
    } else {
      // Otherwise just simulate a brief submission
      setTimeout(() => {
        completeVerification();
      }, 1500);
    }
  };

  const completeVerification = () => {
    const verificationData = {
      method: activeTab,
      businessLicense: businessLicense ? businessLicense.name : null,
      businessWebsite,
      businessAddress,
      businessPhone,
      businessEmail,
      timestamp: new Date().toISOString()
    };
    
    setIsSubmitting(false);
    toast.success("Verification submission successful!");
    onComplete(verificationData);
  };
  
  const resetErrors = () => {
    setErrors({});
  };

  return {
    activeTab,
    setActiveTab,
    verificationMethod,
    setVerificationMethod,
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
    setIsSubmitting,
    uploadProgress,
    setUploadProgress,
    errors,
    setErrors,
    handleSendCode,
    validateForm,
    handleSubmit,
    resetErrors
  };
};
