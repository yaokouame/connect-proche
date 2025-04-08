
import React from "react";
import { InsuranceInfo, InsuranceVoucher } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

// Updated interface for temporary vouchers that are being edited
interface EditableVoucher {
  id: string;
  provider: string;
  voucherNumber: string;
  validUntil: string;
}

export interface InsuranceSectionProps {
  insuranceInfo: InsuranceInfo;
  setInsuranceInfo: React.Dispatch<React.SetStateAction<InsuranceInfo>>;
  insuranceVouchers: InsuranceVoucher[];
  setInsuranceVouchers: React.Dispatch<React.SetStateAction<InsuranceVoucher[]>>;
}

const InsuranceSection: React.FC<InsuranceSectionProps> = ({
  insuranceInfo,
  setInsuranceInfo,
  insuranceVouchers,
  setInsuranceVouchers
}) => {
  const handleAddVoucher = () => {
    setInsuranceVouchers([
      ...insuranceVouchers,
      { 
        id: `voucher-${Date.now()}`,
        userId: "",
        provider: "",
        voucherNumber: "",
        validFrom: new Date().toISOString().split('T')[0],
        validUntil: "",
        coverageType: "",
        coverageAmount: 0,
        isPercentage: false,
        status: "active"
      }
    ]);
  };

  const handleRemoveVoucher = (index: number) => {
    const newVouchers = [...insuranceVouchers];
    newVouchers.splice(index, 1);
    setInsuranceVouchers(newVouchers);
  };

  const handleVoucherChange = (index: number, field: keyof InsuranceVoucher, value: string | number | boolean) => {
    const newVouchers = [...insuranceVouchers];
    newVouchers[index] = { ...newVouchers[index], [field]: value };
    setInsuranceVouchers(newVouchers);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Insurance Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="provider">Insurance Provider</Label>
          <Input
            id="provider"
            value={insuranceInfo.provider || ""}
            onChange={(e) => setInsuranceInfo({ ...insuranceInfo, provider: e.target.value })}
            placeholder="e.g., CNAM, MUGEFCI, CMU"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="policyNumber">Policy Number</Label>
          <Input
            id="policyNumber"
            value={insuranceInfo.policyNumber || ""}
            onChange={(e) => setInsuranceInfo({ ...insuranceInfo, policyNumber: e.target.value })}
            placeholder="e.g., INS-123456789"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="coverageType">Coverage Type</Label>
          <Input
            id="coverageType"
            value={insuranceInfo.coverageType || ""}
            onChange={(e) => setInsuranceInfo({ ...insuranceInfo, coverageType: e.target.value })}
            placeholder="e.g., 80% coverage for consultations"
          />
        </div>
        
        <div className="pt-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Insurance Vouchers</h3>
            <Button size="sm" variant="outline" onClick={handleAddVoucher}>
              <Plus className="h-4 w-4 mr-1" /> Add Voucher
            </Button>
          </div>
          
          {insuranceVouchers.length === 0 ? (
            <p className="text-sm text-gray-500 py-2">No vouchers added yet.</p>
          ) : (
            <div className="space-y-3">
              {insuranceVouchers.map((voucher, index) => (
                <div key={voucher.id} className="flex items-start space-x-2">
                  <div className="grid grid-cols-3 gap-2 flex-1">
                    <Input
                      value={voucher.provider}
                      onChange={(e) => handleVoucherChange(index, "provider", e.target.value)}
                      placeholder="Provider name"
                      className="col-span-1"
                    />
                    <Input
                      value={voucher.voucherNumber}
                      onChange={(e) => handleVoucherChange(index, "voucherNumber", e.target.value)}
                      placeholder="Voucher number"
                      className="col-span-1"
                    />
                    <Input
                      type="date"
                      value={voucher.validUntil}
                      onChange={(e) => handleVoucherChange(index, "validUntil", e.target.value)}
                      className="col-span-1"
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveVoucher(index)}
                    className="h-10 w-10 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsuranceSection;
