import { ShoppingBag, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-purple-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-6 w-6 text-yellow-400" />
              <span className="text-xl">Breakers Cake Palace</span>
            </div>
            <p className="text-red-400 text-sm italic mb-2">
              A life full of sweetness
            </p>
            <p className="text-purple-100 text-sm">
              Baking fresh happiness since June 2021
            </p>
          </div>

          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="text-purple-200 hover:text-yellow-400 transition-colors">Home</a></li>
              <li><a href="#products" className="text-purple-200 hover:text-yellow-400 transition-colors">Products</a></li>
              <li><a href="#about" className="text-purple-200 hover:text-yellow-400 transition-colors">About</a></li>
              <li><a href="#contact" className="text-purple-200 hover:text-yellow-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-purple-200">Birthday Cakes</li>
              <li className="text-purple-200">Wedding Cakes</li>
              <li className="text-purple-200">Cupcakes</li>
              <li className="text-purple-200">Cookies & Pastries</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-purple-700 p-2 rounded-full hover:bg-yellow-500 hover:text-purple-900 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-purple-700 p-2 rounded-full hover:bg-yellow-500 hover:text-purple-900 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-purple-700 p-2 rounded-full hover:bg-yellow-500 hover:text-purple-900 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@breakerscake"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok: @breakerscake"
                className="bg-purple-700 p-2 rounded-full hover:bg-yellow-500 hover:text-purple-900 transition-colors"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path
                    d="M16.5 3.2c.4 2.2 1.7 3.6 3.8 4.3v3.2a9 9 0 0 1-3.8-1.3v5.5a5.6 5.6 0 1 1-5.6-5.6c.4 0 .8 0 1.2.1v3.3a2.3 2.3 0 1 0 1.2 2V3.2h3.2Z"
                    fill="#25F4EE"
                    transform="translate(-1 0.6)"
                  />
                  <path
                    d="M16.5 3.2c.4 2.2 1.7 3.6 3.8 4.3v3.2a9 9 0 0 1-3.8-1.3v5.5a5.6 5.6 0 1 1-5.6-5.6c.4 0 .8 0 1.2.1v3.3a2.3 2.3 0 1 0 1.2 2V3.2h3.2Z"
                    fill="#FE2C55"
                    transform="translate(0.7 -0.3)"
                  />
                  <path d="M16.5 3.2c.4 2.2 1.7 3.6 3.8 4.3v3.2a9 9 0 0 1-3.8-1.3v5.5a5.6 5.6 0 1 1-5.6-5.6c.4 0 .8 0 1.2.1v3.3a2.3 2.3 0 1 0 1.2 2V3.2h3.2Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-700 pt-8 text-center text-sm text-purple-200">
          <p>&copy; 2026 Breakers Cake Palace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}