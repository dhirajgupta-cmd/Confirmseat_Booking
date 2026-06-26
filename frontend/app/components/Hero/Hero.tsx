"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const trustBadges = [
  { icon: ShieldCheck, label: "100% Secure", sub: "Escrow Payment System" },
  { icon: Zap, label: "Fast Delivery", sub: "Ticket in 2-5 minutes" },
  { icon: Users, label: "Verified Users", sub: "KYC & Manual Verification" },
  { icon: Star, label: "Secure Payout", sub: "Payment after Journey" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EEF2FF] via-[#F8FAFC] to-[#E0E7FF]" />

      {/* Train Image — Right side background */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] overflow-hidden">
        <Image
          src="/train.png"
          alt="Train"
          fill
          className="object-cover object-left"
          priority
        />
        {/* Gradient overlay on train — left side fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EEF2FF] via-[#EEF2FF]/60 to-transparent" />
      </div>

      {/* Dot Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle, #818CF8 1px, transparent 1px)`,
        backgroundSize: "32px 32px"
      }} />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white border border-[#C7D2FE] text-[#5B3DF5] text-sm font-semibold px-4 py-2 rounded-full mb-6 shadow-sm"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            India's First Secure Train Ticket Marketplace
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Buy & Sell Train Tickets
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B3DF5] to-[#7C4DFF]">
              Safe. Fast. Reliable.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 mb-8 leading-relaxed"
          >
            Have a ticket you can not use? List it.
            <br />
            Need a last-minute ticket? Find it.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 mb-10"
          >
            <Link
              href="/search"
              className="bg-[#5B3DF5] hover:bg-[#4930d4] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
            >
              Buy Ticket
            </Link>
            <Link
              href="/sell"
              className="border-2 border-gray-300 bg-white text-gray-700 hover:border-[#5B3DF5] hover:text-[#5B3DF5] font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-lg"
            >
              Sell Ticket
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-3 max-w-lg"
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-white"
              >
                <div className="w-9 h-9 bg-[#EEF2FF] rounded-lg flex items-center justify-center flex-shrink-0">
                  <badge.icon size={16} className="text-[#5B3DF5]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{badge.label}</p>
                  <p className="text-xs text-gray-400">{badge.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Trusted By */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 mt-6"
          >
            <div className="flex -space-x-2">
              {["RS", "PV", "AK", "SM", "VR"].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: ["#5B3DF5", "#22C55E", "#7C4DFF", "#F59E0B", "#0EA5E9"][i] }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Trusted by <span className="font-bold text-gray-900">50,000+</span> Indian travelers
            </p>
          </motion.div>

        </div>
      </div>

      {/* Floating Cards */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute top-32 right-8 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 z-10"
      >
        <p className="text-xs text-gray-500">Money Protected</p>
        <p className="font-bold text-green-600 text-sm">Escrow Active 🔒</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, delay: 1 }}
        className="absolute bottom-32 right-8 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 z-10"
      >
        <p className="text-xs text-gray-500">Avg Delivery Time</p>
        <p className="font-bold text-[#5B3DF5] text-sm">Under 3 Minutes ⚡</p>
      </motion.div>

    </section>
  );
}