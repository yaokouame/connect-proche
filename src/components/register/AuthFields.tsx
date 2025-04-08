
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
  translations
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">{translations.fullName}</Label>
        <Input
          id="name"
          placeholder="Jean Dupont"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{translations.email}</Label>
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
          <Label htmlFor="password">{translations.password}</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">{translations.confirmPassword}</Label>
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
