
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertOctagon, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Mise à jour de l'état pour afficher l'UI de fallback
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Erreur dans le composant:", error, errorInfo);
  }

  public resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <Card className="my-4 border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center text-red-700">
              <AlertOctagon className="mr-2 h-5 w-5" />
              Une erreur est survenue
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-4 text-gray-600">
              Désolé, une erreur inattendue s'est produite pendant le traitement de votre demande.
            </p>
            <details className="mb-4">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Détails techniques
              </summary>
              <pre className="mt-2 overflow-auto rounded bg-gray-100 p-2 text-xs">
                {this.state.error?.toString() || "Erreur inconnue"}
              </pre>
            </details>
            <div className="flex gap-2">
              <Button onClick={() => window.location.reload()} className="flex items-center">
                <RefreshCw className="mr-2 h-4 w-4" />
                Rafraîchir la page
              </Button>
              <Button variant="outline" onClick={this.resetError}>
                Réessayer
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
