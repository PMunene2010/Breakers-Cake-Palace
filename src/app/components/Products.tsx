import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

const products = [
  {
    id: 1,
    name: "Birthday Cakes",
    description: "Colorful celebration cakes. Ask about vanilla, chocolate, marble, or passion fruit flavours.",
    price: "From KSh 1,200",
    image: "https://images.unsplash.com/photo-1664289597477-d5b2d266169d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNha2UlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3Njg5NzIyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    name: "Wedding Cakes",
    description: "Elegant multi-tier cakes for your big day. Flavours and designs are made to order.",
    price: "From KSh 2,200",
    image: "https://images.unsplash.com/photo-1584158531319-96912adae663?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZSUyMGVsZWdhbnR8ZW58MXx8fHwxNzY4OTk3MzEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 8,
    name: "Ruracio Cakes",
    description: "Traditional-inspired cakes for ruracio and family celebrations.",
    price: "From KSh 10,000",
    image: `${import.meta.env.BASE_URL}images/ruracio-cake.jpeg`
  },
  {
    id: 3,
    name: "Graduation Cakes",
    description: "Celebrate your achievement with a custom cake. Ask about local favourite flavours.",
    price: "From KSh 2,200",
    image: "https://images.unsplash.com/photo-1758682016284-78f5266d5743?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2FrZXxlbnwxfHx8fDE3NjkwMjA2Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 4,
    name: "Cupcakes",
    description: "Bite-sized treats in assorted flavours and designs, perfect for sharing.",
    price: "From KSh 240/dozen",
    image: "https://images.unsplash.com/photo-1555526148-5cd740b44241?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXBjYWtlcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc2ODk2NjI3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 5,
    name: "Cookies",
    description: "Freshly baked cookies for tea time, from classic favourites to local-inspired flavours.",
    price: "From KSh 10/piece",
    image: "https://images.unsplash.com/photo-1767514543235-9debae4c1a59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raWVzJTIwYXNzb3J0ZWR8ZW58MXx8fHwxNzY5MDE4NTUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 6,
    name: "Customized Cakes",
    description: "Unique designs tailored to your occasion, with your choice of flavour and finish.",
    price: "From KSh 3,000",
    image: "https://images.unsplash.com/photo-1760401713926-aab2c114d0ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBjYWtlJTIwZGVjb3JhdGVkfGVufDF8fHx8MTc2OTAyMDYzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 7,
    name: "Pastries",
    description: "Tea-time favourites such as mandazi, mahamri, and scones. Ask what’s fresh today.",
    price: "From KSh 50",
    image: "https://images.unsplash.com/photo-1745136851402-ff5c42bcb3b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0cmllcyUyMHZhcmlldHl8ZW58MXx8fHwxNzY5MDIwNjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function Products() {
  return (
    <section id="products" className="py-20 bg-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-purple-800">Our Menu</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Freshly baked favourites with flavours for every occasion. Prices are in Kenyan shillings; contact us to discuss custom designs and availability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-purple-600">{product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}