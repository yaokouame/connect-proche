import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Prescription } from '@/types/user';
import { 
  Calendar, 
  Clock, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  User,
  Pill
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface PrescriptionItemProps {
  prescription: Prescription;
}

const PrescriptionItem: React.FC<PrescriptionItemProps> = ({ prescription }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'expired':
        return 'outline';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    // Handle both DD/MM/YYYY and YYYY-MM-DD formats
    if (!dateString) return "Date inconnue";
    
    // Check if date is in DD/MM/YYYY format
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/').map(Number);
      return new Date(year, month - 1, day).toLocaleDateString('fr-FR');
    }
    
    // Otherwise assume YYYY-MM-DD format
    try {
      return new Date(dateString).toLocaleDateString('fr-FR');
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString; // Return the original string if parsing fails
    }
  };

  const getTimeAgo = (dateString: string) => {
    try {
      // Check if date is in DD/MM/YYYY format
      if (dateString.includes('/')) {
        const [day, month, year] = dateString.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        return formatDistanceToNow(date, { addSuffix: true, locale: fr });
      }
      
      // Otherwise assume YYYY-MM-DD format
      return formatDistanceToNow(new Date(dateString), { 
        addSuffix: true, 
        locale: fr 
      });
    } catch (error) {
      console.error("Error calculating time ago:", error);
      return "Date inconnue";
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <User className="text-gray-500" size={16} />
              <span className="font-medium">{prescription.professionalName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={14} />
              <span>{formatDate(prescription.date)}</span>
              <span className="text-xs text-gray-500">
                ({getTimeAgo(prescription.date)})
              </span>
            </div>
          </div>
          <Badge variant={getBadgeVariant(prescription.status)}>
            {prescription.status === 'active' ? 'Active' : 
             prescription.status === 'expired' ? 'Expirée' : 'En attente'}
          </Badge>
        </div>
        
        <div className="mt-3">
          <Button 
            variant="ghost" 
            className="p-0 h-auto flex items-center text-health-blue hover:text-health-dark hover:bg-transparent"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="font-medium">
              {isExpanded ? 'Masquer les détails' : 'Voir les médicaments'}
            </span>
            {isExpanded ? 
              <ChevronUp className="ml-1 h-4 w-4" /> : 
              <ChevronDown className="ml-1 h-4 w-4" />
            }
          </Button>
        </div>
        
        {isExpanded && (
          <div className="mt-3 space-y-3">
            <div className="border-t pt-2">
              <h4 className="font-medium mb-2 flex items-center gap-1">
                <Pill className="h-4 w-4" />
                Médicaments prescrits
              </h4>
              <ul className="space-y-2">
                {prescription.medications.map((med, index) => (
                  <li key={index} className="bg-gray-50 p-2 rounded">
                    <div className="font-medium">{med.name}</div>
                    <div className="text-sm text-gray-600">
                      {med.dosage && <span>{med.dosage} · </span>}
                      {med.frequency && <span>{med.frequency} · </span>}
                      {med.duration && <span>{med.duration}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {prescription.instructions && (
              <div className="border-t pt-2">
                <h4 className="font-medium mb-1 flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Instructions
                </h4>
                <p className="text-sm text-gray-700">{prescription.instructions}</p>
              </div>
            )}
            
            {prescription.expiryDate && (
              <div className="border-t pt-2 flex items-center gap-1 text-sm">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>
                  Expire le: <span className="font-medium">{formatDate(prescription.expiryDate)}</span>
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PrescriptionItem;
