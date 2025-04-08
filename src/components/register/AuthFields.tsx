
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

interface AuthFieldsProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  passwordMatch: boolean;
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
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  passwordMatch,
  translations,
  showVoiceHelp = false,
  onSpeakField
}) => {
  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="name">{translations.fullName}</Label>
          {showVoiceHelp && onSpeakField && (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => onSpeakField("name")}
              title="Écouter les instructions pour ce champ"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Input
          id="name"
          placeholder="Jean Dupont"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
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
