
import React from "react";
import { FileText } from "lucide-react";

const ProductInfoBanner = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-8">
      <div className="flex items-start">
        <FileText className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-blue-700">Médicaments sur ordonnance</h3>
          <p className="text-sm text-blue-600 mt-1">
            Pour les médicaments sur ordonnance, vous devrez télécharger une ordonnance valide
            qui sera vérifiée par un pharmacien avant l'expédition. Vous pouvez utiliser une ordonnance
            déjà enregistrée ou en télécharger une nouvelle.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoBanner;
