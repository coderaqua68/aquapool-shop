import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Home from "./pages/home";
import Catalog from "./pages/catalog";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import OrderConfirmation from "./pages/order-confirmation";
import About from "./pages/about";
import Contacts from "./pages/contacts";
import Delivery from "./pages/delivery";
import Payment from "./pages/payment";
import AdminLogin from "./pages/admin-login";
import Admin from "./pages/admin";
import TrackingDemo from "./pages/tracking-demo";
import NotFound from "@/pages/not-found";
import CallbackModal from "./components/modals/callback-modal";
import CartSidebar from "./components/cart/cart-sidebar";
import TrackingCodes from "./components/tracking/tracking-codes";

// Компонент для автоматической прокрутки вверх при смене страницы
function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/catalog" component={Catalog} />
        <Route path="/catalog/:category" component={Catalog} />
        <Route path="/product/:identifier" component={Product} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/order-confirmation" component={OrderConfirmation} />
        <Route path="/about" component={About} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/delivery" component={Delivery} />
        <Route path="/payment" component={Payment} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={Admin} />
        <Route path="/tracking-demo" component={TrackingDemo} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <TrackingCodes />
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <CartSidebar />
        <CallbackModal />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
