"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const trustBadges = [
  { icon: ShieldCheck, label: "100% Secure", sub: "Protected Transfer Process" },
  { icon: Zap, label: "Fast Assistance", sub: "Transfer help in 2-5 minutes" },
  { icon: Users, label: "Verified Users", sub: "KYC & Identity Verified" },
  { icon: Star, label: "Secure Payout", sub: "Released after Journey" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen lg:min-h-[90vh] flex items-center pt-24 sm:pt-28 lg:pt-16 pb-12 lg:pb-0 overflow-hidden">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EEF2FF] via-[#F8FAFC] to-[#E0E7FF]" />

      {/* Train Image — Desktop: right side bg | Mobile: top banner */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[55%] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image src="/train.png" alt="Train" fill className="object-cover object-left" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#EEF2FF] via-[#EEF2FF]/60 to-transparent" />
        </motion.div>
      </div>

      {/* Mobile Train Image — top, subtle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="lg:hidden absolute top-0 right-0 w-full h-48 sm:h-56 overflow-hidden"
      >
        <Image src="/train.png" alt="Train" fill className="object-cover object-right opacity-40" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8FAFC]/70 to-[#F8FAFC]" />
      </motion.div>

      {/* Dot Pattern */}
      <div className="absolute inset-0 opacity-10 lg:opacity-20" style={{
        backgroundImage: `radial-gradient(circle, #818CF8 1px, transparent 1px)`,
        backgroundSize: "24px 24px"
      }} />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 w-full">
        <div className="max-w-2xl mt-36 sm:mt-32 lg:mt-0">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white border border-[#C7D2FE] text-[#5B3DF5] text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-5 sm:mb-6 shadow-sm"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
            <span className="leading-tight">India's First Assisted Train Ticket Transfer Platform</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Transfer Your Train
            <br />
            Booking Hassle.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B3DF5] to-[#7C4DFF]">
              Safe. Fast. Reliable.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-4 leading-relaxed"
          >
            Can't travel on your confirmed ticket? Find someone who needs it.
            <br className="hidden sm:block" />
            Need a last-minute confirmed berth? We'll help you find one.
          </motion.p>

          {/* Legal note */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-[11px] sm:text-xs text-gray-400 mb-6 sm:mb-8 flex items-start sm:items-center gap-1.5"
          >
            <ShieldCheck size={12} className="text-green-500 flex-shrink-0 mt-0.5 sm:mt-0" />
            <span>All transfers are facilitated as per Indian Railways official transfer guidelines.</span>
          </motion.p>

          {/* Buttons — Stack on mobile, row on tablet+ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10"
          >
            <Link href="/search" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#5B3DF5] hover:bg-[#4930d4] text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-base sm:text-lg text-center"
              >
                Find a Ticket
              </motion.div>
            </Link>
            <Link href="/sell" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-gray-300 bg-white text-gray-700 hover:border-[#5B3DF5] hover:text-[#5B3DF5] font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-200 text-base sm:text-lg text-center"
              >
                Transfer My Booking
              </motion.div>
            </Link>
          </motion.div>

          {/* Trust Badges — 2 cols always */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-2 gap-2.5 sm:gap-3 max-w-lg"
          >
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.08, duration: 0.4 }}
                whileHover={{ y: -3, boxShadow: "0 8px 20px rgba(91,61,245,0.12)" }}
                className="flex items-center gap-2.5 sm:gap-3 bg-white/90 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 shadow-sm border border-white"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#EEF2FF] rounded-lg flex items-center justify-center flex-shrink-0">
                  <badge.icon size={14} className="text-[#5B3DF5] sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-tight truncate">{badge.label}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 leading-tight truncate">{badge.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Floating Cards — Desktop only */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
        transition={{
          opacity: { delay: 0.8, duration: 0.5 },
          x: { delay: 0.8, duration: 0.5 },
          y: { repeat: Infinity, duration: 3, delay: 1 }
        }}
        className="hidden lg:block absolute top-32 right-8 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 z-10"
      >
        <p className="text-xs text-gray-500">Transfer Amount</p>
        <p className="font-bold text-green-600 text-sm">Protected 🔒</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          x: { delay: 1, duration: 0.5 },
          y: { repeat: Infinity, duration: 3.5, delay: 1.5 }
        }}
        className="hidden lg:block absolute bottom-32 right-8 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 z-10"
      >
        <p className="text-xs text-gray-500">Avg Assistance Time</p>
        <p className="font-bold text-[#5B3DF5] text-sm">Under 3 Minutes ⚡</p>
      </motion.div>

    </section>
  );
}
