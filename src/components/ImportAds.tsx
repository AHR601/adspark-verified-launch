
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, AlertTriangle, Upload, ChevronRight, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface ImportAdsProps {
  onComplete: (importedAds: any[]) => void;
  onCancel: () => void;
}

const ImportAds = ({ onComplete, onCancel }: ImportAdsProps) => {
  const [importMethod, setImportMethod] = useState("google");
  const [apiKey, setApiKey] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const simulateImport = () => {
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    // Simulate completion after "upload"
    setTimeout(() => {
      clearInterval(interval);
      setIsUploading(false);
      setUploadProgress(100);
      
      // Generate sample imported ads
      const mockImportedAds = [
        {
          businessName: "Sample Imported Business",
          businessWebsite: "www.importedbusiness.com",
          businessType: "plumbing",
          headline: "Professional Plumbing Services - 24/7 Support",
          description: "Quality plumbing repairs with same-day service. Licensed and insured plumbers with 10+ years of experience.",
          goal: "calls",
          keywords: ["emergency plumber", "plumbing repair", "24 hour plumber", "plumbing company"],
          dailyBudget: 25,
          status: "pending",
          id: "imported-1",
          dateCreated: new Date().toISOString(),
          clicks: 0,
          impressions: 0,
          spend: 0
        },
        {
          businessName: "Sample Imported Business",
          businessWebsite: "www.importedbusiness.com",
          businessType: "plumbing",
          headline: "Affordable Drain Cleaning - Fast Service",
          description: "Clogged drains? Our expert plumbers clear any drain fast. Free estimates and affordable rates.",
          goal: "clicks",
          keywords: ["drain cleaning", "clogged drain", "drain service", "sewer cleaning"],
          dailyBudget: 15,
          status: "pending",
          id: "imported-2",
          dateCreated: new Date().toISOString(),
          clicks: 0,
          impressions: 0,
          spend: 0
        }
      ];
      
      toast.success(`Successfully imported ${mockImportedAds.length} ads`);
      onComplete(mockImportedAds);
    }, 3500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button 
        variant="ghost" 
        className="mb-6 pl-2"
        onClick={onCancel}
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Dashboard
      </Button>
      
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Import your ads</CardTitle>
          <CardDescription>
            Import your existing ads from Google Ads or Microsoft Advertising
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {isUploading ? (
            <div className="py-12">
              <div className="text-center mb-8">
                <h3 className="text-lg font-medium mb-2">Importing your ads...</h3>
                <p className="text-muted-foreground">Please don't close this window</p>
              </div>
              
              <div className="max-w-md mx-auto mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
              
              <div className="max-w-md mx-auto text-sm space-y-2">
                <div className="flex items-center">
                  <Check size={16} className="mr-2 text-green-500" />
                  <span>Connecting to account</span>
                </div>
                <div className="flex items-center">
                  <Check size={16} className="mr-2 text-green-500" />
                  <span>Retrieving campaign data</span>
                </div>
                <div className="flex items-center">
                  {uploadProgress >= 70 ? (
                    <Check size={16} className="mr-2 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-primary animate-spin mr-2"></div>
                  )}
                  <span>Processing keywords</span>
                </div>
                <div className="flex items-center">
                  {uploadProgress >= 90 ? (
                    <Check size={16} className="mr-2 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-primary animate-spin mr-2 opacity-0"></div>
                  )}
                  <span className={uploadProgress >= 90 ? "" : "text-muted-foreground"}>Finalizing import</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <RadioGroup 
                value={importMethod} 
                onValueChange={setImportMethod}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${importMethod === 'google' ? 'border-primary bg-accent' : ''}`}>
                  <RadioGroupItem value="google" id="google" />
                  <Label htmlFor="google" className="cursor-pointer flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path d="M22.54 11.23c0-.75-.07-1.47-.19-2.17H12v4.09h5.92c-.25 1.37-1.04 2.53-2.21 3.31v2.76h3.57c2.09-1.92 3.29-4.75 3.29-8" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53" fill="#EA4335"/>
                    </svg>
                    <div>Google Ads</div>
                  </Label>
                </div>
                <div className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${importMethod === 'microsoft' ? 'border-primary bg-accent' : ''}`}>
                  <RadioGroupItem value="microsoft" id="microsoft" />
                  <Label htmlFor="microsoft" className="cursor-pointer flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="2" width="9" height="9" fill="#F25022"/>
                      <rect x="13" y="2" width="9" height="9" fill="#7FBA00"/>
                      <rect x="2" y="13" width="9" height="9" fill="#00A4EF"/>
                      <rect x="13" y="13" width="9" height="9" fill="#FFB900"/>
                    </svg>
                    <div>Microsoft Ads</div>
                  </Label>
                </div>
              </RadioGroup>
              
              <Separator />
              
              {importMethod === "google" || importMethod === "microsoft" ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Access Key</Label>
                    <Input 
                      id="apiKey"
                      type="password" 
                      placeholder={`Enter your ${importMethod === "google" ? "Google" : "Microsoft"} Ads API key`} 
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      You can find your API key in your {importMethod === "google" ? "Google Ads" : "Microsoft Advertising"} account settings.
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-md flex items-start gap-2 border border-amber-100 dark:bg-amber-950 dark:border-amber-900">
                    <AlertTriangle size={16} className="text-amber-600 mt-0.5" />
                    <div className="text-sm text-amber-800 dark:text-amber-300">
                      <p className="font-medium">This is a demo feature</p>
                      <p className="mt-1">In the production version, this would connect to the actual {importMethod === "google" ? "Google" : "Microsoft"} Ads API.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="csvFile">Upload CSV File</Label>
                    <div className="border rounded-md p-8 border-dashed flex flex-col items-center justify-center">
                      <Upload size={24} className="text-muted-foreground mb-3" />
                      <p className="text-sm text-muted-foreground mb-3">Click to browse or drag and drop</p>
                      <Input 
                        id="csvFile" 
                        type="file" 
                        accept=".csv" 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                      <Button variant="outline" onClick={() => document.getElementById("csvFile")?.click()}>
                        Select File
                      </Button>
                      {file && (
                        <p className="text-sm mt-3">
                          Selected: <span className="font-medium">{file.name}</span>
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Please upload a CSV file exported from Google Ads or Microsoft Advertising.
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-md flex items-start gap-2 border border-amber-100 dark:bg-amber-950 dark:border-amber-900">
                    <AlertTriangle size={16} className="text-amber-600 mt-0.5" />
                    <div className="text-sm text-amber-800 dark:text-amber-300">
                      <p className="font-medium">This is a demo feature</p>
                      <p className="mt-1">In the production version, this would parse your CSV file for ad data.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isUploading}
          >
            Cancel
          </Button>
          
          <Button
            onClick={simulateImport}
            disabled={isUploading || (!apiKey && !file)}
          >
            Import Ads
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ImportAds;
