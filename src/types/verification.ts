
export interface VerificationProps {
  onComplete: (verificationData: any) => void;
  onCancel: () => void;
}

export interface VerificationFormErrors {
  license?: string;
  website?: string;
  address?: string;
  phone?: string;
  email?: string;
  code?: string;
}

export interface VerificationData {
  method: string;
  businessLicense: string | null;
  businessWebsite: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  timestamp: string;
}

export type VerificationMethod = 'license' | 'website' | 'address' | 'phone' | 'email';
