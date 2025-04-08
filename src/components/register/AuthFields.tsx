
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

interface AuthFieldsProps {
  formData: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    [key: string]: any;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  translations: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    passwordMismatch: string;
  };
  showVoiceHelp?: boolean;
  onSpeakField?: (fieldName: string) => void;
}

const AuthFields: React.FC<AuthFieldsProps> = ({
  formData,
  handleChange,
  translations,
  showVoiceHelp = false,
  onSpeakField
}) => {
  const passwordMatch = formData.password === formData.confirmPassword || formData.confirmPassword === '';
  
  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="fullName">{translations.fullName}</Label>
          {showVoiceHelp && onSpeakField && (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => onSpeakField("fullName")}
              title="Écouter les instructions pour ce champ"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Input
          id="fullName"
          name="fullName"
          placeholder="Jean Dupont"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="email">{translations.email}</Label>
          {showVoiceHelp && onSpeakField && (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => onSpeakField("email")}
              title="Écouter les instructions pour ce champ"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="votre@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{translations.password}</Label>
            {showVoiceHelp && onSpeakField && (
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => onSpeakField("password")}
                title="Écouter les instructions pour ce champ"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="confirmPassword">{translations.confirmPassword}</Label>
            {showVoiceHelp && onSpeakField && (
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => onSpeakField("confirmPassword")}
                title="Écouter les instructions pour ce champ"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={!passwordMatch ? "border-red-500" : ""}
          />
          {!passwordMatch && (
            <p className="text-red-500 text-sm">
              {translations.passwordMismatch}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthFields;
