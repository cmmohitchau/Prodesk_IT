import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { productType } from "./productType";


type CartContextType = {
  cartItems: productType[];
  addToCart: (product: productType) => void;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({
  children,
}: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<productType[]>([]);

  const addToCart = (product: productType) => {
    setCartItems((prev) => [...prev, product]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within CartProvider"
    );
  }

  return context;
};