import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type ChatMessage = {
  id: number;
  role: "assistant" | "visitor";
  text: string;
};

type Topic = "menu" | "order" | "hours" | "location";

const BUSINESS_TIME_ZONE = "Africa/Nairobi";
const WHATSAPP_URL = "https://wa.me/254701259311";

function getNairobiTime() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: BUSINESS_TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

  return {
    weekday: values.weekday ?? "",
    hour: Number(values.hour),
    minute: Number(values.minute),
  };
}

function isBusinessOpen() {
  const { weekday, hour, minute } = getNairobiTime();
  const time = hour * 60 + minute;
  const weekend = weekday === "Sat" || weekday === "Sun";

  return weekend
    ? time >= 9 * 60 && time < 18 * 60
    : time >= 8 * 60 && time < 20 * 60;
}

function createGreeting(open: boolean) {
  const welcome = "Karibu to Breakers Cake Palace! 🎂 How can I help you today?";

  return open
    ? `${welcome} Our team is available during business hours.`
    : `${welcome} We’re currently closed, but leave us a WhatsApp message and we’ll get back to you when we reopen.`;
}

function createTopicReply(topic: Topic, open: boolean) {
  let reply: string;

  switch (topic) {
    case "menu":
      reply =
        "Our menu starts at: Birthday cakes — KSh 1,200; Wedding cakes — KSh 2,200; Graduation cakes — KSh 2,200; Cupcakes — KSh 240 per dozen; Cookies — KSh 10 per piece; Customized cakes — KSh 3,000; Pastries — KSh 50; Ruracio cakes — KSh 10,000. Prices are starting prices.";
      break;
    case "order":
      reply =
        "We’d love to help with your order! Please include your occasion, event date, number of servings, preferred flavour, and design ideas. Tap below to continue with us on WhatsApp.";
      break;
    case "hours":
      reply =
        "We’re open Monday–Friday, 8am–8pm, and Saturday–Sunday, 9am–6pm (Nairobi time).";
      break;
    case "location":
      reply = "We’re located in Utawala, Nairobi, Kenya.";
      break;
  }

  if (!open) {
    reply +=
      " We’re currently closed; our team will get back to you when we reopen. You can leave your order details on WhatsApp.";
  }

  return reply;
}

function identifyTopic(text: string): Topic | null {
  const normalized = text.toLowerCase();

  if (/menu|price|prices|cost|how much/.test(normalized)) return "menu";
  if (/order|buy|book|purchase|custom|cake for|need a cake/.test(normalized)) {
    return "order";
  }
  if (/hour|open|close|when.*(open|close)|business time/.test(normalized)) {
    return "hours";
  }
  if (/where|location|address|find you|directions/.test(normalized)) {
    return "location";
  }

  return null;
}

const quickReplies: { label: string; topic: Topic }[] = [
  { label: "View menu", topic: "menu" },
  { label: "Place an order", topic: "order" },
  { label: "Opening hours", topic: "hours" },
  { label: "Location", topic: "location" },
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForBusiness, setIsOpenForBusiness] = useState(isBusinessOpen);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: 0, role: "assistant", text: createGreeting(isBusinessOpen()) },
  ]);
  const nextId = useRef(1);
  const endOfMessages = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateStatus = () => setIsOpenForBusiness(isBusinessOpen());
    const intervalId = window.setInterval(updateStatus, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isOpen) endOfMessages.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, messages]);

  const addMessage = (role: ChatMessage["role"], text: string) => {
    setMessages((current) => [...current, { id: nextId.current++, role, text }]);
  };

  const askTopic = (topic: Topic, label: string) => {
    addMessage("visitor", label);
    addMessage("assistant", createTopicReply(topic, isBusinessOpen()));
  };

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    setInput("");
    addMessage("visitor", text);

    const topic = identifyTopic(text);
    addMessage(
      "assistant",
      topic
        ? createTopicReply(topic, isBusinessOpen())
        : "I can help with our menu, placing an order, opening hours, or our location. Choose an option below, or message our team on WhatsApp.",
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          aria-label="Breakers Cake Palace chat assistant"
          className="flex h-[min(34rem,calc(100dvh-7rem))] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-purple-200 bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between bg-purple-800 px-4 py-3 text-white">
            <div>
              <h2 className="font-semibold">Breakers Cake Palace</h2>
              <p className="text-xs text-purple-100">
                {isOpenForBusiness ? "Open · Nairobi time" : "Currently closed"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-2 transition-colors hover:bg-purple-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="flex-1 space-y-3 overflow-y-auto bg-purple-50/60 p-4"
            aria-live="polite"
          >
            {messages.map((message) => (
              <p
                key={message.id}
                className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                  message.role === "assistant"
                    ? "rounded-bl-sm bg-white text-gray-800 shadow-sm"
                    : "ml-auto rounded-br-sm bg-purple-700 text-white"
                }`}
              >
                {message.text}
              </p>
            ))}
            <div ref={endOfMessages} />
          </div>

          <div className="space-y-3 border-t bg-white p-3">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map(({ label, topic }) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => askTopic(topic, label)}
                  className="rounded-full border border-purple-300 px-3 py-1.5 text-xs text-purple-800 transition-colors hover:bg-purple-50"
                >
                  {label}
                </button>
              ))}
            </div>
            <form onSubmit={submitMessage} className="flex gap-2">
              <label className="sr-only" htmlFor="chat-message">
                Type your message
              </label>
              <input
                id="chat-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your question..."
                className="min-w-0 flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="rounded-full bg-purple-700 p-2.5 text-white transition-colors hover:bg-purple-800"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="text-center text-[11px] text-gray-500">
              For a reply from our team, message us on{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-green-700 underline"
              >
                WhatsApp
              </a>
              . Website chat messages aren’t sent to staff.
            </p>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close chat assistant" : "Chat with us"}
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-full bg-purple-700 px-5 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-purple-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-300"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span>{isOpen ? "Close chat" : "Chat with us"}</span>
      </button>
    </div>
  );
}
