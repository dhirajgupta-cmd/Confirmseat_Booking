"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search, Shield, Zap, Star, MapPin, Calendar,
  SlidersHorizontal, Ticket, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "@/lib/authContext";

const classes = ["All", "SL", "3AC", "2AC", "1AC", "CC", "EC"];
const genderOptions = ["All", "Male", "Female"];

export default function SearchPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [allTickets, setAllTickets] = useState([] as any[]);

  // Search input state (what user types)
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  // Applied filters (only update on Search click)
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "tickets"), where("status", "==", "available"));
        const snapshot = await getDocs(q);
        const tickets = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          departure: doc.data().departureTime || "00:00",
          arrival: doc.data().arrivalTime || "00:00",
          duration: "N/A",
          date: doc.data().journeyDate,
          sellerName: doc.data().passengerName || "Seller",
          sellerRating: 4.5,
          sellerSales: 1,
          isVerified: true,
          listedAgo: "Just now",
          status: "Confirmed",
          gender: doc.data().gender || "Male",
        }));
        setAllTickets(tickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  // Search button click — apply filters
  const handleSearch = () => {
    setFromSearch(fromInput);
    setToSearch(toInput);
    setDateSearch(dateInput);
    setSearched(true);
  };

  // Enter key support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const filtered = allTickets.filter((t) => {
    const classMatch = selectedClass === "All" || t.trainClass === selectedClass;
    const genderMatch = selectedGender === "All" || t.gender === selectedGender;
    const fromMatch = !fromSearch || t.fromCode?.toLowerCase().includes(fromSearch.toLowerCase()) || t.from?.toLowerCase().includes(fromSearch.toLowerCase());
    const toMatch = !toSearch || t.toCode?.toLowerCase().includes(toSearch.toLowerCase()) || t.to?.toLowerCase().includes(toSearch.toLowerCase());
    const dateMatch = !dateSearch || t.journeyDate === dateSearch;
    return classMatch && genderMatch && fromMatch && toMatch && dateMatch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price_low") return (a.price || 0) - (b.price || 0);
    if (sortBy === "price_high") return (b.price || 0) - (a.price || 0);
    if (sortBy === "rating") return (b.sellerRating || 0) - (a.sellerRating || 0);
    return 0;
  });

  // Buy button — protected
  const handleBuy = (ticketId: string) => {
    if (!user) {
      router.push("/login");
      return;
    }
    router.push(`/ticket/${ticketId}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Search Header */}
      <div className="bg-gradient-to-r from-[#5B3DF5] to-[#7C4DFF] pt-24 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
              Find Confirmed Tickets
            </h1>
            <p className="text-purple-200 text-sm">Search from verified sellers across India</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-4 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">

              {/* From */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 ml-1">FROM</label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3 top-3.5 text-[#5B3DF5]" />
                  <input
                    type="text"
                    placeholder="Station or code (e.g. BPL)"
                    value={fromInput}
                    onChange={(e) => setFromInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/10 transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* To */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 ml-1">TO</label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3 top-3.5 text-purple-400" />
                  <input
                    type="text"
                    placeholder="Station or code (e.g. NDLS)"
                    value={toInput}
                    onChange={(e) => setToInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/10 transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 ml-1">DATE</label>
                <div className="relative">
                  <Calendar size={15} className="absolute left-3 top-3.5 text-[#5B3DF5]" />
                  <input
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/10 transition-all text-gray-600"
                  />
                </div>
              </div>

              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch}
                className="bg-[#5B3DF5] hover:bg-[#4930d4] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#5B3DF5]/30 text-sm tracking-wide"
              >
                <Search size={17} />
                Search Tickets
              </motion.button>
            </div>
          </motion.div>

          {searched && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-white/80 text-sm mt-3 px-1">
              <span className="font-bold text-white">{sorted.length} tickets</span> found
              {fromSearch && <> from <span className="font-bold text-white">{fromSearch.toUpperCase()}</span></>}
              {toSearch && <> to <span className="font-bold text-white">{toSearch.toUpperCase()}</span></>}
              {dateSearch && <> on <span className="font-bold text-white">{dateSearch}</span></>}
            </motion.p>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
              <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal size={18} className="text-[#5B3DF5]" />
                <h3 className="font-bold text-gray-900">Filters</h3>
              </div>

              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-700 mb-3">Travel Class</p>
                <div className="flex flex-wrap gap-2">
                  {classes.map((c) => (
                    <button key={c} onClick={() => setSelectedClass(c)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                        selectedClass === c ? "bg-[#5B3DF5] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}>{c}</button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-700 mb-3">Passenger Gender</p>
                <div className="flex flex-wrap gap-2">
                  {genderOptions.map((g) => (
                    <button key={g} onClick={() => setSelectedGender(g)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                        selectedGender === g ? "bg-[#5B3DF5] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}>{g}</button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-700 mb-3">Price Range</p>
                <div className="space-y-2">
                  {["Under ₹1,000", "₹1,000 - ₹2,000", "₹2,000 - ₹3,000", "Above ₹3,000"].map((range) => (
                    <label key={range} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-[#5B3DF5]" />
                      <span className="text-sm text-gray-600 font-medium">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Seller Trust</p>
                <div className="space-y-2">
                  {["Verified Sellers Only", "Rating 4.5+", "50+ Sales"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-[#5B3DF5]" />
                      <span className="text-sm text-gray-600 font-medium">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 font-medium">
                {searched
                  ? <><span className="font-bold text-gray-900">{sorted.length}</span> results found</>
                  : "Search tickets above to get started"}
              </p>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:border-[#5B3DF5] bg-white text-gray-700">
                <option value="recommended">Recommended</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Seller Rating</option>
              </select>
            </div>

            {/* Loading */}
            {loading && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                <div className="w-10 h-10 border-4 border-[#5B3DF5]/20 border-t-[#5B3DF5] rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400 text-sm font-medium">Fetching available tickets...</p>
              </div>
            )}

            {/* Not searched yet */}
            {!loading && !searched && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-[#5B3DF5]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-[#5B3DF5]" />
                </div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">Search for Tickets</h3>
                <p className="text-gray-400 text-sm">Enter your From, To and Date above and click <span className="font-semibold text-[#5B3DF5]">Search Tickets</span></p>
              </motion.div>
            )}

            {/* No results */}
            {!loading && searched && sorted.length === 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                <Ticket size={48} className="text-gray-200 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-700 mb-2">No Tickets Found</h3>
                <p className="text-gray-400 text-sm mb-6">No tickets match your search. Try different stations or dates.</p>
                <Link href="/sell" className="bg-[#5B3DF5] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#4930d4] transition-all inline-flex items-center gap-2">
                  <Ticket size={16} /> Sell Your Ticket
                </Link>
              </motion.div>
            )}

            {/* Ticket Cards */}
            {!loading && searched && sorted.length > 0 && (
              <div className="space-y-4">
                {sorted.map((ticket, index) => (
                  <motion.div key={ticket.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ y: -2 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="p-5">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-gray-400">{ticket.trainNumber}</span>
                            <span className="text-sm font-bold text-gray-900">{ticket.trainName}</span>
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">CNF</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="text-2xl font-bold text-gray-900">{ticket.departure}</p>
                              <p className="text-sm font-semibold text-gray-500">{ticket.fromCode}</p>
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
                              <p className="text-sm font-semibold text-gray-500">{ticket.toCode}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2 flex-wrap">
                            <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-lg font-bold">{ticket.trainClass}</span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-medium">Coach {ticket.coach}</span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-medium">Berth {ticket.berth}</span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-medium">{ticket.date}</span>
                            {ticket.gender && (
                              <span className={`text-xs px-2 py-1 rounded-lg font-bold ${
                                ticket.gender === "Female" ? "bg-pink-50 text-pink-600" : "bg-blue-50 text-blue-600"
                              }`}>{ticket.gender}</span>
                            )}
                            {ticket.seatType && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{ticket.seatType}</span>
                              )}
                          </div>
                        </div>

                        <div className="hidden md:block w-px h-20 bg-gray-100" />

                        <div className="md:w-48 flex flex-col gap-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#5B3DF5] rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {ticket.sellerName?.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <p className="text-sm font-semibold text-gray-800">{ticket.sellerName}</p>
                                {ticket.isVerified && <Shield size={12} className="text-[#22C55E]" />}
                              </div>
                              <div className="flex items-center gap-1">
                                <Star size={11} className="text-yellow-500 fill-yellow-500" />
                                <span className="text-xs text-gray-500 font-medium">{ticket.sellerRating} · {ticket.listedAgo}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-[#5B3DF5]">₹{ticket.price?.toLocaleString("en-IN")}</p>
                            <p className="text-xs text-gray-400 font-medium">per seat</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleBuy(ticket.id)}
                            className="w-full bg-[#5B3DF5] hover:bg-[#4930d4] text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm shadow-md shadow-[#5B3DF5]/20 tracking-wide"
                          >
                            <Zap size={14} />
                            View Details
                          </motion.button>
                        </div>
                      </div>
                    </div>
                    <div className="px-5 py-3 bg-gray-50 rounded-b-2xl border-t border-gray-100 flex items-center gap-4 text-xs text-gray-400 font-medium">
                      <span className="flex items-center gap-1"><Shield size={12} className="text-[#22C55E]" /> Escrow Protected</span>
                      <span className="flex items-center gap-1"><Zap size={12} className="text-[#5B3DF5]" /> Delivered in 2-5 min</span>
                      <span className="flex items-center gap-1 ml-auto text-green-600 font-semibold">● 1 seat available</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
