"use client";

import { motion } from "framer-motion";
import { Star, Shield, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

const tickets = [
  {
    trainName: "Rajdhani Express",
    trainNumber: "12951",
    from: "Bhopal",
    fromCode: "BPL",
    to: "Delhi",
    toCode: "NDLS",
    departure: "06:15",
    arrival: "13:10",
    duration: "6h 55m",
    date: "25 May 2025",
    class: "3AC",
    coach: "B2",
    berth: "32 Lower",
    price: 1650,
    originalPrice: 1850,
    sellerName: "Rahul S.",
    sellerRating: 4.9,
    sellerSales: 128,
    isVerified: true,
    color: "from-[#5B3DF5] to-[#7C4DFF]",
    tag: "Hot Deal",
    tagColor: "bg-red-100 text-red-600",
  },
  {
    trainName: "Vande Bharat Express",
    trainNumber: "20826",
    from: "Bhopal",
    fromCode: "BPL",
    to: "Delhi",
    toCode: "NDLS",
    departure: "06:10",
    arrival: "13:20",
    duration: "7h 10m",
    date: "25 May 2025",
    class: "2AC",
    coach: "A1",
    berth: "12 Upper",
    price: 2450,
    originalPrice: 2650,
    sellerName: "Priya V.",
    sellerRating: 4.8,
    sellerSales: 64,
    isVerified: true,
    color: "from-[#0EA5E9] to-[#6366F1]",
    tag: "Premium",
    tagColor: "bg-blue-100 text-blue-600",
  },
  {
    trainName: "Gondwana Express",
    trainNumber: "12416",
    from: "Bhopal",
    fromCode: "BPL",
    to: "Delhi",
    toCode: "DLI",
    departure: "21:15",
    arrival: "05:00",
    duration: "7h 45m",
    date: "25 May 2025",
    class: "SL",
    coach: "S4",
    berth: "45 Side Lower",
    price: 650,
    originalPrice: 750,
    sellerName: "Amit K.",
    sellerRating: 4.7,
    sellerSales: 43,
    isVerified: true,
    color: "from-[#22C55E] to-[#16A34A]",
    tag: "Budget",
    tagColor: "bg-green-100 text-green-600",
  },
  {
    trainName: "Duronto Express",
    trainNumber: "22954",
    from: "Patna",
    fromCode: "PNBE",
    to: "Bangalore",
    toCode: "SBC",
    departure: "11:20",
    arrival: "18:45",
    duration: "7h 25m",
    date: "26 May 2025",
    class: "2AC",
    coach: "A1",
    berth: "16 Lower",
    price: 2650,
    originalPrice: 2900,
    sellerName: "Sneha P.",
    sellerRating: 5.0,
    sellerSales: 92,
    isVerified: true,
    color: "from-[#F59E0B] to-[#EF4444]",
    tag: "New",
    tagColor: "bg-yellow-100 text-yellow-600",
  },
];

export default function FeaturedTickets() {
  return (
    <section className="py-24 px-4 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <p className="text-sm font-semibold text-[#5B3DF5] uppercase tracking-widest mb-3">
              Recently Listed
            </p>
            <h2
              className="text-4xl font-bold text-gray-900"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Available{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B3DF5] to-[#7C4DFF]">
                Tickets
              </span>
            </h2>
          </div>
          <Link
            href="/search"
            className="flex items-center gap-2 text-[#5B3DF5] font-semibold hover:gap-3 transition-all duration-200 mt-4 md:mt-0"
          >
            View All Tickets
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tickets.map((ticket, index) => (
            <motion.div
              key={ticket.trainNumber}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Ticket Header */}
              <div className={`bg-gradient-to-r ${ticket.color} p-4 text-white relative`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-xs opacity-75">{ticket.trainNumber}</p>
                    <p className="font-bold text-sm">{ticket.trainName}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${ticket.tagColor} bg-white/20 text-white`}>
                    {ticket.tag}
                  </span>
                </div>

                {/* Route */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold">{ticket.fromCode}</p>
                    <p className="text-xs opacity-75">{ticket.departure}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-xs opacity-75 mb-1">{ticket.duration}</p>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-white/60" />
                      <div className="w-8 h-0.5 bg-white/40" />
                      <div className="text-sm">🚄</div>
                      <div className="w-8 h-0.5 bg-white/40" />
                      <div className="w-2 h-2 rounded-full bg-white/60" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{ticket.toCode}</p>
                    <p className="text-xs opacity-75">{ticket.arrival}</p>
                  </div>
                </div>
              </div>

              {/* Ticket Body */}
              <div className="p-4">
                {/* Details */}
                <div className="flex gap-2 mb-3">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-medium">
                    {ticket.class}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-medium">
                    {ticket.coach}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-medium">
                    {ticket.date}
                  </span>
                </div>

                {/* Seller */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                  <div className="w-7 h-7 bg-[#5B3DF5] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {ticket.sellerName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-700">{ticket.sellerName}</p>
                    <div className="flex items-center gap-1">
                      <Star size={10} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-gray-500">{ticket.sellerRating} · {ticket.sellerSales} sales</span>
                    </div>
                  </div>
                  {ticket.isVerified && (
                    <Shield size={14} className="text-[#22C55E]" />
                  )}
                </div>

                {/* Price + Buy */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 line-through">₹{ticket.originalPrice.toLocaleString("en-IN")}</p>
                    <p className="text-xl font-bold text-[#5B3DF5]">₹{ticket.price.toLocaleString("en-IN")}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 bg-[#5B3DF5] hover:bg-[#4930d4] text-white font-semibold px-4 py-2 rounded-xl transition-all duration-200 text-sm shadow-md hover:shadow-lg"
                  >
                    <Zap size={14} />
                    Buy Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500"
        >
          <span className="flex items-center gap-2">
            <Shield size={16} className="text-[#22C55E]" />
            All tickets verified before listing
          </span>
          <span className="flex items-center gap-2">
            <Zap size={16} className="text-[#5B3DF5]" />
            Delivered within 2-5 minutes
          </span>
          <span className="flex items-center gap-2">
            <Star size={16} className="text-yellow-500" />
            Money back guarantee
          </span>
        </motion.div>

      </div>
    </section>
  );
}