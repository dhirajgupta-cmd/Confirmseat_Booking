"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Star,
  ArrowLeft,
  Train,
  Calendar,
  MapPin,
  User,
  Lock,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/Navbar/Navbar";

const ticket = {
  id: "1",
  trainName: "Gondwana Express",
  trainNumber: "12416",
  from: "Bhopal Junction",
  fromCode: "BPL",
  to: "Hazrat Nizamuddin",
  toCode: "NZM",
  departure: "06:15",
  arrival: "13:10",
  duration: "6h 55m",
  date: "Saturday, 25 May 2025",
  class: "3AC",
  coach: "B2",
  berth: "32",
  seatType: "Lower",
  price: 1850,
  originalPrice: 2100,
  pnr: "2345678901",
  chartStatus: "Chart Not Prepared",
  status: "Confirmed",
  seller: {
    name: "Rohit Verma",
    rating: 4.8,
    sales: 128,
    responseRate: 98,
    memberSince: "Jan 2024",
    isVerified: true,
    trustLevel: "Gold",
  },
};

export default function TicketDetailPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 pt-24 pb-12">

        {/* Back Button */}
        <Link
          href="/search"
          className="flex items-center gap-2 text-gray-500 hover:text-[#5B3DF5] transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft size={18} />
          Back to Search Results
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT — Ticket Details */}
          <div className="lg:col-span-2 space-y-4">

            {/* Confirmed Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 rounded-2xl px-5 py-3 flex items-center gap-3"
            >
              <CheckCircle size={20} className="text-green-600" />
              <div>
                <p className="text-green-800 font-bold text-sm">Confirmed Ticket</p>
                <p className="text-green-600 text-xs">PNR: {ticket.pnr} · Chart Status: {ticket.chartStatus}</p>
              </div>
            </motion.div>

            {/* Train Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#5B3DF5] to-[#7C4DFF] p-5 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs opacity-75">{ticket.trainNumber}</p>
                    <p className="text-xl font-bold">{ticket.trainName}</p>
                  </div>
                  <span className="bg-green-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {ticket.status}
                  </span>
                </div>

                {/* Route */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">{ticket.departure}</p>
                    <p className="text-sm opacity-75">{ticket.fromCode}</p>
                    <p className="text-xs opacity-60 mt-1">{ticket.from}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-xs opacity-75 mb-2">{ticket.duration}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white/60" />
                      <div className="w-16 h-0.5 bg-white/40" />
                      <span className="text-2xl">🚄</span>
                      <div className="w-16 h-0.5 bg-white/40" />
                      <div className="w-2 h-2 rounded-full bg-white/60" />
                    </div>
                    <p className="text-xs opacity-60 mt-2">{ticket.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">{ticket.arrival}</p>
                    <p className="text-sm opacity-75">{ticket.toCode}</p>
                    <p className="text-xs opacity-60 mt-1">{ticket.to}</p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "Class", value: ticket.class },
                    { label: "Coach", value: ticket.coach },
                    { label: "Berth", value: ticket.berth },
                    { label: "Seat Type", value: ticket.seatType },
                  ].map((item) => (
                    <div key={item.label} className="text-center bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                      <p className="font-bold text-gray-900">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Seller Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
            >
              <h3 className="font-bold text-gray-900 mb-4">Seller Information</h3>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#5B3DF5] rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                  {ticket.seller.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-gray-900">{ticket.seller.name}</p>
                    {ticket.seller.isVerified && (
                      <ShieldCheck size={16} className="text-[#22C55E]" />
                    )}
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      {ticket.seller.trustLevel}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star size={13} className="text-yellow-500 fill-yellow-500" />
                      {ticket.seller.rating}
                    </span>
                    <span>{ticket.seller.sales} Successful Sales</span>
                    <span>Response Rate {ticket.seller.responseRate}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Member since</p>
                  <p className="text-sm font-semibold text-gray-700">{ticket.seller.memberSince}</p>
                </div>
              </div>
            </motion.div>

            {/* Security Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-5"
            >
              <h3 className="font-bold text-[#5B3DF5] mb-3 flex items-center gap-2">
                <Lock size={16} />
                Payment Protection
              </h3>
              <div className="space-y-2">
                {[
                  "Money held in secure escrow until ticket is delivered",
                  "Ticket will be released within 2-5 minutes of payment",
                  "Seller gets payment only after journey is completed",
                  "Full refund if ticket is found to be invalid",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2 text-sm text-[#4338CA]">
                    <CheckCircle size={14} className="text-[#5B3DF5] mt-0.5 flex-shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Buy Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg p-5 sticky top-24"
            >
              <h3 className="font-bold text-gray-900 mb-4">Purchase Ticket</h3>

              {/* Price */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Ticket Price</span>
                  <span className="font-semibold">₹{ticket.price.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Platform Fee</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-[#5B3DF5]">
                    ₹{ticket.price.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Buy Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#5B3DF5] hover:bg-[#4930d4] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl mb-3 text-lg"
              >
                <Lock size={18} />
                Buy Now — ₹{ticket.price.toLocaleString("en-IN")}
              </motion.button>

              {/* Payment Methods */}
              <div className="text-center mb-4">
                <p className="text-xs text-gray-400 mb-2">Secure payment via</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {["Razorpay", "UPI", "PhonePe", "GPay", "Paytm"].map((method) => (
                    <span
                      key={method}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-medium"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trust Points */}
              <div className="space-y-2">
                {[
                  { icon: ShieldCheck, text: "100% Escrow Protected", color: "text-green-600" },
                  { icon: Zap, text: "Ticket in 2-5 minutes", color: "text-[#5B3DF5]" },
                  { icon: Star, text: "Money back guarantee", color: "text-yellow-500" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-xs text-gray-500">
                    <item.icon size={14} className={item.color} />
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}