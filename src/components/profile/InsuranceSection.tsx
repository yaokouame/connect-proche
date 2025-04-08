import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InsuranceInfo, InsuranceVoucher } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Plus, AlertCircle, BadgeCheck, Calendar, Percent, X, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InsuranceSectionProps {
  insuranceInfo?: InsuranceInfo;
  setInsuranceInfo?: React.Dispatch<React.SetStateAction<InsuranceInfo | undefined>>;
  insuranceVouchers: InsuranceVoucher[];
  setInsuranceVouchers?: React.Dispatch<React.SetStateAction<InsuranceVoucher[] | undefined>>;
}

const InsuranceSection: React.FC<InsuranceSectionProps> = ({
  insuranceInfo,
  setInsuranceInfo,
  insuranceVouchers,
  setInsuranceVouchers
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [openInsuranceDialog, setOpenInsuranceDialog] = useState(false);
  const [openVoucherDialog, setOpenVoucherDialog] = useState(false);
  const [newInsuranceInfo, setNewInsuranceInfo] = useState<InsuranceInfo>(
    insuranceInfo || {
      provider: "",
      policyNumber: "",
      membershipNumber: "",
      validUntil: "",
      coverageType: "",
      coveragePercentage: 0
    }
  );
  const [newVoucher, setNewVoucher] = useState<Partial<InsuranceVoucher>>({
    provider: "",
    voucherNumber: "",
    validFrom: "",
    validUntil: "",
    coverageType: "",
    coverageAmount: 0,
    isPercentage: true,
    status: "active"
  });

  const handleSaveInsuranceInfo = () => {
    if (
      !newInsuranceInfo.provider ||
      !newInsuranceInfo.policyNumber ||
      !newInsuranceInfo.membershipNumber ||
      !newInsuranceInfo.validUntil
    ) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    if (setInsuranceInfo) {
      setInsuranceInfo(newInsuranceInfo);
      toast({
        title: "Informations d'assurance mises à jour",
        description: "Vos informations d'assurance ont été enregistrées avec succès.",
      });
      setOpenInsuranceDialog(false);
    }
  };

  const handleSaveVoucher = () => {
    if (
      !newVoucher.provider ||
      !newVoucher.voucherNumber ||
      !newVoucher.validFrom ||
      !newVoucher.validUntil ||
      !newVoucher.coverageType ||
      newVoucher.coverageAmount === undefined
    ) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires du bon.",
        variant: "destructive",
      });
      return;
    }

    if (setInsuranceVouchers) {
      const voucher: InsuranceVoucher = {
        id: `voucher-${Date.now()}`,
        userId: 'user-123',
        provider: newVoucher.provider || "",
        voucherNumber: newVoucher.voucherNumber || "",
        coverageType: newVoucher.coverageType || "",
        validFrom: newVoucher.validFrom || "",
        validUntil: newVoucher.validUntil || "",
        coverageAmount: newVoucher.coverageAmount || 0,
        isPercentage: newVoucher.isPercentage,
        status: "active",
        forService: newVoucher.forService,
        forPharmacy: newVoucher.forPharmacy,
        forHealthCenter: newVoucher.forHealthCenter,
        qrCode: `/placeholder.svg`,
      };

      setInsuranceVouchers([...(insuranceVouchers || []), voucher]);
      toast({
        title: "Bon d'assurance ajouté",
        description: "Votre bon d'assurance a été ajouté avec succès.",
      });
      
      // Reset form
      setNewVoucher({
        provider: "",
        voucherNumber: "",
        validFrom: "",
        validUntil: "",
        coverageType: "",
        coverageAmount: 0,
        isPercentage: true,
        status: "active"
      });
      
      setOpenVoucherDialog(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Actif</Badge>;
      case "used":
        return <Badge className="bg-gray-500">Utilisé</Badge>;
      case "expired":
        return <Badge className="bg-red-500">Expiré</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  const handleDeleteVoucher = (voucherId: string) => {
    if (setInsuranceVouchers && insuranceVouchers) {
      setInsuranceVouchers(insuranceVouchers.filter(v => v.id !== voucherId));
      toast({
        title: "Bon supprimé",
        description: "Le bon d'assurance a été supprimé.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg flex items-center">
        <FileText className="mr-2 h-5 w-5 text-blue-600" /> 
        Assurance & Bons de prise en charge
      </h3>

      {/* Main insurance info */}
      <div className="bg-white rounded-md border p-4">
        {insuranceInfo ? (
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-md">Information d'assurance</h4>
              {setInsuranceInfo && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpenInsuranceDialog(true)}
                >
                  Modifier
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-500">Assureur</p>
                <p className="font-medium">{insuranceInfo.provider}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">N° de police</p>
                <p className="font-medium">{insuranceInfo.policyNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">N° d'adhérent</p>
                <p className="font-medium">{insuranceInfo.membershipNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Valide jusqu'au</p>
                <p className="font-medium">{insuranceInfo.validUntil}</p>
              </div>
              {insuranceInfo.coverageType && (
                <div>
                  <p className="text-sm text-gray-500">Type de couverture</p>
                  <p className="font-medium">{insuranceInfo.coverageType}</p>
                </div>
              )}
              {insuranceInfo.coveragePercentage && (
                <div>
                  <p className="text-sm text-gray-500">Taux de couverture</p>
                  <p className="font-medium">{insuranceInfo.coveragePercentage}%</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 mb-4">Aucune information d'assurance enregistrée</p>
            {setInsuranceInfo && (
              <Button 
                variant="outline" 
                onClick={() => setOpenInsuranceDialog(true)}
                className="mx-auto"
              >
                Ajouter votre assurance
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Insurance vouchers section */}
      <div className="bg-white rounded-md border p-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-md">Bons de prise en charge</h4>
          {setInsuranceVouchers && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
              onClick={() => setOpenVoucherDialog(true)}
            >
              <Plus className="h-4 w-4 mr-1" /> Ajouter un bon
            </Button>
          )}
        </div>

        {insuranceVouchers && insuranceVouchers.length > 0 ? (
          <div className="space-y-4">
            {insuranceVouchers.map((voucher) => (
              <div key={voucher.id} className="border rounded-md p-3 relative">
                {setInsuranceVouchers && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0"
                    onClick={() => handleDeleteVoucher(voucher.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                
                <div className="flex items-start mb-2">
                  <div className="flex-1">
                    <h5 className="font-medium">{voucher.provider}</h5>
                    <p className="text-sm text-gray-600">Bon n° {voucher.voucherNumber}</p>
                  </div>
                  <div>
                    {getStatusBadge(voucher.status)}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    <span>Valide du {voucher.validFrom}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    <span>au {voucher.validUntil}</span>
                  </div>
                  <div className="flex items-center">
                    <BadgeCheck className="h-4 w-4 mr-1 text-gray-500" />
                    <span>Type: {voucher.coverageType}</span>
                  </div>
                  <div className="flex items-center">
                    <Percent className="h-4 w-4 mr-1 text-gray-500" />
                    <span>
                      Couverture: {voucher.coverageAmount}
                      {voucher.isPercentage ? '%' : '€'}
                    </span>
                  </div>
                </div>
                
                {(voucher.forPharmacy || voucher.forHealthCenter) && (
                  <div className="text-sm text-gray-600 mb-3">
                    <p className="font-medium mb-1">Valable pour:</p>
                    <ul className="list-disc list-inside">
                      {voucher.forPharmacy && (
                        <li>Pharmacie: {voucher.forPharmacy}</li>
                      )}
                      {voucher.forHealthCenter && (
                        <li>Centre: {voucher.forHealthCenter}</li>
                      )}
                    </ul>
                  </div>
                )}
                
                {voucher.qrCode && (
                  <div className="flex justify-center mt-2">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <QrCode className="h-4 w-4 mr-1" />
                      Afficher le QR code
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500">Aucun bon de prise en charge enregistré</p>
          </div>
        )}
      </div>

      {/* Insurance Info Dialog */}
      <Dialog open={openInsuranceDialog} onOpenChange={setOpenInsuranceDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Information d'assurance</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Assureur *</label>
              <Input
                value={newInsuranceInfo.provider}
                onChange={(e) => setNewInsuranceInfo({...newInsuranceInfo, provider: e.target.value})}
                placeholder="Nom de l'assureur"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">N° de police *</label>
              <Input
                value={newInsuranceInfo.policyNumber}
                onChange={(e) => setNewInsuranceInfo({...newInsuranceInfo, policyNumber: e.target.value})}
                placeholder="Numéro de police"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">N° d'adhérent *</label>
              <Input
                value={newInsuranceInfo.membershipNumber}
                onChange={(e) => setNewInsuranceInfo({...newInsuranceInfo, membershipNumber: e.target.value})}
                placeholder="Numéro d'adhérent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Valide jusqu'au *</label>
              <Input
                type="date"
                value={newInsuranceInfo.validUntil}
                onChange={(e) => setNewInsuranceInfo({...newInsuranceInfo, validUntil: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Type de couverture</label>
              <Input
                value={newInsuranceInfo.coverageType || ""}
                onChange={(e) => setNewInsuranceInfo({...newInsuranceInfo, coverageType: e.target.value})}
                placeholder="Ex: Basique, Premium, etc."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Taux de couverture (%)</label>
              <Input
                type="number"
                min="0"
                max="100"
                value={newInsuranceInfo.coveragePercentage || ""}
                onChange={(e) => setNewInsuranceInfo({
                  ...newInsuranceInfo, 
                  coveragePercentage: parseInt(e.target.value) || 0
                })}
                placeholder="Ex: 80"
              />
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <AlertCircle className="h-4 w-4 mr-1" />
              Les champs marqués d'un * sont obligatoires
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpenInsuranceDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveInsuranceInfo}>
              Enregistrer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Voucher Dialog */}
      <Dialog open={openVoucherDialog} onOpenChange={setOpenVoucherDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un bon de prise en charge</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Assureur *</label>
              <Input
                value={newVoucher.provider}
                onChange={(e) => setNewVoucher({...newVoucher, provider: e.target.value})}
                placeholder="Nom de l'assureur"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">N° du bon *</label>
              <Input
                value={newVoucher.voucherNumber}
                onChange={(e) => setNewVoucher({...newVoucher, voucherNumber: e.target.value})}
                placeholder="Numéro du bon"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Valide du *</label>
                <Input
                  type="date"
                  value={newVoucher.validFrom}
                  onChange={(e) => setNewVoucher({...newVoucher, validFrom: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">au *</label>
                <Input
                  type="date"
                  value={newVoucher.validUntil}
                  onChange={(e) => setNewVoucher({...newVoucher, validUntil: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Type de couverture *</label>
              <Input
                value={newVoucher.coverageType}
                onChange={(e) => setNewVoucher({...newVoucher, coverageType: e.target.value})}
                placeholder="Ex: Consultation, Médicaments, etc."
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Montant de couverture *</label>
                <div className="flex items-center space-x-2">
                  <label className="text-sm">
                    <input
                      type="radio"
                      checked={newVoucher.isPercentage}
                      onChange={() => setNewVoucher({...newVoucher, isPercentage: true})}
                      className="mr-1"
                    />
                    %
                  </label>
                  <label className="text-sm">
                    <input
                      type="radio"
                      checked={!newVoucher.isPercentage}
                      onChange={() => setNewVoucher({...newVoucher, isPercentage: false})}
                      className="mr-1"
                    />
                    €
                  </label>
                </div>
              </div>
              <Input
                type="number"
                min="0"
                value={newVoucher.coverageAmount || ""}
                onChange={(e) => setNewVoucher({
                  ...newVoucher, 
                  coverageAmount: parseFloat(e.target.value) || 0
                })}
                placeholder={newVoucher.isPercentage ? "Ex: 80" : "Ex: 50"}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <label className="text-sm font-medium">Applicable pour (optionnel)</label>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Service spécifique</label>
                  <Input
                    value={newVoucher.forService || ""}
                    onChange={(e) => setNewVoucher({...newVoucher, forService: e.target.value})}
                    placeholder="Ex: Consultation dentaire"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Pharmacie spécifique</label>
                  <Input
                    value={newVoucher.forPharmacy || ""}
                    onChange={(e) => setNewVoucher({...newVoucher, forPharmacy: e.target.value})}
                    placeholder="Ex: Pharmacie Centrale"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Centre de santé spécifique</label>
                  <Input
                    value={newVoucher.forHealthCenter || ""}
                    onChange={(e) => setNewVoucher({...newVoucher, forHealthCenter: e.target.value})}
                    placeholder="Ex: Hôpital Saint-Louis"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <AlertCircle className="h-4 w-4 mr-1" />
              Les champs marqués d'un * sont obligatoires
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpenVoucherDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveVoucher}>
              Ajouter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InsuranceSection;
