
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Search } from "lucide-react";

interface KeywordSelectorProps {
  businessType: string;
  selectedKeywords: string[];
  onChange: (keywords: string[]) => void;
}

const KeywordSelector = ({ businessType, selectedKeywords, onChange }: KeywordSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);
  
  // Generate suggested keywords based on business type
  useEffect(() => {
    if (!businessType) return;
    
    const keywordsByType: Record<string, string[]> = {
      plumbing: [
        "plumber near me", "emergency plumber", "plumbing repair", "water heater installation",
        "leaky faucet", "clogged drain", "pipe repair", "plumbing company",
        "bathroom plumbing", "kitchen sink repair", "toilet repair", "water leak"
      ],
      electrician: [
        "electrician near me", "emergency electrician", "electrical repair", "wiring installation",
        "electrical panel upgrade", "lighting installation", "electrical contractor", "electrical inspection",
        "outlet repair", "ceiling fan installation", "electrical service", "power outage"
      ],
      landscaping: [
        "landscaper near me", "lawn care", "garden design", "yard maintenance",
        "tree trimming", "mulching services", "landscaping company", "lawn mowing",
        "hardscaping", "outdoor lighting", "irrigation systems", "sod installation"
      ],
      cleaning: [
        "house cleaning", "maid service", "cleaning service near me", "office cleaning",
        "deep cleaning", "move out cleaning", "carpet cleaning", "window cleaning",
        "residential cleaning", "commercial cleaning", "weekly cleaning service", "disinfection services"
      ],
      construction: [
        "general contractor", "home renovation", "kitchen remodel", "bathroom remodel",
        "home addition", "construction company", "commercial construction", "custom home builder",
        "new construction", "building contractor", "construction project", "house renovation"
      ],
      dental: [
        "dentist near me", "family dentist", "dental cleaning", "tooth extraction",
        "root canal", "cosmetic dentistry", "emergency dentist", "teeth whitening",
        "dental implants", "pediatric dentist", "dental crown", "invisalign"
      ],
      restaurant: [
        "restaurant near me", "best restaurant", "food delivery", "takeout food", 
        "dining near me", "family restaurant", "italian restaurant", "chinese food", 
        "fine dining", "outdoor seating", "vegan options", "restaurant with bar"
      ],
      salon: [
        "hair salon near me", "haircut", "hair coloring", "hair styling", 
        "barber shop", "women's haircut", "men's haircut", "hair highlights", 
        "keratin treatment", "balayage", "blowout", "hair extensions"
      ],
      accounting: [
        "accountant near me", "tax preparation", "bookkeeping services", "small business accountant", 
        "tax accountant", "financial statements", "payroll services", "tax planning", 
        "CPA firm", "business tax return", "personal tax return", "accounting consultation"
      ],
      legal: [
        "lawyer near me", "attorney", "legal advice", "family lawyer", 
        "personal injury lawyer", "divorce attorney", "estate planning", "criminal defense", 
        "real estate lawyer", "business lawyer", "legal consultation", "immigration lawyer"
      ],
      other: [
        "local business", "services near me", "best rated", "professional services", 
        "affordable services", "experienced professionals", "licensed and insured", "free estimates", 
        "same day service", "24/7 service", "family owned business", "satisfaction guaranteed"
      ],
    };
    
    const keywords = keywordsByType[businessType] || keywordsByType.other;
    setSuggestedKeywords(keywords);
  }, [businessType]);

  const handleAddKeyword = (keyword: string) => {
    if (!selectedKeywords.includes(keyword) && keyword.trim() !== "") {
      onChange([...selectedKeywords, keyword]);
      setSearchTerm("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    onChange(selectedKeywords.filter(k => k !== keyword));
  };

  const handleCustomKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      handleAddKeyword(searchTerm.trim());
      e.preventDefault();
    }
  };

  const filteredSuggestions = suggestedKeywords.filter(
    keyword => !selectedKeywords.includes(keyword) && 
    keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center relative">
        <Search size={18} className="absolute left-3 text-muted-foreground" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleCustomKeyword}
          placeholder="Search keywords or type your own"
          className="pl-10"
        />
      </div>
      
      {selectedKeywords.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Selected Keywords ({selectedKeywords.length})</div>
          <div className="flex flex-wrap gap-2">
            {selectedKeywords.map(keyword => (
              <Badge key={keyword} variant="secondary" className="px-3 py-1.5 text-sm flex items-center gap-1 bg-primary/10 hover:bg-primary/20">
                {keyword}
                <X 
                  size={14} 
                  className="cursor-pointer"
                  onClick={() => handleRemoveKeyword(keyword)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        <div className="text-sm font-medium">Suggested Keywords</div>
        {filteredSuggestions.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">No matching keywords found</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {filteredSuggestions.map(keyword => (
              <Badge 
                key={keyword} 
                variant="outline" 
                className="px-3 py-1.5 text-sm flex items-center gap-1 cursor-pointer hover:bg-secondary"
                onClick={() => handleAddKeyword(keyword)}
              >
                {keyword}
                <Plus size={14} />
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      {searchTerm.trim() !== "" && !selectedKeywords.includes(searchTerm.trim()) && !suggestedKeywords.includes(searchTerm.trim()) && (
        <div className="mt-2">
          <div className="text-sm font-medium">Custom Keyword</div>
          <Badge 
            variant="outline" 
            className="px-3 py-1.5 text-sm flex items-center gap-1 cursor-pointer hover:bg-secondary mt-2"
            onClick={() => handleAddKeyword(searchTerm.trim())}
          >
            {searchTerm}
            <Plus size={14} />
          </Badge>
        </div>
      )}
    </div>
  );
};

export default KeywordSelector;
