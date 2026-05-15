import { useCart } from "../context";
import type { productType } from "../productType";

const CartPage = () => {
  const { cartItems, totalPrice } = useCart();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cart Page</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item : productType) => (
            <div
              key={item.id}
              style={{
                borderBottom: "1px solid #ccc",
                marginBottom: "10px",
              }}
            >
              <h3>{item.title}</h3>

              <p>${item.price}</p>
            </div>
          ))}

          <h2>Total: ${totalPrice}</h2>
        </>
      )}
    </div>
  );
};

export default CartPage;