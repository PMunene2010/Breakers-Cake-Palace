import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

type Celebration = {
  name: string;
  description: string;
  image: string;
  photoCredit?: string;
  photoCreditUrl?: string;
};

const celebrations: Celebration[] = [
  {
    name: "Birthdays",
    description: "Make their special day even sweeter with a cake made just for them.",
    image:
      "https://images.unsplash.com/photo-1664289597477-d5b2d266169d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNha2UlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3Njg5NzIyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1600&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Weddings & ruracio",
    description:
      "Explore custom wedding and ruracio cakes inspired by traditional Kenyan colours and patterns.",
    image:
      "https://images.unsplash.com/photo-1584158531319-96912adae663?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZSUyMGVsZWdhbnR8ZW58MXx8fHwxNzY4OTk3MzEzfDA&ixlib=rb-4.1.0&q=80&w=1600&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Ruracio Cakes",
    description: "Traditional-inspired cake designs for your ruracio and family celebrations.",
    image: "/images/ruracio-cake.jpeg",
    photoCredit: "Photo used with permission: Nillavee Cakes and Pastries",
    photoCreditUrl: "https://nillavee.co.ke/product/traditional-cake/",
  },
  {
    name: "Graduations",
    description: "Celebrate every milestone with a custom graduation cake.",
    image:
      "https://images.unsplash.com/photo-1758682016284-78f5266d5743?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2FrZXxlbnwxfHx8fDE3NjkwMjA2Mzh8MA&ixlib=rb-4.1.0&q=80&w=1600&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Ordinations",
    description: "Thoughtful custom cakes for a meaningful day of celebration.",
    image:
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Dowry celebrations",
    description: "Share something sweet with family as you celebrate together.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Baby showers",
    description: "Welcome a little one with a cake designed for the occasion.",
    image:
      "https://images.unsplash.com/photo-1602351447937-745cb720612f?auto=format&fit=crop&w=1600&q=80",
  },
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (isPaused) return;

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % celebrations.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const showPrevious = () => {
    setActiveSlide((current) => (current - 1 + celebrations.length) % celebrations.length);
  };

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % celebrations.length);
  };

  const activeCelebration = celebrations[activeSlide];

  return (
    <section
      id="home"
      className="relative flex h-[calc(100svh-4rem)] min-h-[600px] items-center justify-center overflow-hidden"
      aria-label="Custom cakes for Kenyan celebrations"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div
          key={activeCelebration.name}
          className="absolute inset-0 scale-110 bg-cover bg-center blur-xl"
          style={{ backgroundImage: `url("${activeCelebration.image}")` }}
        />
        {celebrations.map((celebration, index) => (
          <ImageWithFallback
            key={celebration.name}
            src={celebration.image}
            alt=""
            loading={index === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-1000 motion-reduce:transition-none ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-12 py-24 text-center text-white sm:px-16">
        <p
          key={activeCelebration.name}
          aria-live="polite"
          className="mb-4 inline-block rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-purple-900"
        >
          {activeCelebration.name}
        </p>
        <h1 className="mb-4 text-4xl md:text-6xl">Cakes for every celebration</h1>
        <p className="mb-3 text-xl font-semibold italic text-red-500 md:text-2xl">
          A life full of sweetness
        </p>
        <p className="mb-8 text-lg text-white/90 md:text-xl">
          {activeCelebration.description}
          <span className="mt-2 block text-base text-white/80">
            Custom-made in Kenya for birthdays, weddings, ruracio, graduations,
            ordinations, dowry celebrations, and baby showers.
          </span>
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-yellow-400 text-lg text-purple-900 hover:bg-yellow-500"
          >
            <a href="#products">View Menu</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white bg-purple-600/80 text-lg text-white backdrop-blur hover:bg-purple-700"
          >
            <a
              href="https://share.google/LFtqLC2972ac103vr"
              target="_blank"
              rel="noreferrer"
            >
              Find Us
            </a>
          </Button>
        </div>
      </div>

      <button
        type="button"
        onClick={showPrevious}
        aria-label="Show previous celebration cake"
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-purple-900/70 p-3 text-white transition-colors hover:bg-purple-700 sm:left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={showNext}
        aria-label="Show next celebration cake"
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-purple-900/70 p-3 text-white transition-colors hover:bg-purple-700 sm:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {celebrations.map((celebration, index) => (
          <button
            key={celebration.name}
            type="button"
            onClick={() => setActiveSlide(index)}
            aria-label={`Show ${celebration.name} cake`}
            aria-current={index === activeSlide ? "true" : undefined}
            className={`h-2.5 rounded-full transition-all ${
              index === activeSlide
                ? "w-7 bg-yellow-400"
                : "w-2.5 bg-white/70 hover:bg-white"
            }`}
          />
        ))}
        <button
          type="button"
          onClick={() => setIsPaused((paused) => !paused)}
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
          className="ml-2 rounded-full bg-purple-900/70 p-2 text-white transition-colors hover:bg-purple-700"
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>
      {activeCelebration.photoCredit && activeCelebration.photoCreditUrl && (
        <a
          href={activeCelebration.photoCreditUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-5 left-4 z-20 max-w-[35%] text-left text-xs text-white/80 underline decoration-white/50 underline-offset-2 hover:text-white sm:left-6"
        >
          {activeCelebration.photoCredit}
        </a>
      )}
    </section>
  );
}
