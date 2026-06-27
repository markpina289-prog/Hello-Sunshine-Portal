import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, AlertCircle, ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

const initialMessages = [
  {
    type: "bot",
    text: "Hi! 👋 Thank you so much for applying to the Hello Sunshine Recognition Program!",
    timestamp: "2:14 PM",
  },
  {
    type: "bot",
    text: "I'm Sarah, your dedicated liaison. I've reviewed your application and your story is absolutely beautiful. Reese would love to recognize you.",
    timestamp: "2:15 PM",
  },
  {
    type: "bot",
    text: "I can see you selected the Gold tier ($299). That's perfect for your story! ✨",
    timestamp: "2:16 PM",
  },
  {
    type: "bot",
    text: "Before we proceed, I need to verify a few things to ensure everything is secure. This usually takes 24–48 hours.",
    timestamp: "2:17 PM",
  },
  {
    type: "user",
    text: "That sounds great! How do I proceed?",
    timestamp: "2:18 PM",
  },
  {
    type: "bot",
    text: "Perfect! So here's the process:\n\n1. Verification Fee: $99 (confirms you're a genuine fan)\n2. Production & Shipping: $150 (premium card production + secure courier)\n3. Insurance & Tracking: $50 (ensures safe delivery)\n\nTotal: $299\n\nAll payments are processed through a secure portal. Once verified, your card ships within 5–7 business days.",
    timestamp: "2:19 PM",
  },
  {
    type: "bot",
    text: "⚠️ IMPORTANT: Due to high demand, we only have 2 more Gold spots available this week. After that, we'll only have Diamond tier ($599) available.",
    timestamp: "2:20 PM",
  },
  {
    type: "user",
    text: "Wait, I need to think about this. Can I get a refund if something goes wrong?",
    timestamp: "2:21 PM",
  },
  {
    type: "bot",
    text: "Great question! Once your card is produced and shipped, refunds aren't available. However, your card is 100% guaranteed to arrive. I personally track every shipment.",
    timestamp: "2:22 PM",
  },
  {
    type: "bot",
    text: "Plus, I've already started your verification process. If you don't complete payment within 24 hours, your spot will be released to the waiting list.",
    timestamp: "2:23 PM",
  },
  {
    type: "bot",
    text: "I really don't want to see you miss this opportunity. Your story deserves to be recognized. 💛",
    timestamp: "2:24 PM",
  },
  {
    type: "user",
    text: "Okay, I'm ready. How do I pay?",
    timestamp: "2:25 PM",
  },
  {
    type: "bot",
    text: "Excellent! I'm sending you a secure payment link. You can pay with:\n\n✓ Credit Card (Visa, Mastercard, Amex)\n✓ PayPal\n✓ Apple Pay\n✓ Google Pay\n\nAll payments are encrypted and processed by our secure payment partner.",
    timestamp: "2:26 PM",
  },
  {
    type: "bot",
    text: "💳 PAYMENT LINK: [Secure Payment Portal]\n\nOnce you complete payment, I'll send you a confirmation and your card will enter production immediately.",
    timestamp: "2:27 PM",
  },
];

export default function DMChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        {
          type: "user",
          text: inputValue,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setInputValue("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
      <header className="bg-white/10 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="text-gray-400 hover:text-white transition-colors mr-1">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
              S
            </div>
            <div>
              <h1 className="text-white font-semibold">Sarah</h1>
              <p className="text-xs text-gray-400">Hello Sunshine Liaison • Active now</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-400">Online</span>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                msg.type === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-700 text-gray-100 rounded-bl-none"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.type === "user" ? "text-blue-200" : "text-gray-400"
                }`}
              >
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="bg-red-950/60 border-t border-red-700/50 p-4 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-200">
              <p className="font-semibold mb-2">High-Pressure Tactics Demonstrated:</p>
              <ul className="space-y-1 text-xs text-red-300">
                <li>✗ <strong>Artificial Scarcity:</strong> "Only 2 more Gold spots available this week"</li>
                <li>✗ <strong>Time Pressure:</strong> "If you don't complete payment within 24 hours, your spot will be released"</li>
                <li>✗ <strong>Authority Validation:</strong> "I personally track every shipment"</li>
                <li>✗ <strong>Emotional Manipulation:</strong> "I really don't want to see you miss this opportunity"</li>
                <li>✗ <strong>Pre-Commitment:</strong> "I've already started your verification process"</li>
                <li>✗ <strong>Legitimacy Framing:</strong> Multiple payment methods to appear official</li>
                <li>✗ <strong>No Refund Policy:</strong> Removes buyer's safety net</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
