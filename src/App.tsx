import { lazy, useEffect, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NotFoundBlock from "./components/NotFoundBlock";

const Homepage = lazy(() => import("./pages/Home/Home"));
const Catalog = lazy(() => import("./pages/Catalog/Catalog"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Product = lazy(() => import("./pages/Product/Product"));
const TermsConditions = lazy(
  () => import("./pages/TermsConditions/TermsConditions")
);
const Privacy = lazy(() => import("./pages/Privacy/Privacy"));
const ItemDetail = lazy(() => import("./pages/ItemDetail/ItemDetail"));

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      <div id={"#top"} className="container">
        <Header />
        <Suspense fallback={<div className="spinner">Loading...</div>}>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={<Cart />} />
            <Route path="product" element={<Product />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms&conditions" element={<TermsConditions />} />
            <Route path="details" element={<ItemDetail />} />
            <Route path="*" element={<NotFoundBlock />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </>
  );
}

export default App;
