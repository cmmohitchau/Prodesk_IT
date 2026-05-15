import { Link } from "react-router-dom";
import { useCart } from "./context";
import { ShoppingCart } from "lucide-react";

export const Navbar = () => {
  const { cartItems } = useCart();

  return (
    
    <div className="py-4 flex px-4 gap-2 items-center justify-between bg-gray-400">
            
    <Link
        to="/"
        style={{
          color: "#fff",
          textDecoration: "none",
        }}
      >
        Home
      </Link>

      <Link to="/cart" className="relative border mr-4 p-2 rounded-full inline-flex items-center justify-center">
        <ShoppingCart height={32} width={32} />

        <span className="absolute -top-1  -right-2 bg-red-500 text-white w-5
            h-5
            rounded-full
            flex
            items-center
            justify-center
            "
        >
            {cartItems.length}
        </span>
</Link>
    </div>
      
  );
};

