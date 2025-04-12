
import React from "react";
import { Link } from "react-router-dom";

const NavigationLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="text-xl sm:text-2xl font-semibold text-health-blue">
        ConnectProche
      </span>
    </Link>
  );
};

export default NavigationLogo;
