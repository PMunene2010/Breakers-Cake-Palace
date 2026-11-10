import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { Products } from "@/app/components/Products";
import { About } from "@/app/components/About";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";
import { ChatWidget } from "@/app/components/ChatWidget";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Products />
        <About />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
