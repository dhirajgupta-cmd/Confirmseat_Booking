"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Star,
  Shield,
  Zap,
  ArrowRight,
  MapPin,
  Calendar,
  Train,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";

const tickets = [
  {
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
    date: "Sat, 25 May",
    class: "3A",
    coach: "B2",
    berth: "32",
    seatType: "Lower",
    price: 1850,
    originalPrice: 2100,
    sellerName: "Rohit Verma",
    sellerRating: 4.8,
    sellerSales: 128,
    isVerified: true,
    listedAgo: "2h ago",
    status: "Confirmed",
  },
  {
    id: "2",
    trainName: "Karnavati Express",
    trainNumber: "12566",
    from: "Bhopal Junction",
    fromCode: "BPL",
    to: "Hazrat Nizamuddin",
    toCode: "NZM",
    departure: "21:40",
    arrival: "05:30",
    duration: "7h 50m",
    date: "Sun, 26 May",
    class: "3A",
    coach: "B3",
    berth: "21",
    seatType: "Side Lower",
    price: 1950,
    originalPrice: 2100,
    sellerName: "Ankita Singh",
    sellerRating: 4.9,
    sellerSales: 64,
    isVerified: true,
    listedAgo: "1h ago",
    status: "Confirmed",
  },
  {
    id: "3",
    trainName: "Duronto Express",
    trainNumber: "22954",
    from: "Bhopal Junction",
    fromCode: "BPL",
    to: "Hazrat Nizamuddin",
    toCode: "NZM",
    departure: "11:20",
    arrival: "18:45",
    duration: "7h 25m",
    date: "Sat, 25 May",
    class: "2A",
    coach: "A1",
    berth: "16",
    seatType: "Lower",
    price: 2650,
    originalPrice: 2900,
    sellerName: "Sandeep T.",
    sellerRating: 4.7,
    sellerSales: 43,
    isVerified: true,
    listedAgo: "3h ago",
    status: "Confirmed",
  },
  {
    id: "4",
    trainName: "Rajdhani Express",
    trainNumber: "12951",
    from: "Bhopal Junction",
    fromCode: "BPL",
    to: "Hazrat Nizamuddin",
    toCode: "NZM",
    departure: "14:05",
    arrival: "20:55",
    duration: "6h 50m",
    date: "Sat, 25 May",
    class: "1A",
    coach: "H1",
    berth: "4",
    seatType: "Lower",
    price: 4200,
    originalPrice: 4800,
    sellerName: "Meera Joshi",
    sellerRating: 5.0,
    sellerSales: 92,
    isVerified: true,
    listedAgo: "30 min ago",
    status: "Confirmed",
  },
  {
    id: "5",
    trainName: "Shatabdi Express",
    trainNumber: "12001",
    from: "Bhopal Junction",
    fromCode: "BPL",
    to: "Hazrat Nizamuddin",
    toCode: "NZM",
    departure: "06:00",
    arrival: "13:20",
    duration: "7h 20m",
    date: "Sat, 25 May",
    class: "CC",
    coach: "C2",
    berth: "45",
    seatType: "Window",
    price: 1200,
    originalPrice: 1500,
    sellerName: "Amit Kumar",
    sellerRating: 4.6,
    sellerSales: 31,
    isVerified: false,
    listedAgo: "5h ago",
    status: "Confirmed",
  },
];

const classes = ["All", "SL", "3A", "2A", "1A", "CC", "EC"];

export default function SearchPage() {
  const [selectedClass, setSelectedClass] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");

  const filtered = tickets.filter(
    (t) => selectedClass === "All" || t.class === selectedClass
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Search Header */}
      <div className="bg-gradient-to-r from-[#5B3DF5] to-[#7C4DFF] pt-20 pb-6 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-4 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                <MapPin size={16} className="text-[#5B3DF5]" />
                <div>
                  <p className="text-xs text-gray-400">From</p>
                  <p className="text-sm font-semibold">Bhopal (BPL)</p>
                </div>
              </div>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                <MapPin size={16} className="text-purple-400" />
                <div>
                  <p className="text-xs text-gray-400">To</p>
                  <p className="text-sm font-semibold">Delhi (NZM)</p>
                </div>
              </div>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                <Calendar size={16} className="text-[#5B3DF5]" />
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="text-sm font-semibold">25 May 2025</p>
                </div>
              </div>
              <button className="bg-[#5B3DF5] hover:bg-[#4930d4] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                <Search size={18} />
                Search
              </button>
            </div>
          </div>

          {/* Result count */}
          <p className="text-white/80 text-sm mt-3 px-1">
            Found <span className="font-bold text-white">{filtered.length} tickets</span> · Bhopal → Delhi · 25 May 2025
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT — Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal size={18} className="text-[#5B3DF5]" />
                <h3 className="font-bold text-gray-900">Filters</h3>
              </div>

              {/* Class Filter */}
              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-700 mb-3">Travel Class</p>
                <div className="flex flex-wrap gap-2">
                  {classes.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedClass(c)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedClass === c
                          ? "bg-[#5B3DF5] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-700 mb-3">Price Range</p>
                <div className="space-y-2">
                  {["Under ₹1,000", "₹1,000 - ₹2,000", "₹2,000 - ₹3,000", "Above ₹3,000"].map((range) => (
                    <label key={range} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-[#5B3DF5]" />
                      <span className="text-sm text-gray-600">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Seller Trust */}
              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-700 mb-3">Seller Trust</p>
                <div className="space-y-2">
                  {["Verified Sellers Only", "Rating 4.5+", "50+ Sales"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-[#5B3DF5]" />
                      <span className="text-sm text-gray-600">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Departure Time */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Departure Time</p>
                <div className="space-y-2">
                  {["Morning (6AM - 12PM)", "Afternoon (12PM - 6PM)", "Night (6PM - 12AM)"].map((time) => (
                    <label key={time} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-[#5B3DF5]" />
                      <span className="text-sm text-gray-600">{time}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Results */}
          <div className="flex-1">

            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{filtered.length}</span> results
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#5B3DF5] bg-white"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Seller Rating</option>
                  <option value="latest">Latest Listed</option>
                </select>
              </div>
            </div>

            {/* Ticket Cards */}
            <div className="space-y-4">
              {filtered.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">

                      {/* Train Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-gray-400">{ticket.trainNumber}</span>
                          <span className="text-sm font-bold text-gray-900">{ticket.trainName}</span>
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                            {ticket.status}
                          </span>
                        </div>

                        {/* Route */}
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-2xl font-bold text-gray-900">{ticket.departure}</p>
                            <p className="text-sm text-gray-500">{ticket.fromCode}</p>
                            <p className="text-xs text-gray-400">{ticket.date}</p>
                          </div>
                          <div className="flex flex-col items-center flex-1">
                            <p className="text-xs text-gray-400 mb-1">{ticket.duration}</p>
                            <div className="flex items-center gap-1 w-full">
                              <div className="w-2 h-2 rounded-full border-2 border-[#5B3DF5]" />
                              <div className="flex-1 h-0.5 bg-gradient-to-r from-[#5B3DF5] to-[#7C4DFF]" />
                              <span className="text-sm">🚄</span>
                              <div className="flex-1 h-0.5 bg-gradient-to-r from-[#7C4DFF] to-[#5B3DF5]" />
                              <div className="w-2 h-2 rounded-full border-2 border-[#7C4DFF]" />
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">{ticket.arrival}</p>
                            <p className="text-sm text-gray-500">{ticket.toCode}</p>
                            <p className="text-xs text-gray-400">{ticket.date}</p>
                          </div>
                        </div>

                        {/* Class + Berth */}
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-lg font-semibold">{ticket.class}</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">Coach {ticket.coach}</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">Berth {ticket.berth}</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{ticket.seatType}</span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="hidden md:block w-px h-20 bg-gray-100" />

                      {/* Seller + Price */}
                      <div className="md:w-48 flex flex-col gap-3">
                        {/* Seller */}
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#5B3DF5] rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {ticket.sellerName.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <p className="text-sm font-semibold text-gray-800">{ticket.sellerName}</p>
                              {ticket.isVerified && <Shield size={12} className="text-[#22C55E]" />}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star size={11} className="text-yellow-500 fill-yellow-500" />
                              <span className="text-xs text-gray-500">{ticket.sellerRating} · Listed {ticket.listedAgo}</span>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div>
                          <p className="text-xs text-gray-400 line-through">₹{ticket.originalPrice.toLocaleString("en-IN")}</p>
                          <p className="text-2xl font-bold text-[#5B3DF5]">₹{ticket.price.toLocaleString("en-IN")}</p>
                          <p className="text-xs text-gray-400">per seat</p>
                        </div>

                        {/* Buy Button */}
                        <Link href={`/ticket/${ticket.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full bg-[#5B3DF5] hover:bg-[#4930d4] text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm shadow-md hover:shadow-lg"
                          >
                            <Zap size={14} />
                            View Details
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Trust Bar */}
                  <div className="px-5 py-3 bg-gray-50 rounded-b-2xl border-t border-gray-100 flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Shield size={12} className="text-[#22C55E]" />
                      Escrow Protected
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap size={12} className="text-[#5B3DF5]" />
                      Delivered in 2-5 min
                    </span>
                    <span className="flex items-center gap-1 ml-auto text-green-600 font-medium">
                      ● 1 seat available
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}