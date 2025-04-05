
import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Barcode, Camera, X, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MedicationScanner = () => {
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false);

  const startScanner = async () => {
    setScannedCode(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setScanning(true);
        setCameraPermissionDenied(false);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraPermissionDenied(true);
      toast({
        title: "Erreur d'accès à la caméra",
        description: "Veuillez autoriser l'accès à la caméra pour scanner des codes-barres.",
        variant: "destructive"
      });
    }
  };

  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setScanning(false);
  };

  const mockScanCode = () => {
    // In a real app, this would be replaced with actual barcode detection
    stopScanner();
    const mockBarcode = "3400930000000"; // Simulated French CIP-13 code
    setScannedCode(mockBarcode);
    
    toast({
      title: "Code détecté",
      description: `Le code ${mockBarcode} a été scanné avec succès.`,
    });
    
    // Simulate searching for medication info
    setTimeout(() => {
      toast({
        title: "Médicament trouvé",
        description: "Doliprane 1000mg - Paracétamol",
      });
    }, 1500);
  };

  const uploadImage = () => {
    // In a real app, this would open a file picker for barcode images
    toast({
      title: "Fonctionnalité en développement",
      description: "L'upload d'images sera bientôt disponible.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Barcode className="mr-2 h-5 w-5 text-health-blue" />
            Scanner de code-barres de médicaments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            {cameraPermissionDenied && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>
                  L'accès à la caméra a été refusé. Veuillez autoriser l'accès dans les paramètres de votre navigateur.
                </AlertDescription>
              </Alert>
            )}
            
            {scanning ? (
              <div className="space-y-4">
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg aspect-video max-w-md mx-auto overflow-hidden">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline
                    className="w-full h-full object-cover"
                  ></video>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="border-2 border-red-500 w-2/3 h-1/4 rounded-md opacity-70"></div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" onClick={stopScanner}>
                    <X className="h-4 w-4 mr-1" /> Annuler
                  </Button>
                  <Button onClick={mockScanCode}>
                    <Camera className="h-4 w-4 mr-1" /> Simuler un scan
                  </Button>
                </div>
                
                <p className="text-sm text-gray-500">
                  Positionnez le code-barres du médicament dans le cadre pour le scanner
                </p>
              </div>
            ) : (
              <div className="space-y-8 py-4">
                {scannedCode ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
                      <h3 className="font-medium text-lg mb-2">Résultat du scan</h3>
                      <p className="font-mono text-center bg-white p-2 border rounded">
                        {scannedCode}
                      </p>
                      
                      <div className="mt-4 text-left">
                        <p className="font-medium">Médicament identifié:</p>
                        <div className="bg-white p-3 rounded border mt-1">
                          <p className="font-medium">Doliprane 1000mg</p>
                          <p className="text-sm text-gray-600">Paracétamol</p>
                          <p className="text-sm text-gray-600 mt-1">Boîte de 8 comprimés</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      <Button variant="outline" onClick={() => setScannedCode(null)}>
                        Effacer
                      </Button>
                      <Button>
                        Ajouter à mes médicaments
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-gray-50 rounded-lg p-10 max-w-md mx-auto">
                      <Barcode className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium mb-2">Scanner un médicament</h3>
                      <p className="text-sm text-gray-500">
                        Utilisez la caméra pour scanner le code-barres d'un médicament et obtenir ses informations
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Button onClick={startScanner} className="flex-1 max-w-xs mx-auto">
                        <Camera className="h-4 w-4 mr-2" /> Ouvrir la caméra
                      </Button>
                      <Button variant="outline" onClick={uploadImage} className="flex-1 max-w-xs mx-auto">
                        <Upload className="h-4 w-4 mr-2" /> Importer une image
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium text-lg mb-4">Comment scanner un médicament</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Cliquez sur "Ouvrir la caméra" pour activer votre appareil photo</li>
            <li>Autorisez l'accès à la caméra si votre navigateur le demande</li>
            <li>Positionnez le code-barres du médicament dans le cadre rouge</li>
            <li>Attendez que le code soit détecté automatiquement</li>
            <li>Vérifiez les informations détectées et ajoutez le médicament à votre liste</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicationScanner;
