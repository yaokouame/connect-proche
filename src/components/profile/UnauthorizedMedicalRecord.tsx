
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const UnauthorizedMedicalRecord = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dossier médical</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-gray-500">Le dossier médical n'est disponible que pour les patients.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnauthorizedMedicalRecord;
