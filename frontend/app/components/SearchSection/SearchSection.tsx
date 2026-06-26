"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Train, ArrowRight, Search, TrendingUp } from "lucide-react";

const popularRoutes = [
  { from: "Delhi", to: "Mumbai", fromCode: "NDLS", toCode: "CSTM" },
  { from: "Bhopal", to: "Delhi", fromCode: "BPL", toCode: "NDLS" },
  { from: "Patna", to: "Bangalore", fromCode: "PNBE", toCode: "SBC" },
  { from: "Chennai", to: "Hyderabad", fromCode: "MAS", toCode: "SC" },
];

const classes = ["All Classes", "SL", "3AC", "2AC", "1AC", "CC", "EC"];

export default function SearchSection() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [travelClass, setTravelClass] = useState("All Classes");

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <section className="relative z-10 -mt-8 pb-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Main Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8"
        >
          <p className="text-sm font-semibold text-[#5B3DF5] mb-4 flex items-center gap-2">
            <Search size={16} />
            Find Available Tickets
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

            {/* From */}
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                From
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-3.5 text-[#5B3DF5]" />
                <input
                  type="text"
                  placeholder="Departure city"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/10 transition-all"
                />
              </div>
            </div>

            {/* Swap + To */}
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                To
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-3.5 text-purple-400" />
                <input
                  type="text"
                  placeholder="Destination city"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full pl-9 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/10 transition-all"
                />
                {/* Swap Button */}
                <button
                  onClick={handleSwap}
                  className="absolute -left-5 top-2.5 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-[#5B3DF5] hover:text-[#5B3DF5] transition-all shadow-sm z-10"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                Journey Date
              </label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-3.5 text-[#5B3DF5]" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/10 transition-all"
                />
              </div>
            </div>

            {/* Class */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                Class
              </label>
              <div className="relative">
                <Train size={16} className="absolute left-3 top-3.5 text-[#5B3DF5]" />
                <select
                  value={travelClass}
                  onChange={(e) => setTravelClass(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/10 transition-all appearance-none bg-white"
                >
                  {classes.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => window.location.href = "/search"}
            className="w-full mt-6 bg-gradient-to-r from-[#5B3DF5] to-[#7C4DFF] text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Search size={20} />
            Search Available Tickets
          </motion.button>
        </motion.div>

        {/* Popular Routes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6"
        >
          <p className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
            <TrendingUp size={15} />
            Popular Routes
          </p>
          <div className="flex flex-wrap gap-3">
            {popularRoutes.map((route) => (
              <button
                key={`${route.from}-${route.to}`}
                onClick={() => {
                  setFrom(route.from);
                  setTo(route.to);
                }}
                className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#5B3DF5] hover:text-[#5B3DF5] text-gray-600 text-sm px-4 py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span className="font-medium">{route.from}</span>
                <ArrowRight size={14} />
                <span className="font-medium">{route.to}</span>
              </button>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}