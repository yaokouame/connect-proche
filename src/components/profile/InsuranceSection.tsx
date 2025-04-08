
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, Plus, Calendar } from "lucide-react";
import { PatientProfile, InsuranceInfo } from "@/types/user";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface InsuranceSectionProps {
  currentUser: PatientProfile;
  updateUserProfile: (user: PatientProfile) => void;
}

const InsuranceSection = ({ currentUser, updateUserProfile }: InsuranceSectionProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [insuranceProvider, setInsuranceProvider] = useState(currentUser.insuranceInfo?.provider || "");
  const [membershipNumber, setMembershipNumber] = useState(currentUser.insuranceInfo?.membershipNumber || "");
  const [policyNumber, setPolicyNumber] = useState(currentUser.insuranceInfo?.policyNumber || "");
  const [validUntil, setValidUntil] = useState(currentUser.insuranceInfo?.validUntil || "");
  const [coverageType, setCoverageType] = useState(currentUser.insuranceInfo?.coverageType || "");
  const [coveragePercentage, setCoveragePercentage] = useState(
    currentUser.insuranceInfo?.coveragePercentage?.toString() || ""
  );
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveInsurance = () => {
    if (!insuranceProvider || !membershipNumber || !policyNumber || !validUntil) {
      toast({
        variant: "destructive",
        title: t("profile.missingFields"),
        description: t("profile.fillAllRequiredFields"),
      });
      return;
    }
    
    setIsSaving(true);
    
    setTimeout(() => {
      const insuranceInfo: InsuranceInfo = {
        provider: insuranceProvider,
        membershipNumber,
        policyNumber,
        validUntil,
        coverageType: coverageType || undefined,
        coveragePercentage: coveragePercentage ? parseFloat(coveragePercentage) : undefined
      };
      
      const updatedUser = {
        ...currentUser,
        insuranceInfo
      };
      
      updateUserProfile(updatedUser);
      
      toast({
        title: t("profile.insuranceUpdated"),
        description: t("profile.insuranceUpdateSuccess"),
      });
      
      setIsSaving(false);
      setIsDialogOpen(false);
    }, 1000);
  };
  
  const removeInsurance = () => {
    const updatedUser = {
      ...currentUser,
      insuranceInfo: undefined
    };
    
    updateUserProfile(updatedUser);
    
    toast({
      title: t("profile.insuranceRemoved"),
      description: t("profile.insuranceRemoveSuccess"),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wallet className="mr-2 h-5 w-5" />
          {t("profile.insuranceInformation")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {currentUser.insuranceInfo ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{t("profile.insuranceProvider")}</Label>
                <p className="font-medium">{currentUser.insuranceInfo.provider}</p>
              </div>
              <div>
                <Label>{t("profile.validUntil")}</Label>
                <p className="font-medium">{currentUser.insuranceInfo.validUntil}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{t("profile.membershipNumber")}</Label>
                <p className="font-medium">{currentUser.insuranceInfo.membershipNumber}</p>
              </div>
              <div>
                <Label>{t("profile.policyNumber")}</Label>
                <p className="font-medium">{currentUser.insuranceInfo.policyNumber}</p>
              </div>
            </div>
            
            {(currentUser.insuranceInfo.coverageType || currentUser.insuranceInfo.coveragePercentage) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentUser.insuranceInfo.coverageType && (
                  <div>
                    <Label>{t("profile.coverageType")}</Label>
                    <p className="font-medium">{currentUser.insuranceInfo.coverageType}</p>
                  </div>
                )}
                {currentUser.insuranceInfo.coveragePercentage && (
                  <div>
                    <Label>{t("profile.coveragePercentage")}</Label>
                    <p className="font-medium">{currentUser.insuranceInfo.coveragePercentage}%</p>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex gap-2 pt-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">{t("profile.updateInsurance")}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("profile.updateInsurance")}</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="provider">{t("profile.insuranceProvider")} *</Label>
                      <Input
                        id="provider"
                        value={insuranceProvider}
                        onChange={(e) => setInsuranceProvider(e.target.value)}
                        placeholder="CMU, COOPEC, etc."
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="membershipNumber">{t("profile.membershipNumber")} *</Label>
                        <Input
                          id="membershipNumber"
                          value={membershipNumber}
                          onChange={(e) => setMembershipNumber(e.target.value)}
                          placeholder="123456789"
                        />
                      </div>
                      <div>
                        <Label htmlFor="policyNumber">{t("profile.policyNumber")} *</Label>
                        <Input
                          id="policyNumber"
                          value={policyNumber}
                          onChange={(e) => setPolicyNumber(e.target.value)}
                          placeholder="POL-123456"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="validUntil">{t("profile.validUntil")} *</Label>
                      <div className="flex">
                        <Input
                          id="validUntil"
                          type="date"
                          value={validUntil}
                          onChange={(e) => setValidUntil(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="coverageType">{t("profile.coverageType")}</Label>
                      <Select value={coverageType} onValueChange={setCoverageType}>
                        <SelectTrigger id="coverageType">
                          <SelectValue placeholder={t("profile.selectCoverageType")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">{t("profile.basic")}</SelectItem>
                          <SelectItem value="standard">{t("profile.standard")}</SelectItem>
                          <SelectItem value="premium">{t("profile.premium")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="coveragePercentage">{t("profile.coveragePercentage")}</Label>
                      <Input
                        id="coveragePercentage"
                        type="number"
                        min="0"
                        max="100"
                        value={coveragePercentage}
                        onChange={(e) => setCoveragePercentage(e.target.value)}
                        placeholder="80"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      onClick={handleSaveInsurance}
                      disabled={isSaving}
                    >
                      {isSaving ? t("common.saving") : t("common.save")}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="outline" 
                onClick={removeInsurance}
              >
                {t("profile.removeInsurance")}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">{t("profile.noInsuranceInfo")}</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> {t("profile.addInsurance")}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("profile.addInsurance")}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="provider">{t("profile.insuranceProvider")} *</Label>
                    <Input
                      id="provider"
                      value={insuranceProvider}
                      onChange={(e) => setInsuranceProvider(e.target.value)}
                      placeholder="CMU, COOPEC, etc."
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="membershipNumber">{t("profile.membershipNumber")} *</Label>
                      <Input
                        id="membershipNumber"
                        value={membershipNumber}
                        onChange={(e) => setMembershipNumber(e.target.value)}
                        placeholder="123456789"
                      />
                    </div>
                    <div>
                      <Label htmlFor="policyNumber">{t("profile.policyNumber")} *</Label>
                      <Input
                        id="policyNumber"
                        value={policyNumber}
                        onChange={(e) => setPolicyNumber(e.target.value)}
                        placeholder="POL-123456"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="validUntil">{t("profile.validUntil")} *</Label>
                    <div className="flex">
                      <Input
                        id="validUntil"
                        type="date"
                        value={validUntil}
                        onChange={(e) => setValidUntil(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="coverageType">{t("profile.coverageType")}</Label>
                    <Select value={coverageType} onValueChange={setCoverageType}>
                      <SelectTrigger id="coverageType">
                        <SelectValue placeholder={t("profile.selectCoverageType")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">{t("profile.basic")}</SelectItem>
                        <SelectItem value="standard">{t("profile.standard")}</SelectItem>
                        <SelectItem value="premium">{t("profile.premium")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="coveragePercentage">{t("profile.coveragePercentage")}</Label>
                    <Input
                      id="coveragePercentage"
                      type="number"
                      min="0"
                      max="100"
                      value={coveragePercentage}
                      onChange={(e) => setCoveragePercentage(e.target.value)}
                      placeholder="80"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    onClick={handleSaveInsurance}
                    disabled={isSaving}
                  >
                    {isSaving ? t("common.saving") : t("common.save")}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsuranceSection;
