import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, AlertCircle, Upload, Check, Shield, MapPin, Phone, Mail } from "lucide-react";
import Globe from "@/components/ui/globe";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface VerificationProps {
  onComplete: (verificationData: any) => void;
  onCancel: () => void;
}

const Verification = ({ onComplete, onCancel }: VerificationProps) => {
  const [activeTab, setActiveTab] = useState("license");
  const [verificationMethod, setVerificationMethod] = useState("license");
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);
  const [businessWebsite, setBusinessWebsite] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBusinessLicense(e.target.files[0]);
      if (errors.license) {
        setErrors({ ...errors, license: "" });
      }
    }
  };

  const handleSendCode = () => {
    let hasErrors = false;
    const newErrors: Record<string, string> = {};
    
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
    const newErrors: Record<string, string> = {};
    
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

  const renderVerificationMethod = () => {
    switch (activeTab) {
      case "license":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessLicense">Upload Business License or Registration<span className="text-red-500">*</span></Label>
              <div className="border rounded-md p-8 border-dashed flex flex-col items-center justify-center">
                {isSubmitting && businessLicense ? (
                  <div className="w-full">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Uploading {businessLicense.name}</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                ) : (
                  <>
                    <Upload size={24} className="text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground mb-3">Upload your business license (PDF, JPG, PNG)</p>
                    <Input 
                      id="businessLicense" 
                      type="file" 
                      accept=".pdf,.jpg,.jpeg,.png" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                    <Button variant="outline" onClick={() => document.getElementById("businessLicense")?.click()}>
                      Select File
                    </Button>
                    {businessLicense && (
                      <p className="text-sm mt-3">
                        Selected: <span className="font-medium">{businessLicense.name}</span>
                      </p>
                    )}
                  </>
                )}
              </div>
              {errors.license && <p className="text-sm text-red-500 mt-1">{errors.license}</p>}
            </div>
          </div>
        );
        
      case "website":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessWebsite">Business Website<span className="text-red-500">*</span></Label>
              <Input
                id="businessWebsite"
                placeholder="www.yourbusiness.com"
                value={businessWebsite}
                onChange={(e) => {
                  setBusinessWebsite(e.target.value);
                  if (errors.website) setErrors({ ...errors, website: "" });
                }}
                className={errors.website ? "border-red-500" : ""}
              />
              {errors.website && <p className="text-sm text-red-500">{errors.website}</p>}
              <p className="text-sm text-muted-foreground">We'll verify your business by checking your website for contact details.</p>
            </div>
          </div>
        );
        
      case "address":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessAddress">Business Address<span className="text-red-500">*</span></Label>
              <Input
                id="businessAddress"
                placeholder="123 Main St, City, State, ZIP"
                value={businessAddress}
                onChange={(e) => {
                  setBusinessAddress(e.target.value);
                  if (errors.address) setErrors({ ...errors, address: "" });
                }}
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
              <p className="text-sm text-muted-foreground">We'll verify your address against Google Maps, Yelp, and business listings.</p>
            </div>
          </div>
        );
        
      case "phone":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessPhone">Business Phone<span className="text-red-500">*</span></Label>
              <div className={`flex gap-2 ${codeSent ? "mb-4" : ""}`}>
                <Input
                  id="businessPhone"
                  placeholder="(123) 456-7890"
                  value={businessPhone}
                  onChange={(e) => {
                    setBusinessPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: "" });
                  }}
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
                    onChange={(e) => {
                      setVerificationCode(e.target.value);
                      if (errors.code) setErrors({ ...errors, code: "" });
                    }}
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
        
      case "email":
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
                  onChange={(e) => {
                    setBusinessEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
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
                    onChange={(e) => {
                      setVerificationCode(e.target.value);
                      if (errors.code) setErrors({ ...errors, code: "" });
                    }}
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
        <CardHeader>
          <div className="h-12 w-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4 dark:bg-blue-900 dark:text-blue-300">
            <Shield size={24} />
          </div>
          <CardTitle className="text-2xl">Business Verification</CardTitle>
          <CardDescription>
            Before your ads can go live, we need to verify your business. Choose one of the following verification methods.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs 
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value);
              setCodeSent(false);
              setVerificationCode("");
              setErrors({});
            }}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full mb-6">
              <TabsTrigger value="license" className="flex items-center justify-center gap-2">
                <Upload size={16} className="hidden md:inline" />
                License
              </TabsTrigger>
              <TabsTrigger value="website" className="flex items-center justify-center gap-2">
                <Globe width={16} height={16} className="hidden md:inline" />
                Website
              </TabsTrigger>
              <TabsTrigger value="address" className="flex items-center justify-center gap-2">
                <MapPin size={16} className="hidden md:inline" />
                Address
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center justify-center gap-2">
                <Phone size={16} className="hidden md:inline" />
                Phone
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center justify-center gap-2">
                <Mail size={16} className="hidden md:inline" />
                Email
              </TabsTrigger>
            </TabsList>
            
            <div className="space-y-6">
              {renderVerificationMethod()}
              
              <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-md border border-blue-100 dark:bg-blue-950 dark:border-blue-900">
                <AlertCircle size={18} className="text-blue-500 mt-0.5" />
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  <p>Your business verification is reviewed by our team within 1-2 business days.</p>
                </div>
              </div>
            </div>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          
          <Button
            onClick={handleSubmit}
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
      </Card>
    </div>
  );
};

export default Verification;
