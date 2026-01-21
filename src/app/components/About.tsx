import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Heart, Award, Users } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl mb-6 text-purple-800">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6">
              Since June 2021, Breakers Cake Palace has been serving our community in Utawala, Kenya with the finest artisan breads and pastries. 
              Our journey began with a simple mission: to bring the authentic taste of traditional baking combined with modern creativity to your neighborhood.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Every morning, our bakers arrive before dawn to craft each loaf with care, using time-honored techniques 
              and locally sourced ingredients. We believe that great bread brings people together.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-yellow-100 p-4 rounded-full mb-3">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-2">Made with Love</h3>
                <p className="text-sm text-gray-600">Every item crafted with care</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-4 rounded-full mb-3">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="mb-2">Award Winning</h3>
                <p className="text-sm text-gray-600">Recognized for excellence</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-yellow-100 p-4 rounded-full mb-3">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-2">Community First</h3>
                <p className="text-sm text-gray-600">Proudly serving locals</p>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1657498023828-1e0181449d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg4OTY1MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Bakery interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}