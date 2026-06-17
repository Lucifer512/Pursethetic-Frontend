"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "../../context/ShopContext";

export default function MobileCartFab() {
  const { openSidebar, cart } = useShop();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          className="fixed bottom-6 right-5 z-50 md:hidden"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        >
          <button
            type="button"
            onClick={openSidebar}
            aria-label={`View cart — ${totalItems} item${totalItems === 1 ? "" : "s"}`}
            className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-foreground shadow-[0_8px_28px_rgba(32,26,21,0.30)] text-white transition-colors hover:bg-[#2d241d] active:scale-95"
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.6rem] font-bold text-white shadow-sm">
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
