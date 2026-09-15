"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const WHATSAPP_NUMBER = "919716202089";

const QUICK_REPLIES = [
  "I want to know about your AI Services",
  "I need a custom AI Agent for my business",
  "I want to discuss a project",
  "I have a general inquiry",
];

function whatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2c-5.514 0-9.997 4.483-9.997 9.999 0 1.764.462 3.485 1.339 4.999L2 22l5.128-1.345a9.958 9.958 0 0 0 4.873 1.245h.004c5.514 0 9.997-4.483 9.997-9.998C22 6.483 17.517 2 12.001 2Zm0 18.19h-.003a8.196 8.196 0 0 1-4.17-1.14l-.299-.177-3.104.814.828-3.026-.194-.31a8.194 8.194 0 0 1-1.255-4.353c0-4.528 3.684-8.212 8.213-8.212 2.194 0 4.254.855 5.806 2.407a8.157 8.157 0 0 1 2.406 5.805c-.002 4.528-3.686 8.213-8.214 8.213Z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[9999] sm:bottom-6 sm:right-6">
      {/* Backdrop — click outside to close */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Close WhatsApp chat"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 -z-10 cursor-default bg-black/20"
          />
        )}
      </AnimatePresence>

      {/* Quick-reply popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with us on WhatsApp"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-[calc(100%+1rem)] right-0 w-[calc(100vw-2.5rem)] max-w-[340px] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black/60"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-[#25D366] to-[#128C7E] px-5 pb-5 pt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-black/15 text-white transition-colors hover:bg-black/25"
              >
                <X className="size-4" />
              </button>

              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-white/20">
                  <WhatsAppIcon className="size-4 text-white" />
                </span>
                <span className="text-sm font-bold tracking-tight text-white">Blugent</span>
              </div>

              <h3 className="mt-3 text-base font-bold leading-snug text-white">
                Chat with us on WhatsApp 👋
              </h3>
              <p className="mt-1 text-xs text-white/80">Typically replies within minutes</p>
            </div>

            {/* Quick replies */}
            <div className="flex flex-col gap-2 p-4">
              {QUICK_REPLIES.map((message) => (
                <a
                  key={message}
                  href={whatsAppLink(message)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-medium text-white/80 transition-all duration-200 hover:border-[#25D366]/40 hover:bg-[#25D366]/10 hover:text-white"
                >
                  {message}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        aria-expanded={open}
        className="relative flex size-14 items-center justify-center rounded-full text-white shadow-[0_8px_30px_-6px_rgba(37,211,102,0.65)] transition-transform duration-300 hover:scale-105 active:scale-95"
        style={{ backgroundColor: "#25D366" }}
      >
        {!open && (
          <span
            className="absolute inset-0 -z-10 animate-ping rounded-full opacity-60"
            style={{ backgroundColor: "#25D366" }}
            aria-hidden="true"
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
            >
              <X className="size-6" />
            </motion.span>
          ) : (
            <motion.span
              key="icon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <WhatsAppIcon className="size-7" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
