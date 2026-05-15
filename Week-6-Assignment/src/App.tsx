import { BrowserRouter , Routes , Route, useLocation } from "react-router-dom";
import { Home } from "./page/Home";
import { Contact } from "./page/contact";
import { Product } from "./page/Product";
import { CartProvider } from "./context";
import CartPage from "./page/CartPage";
import { Navbar } from "./Narbar";
import { Shop } from "./page/shop";

function Layout() {
  const location = useLocation();

  return(
    <>
    {location.pathname !== "/" && <Navbar />}
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
    </>
  )
}

function App() {


  return (
    <BrowserRouter>
    <CartProvider>
      <Layout />
    </CartProvider>
    </BrowserRouter>
    
  )
}

export default App
