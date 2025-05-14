
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, ChevronLeft, ChevronRight, ArrowLeft, Phone, MousePointer, Store, Percent, Globe, Film, Image, Monitor } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import KeywordSelector from "@/components/KeywordSelector";

interface AdWizardProps {
  onComplete: (adData: any) => void;
  onCancel: () => void;
}

const AdWizard = ({ onComplete, onCancel }: AdWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [adData, setAdData] = useState({
    businessName: "",
    businessWebsite: "",
    businessType: "",
    adType: "text", // default ad type
    goal: "",
    headline: "",
    description: "",
    selectedTemplate: "",
    keywords: [] as string[],
    dailyBudget: 20,
    videoUrl: "", // for video ads
    displayImage: "", // for display ads
    brandLogo: "", // for brand ads
    brandColors: "", // for brand ads
    brandMessage: "", // for brand ads
  });

  // For controlling form validation at each step
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 5;

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!adData.businessName) newErrors.businessName = "Business name is required";
        if (!adData.businessWebsite) newErrors.businessWebsite = "Business website is required";
        else if (!/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,}){1,}$/.test(adData.businessWebsite)) {
          newErrors.businessWebsite = "Please enter a valid website";
        }
        if (!adData.businessType) newErrors.businessType = "Business type is required";
        if (!adData.adType) newErrors.adType = "Ad type is required";
        break;
      case 2:
        if (!adData.goal) newErrors.goal = "Please select a goal";
        break;
      case 3:
        if (adData.adType === "text") {
          if (adData.selectedTemplate) break; // If template selected, no validation needed
          if (!adData.headline) newErrors.headline = "Headline is required";
          if (!adData.description) newErrors.description = "Description is required";
        } else if (adData.adType === "video") {
          if (!adData.videoUrl) newErrors.videoUrl = "Video URL is required";
          if (!adData.headline) newErrors.headline = "Headline is required";
        } else if (adData.adType === "display") {
          if (!adData.displayImage) newErrors.displayImage = "Display image is required";
          if (!adData.headline) newErrors.headline = "Headline is required";
        } else if (adData.adType === "brand") {
          if (!adData.brandLogo) newErrors.brandLogo = "Brand logo is required";
          if (!adData.brandMessage) newErrors.brandMessage = "Brand message is required";
        }
        break;
      case 4:
        if (adData.keywords.length === 0) newErrors.keywords = "Please select at least one keyword";
        break;
      case 5:
        if (!adData.dailyBudget || adData.dailyBudget < 5) {
          newErrors.dailyBudget = "Daily budget must be at least $5";
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        // Submit the form
        onComplete(adData);
        toast.success("Ad created successfully!");
      }
    } else {
      toast.error("Please fill all required fields");
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onCancel();
    }
  };

  const handleChanges = (field: string, value: any) => {
    setAdData({
      ...adData,
      [field]: value
    });
    
    // Clear the error when user makes a change
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ""
      });
    }
  };

  // Templates for ad copy
  const adTemplates = [
    {
      id: "template1",
      headline: "Save 20% on [Business Type] Services",
      description: "Professional [Business Type] services by [Business Name]. Visit our website for exclusive deals."
    },
    {
      id: "template2",
      headline: "Top-Rated [Business Type] in Your Area",
      description: "[Business Name] offers quality [Business Type] services. Book now for a free consultation."
    },
    {
      id: "template3",
      headline: "Need [Business Type] Services? Call Today!",
      description: "Trusted [Business Type] solutions from [Business Name]. Satisfaction guaranteed."
    }
  ];

  const selectTemplate = (template: any) => {
    const customizedHeadline = template.headline.replace('[Business Type]', adData.businessType).replace('[Business Name]', adData.businessName);
    const customizedDescription = template.description.replace('[Business Type]', adData.businessType).replace('[Business Name]', adData.businessName);
    
    setAdData({
      ...adData,
      headline: customizedHeadline,
      description: customizedDescription,
      selectedTemplate: template.id
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name<span className="text-red-500">*</span></Label>
              <Input
                id="businessName"
                placeholder="Enter your business name"
                value={adData.businessName}
                onChange={(e) => handleChanges("businessName", e.target.value)}
                className={errors.businessName ? "border-red-500" : ""}
              />
              {errors.businessName && <p className="text-sm text-red-500">{errors.businessName}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="businessWebsite">Business Website<span className="text-red-500">*</span></Label>
              <Input
                id="businessWebsite"
                placeholder="www.yourbusiness.com"
                value={adData.businessWebsite}
                onChange={(e) => handleChanges("businessWebsite", e.target.value)}
                className={errors.businessWebsite ? "border-red-500" : ""}
              />
              {errors.businessWebsite && <p className="text-sm text-red-500">{errors.businessWebsite}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type/Service<span className="text-red-500">*</span></Label>
              <Select 
                value={adData.businessType} 
                onValueChange={(value) => handleChanges("businessType", value)}
              >
                <SelectTrigger id="businessType" className={errors.businessType ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrician">Electrician</SelectItem>
                  <SelectItem value="landscaping">Landscaping</SelectItem>
                  <SelectItem value="cleaning">Cleaning Services</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="dental">Dental Services</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="salon">Hair Salon</SelectItem>
                  <SelectItem value="accounting">Accounting Services</SelectItem>
                  <SelectItem value="legal">Legal Services</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.businessType && <p className="text-sm text-red-500">{errors.businessType}</p>}
            </div>
            
            <div className="space-y-3">
              <Label>Ad Type<span className="text-red-500">*</span></Label>
              <RadioGroup 
                value={adData.adType}
                onValueChange={(value) => handleChanges("adType", value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
              >
                <div className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${adData.adType === "text" ? "border-primary bg-accent" : ""}`}>
                  <RadioGroupItem value="text" id="ad-text" />
                  <Label htmlFor="ad-text" className="cursor-pointer flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Globe size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Text Ad</div>
                      <div className="text-sm text-muted-foreground">Standard text-based search ads</div>
                    </div>
                  </Label>
                </div>
                
                <div className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${adData.adType === "video" ? "border-primary bg-accent" : ""}`}>
                  <RadioGroupItem value="video" id="ad-video" />
                  <Label htmlFor="ad-video" className="cursor-pointer flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Film size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Video Ad</div>
                      <div className="text-sm text-muted-foreground">Engage with video content</div>
                    </div>
                  </Label>
                </div>
                
                <div className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${adData.adType === "display" ? "border-primary bg-accent" : ""}`}>
                  <RadioGroupItem value="display" id="ad-display" />
                  <Label htmlFor="ad-display" className="cursor-pointer flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Image size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Display Ad</div>
                      <div className="text-sm text-muted-foreground">Visual banner advertisements</div>
                    </div>
                  </Label>
                </div>
                
                <div className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${adData.adType === "brand" ? "border-primary bg-accent" : ""}`}>
                  <RadioGroupItem value="brand" id="ad-brand" />
                  <Label htmlFor="ad-brand" className="cursor-pointer flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Monitor size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Brand Ad</div>
                      <div className="text-sm text-muted-foreground">Boost your brand awareness</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              {errors.adType && <p className="text-sm text-red-500">{errors.adType}</p>}
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>What's the goal for your ad?<span className="text-red-500">*</span></Label>
              <p className="text-sm text-muted-foreground">This helps us optimize your ad for the right actions</p>
              
              <RadioGroup 
                value={adData.goal}
                onValueChange={(value) => handleChanges("goal", value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
              >
                <div className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${adData.goal === "calls" ? "border-primary bg-accent" : ""}`}>
                  <RadioGroupItem value="calls" id="goal-calls" />
                  <Label htmlFor="goal-calls" className="cursor-pointer flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Get more calls</div>
                      <div className="text-sm text-muted-foreground">Encourage customers to call your business</div>
                    </div>
                  </Label>
                </div>
                
                <div className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${adData.goal === "clicks" ? "border-primary bg-accent" : ""}`}>
                  <RadioGroupItem value="clicks" id="goal-clicks" />
                  <Label htmlFor="goal-clicks" className="cursor-pointer flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MousePointer size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Get more website visits</div>
                      <div className="text-sm text-muted-foreground">Drive traffic to your website</div>
                    </div>
                  </Label>
                </div>
                
                <div className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${adData.goal === "visits" ? "border-primary bg-accent" : ""}`}>
                  <RadioGroupItem value="visits" id="goal-visits" />
                  <Label htmlFor="goal-visits" className="cursor-pointer flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Store size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Get store visits</div>
                      <div className="text-sm text-muted-foreground">Bring customers to your physical location</div>
                    </div>
                  </Label>
                </div>
                
                <div className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${adData.goal === "conversions" ? "border-primary bg-accent" : ""}`}>
                  <RadioGroupItem value="conversions" id="goal-conversions" />
                  <Label htmlFor="goal-conversions" className="cursor-pointer flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Percent size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Get conversions</div>
                      <div className="text-sm text-muted-foreground">Drive sales or sign ups</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              
              {errors.goal && <p className="text-sm text-red-500 mt-2">{errors.goal}</p>}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Write your ad copy<span className="text-red-500">*</span></Label>
                <Badge variant="outline" className="ml-auto">Step 3 of 5</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {adData.adType === "text" ? "Create compelling ad text or choose from our templates" :
                 adData.adType === "video" ? "Add your video URL and headline" :
                 adData.adType === "display" ? "Upload your display image and add headline" :
                 "Create your brand advertisement"}
              </p>
              
              {adData.adType === "text" && (
                <div className="bg-muted p-4 rounded-lg mb-6">
                  <h4 className="font-medium mb-3 text-sm">Choose a template (optional)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {adTemplates.map(template => {
                      const isSelected = adData.selectedTemplate === template.id;
                      return (
                        <div 
                          key={template.id}
                          className={`p-3 border rounded-md cursor-pointer hover:bg-accent relative ${isSelected ? "border-primary bg-accent" : ""}`}
                          onClick={() => selectTemplate(template)}
                        >
                          <div className="font-medium text-sm">{template.headline.replace('[Business Type]', adData.businessType || '[Business Type]')}</div>
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{template.description.replace('[Business Type]', adData.businessType || '[Business Type]')}</div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {adData.adType === "video" && (
                <div className="space-y-4 mb-4">
                  <div>
                    <Label htmlFor="videoUrl">Video URL<span className="text-red-500">*</span></Label>
                    <Input
                      id="videoUrl"
                      placeholder="e.g., https://www.youtube.com/watch?v=abcdef123456"
                      value={adData.videoUrl}
                      onChange={(e) => handleChanges("videoUrl", e.target.value)}
                      className={`mt-1 ${errors.videoUrl ? "border-red-500" : ""}`}
                    />
                    {errors.videoUrl && <p className="text-xs text-red-500">{errors.videoUrl}</p>}
                    <p className="text-xs text-muted-foreground mt-1">YouTube, Vimeo, or other video hosting links</p>
                  </div>
                </div>
              )}
              
              {adData.adType === "display" && (
                <div className="space-y-4 mb-4">
                  <div>
                    <Label htmlFor="displayImage">Display Image URL<span className="text-red-500">*</span></Label>
                    <Input
                      id="displayImage"
                      placeholder="e.g., https://example.com/your-banner-image.jpg"
                      value={adData.displayImage}
                      onChange={(e) => handleChanges("displayImage", e.target.value)}
                      className={`mt-1 ${errors.displayImage ? "border-red-500" : ""}`}
                    />
                    {errors.displayImage && <p className="text-xs text-red-500">{errors.displayImage}</p>}
                    <p className="text-xs text-muted-foreground mt-1">Recommended size: 1200x628 pixels</p>
                  </div>
                </div>
              )}
              
              {adData.adType === "brand" && (
                <div className="space-y-4 mb-4">
                  <div>
                    <Label htmlFor="brandLogo">Brand Logo URL<span className="text-red-500">*</span></Label>
                    <Input
                      id="brandLogo"
                      placeholder="e.g., https://example.com/your-logo.png"
                      value={adData.brandLogo}
                      onChange={(e) => handleChanges("brandLogo", e.target.value)}
                      className={`mt-1 ${errors.brandLogo ? "border-red-500" : ""}`}
                    />
                    {errors.brandLogo && <p className="text-xs text-red-500">{errors.brandLogo}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="brandColors">Brand Colors (optional)</Label>
                    <Input
                      id="brandColors"
                      placeholder="e.g., #FF0000, #00FF00"
                      value={adData.brandColors}
                      onChange={(e) => handleChanges("brandColors", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Comma separated hex color codes</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="brandMessage">Brand Message<span className="text-red-500">*</span></Label>
                    <Textarea
                      id="brandMessage"
                      placeholder="Your brand's key message"
                      value={adData.brandMessage}
                      onChange={(e) => handleChanges("brandMessage", e.target.value)}
                      className={`mt-1 ${errors.brandMessage ? "border-red-500" : ""}`}
                      maxLength={150}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-red-500">{errors.brandMessage}</span>
                      <span className="text-xs text-muted-foreground">{adData.brandMessage?.length || 0}/150</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Always show headline field except for brand ads */}
              {adData.adType !== "brand" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="headline">Ad Headline<span className="text-red-500">*</span></Label>
                    <Input
                      id="headline"
                      placeholder="e.g., Professional Plumbing Services in Your Area"
                      value={adData.headline}
                      onChange={(e) => handleChanges("headline", e.target.value)}
                      className={`mt-1 ${errors.headline ? "border-red-500" : ""}`}
                      maxLength={30}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-red-500">{errors.headline}</span>
                      <span className="text-xs text-muted-foreground">{adData.headline?.length || 0}/30</span>
                    </div>
                  </div>
                  
                  {/* Only show description for text ads */}
                  {adData.adType === "text" && (
                    <div>
                      <Label htmlFor="description">Ad Description<span className="text-red-500">*</span></Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your services, special offers, or unique selling points"
                        value={adData.description}
                        onChange={(e) => handleChanges("description", e.target.value)}
                        className={`mt-1 ${errors.description ? "border-red-500" : ""}`}
                        maxLength={90}
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-red-500">{errors.description}</span>
                        <span className="text-xs text-muted-foreground">{adData.description?.length || 0}/90</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Choose keywords for your ad<span className="text-red-500">*</span></Label>
              <p className="text-sm text-muted-foreground">Select keywords that potential customers might search for</p>
              
              <KeywordSelector
                businessType={adData.businessType}
                selectedKeywords={adData.keywords}
                onChange={(keywords) => handleChanges("keywords", keywords)}
              />
              
              {errors.keywords && <p className="text-sm text-red-500 mt-2">{errors.keywords}</p>}
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="dailyBudget">Set your daily budget<span className="text-red-500">*</span></Label>
              <p className="text-sm text-muted-foreground">How much are you willing to spend per day?</p>
              
              <div className="flex items-center space-x-2">
                <span className="text-lg font-medium">$</span>
                <Input
                  id="dailyBudget"
                  type="number"
                  min={5}
                  step={1}
                  value={adData.dailyBudget}
                  onChange={(e) => handleChanges("dailyBudget", parseFloat(e.target.value))}
                  className={`w-32 ${errors.dailyBudget ? "border-red-500" : ""}`}
                />
                <span className="text-sm text-muted-foreground">USD per day</span>
              </div>
              
              {errors.dailyBudget && <p className="text-sm text-red-500">{errors.dailyBudget}</p>}
              
              <div className="bg-muted p-4 rounded-lg mt-4">
                <h4 className="font-medium mb-2">Estimated performance</h4>
                <p className="text-sm text-muted-foreground mb-4">Based on your budget of ${adData.dailyBudget}/day:</p>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Daily Clicks</span>
                      <span className="font-medium">{Math.round(adData.dailyBudget / 1.5)} - {Math.round(adData.dailyBudget / 0.8)}</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Daily Impressions</span>
                      <span className="font-medium">{Math.round(adData.dailyBudget * 20)} - {Math.round(adData.dailyBudget * 40)}</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Estimated Cost Per Click</span>
                      <span className="font-medium">$0.80 - $1.50</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-start mt-4 bg-blue-50 p-3 rounded-md border border-blue-100 dark:bg-blue-950 dark:border-blue-900">
                <AlertCircle size={18} className="text-blue-500 mt-0.5" />
                <p className="text-sm text-blue-700 ml-2 dark:text-blue-300">
                  Your card won't be charged until your business is verified and your ads are approved.
                </p>
              </div>
            </div>
          </div>
        );
                
      default:
        return null;
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm text-muted-foreground">{Math.round((currentStep / totalSteps) * 100)}% complete</span>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
      </div>
    );
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Business information";
      case 2:
        return "Campaign goal";
      case 3:
        return "Create your ad";
      case 4:
        return "Choose keywords";
      case 5:
        return "Set your budget";
      default:
        return "";
    }
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
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">{getStepTitle()}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Let's start with some basic information about your business and choose your ad type."}
            {currentStep === 2 && "What do you want people to do when they see your ad?"}
            {currentStep === 3 && "Create your ad content based on your selected ad type."}
            {currentStep === 4 && "Pick keywords that will trigger your ad in search results."}
            {currentStep === 5 && "Set a daily budget for your advertising campaign."}
          </CardDescription>
          {renderStepIndicator()}
        </CardHeader>
        
        <CardContent>
          {renderStepContent()}
        </CardContent>
        
        <CardFooter className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={handleBack}
          >
            <ChevronLeft size={16} className="mr-1" />
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          
          <Button
            onClick={handleNext}
          >
            {currentStep < totalSteps ? 'Continue' : 'Create Ad'}
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdWizard;
