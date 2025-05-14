
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import AdWizard from "@/components/AdWizard";
import Dashboard from "@/components/Dashboard";
import ImportAds from "@/components/ImportAds";
import Verification from "@/components/Verification";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showWizard, setShowWizard] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [verificationRequired, setVerificationRequired] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("not-verified"); // "not-verified", "pending", "verified"
  const [ads, setAds] = useState<any[]>([]);

  const handleCreateAd = (adData: any) => {
    const newAd = {
      ...adData,
      status: verificationStatus === "verified" ? "approved" : "pending",
      id: Math.random().toString(36).substring(2, 9),
      dateCreated: new Date().toISOString(),
      clicks: 0,
      impressions: 0,
      spend: 0
    };

    setAds([...ads, newAd]);
    
    if (verificationStatus === "not-verified") {
      setVerificationRequired(true);
    } else {
      setShowWizard(false);
      setActiveTab("dashboard");
    }
  };

  const handleVerificationSubmit = (verificationData: any) => {
    // In a real implementation, this would send data to a backend
    console.log("Verification data submitted:", verificationData);
    setVerificationStatus("pending");
    setVerificationRequired(false);
    setActiveTab("dashboard");
  };

  const handleImportComplete = (importedAds: any[]) => {
    setAds([...ads, ...importedAds]);
    setShowImport(false);
    
    if (verificationStatus === "not-verified") {
      setVerificationRequired(true);
    } else {
      setActiveTab("dashboard");
    }
  };

  if (showWizard) {
    return <AdWizard onComplete={handleCreateAd} onCancel={() => setShowWizard(false)} />;
  }

  if (showImport) {
    return <ImportAds onComplete={handleImportComplete} onCancel={() => setShowImport(false)} />;
  }

  if (verificationRequired) {
    return <Verification onComplete={handleVerificationSubmit} onCancel={() => {
      setVerificationRequired(false);
      setActiveTab("dashboard");
    }} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Melasearch Ads</h1>
            <p className="text-muted-foreground mt-1">Simple advertising for everyday business owners</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowImport(true)}
              className="flex items-center gap-2"
            >
              Import Ads
            </Button>
            <Button 
              onClick={() => setShowWizard(true)}
              className="flex items-center gap-2"
            >
              Create New Ad
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </header>

      {verificationStatus !== "verified" && (
        <Card className="mb-8 border-amber-400 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-2 rounded-full dark:bg-amber-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 dark:text-amber-400">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-amber-800 dark:text-amber-300">
                  {verificationStatus === "pending" 
                    ? "Business verification in progress" 
                    : "Verify your business to activate ads"}
                </h3>
                <p className="text-amber-700 mt-1 dark:text-amber-400">
                  {verificationStatus === "pending"
                    ? "We're reviewing your information. This usually takes 1-2 business days."
                    : "Your ads will not be shown until your business is verified."
                  }
                </p>
              </div>
              {verificationStatus === "not-verified" && (
                <Button 
                  variant="outline" 
                  className="ml-auto shrink-0 bg-amber-200 border-amber-300 hover:bg-amber-300 text-amber-900 dark:bg-amber-800 dark:border-amber-700 dark:text-amber-100 dark:hover:bg-amber-700"
                  onClick={() => setVerificationRequired(true)}
                >
                  Verify Now
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Dashboard 
            ads={ads} 
            verificationStatus={verificationStatus}
            onCreateAdClick={() => setShowWizard(true)}
            onVerifyClick={() => setVerificationRequired(true)}
          />
        </TabsContent>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account details and payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Business Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 border rounded-md">
                      <div className="text-sm text-muted-foreground">Business Name</div>
                      <div className="font-medium">Not Set</div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="text-sm text-muted-foreground">Business Website</div>
                      <div className="font-medium">Not Set</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Verification Status</h3>
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${
                        verificationStatus === "verified" ? "bg-green-500" : 
                        verificationStatus === "pending" ? "bg-amber-500" : "bg-red-500"
                      }`}></div>
                      <div className="font-medium">
                        {verificationStatus === "verified" ? "Verified" : 
                         verificationStatus === "pending" ? "Pending Review" : "Not Verified"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">Update Information</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
