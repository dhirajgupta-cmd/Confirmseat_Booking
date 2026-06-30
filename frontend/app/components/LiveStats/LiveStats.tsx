"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Ticket, ShieldCheck, Star, TrendingUp } from "lucide-react";


function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(parseFloat(current.toFixed(1)));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {value % 1 === 0 ? Math.floor(count).toLocaleString("en-IN") : count.toFixed(1)}
      {suffix}
    </span>
  );
}

export default function LiveStats() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-14"
        >
          <p className="text-xs sm:text-sm font-semibold text-[#5B3DF5] uppercase tracking-widest mb-2 sm:mb-3">
            By The Numbers
          </p>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 px-2"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Why Thousands Trust{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B3DF5] to-[#7C4DFF]">
              ConfirmSeat
            </span>
          </h2>
        </motion.div>

        {/* Stats Grid — Mobile: 2 cols, Tablet: 3 cols, Desktop: 5 cols */}
        

        {/* Live Activity Ticker — Mobile optimized */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 sm:mt-10 lg:mt-12 bg-gradient-to-r from-[#F8FAFC] to-[#EEF2FF] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#E0E7FF] overflow-hidden"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-[#5B3DF5] whitespace-nowrap flex-shrink-0">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="hidden sm:inline">Live Activity</span>
              <span className="sm:hidden">Live</span>
            </span>
            <div className="overflow-hidden flex-1">
              <motion.div
                animate={{ x: ["100%", "-100%"] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="flex gap-6 sm:gap-8 whitespace-nowrap"
              >
                {[
                  "✅ A transfer from Delhi to Mumbai was completed",
                  "🎫 Booking transfer assisted in Bhopal",
                  "⚡ Transfer matched in under 3 minutes",
                  "🛡 New verified user joined from Patna",
                  "✅ Transfer process completed successfully",
                  "🎉 10,000+ transfers completed on ConfirmSeat",
                ].map((text, i) => (
                  <span key={i} className="text-xs sm:text-sm text-gray-600 font-medium">
                    {text}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
