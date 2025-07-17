import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function Modal({
  isOpen,
  onClose,
  closeButton = true,
  className,
  children,
}) {

  // Close modal on ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

    // Create portal root div if not present
  useEffect(() => {
    if (!document.getElementById('modal-root')) {
      const modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      document.body.appendChild(modalRoot);
    }
  }, []);

  // Prevent scroll
  useEffect(() => {
    
    if (isOpen) {
        document.body.style.overflow = "hidden";
    }
  
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])
  

if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm grid place-items-center p-3`}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            // transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={twMerge(`relative bg-white rounded-xl p-5 w-full max-w-md ${closeButton ? "pt-7" : ""}`, className)}
            onClick={(e) => e.stopPropagation()}
          >
            {closeButton && (
              <X
                onClick={onClose}
                className="absolute top-4 right-4 cursor-pointer hover:text-primary duration-300"
                size={20}
              />
            )}

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('modal-root')
  );
}
