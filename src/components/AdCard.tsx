
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Play, Pause, MoreVertical, ExternalLink, Globe } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface AdCardProps {
  ad: any;
  verificationStatus: string;
  onVerifyClick: () => void;
}

const AdCard = ({ ad, verificationStatus, onVerifyClick }: AdCardProps) => {
  const [status, setStatus] = useState(ad.status);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handlePause = () => {
    if (verificationStatus !== "verified") {
      toast.error("Your business needs to be verified before managing ads");
      onVerifyClick();
      return;
    }
    setStatus("paused");
    toast.success("Ad paused successfully");
  };

  const handleResume = () => {
    if (verificationStatus !== "verified") {
      toast.error("Your business needs to be verified before managing ads");
      onVerifyClick();
      return;
    }
    setStatus("approved");
    toast.success("Ad resumed successfully");
  };

  const getStatusBadge = () => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case "paused":
        return <Badge variant="outline" className="text-muted-foreground">Paused</Badge>;
      case "pending":
        return (
          <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:hover:bg-amber-800">
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">Draft</Badge>;
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Ad Info Column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-2">
              {getStatusBadge()}
              <h3 className="font-medium">{ad.headline || ad.businessName}</h3>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {ad.description || "No description"}
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Globe size={14} />
              <span className="truncate max-w-[200px]">{ad.businessWebsite}</span>
            </div>
          </div>
          
          {/* Performance Column */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-sm font-medium">{ad.clicks}</div>
                <div className="text-xs text-muted-foreground">Clicks</div>
              </div>
              <div>
                <div className="text-sm font-medium">{ad.impressions}</div>
                <div className="text-xs text-muted-foreground">Impressions</div>
              </div>
              <div>
                <div className="text-sm font-medium">${ad.spend.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">Spend</div>
              </div>
            </div>
          </div>
          
          {/* Keywords Column */}
          <div className="md:col-span-3">
            <div className="text-xs font-medium mb-1">Keywords</div>
            <div className="flex flex-wrap gap-1">
              {ad.keywords && ad.keywords.length > 0 ? (
                ad.keywords.slice(0, 3).map((keyword: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs py-0 h-5">
                    {keyword}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-muted-foreground italic">No keywords</span>
              )}
              {ad.keywords && ad.keywords.length > 3 && (
                <Badge variant="outline" className="text-xs py-0 h-5">
                  +{ad.keywords.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          
          {/* Actions Column */}
          <div className="md:col-span-2 flex items-center justify-end gap-2">
            {status === "approved" ? (
              <Button size="sm" variant="outline" onClick={handlePause}>
                <Pause size={14} className="mr-1" />
                Pause
              </Button>
            ) : status === "paused" ? (
              <Button size="sm" variant="outline" onClick={handleResume}>
                <Play size={14} className="mr-1" />
                Resume
              </Button>
            ) : verificationStatus !== "verified" ? (
              <Button size="sm" variant="outline" onClick={onVerifyClick}>
                <AlertCircle size={14} className="mr-1" />
                Verify
              </Button>
            ) : null}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2">
                  <ExternalLink size={14} /> View details
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  Edit ad
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 flex items-center gap-2">
                  Delete ad
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {verificationStatus !== "verified" && status === "pending" && (
          <div className="mt-3 pt-3 border-t flex items-start gap-2">
            <AlertCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
            <div className="text-xs text-muted-foreground">
              Your business needs to be verified before this ad can be shown. 
              <Button variant="link" className="p-0 h-auto text-xs" onClick={onVerifyClick}>
                Verify your business now
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdCard;
