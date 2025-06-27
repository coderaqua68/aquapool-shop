import { Switch, Route } from "wouter";
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
import About from "./pages/about";
import Contacts from "./pages/contacts";
import NotFound from "@/pages/not-found";
import CallbackModal from "./components/modals/callback-modal";
import CartSidebar from "./components/cart/cart-sidebar";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/catalog/:category" component={Catalog} />
      <Route path="/product/:id" component={Product} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/about" component={About} />
      <Route path="/contacts" component={Contacts} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
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
