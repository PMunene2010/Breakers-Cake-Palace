import { useState, type FormEvent } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

type OrderDetails = {
  name: string;
  phone: string;
  occasion: string;
  eventDate: string;
  orderDetails: string;
};

const MANAGEMENT_EMAIL = "breakers.cakepalace@gmail.com";
const WHATSAPP_NUMBER = "254701259311";

type OrderNowProps = {
  className?: string;
  onOpen?: () => void;
};

export function OrderNow({ className, onOpen }: OrderNowProps) {
  const [orderLinks, setOrderLinks] = useState<{
    email: string;
    whatsapp: string;
  } | null>(null);

  const prepareOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const order: OrderDetails = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      occasion: String(formData.get("occasion") ?? ""),
      eventDate: String(formData.get("eventDate") ?? "").trim(),
      orderDetails: String(formData.get("orderDetails") ?? "").trim(),
    };

    const message = [
      "Cake order enquiry",
      `Name: ${order.name}`,
      `Phone: ${order.phone}`,
      `Occasion: ${order.occasion}`,
      order.eventDate ? `Event date: ${order.eventDate}` : "",
      `Order details: ${order.orderDetails}`,
    ]
      .filter(Boolean)
      .join("\n");

    const links = {
      email: `mailto:${MANAGEMENT_EMAIL}?subject=${encodeURIComponent(
        `Cake order enquiry - ${order.occasion}`,
      )}&body=${encodeURIComponent(message)}`,
      whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    };

    setOrderLinks(links);
    window.open(links.whatsapp, "_blank", "noopener,noreferrer");
    window.location.href = links.email;
  };

  const clearOrder = () => setOrderLinks(null);

  return (
    <Dialog onOpenChange={(open) => !open && clearOrder()}>
      <DialogTrigger asChild>
        <Button
          className={className ?? "bg-purple-600 hover:bg-purple-700"}
          onClick={onOpen}
        >
          Order Now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-purple-800">Place a cake order</DialogTitle>
          <DialogDescription>
            Share a few details so our team can help plan your order.
          </DialogDescription>
        </DialogHeader>

        {orderLinks ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Your WhatsApp chat and a prefilled email draft have been opened
              with the same order details.
            </p>
            <p className="text-sm text-amber-800">
              The email opens as a draft in your email app; press Send there to
              deliver it.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <a href={orderLinks.email}>Email management</a>
              </Button>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <a
                  href={orderLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  Continue on WhatsApp
                </a>
              </Button>
            </div>
            <Button
              type="button"
              variant="link"
              className="px-0 text-purple-700"
              onClick={clearOrder}
            >
              Start a new order
            </Button>
          </div>
        ) : (
          <form onSubmit={prepareOrder} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1 text-sm font-medium text-gray-700">
                Your name
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 font-normal"
                />
              </label>
              <label className="space-y-1 text-sm font-medium text-gray-700">
                Phone number
                <input
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 font-normal"
                />
              </label>
            </div>
            <label className="block space-y-1 text-sm font-medium text-gray-700">
              Occasion
              <select
                name="occasion"
                required
                defaultValue=""
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 font-normal"
              >
                <option value="" disabled>
                  Select an occasion
                </option>
                <option>Birthday</option>
                <option>Wedding</option>
                <option>Ruracio</option>
                <option>Graduation</option>
                <option>Ordination</option>
                <option>Dowry celebration</option>
                <option>Baby shower</option>
                <option>Other</option>
              </select>
            </label>
            <label className="block space-y-1 text-sm font-medium text-gray-700">
              Event date (optional)
              <input
                name="eventDate"
                type="date"
                className="w-full rounded-md border border-gray-300 px-3 py-2 font-normal"
              />
            </label>
            <label className="block space-y-1 text-sm font-medium text-gray-700">
              Cake size, flavour, design, or other details
              <textarea
                name="orderDetails"
                required
                rows={3}
                className="w-full resize-y rounded-md border border-gray-300 px-3 py-2 font-normal"
              />
            </label>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Continue
            </Button>
            <p className="text-xs text-gray-500">
              Submitting opens WhatsApp and a prefilled email draft for
              management. You’ll need to press Send in your email app.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
