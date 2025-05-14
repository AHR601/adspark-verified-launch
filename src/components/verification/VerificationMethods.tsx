
import { Globe } from "@/components/ui/globe";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Phone, Mail, Upload } from "lucide-react";
import { VerificationMethod } from "@/types/verification";

interface VerificationMethodsProps {
  activeTab: VerificationMethod;
  onTabChange: (value: string) => void;
}

const VerificationMethods = ({ activeTab, onTabChange }: VerificationMethodsProps) => {
  return (
    <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full mb-6">
      <TabsTrigger 
        value="license" 
        className="flex items-center justify-center gap-2"
      >
        <Upload size={16} className="hidden md:inline" />
        License
      </TabsTrigger>
      <TabsTrigger 
        value="website" 
        className="flex items-center justify-center gap-2"
      >
        <Globe width={16} height={16} className="hidden md:inline" />
        Website
      </TabsTrigger>
      <TabsTrigger 
        value="address" 
        className="flex items-center justify-center gap-2"
      >
        <MapPin size={16} className="hidden md:inline" />
        Address
      </TabsTrigger>
      <TabsTrigger 
        value="phone" 
        className="flex items-center justify-center gap-2"
      >
        <Phone size={16} className="hidden md:inline" />
        Phone
      </TabsTrigger>
      <TabsTrigger 
        value="email" 
        className="flex items-center justify-center gap-2"
      >
        <Mail size={16} className="hidden md:inline" />
        Email
      </TabsTrigger>
    </TabsList>
  );
};

export default VerificationMethods;
