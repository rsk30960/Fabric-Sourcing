"use client";

import { MessageCircle } from "lucide-react";

// PLACEHOLDER number — replace with the real business WhatsApp number before launch.
// wa.me link only, per tech-stack.md (no WhatsApp Business API needed for v1).
const WHATSAPP_NUMBER = "910000000000";

export default function WhatsAppButton({ message = "Hi, I'd like to enquire about your products." }) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-status-success text-white px-4 py-3 rounded-full shadow-lg hover:brightness-110 transition"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline text-sm font-medium">Chat with us</span>
    </a>
  );
}
