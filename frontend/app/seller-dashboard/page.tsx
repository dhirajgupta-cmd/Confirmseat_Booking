"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Ticket,
  DollarSign,
  Clock,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "../components/Navbar/Navbar";

const stats = [
  { label: "Total Earnings", value: "₹24,760", icon: DollarSign, color: "text-[#5B3DF5]", bg: "bg-[#EEF2FF]", change: "+₹1,850 this week" },
  { label: "Pending Payout", value: "₹18,560", icon: Clock, color: "text-[#F59E0B]", bg: "bg-[#FFFBEB]", change: "After journey" },
  { label: "Tickets Sold", value: "128", icon: Ticket, color: "text-[#22C55E]", bg: "bg-[#F0FDF4]", change: "+3 this week" },
  { label: "Success Rate", value: "98%", icon: TrendingUp, color: "text-[#0EA5E9]", bg: "bg-[#F0F9FF]", change: "Excellent" },
];

const listings = [
  {
    id: "1",
    trainName: "Gondwana Express",
    trainNumber: "12416",
    from: "BPL",
    to: "DLI",
    date: "25 May",
    class: "3A",
    coach: "B2",
    berth: "32",
    price: 1850,
    status: "Sold",
    payout: "After journey start",
  },
  {
    id: "2",
    trainName: "Karnavati Express",
    trainNumber: "12566",
    from: "BPL",
    to: "DLI",
    date: "26 May",
    class: "3A",
    coach: "B3",
    berth: "21",
    price: 1950,
    status: "Sold",
    payout: "After journey start",
  },
  {
    id: "3",
    trainName: "Duronto Express",
    trainNumber: "22954",
    from: "BPL",
    to: "DLI",
    date: "27 May",
    class: "2A",
    coach: "A1",
    berth: "16",
    price: 2650,
    status: "Active",
    payout: "Pending sale",
  },
  {
    id: "4",
    trainName: "Rajdhani Express",
    trainNumber: "12951",
    from: "BPL",
    to: "DLI",
    date: "28 May",
    class: "1A",
    coach: "H1",
    berth: "4",
    price: 4200,
    status: "Active",
    payout: "Pending sale",
  },
];

const statusConfig = {
  Sold: { color: "bg-green-100 text-green-700", icon: CheckCircle },
  Active: { color: "bg-blue-100 text-blue-700", icon: Eye },
  Rejected: { color: "bg-red-100 text-red-700", icon: XCircle },
  Pending: { color: "bg-yellow-100 text-yellow-700", icon: AlertCircle },
};

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("listings");

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Seller Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Welcome back, Rohit Verma 👋</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-[#5B3DF5] hover:bg-[#4930d4] text-white font-semibold px-5 py-3 rounded-xl transition-all shadow-lg"
          >
            <Plus size={18} />
            List New Ticket
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-lg transition-all"
            >
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xs text-green-600 font-medium mt-1">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-[#5B3DF5] to-[#7C4DFF] rounded-2xl p-5 mb-8 text-white flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-lg">Rohit Verma</p>
                <ShieldCheck size={18} className="text-green-300" />
                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  GOLD
                </span>
              </div>
              <div className="flex items-center gap-3 text-purple-200 text-sm">
                <span className="flex items-center gap-1">
                  <Star size={13} className="text-yellow-300 fill-yellow-300" />
                  4.8 Rating
                </span>
                <span>128 Sales</span>
                <span>98% Response Rate</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-purple-200 text-sm">KYC Status</p>
            <p className="font-bold text-green-300">✓ Verified</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["listings", "earnings", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm capitalize transition-all ${
                activeTab === tab
                  ? "bg-[#5B3DF5] text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#5B3DF5]"
              }`}
            >
              {tab === "listings" ? "My Listed Tickets" : tab === "earnings" ? "Earnings" : "Reviews"}
            </button>
          ))}
        </div>

        {/* Listings Tab */}
        {activeTab === "listings" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {listings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-bold text-gray-900">{listing.trainName}</p>
                      <span className="text-xs text-gray-400">{listing.trainNumber}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusConfig[listing.status as keyof typeof statusConfig].color}`}>
                        {listing.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="font-semibold text-gray-900">
                        {listing.from} → {listing.to}
                      </span>
                      <span>{listing.date}</span>
                      <span>{listing.class} · {listing.coach} · Berth {listing.berth}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{listing.payout}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#5B3DF5]">
                      ₹{listing.price.toLocaleString("en-IN")}
                    </p>
                    <button className="flex items-center gap-1 text-xs text-[#5B3DF5] hover:underline mt-1 ml-auto">
                      <Eye size={12} />
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Earnings Tab */}
        {activeTab === "earnings" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            <h3 className="font-bold text-gray-900 mb-6">Earnings Overview</h3>
            <div className="space-y-4">
              {[
                { label: "Total Earned", value: "₹24,760", color: "text-[#5B3DF5]" },
                { label: "Pending Payout", value: "₹18,560", color: "text-yellow-600" },
                { label: "Released", value: "₹6,200", color: "text-green-600" },
                { label: "Platform Fee Paid", value: "₹1,238", color: "text-red-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600">{item.label}</span>
                  <span className={`text-xl font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 bg-[#5B3DF5] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
              <ArrowUpRight size={18} />
              Withdraw to Bank Account
            </button>
          </motion.div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {[
              { name: "Rahul S.", rating: 5, comment: "Great seller! Ticket was delivered instantly. Highly recommended.", date: "24 May 2025" },
              { name: "Priya V.", rating: 5, comment: "Very trustworthy. PNR was genuine and confirmed.", date: "22 May 2025" },
              { name: "Amit K.", rating: 4, comment: "Good experience. Quick response from seller.", date: "20 May 2025" },
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#5B3DF5] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={12} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-xs text-gray-400">{review.date}</span>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </div>
  );
}