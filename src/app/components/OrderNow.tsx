import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
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

const WHATSAPP_NUMBER = "254701259311";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

type OrderLinks = {
  whatsapp: string;
};

type OrderNowProps = {
  className?: string;
  onOpen?: () => void;
};

function getEmailErrorDetails(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "text" in error &&
    typeof error.status === "number" &&
    typeof error.text === "string"
  ) {
    return `EmailJS error ${error.status}: ${error.text}`;
  }

  if (error instanceof Error) return error.message;
  return "Unexpected error. Check your connection and EmailJS configuration.";
}

export function OrderNow({ className, onOpen }: OrderNowProps) {
  const [orderLinks, setOrderLinks] = useState<OrderLinks | null>(null);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const prepareOrder = async (event: FormEvent<HTMLFormElement>) => {
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

    const links: OrderLinks = {
      whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    };

    setEmailError("");
    setOrderLinks(null);
    setWhatsappLink(links.whatsapp);

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setEmailError(
        "Email delivery is not set up yet. Please contact us on WhatsApp, or try again later.",
      );
      return;
    }

    setIsSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          customer_name: order.name,
          customer_phone: order.phone,
          occasion: order.occasion,
          event_date: order.eventDate || "Not provided",
          order_details: order.orderDetails,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setOrderLinks(links);
    } catch (error) {
      console.error("Unable to send cake order email:", error);
      setEmailError(
        `We couldn’t email your order, so it has not been sent by email. ${getEmailErrorDetails(error)} You can still send the order through WhatsApp.`,
      );
    } finally {
      setIsSending(false);
    }
  };

  const clearOrder = () => {
    setOrderLinks(null);
    setWhatsappLink(null);
    setEmailError("");
  };

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
      <DialogContent className="max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-purple-800">Place a cake order</DialogTitle>
          <DialogDescription>
            Share a few details so our team can help plan your order.
          </DialogDescription>
        </DialogHeader>

        {orderLinks ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Your order was emailed to management. You can also continue the
              conversation on WhatsApp:
            </p>
            <div className="flex flex-col gap-3">
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
            {emailError && (
              <div className="space-y-3" role="alert">
                <p className="text-sm text-red-700">{emailError}</p>
                {whatsappLink && (
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Send order details on WhatsApp
                    </a>
                  </Button>
                )}
              </div>
            )}
            <Button
              type="submit"
              disabled={isSending}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isSending ? "Sending your order..." : "Send order to management"}
            </Button>
            <p className="text-xs text-gray-500">
              Your order details will be emailed to management. You can
              continue on WhatsApp after sending.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
