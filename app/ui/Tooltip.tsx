"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

type BottomTooltipProps = {
  open: boolean;
  onClose?: () => void;
  showClose?: boolean;
  children: React.ReactNode;
  className?: string;
  closeOutside?: boolean;
};

export default function Tooltip({
  open,
  onClose,
  children,
  showClose = true,
  className = "",
  closeOutside = false,
}: BottomTooltipProps) {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<Element | null>(null);

  useEffect(() => {
    const el = document.getElementById("portal-root");
    setContainer(el);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open && closeOutside) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden !important";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open, closeOutside]);

  if (!mounted || !container) return null;

  return createPortal(
    <>
      <AnimatePresence>
        {open && (
          <>
            {closeOutside && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed bg-black/50 inset-0 z-40"
                onClick={onClose}
              />
            )}

            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={`fixed bottom-3 left-3 right-3 md:w-full md:max-w-[400px] md:left-auto md:right-3 z-50 bg-white/5 border-t p-3 border-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg ${className}`}
            >
              <div className="relative flex overflow-auto justify-between items-center">
                {children}
                {showClose && (
                  <button
                    onClick={onClose}
                    className="absolute top-[-1px] right-[-3px] w-6 h-6 rounded-full text-white flex items-center justify-center"
                  >
                    ✕
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>,
    container
  );
}
