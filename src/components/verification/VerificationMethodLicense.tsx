
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface LicenseVerificationProps {
  businessLicense: File | null;
  setBusinessLicense: (file: File | null) => void;
  error?: string;
  isSubmitting: boolean;
  uploadProgress: number;
}

const LicenseVerification = ({ 
  businessLicense, 
  setBusinessLicense, 
  error, 
  isSubmitting, 
  uploadProgress 
}: LicenseVerificationProps) => {
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBusinessLicense(e.target.files[0]);
    }
  };

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
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default LicenseVerification;
