import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-purple-800">
            Visit Us
          </h2>
          <p className="text-lg text-gray-600">
            We'd love to see you! Stop by for a fresh loaf or a
            cup of coffee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardContent className="flex flex-col items-center text-center pt-6">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-2">Location</h3>
              <p className="text-sm text-gray-600">
                Utawala
                <br />
                Nairobi, Kenya
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center text-center pt-6">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="mb-2">Hours</h3>
              <p className="text-sm text-gray-600">
                Mon-Fri: 8am - 8pm
                <br />
                Sat-Sun: 9am - 6pm
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center text-center pt-6">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-2">Phone</h3>
              <p className="text-sm text-gray-600">
                +254 714082689
                <br />
                Call for orders
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center text-center pt-6">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Mail className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="mb-2">Email</h3>
              <p className="text-sm text-gray-600">
                breakers.cakepalace@gmail.com
                <br />
                We'll reply soon
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}