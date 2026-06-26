"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Ticket, ShieldCheck, Star, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Verified Users",
    color: "text-[#5B3DF5]",
    bg: "bg-[#EEF2FF]",
  },
  {
    icon: Ticket,
    value: 10000,
    suffix: "+",
    label: "Tickets Sold",
    color: "text-[#22C55E]",
    bg: "bg-[#F0FDF4]",
  },
  {
    icon: ShieldCheck,
    value: 100,
    suffix: "%",
    label: "Secure Transactions",
    color: "text-[#7C4DFF]",
    bg: "bg-[#F3F0FF]",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "/5",
    label: "User Rating",
    color: "text-[#F59E0B]",
    bg: "bg-[#FFFBEB]",
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: "%",
    label: "Success Rate",
    color: "text-[#0EA5E9]",
    bg: "bg-[#F0F9FF]",
  },
];

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
      {value % 1 === 0 
        ? Math.floor(count).toLocaleString("en-IN") 
        : count.toFixed(1)}
      {suffix}
    </span>
  );
}

export default function LiveStats() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-[#5B3DF5] uppercase tracking-widest mb-3">
            By The Numbers
          </p>
          <h2
            className="text-4xl font-bold text-gray-900"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Why Thousands Trust{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B3DF5] to-[#7C4DFF]">
              ConfirmSeat
            </span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon size={22} className={stat.color} />
              </div>

              {/* Counter */}
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Live Activity Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-[#F8FAFC] to-[#EEF2FF] rounded-2xl p-4 border border-[#E0E7FF] overflow-hidden"
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#5B3DF5] whitespace-nowrap">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live Activity
            </span>
            <div className="overflow-hidden flex-1">
              <motion.div
                animate={{ x: ["100%", "-100%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 20,
                  ease: "linear",
                }}
                className="flex gap-8 whitespace-nowrap"
              >
                {[
                  "✅ Someone from Delhi just purchased a ticket to Mumbai",
                  "💰 Seller from Bhopal earned ₹1,850",
                  "⚡ Ticket delivered in 2 minutes",
                  "🛡 New verified seller joined from Patna",
                  "✅ Escrow payment released successfully",
                  "🎉 10,000+ tickets sold on ConfirmSeat",
                ].map((text, i) => (
                  <span key={i} className="text-sm text-gray-600 font-medium">
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