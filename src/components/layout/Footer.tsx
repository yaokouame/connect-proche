
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-health-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ConnectProche</h3>
            <p className="text-gray-300">
              {t("footer.description")}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-gray-300 hover:text-white">
                  {t("nav.findProfessional")}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white">
                  {t("nav.onlinePharmacy")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.contact")}</h3>
            <address className="not-italic text-gray-300">
              <p>2 PLTX Garage CFA</p>
              <p>Abidjan, Cocody</p>
              <p className="mt-2">contact@connectproche.fr</p>
              <p>+225 0748644886</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} ConnectProche. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
