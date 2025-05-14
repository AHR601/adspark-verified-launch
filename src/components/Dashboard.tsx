
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ChevronRight, Plus, Layers } from "lucide-react";
import AdCard from "@/components/AdCard";

interface DashboardProps {
  ads: any[];
  verificationStatus: string;
  onCreateAdClick: () => void;
  onVerifyClick: () => void;
}

const Dashboard = ({ ads, verificationStatus, onCreateAdClick, onVerifyClick }: DashboardProps) => {
  // Calculate total metrics
  const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0);
  const totalImpressions = ads.reduce((sum, ad) => sum + ad.impressions, 0);
  const totalSpend = ads.reduce((sum, ad) => sum + ad.spend, 0).toFixed(2);
  
  // Get ads count by status
  const activeAds = ads.filter(ad => ad.status === "approved").length;
  const pendingAds = ads.filter(ad => ad.status === "pending").length;
  const pausedAds = ads.filter(ad => ad.status === "paused").length;
  
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2 pt-4">
            <CardDescription>Total Clicks</CardDescription>
            <CardTitle className="text-2xl">{totalClicks}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2 pt-4">
            <CardDescription>Total Impressions</CardDescription>
            <CardTitle className="text-2xl">{totalImpressions}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2 pt-4">
            <CardDescription>Total Spend</CardDescription>
            <CardTitle className="text-2xl">${totalSpend}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      
      {/* Ads List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Your Ads</CardTitle>
            <CardDescription>Manage your ad campaigns</CardDescription>
          </div>
          <Button onClick={onCreateAdClick}>
            <Plus size={16} className="mr-1" />
            New Ad
          </Button>
        </CardHeader>
        <CardContent>
          {ads.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Layers size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">No ads yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Create your first ad to start reaching customers when they search for your services.
              </p>
              <Button onClick={onCreateAdClick}>Create Your First Ad</Button>
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4 w-full max-w-md">
                <TabsTrigger value="all">
                  All Ads
                  <Badge variant="secondary" className="ml-2">{ads.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="active">
                  Active
                  <Badge variant="secondary" className="ml-2">{activeAds}</Badge>
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending
                  <Badge variant="secondary" className="ml-2">{pendingAds}</Badge>
                </TabsTrigger>
                <TabsTrigger value="paused">
                  Paused
                  <Badge variant="secondary" className="ml-2">{pausedAds}</Badge>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {ads.map(ad => (
                  <AdCard 
                    key={ad.id} 
                    ad={ad} 
                    verificationStatus={verificationStatus}
                    onVerifyClick={onVerifyClick}
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="active" className="space-y-4">
                {ads.filter(ad => ad.status === "approved").map(ad => (
                  <AdCard 
                    key={ad.id} 
                    ad={ad} 
                    verificationStatus={verificationStatus}
                    onVerifyClick={onVerifyClick}
                  />
                ))}
                {activeAds === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No active ads
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="pending" className="space-y-4">
                {ads.filter(ad => ad.status === "pending").map(ad => (
                  <AdCard 
                    key={ad.id} 
                    ad={ad} 
                    verificationStatus={verificationStatus}
                    onVerifyClick={onVerifyClick}
                  />
                ))}
                {pendingAds === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No pending ads
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="paused" className="space-y-4">
                {ads.filter(ad => ad.status === "paused").map(ad => (
                  <AdCard 
                    key={ad.id} 
                    ad={ad} 
                    verificationStatus={verificationStatus}
                    onVerifyClick={onVerifyClick}
                  />
                ))}
                {pausedAds === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No paused ads
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
