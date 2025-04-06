
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmergencyContact } from "@/types/user";
import { Phone, User, Mail, UserPlus, Edit, Save, X } from "lucide-react";

interface EmergencyContactSectionProps {
  emergencyContact: EmergencyContact | undefined;
  setEmergencyContact: React.Dispatch<React.SetStateAction<EmergencyContact | undefined>>;
}

const EmergencyContactSection = ({
  emergencyContact,
  setEmergencyContact
}: EmergencyContactSectionProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(!emergencyContact);
  const [tempContact, setTempContact] = useState<EmergencyContact>(
    emergencyContact || {
      name: "",
      relationship: "",
      phone: "",
      email: ""
    }
  );

  const handleSave = () => {
    if (tempContact.name && tempContact.phone) {
      setEmergencyContact(tempContact);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (emergencyContact) {
      setTempContact(emergencyContact);
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-2 border-b pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-medium">Contact d'urgence</h3>
        </div>
        {!isEditing && emergencyContact && (
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-1" />
            Modifier
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3 bg-gray-50 p-3 rounded-md">
          <div>
            <label className="text-sm font-medium mb-1 block" htmlFor="contact-name">
              Nom et prénom *
            </label>
            <Input
              id="contact-name"
              value={tempContact.name}
              onChange={(e) => setTempContact({ ...tempContact, name: e.target.value })}
              placeholder="Nom complet"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block" htmlFor="contact-relationship">
              Relation *
            </label>
            <Input
              id="contact-relationship"
              value={tempContact.relationship}
              onChange={(e) => setTempContact({ ...tempContact, relationship: e.target.value })}
              placeholder="Ex: Conjoint(e), Parent, Enfant..."
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block" htmlFor="contact-phone">
              Téléphone *
            </label>
            <Input
              id="contact-phone"
              value={tempContact.phone}
              onChange={(e) => setTempContact({ ...tempContact, phone: e.target.value })}
              placeholder="Numéro de téléphone"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block" htmlFor="contact-email">
              Email
            </label>
            <Input
              id="contact-email"
              type="email"
              value={tempContact.email || ""}
              onChange={(e) => setTempContact({ ...tempContact, email: e.target.value })}
              placeholder="Adresse email (optionnel)"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            {emergencyContact && (
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" />
                Annuler
              </Button>
            )}
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              Enregistrer
            </Button>
          </div>
        </div>
      ) : emergencyContact ? (
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="space-y-2">
            <div className="flex items-center">
              <User className="h-4 w-4 text-gray-500 mr-2" />
              <span className="font-medium">{emergencyContact.name}</span>
              <span className="text-gray-500 text-sm ml-2">({emergencyContact.relationship})</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-gray-500 mr-2" />
              <span>{emergencyContact.phone}</span>
            </div>
            {emergencyContact.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-500 mr-2" />
                <span>{emergencyContact.email}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <UserPlus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 mb-3">Aucun contact d'urgence enregistré</p>
          <Button onClick={() => setIsEditing(true)}>Ajouter un contact</Button>
        </div>
      )}
    </div>
  );
};

export default EmergencyContactSection;
