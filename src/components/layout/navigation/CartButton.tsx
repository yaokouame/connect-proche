
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CartButton: React.FC = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  
  useEffect(() => {
    const getCartItems = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItemCount(cart.length || 0);
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItemCount(0);
      }
    };

    getCartItems();
    
    window.addEventListener('storage', getCartItems);
    window.addEventListener('cartUpdated', getCartItems);
    
    return () => {
      window.removeEventListener('storage', getCartItems);
      window.removeEventListener('cartUpdated', getCartItems);
    };
  }, []);

  return (
    <Link to="/cart" className="relative p-1 sm:p-2">
      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
      {cartItemCount > 0 && (
        <Badge className="absolute -top-1 -right-1 px-1 py-0.5 min-w-[16px] h-[16px] sm:min-w-[18px] sm:h-[18px] flex items-center justify-center bg-health-teal text-[8px] sm:text-[10px]">
          {cartItemCount}
        </Badge>
      )}
    </Link>
  );
};

export default CartButton;
