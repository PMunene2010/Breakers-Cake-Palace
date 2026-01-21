import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export function Hero() {
  return (
    <section id="home" className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1733714953921-dc38255ce866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMGRpc3BsYXl8ZW58MXx8fHwxNzY5MDE4NTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Bakery display with fresh bread"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl mb-4">Freshly Baked Daily</h1>
        <p className="text-xl md:text-2xl mb-2 text-red-500 italic font-semibold">
          A life full of sweetness
        </p>
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          Cakes, Cookies and Cupcakes
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 text-lg">
            View Menu
          </Button>
          <Button size="lg" variant="outline" className="bg-purple-600/80 backdrop-blur border-white text-white hover:bg-purple-700 text-lg">
            Find Us
          </Button>
        </div>
      </div>
    </section>
  );
}