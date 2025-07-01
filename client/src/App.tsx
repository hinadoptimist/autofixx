import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/cart/CartSidebar";

// Pages
import { HomePage } from "@/pages/HomePage";
import { ShopPage } from "@/pages/ShopPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { CartPage } from "@/pages/CartPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { FAQPage } from "@/pages/FAQPage";
import { ShippingPage } from "@/pages/ShippingPage";
import { WishlistPage } from "@/pages/WishlistPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/product/:slug" component={ProductDetailPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/wishlist" component={WishlistPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/faq" component={FAQPage} />
          <Route path="/shipping" component={ShippingPage} />
          
          {/* Static pages */}
          <Route path="/categories" component={() => <div>Categories Page - Coming Soon</div>} />
          <Route path="/brands" component={() => <div>Brands Page - Coming Soon</div>} />
          <Route path="/blog" component={() => <div>Blog Page - Coming Soon</div>} />
          <Route path="/track-order" component={() => <div>Track Order Page - Coming Soon</div>} />
          <Route path="/help" component={() => <div>Help Page - Coming Soon</div>} />
          <Route path="/privacy" component={() => <div>Privacy Policy - Coming Soon</div>} />
          <Route path="/terms" component={() => <div>Terms of Service - Coming Soon</div>} />
          <Route path="/cookies" component={() => <div>Cookie Policy - Coming Soon</div>} />
          <Route path="/warranty" component={() => <div>Warranty Information - Coming Soon</div>} />
          <Route path="/installation-guides" component={() => <div>Installation Guides - Coming Soon</div>} />
          <Route path="/support" component={() => <div>Support Center - Coming Soon</div>} />
          <Route path="/careers" component={() => <div>Careers - Coming Soon</div>} />
          <Route path="/find-parts" component={() => <div>Find Parts Tool - Coming Soon</div>} />
          
          {/* Fallback to 404 */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
