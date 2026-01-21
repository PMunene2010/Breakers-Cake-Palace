import { ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-purple-600" />
          <span className="text-xl font-semibold text-purple-800">Breakers Cake Palace</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#home" className="text-sm transition-colors hover:text-purple-600">Home</a>
          <a href="#products" className="text-sm transition-colors hover:text-purple-600">Products</a>
          <a href="#about" className="text-sm transition-colors hover:text-purple-600">About</a>
          <a href="#contact" className="text-sm transition-colors hover:text-purple-600">Contact</a>
          <Button className="bg-purple-600 hover:bg-purple-700">Order Now</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4">
          <nav className="flex flex-col gap-4">
            <a href="#home" className="text-sm transition-colors hover:text-purple-600">Home</a>
            <a href="#products" className="text-sm transition-colors hover:text-purple-600">Products</a>
            <a href="#about" className="text-sm transition-colors hover:text-purple-600">About</a>
            <a href="#contact" className="text-sm transition-colors hover:text-purple-600">Contact</a>
            <Button className="bg-purple-600 hover:bg-purple-700 w-full">Order Now</Button>
          </nav>
        </div>
      )}
    </header>
  );
}