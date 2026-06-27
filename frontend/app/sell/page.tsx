"use client";

import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload, Train, MapPin, Calendar, IndianRupee,
  ShieldCheck, ArrowRight, CheckCircle, Info, XCircle,
} from "lucide-react";
import Navbar from "../components/Navbar/Navbar";

const trainClasses = ["SL", "3AC", "2AC", "1AC", "CC", "EC"];
const seatTypes = ["Lower", "Middle", "Upper", "Side Lower", "Side Upper"];

export default function SellTicketPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pnrLoading, setPnrLoading] = useState(false);
  const [pnrVerified, setPnrVerified] = useState<null | boolean>(null);
  const [pnrError, setPnrError] = useState("");

  const [form, setForm] = useState({
    pnr: "", trainNumber: "", trainName: "", from: "", fromCode: "",
    to: "", toCode: "", journeyDate: "", departureTime: "", arrivalTime: "",
    trainClass: "", coach: "", berth: "", seatType: "",
    passengerName: "", passengerAge: "", price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "pnr") {
      setPnrVerified(null);
      setPnrError("");
    }
  };

  // ✅ REAL PNR VERIFY FUNCTION
  // ✅ REAL PNR VERIFY FUNCTION
const verifyPNR = async () => {
  if (form.pnr.length !== 10) {
    setPnrError("Please enter a valid 10-digit PNR number.");
    return;
  }
  setPnrLoading(true);
  setPnrVerified(null);
  setPnrError("");
  try {
    const response = await fetch(
      `https://irctc-indian-railway-pnr-status.p.rapidapi.com/getPNRStatus/${form.pnr}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": "1fdd3654b2msh711588d66484fafp1f5271jsnc6fce6dd98ee",
          "x-rapidapi-host": "irctc-indian-railway-pnr-status.p.rapidapi.com",
        },
      }
    );
    const result = await response.json();
    console.log("PNR API Response:", result);

    if (result.success && result.data) {
      const d = result.data;
      const passenger = d.passengerList?.[0];

      // "Jun 29, 2026 10:35:00 PM" → "2026-06-29"
      const parsedDate = d.dateOfJourney
        ? new Date(d.dateOfJourney).toISOString().split("T")[0]
        : "";

      const berthMap: Record<string, string> = {
        "LB": "Lower", "MB": "Middle", "UB": "Upper",
        "SL": "Side Lower", "SU": "Side Upper",
      };

      setForm((prev) => ({
        ...prev,
        trainNumber: d.trainNumber || "",
        trainName: d.trainName || "",
        from: d.boardingPoint || d.sourceStation || "",
        fromCode: d.boardingPoint || d.sourceStation || "",
        to: d.destinationStation || "",
        toCode: d.destinationStation || "",
        journeyDate: parsedDate,
        trainClass: d.journeyClass || "",
        coach: passenger?.bookingCoachId || "",
        berth: passenger?.bookingBerthNo?.toString() || "",
        seatType: berthMap[passenger?.bookingBerthCode || ""] || "",
      }));

      setPnrVerified(true);
    } else {
      setPnrVerified(false);
      setPnrError("PNR not found. Please check and try again.");
    }
  } catch (err) {
    console.error("PNR verify error:", err);
    setPnrVerified(false);
    setPnrError("Failed to verify PNR. Please try again.");
  } finally {
    setPnrLoading(false);
  }
};

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(step + 1); }, 800);
  };

   const handleSubmit = async () => {
  setLoading(true);
  try {
    await addDoc(collection(db, "tickets"), {
      pnr: form.pnr,
      trainNumber: form.trainNumber,
      trainName: form.trainName,
      from: form.from,
      fromCode: form.fromCode,
      to: form.to,
      toCode: form.toCode,
      journeyDate: form.journeyDate,
      departureTime: form.departureTime,
      arrivalTime: form.arrivalTime,
      trainClass: form.trainClass,
      coach: form.coach,
      berth: form.berth,
      seatType: form.seatType,
      passengerName: form.passengerName,
      passengerAge: form.passengerAge,
      price: parseInt(form.price),
      status: "available",
      createdAt: Timestamp.now(),
    });
    setStep(4);
  } catch (error) {
    console.error("Error saving ticket:", error);
    alert("Something went wrong! Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-24 pb-12">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
            Sell Your Ticket
          </h1>
          <p className="text-gray-500">List your unused confirmed train ticket and earn money safely.</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {["Ticket Details", "Passenger Info", "Set Price", "Done"].map((label, index) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step > index + 1 ? "bg-green-500 text-white"
                  : step === index + 1 ? "bg-[#5B3DF5] text-white"
                  : "bg-gray-200 text-gray-400"
                }`}>
                  {step > index + 1 ? <CheckCircle size={16} /> : index + 1}
                </div>
                <p className={`text-xs mt-1 font-medium ${step === index + 1 ? "text-[#5B3DF5]" : "text-gray-400"}`}>
                  {label}
                </p>
              </div>
              {index < 3 && (
                <div className={`w-12 h-0.5 mb-4 ${step > index + 1 ? "bg-green-500" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1 — Ticket Details */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Train size={20} className="text-[#5B3DF5]" /> Train Details
            </h2>

            {/* PNR INPUT */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">PNR Number</label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    name="pnr"
                    placeholder="Enter 10-digit PNR"
                    value={form.pnr}
                    onChange={handleChange}
                    maxLength={10}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
                      pnrVerified === true
                        ? "border-green-400 focus:border-green-400 focus:ring-green-100"
                        : pnrVerified === false
                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                        : "border-gray-200 focus:border-[#5B3DF5] focus:ring-[#5B3DF5]/10"
                    }`}
                  />
                  {/* Status icon inside input */}
                  {pnrVerified === true && (
                    <CheckCircle size={18} className="absolute right-3 top-3.5 text-green-500" />
                  )}
                  {pnrVerified === false && (
                    <XCircle size={18} className="absolute right-3 top-3.5 text-red-500" />
                  )}
                </div>

                <button
                  onClick={verifyPNR}
                  disabled={pnrLoading || form.pnr.length !== 10}
                  className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                    pnrVerified === true
                      ? "bg-green-500 text-white"
                      : "bg-[#EEF2FF] text-[#5B3DF5] hover:bg-[#5B3DF5] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                >
                  {pnrLoading ? (
                    <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                  ) : pnrVerified === true ? (
                    <><CheckCircle size={15} /> Verified</>
                  ) : (
                    "Verify PNR"
                  )}
                </button>
              </div>

              {/* Error message */}
              {pnrError && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <XCircle size={12} /> {pnrError}
                </p>
              )}

              {/* Success message */}
              {pnrVerified === true && (
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <CheckCircle size={12} /> PNR verified! Details auto-filled below.
                </p>
              )}

              {!pnrVerified && !pnrError && (
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Info size={12} /> We will verify your PNR with IRCTC
                </p>
              )}
            </div>

            {/* Auto-filled success banner */}
            {pnrVerified === true && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 flex items-center gap-2"
              >
                <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-700 font-medium">
                  Train details auto-filled from IRCTC. Please review and correct if needed.
                </p>
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Train Number</label>
                <input type="text" name="trainNumber" placeholder="e.g. 12416" value={form.trainNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B3DF5] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Train Name</label>
                <input type="text" name="trainName" placeholder="e.g. Gondwana Express" value={form.trainName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B3DF5] transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin size={14} className="inline mr-1 text-[#5B3DF5]" /> From Station
                </label>
                <input type="text" name="from" placeholder="e.g. Bhopal Junction" value={form.from}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B3DF5] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Station Code</label>
                <input type="text" name="fromCode" placeholder="e.g. BPL" value={form.fromCode}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B3DF5] transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin size={14} className="inline mr-1 text-purple-400" /> To Station
                </label>
                <input type="text" name="to" placeholder="e.g. Delhi" value={form.to}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B3DF5] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Station Code</label>
                <input type="text" name="toCode" placeholder="e.g. NDLS" value={form.toCode}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B3DF5] transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar size={14} className="inline mr-1 text-[#5B3DF5]" /> Journey Date
                </label>
                <input type="date" name="journeyDate" value={form.journeyDate} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B3DF5] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Departure Time</label>
                <input type="time" name="departureTime" value={form.departureTime} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B3DF5] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Arrival Time</label>
                <input type="time" name="arrivalTime" value={form.arrivalTime} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B3DF5] transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Class</label>
                <select name="trainClass" value={form.trainClass} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B3DF5] transition-all bg-white">
                  <option value="">Select Class</option>
                  {trainClasses.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Coach</label>
                <input type="text" name="coach" placeholder="e.g. B2" value={form.coach} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B3DF5] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Berth No.</label>
                <input type="text" name="berth" placeholder="e.g. 32" value={form.berth} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B3DF5] transition-all" />
              </div>
            </div>

            <button onClick={handleNext}
              disabled={!form.pnr || !form.trainName || !form.from || !form.to || loading}
              className="w-full bg-[#5B3DF5] hover:bg-[#4930d4] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : <>Next — Passenger Info <ArrowRight size={18} /></>}
            </button>
          </motion.div>
        )}

        {/* Step 2 — Passenger Info (unchanged) */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-5">Passenger Information</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-5">
              <p className="text-sm text-yellow-800 flex items-center gap-2">
                <Info size={16} /> Passenger name must match exactly with your IRCTC ticket.
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
              <select name="gender" value={(form as any).gender || ""} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B3DF5] transition-all bg-white">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Passenger Name</label>
                <input type="text" name="passengerName" placeholder="As on ticket" value={form.passengerName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B3DF5] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                <input type="number" name="passengerAge" placeholder="e.g. 28" value={form.passengerAge}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B3DF5] transition-all" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Seat Type</label>
              <div className="flex flex-wrap gap-2">
                {seatTypes.map((type) => (
                  <button key={type} onClick={() => setForm({ ...form, seatType: type })}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      form.seatType === type ? "bg-[#5B3DF5] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}>{type}</button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Ticket PDF / Screenshot</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#5B3DF5] transition-all cursor-pointer">
                <Upload size={32} className="text-[#5B3DF5] mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700">Drag & drop or click to upload</p>
                <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG — Max 5MB</p>
                <div className="flex items-center justify-center gap-3 mt-3 text-xs text-gray-400">
                  <ShieldCheck size={12} className="text-green-500" /> Encrypted & stored securely on AWS S3
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-4 rounded-xl hover:border-[#5B3DF5] transition-all">
                Back
              </button>
              <button onClick={handleNext} disabled={!form.passengerName || loading}
                className="flex-1 bg-[#5B3DF5] hover:bg-[#4930d4] disabled:opacity-50 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg">
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <>Next — Set Price <ArrowRight size={18} /></>}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3 — Set Price (unchanged) */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
              <IndianRupee size={20} className="text-[#5B3DF5]" /> Set Your Price
            </h2>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Listing Price (₹)</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-gray-500 font-semibold">₹</span>
                <input type="number" name="price" placeholder="Enter amount" value={form.price} onChange={handleChange}
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B3DF5] transition-all text-lg font-bold" />
              </div>
              <p className="text-xs text-gray-400 mt-2">You cannot list above the original IRCTC ticket price.</p>
            </div>
            {form.price && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-700 mb-3 text-sm">Price Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Listing Price</span>
                    <span className="font-semibold">₹{parseInt(form.price).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Platform Fee (5%)</span>
                    <span className="font-semibold text-red-500">- ₹{Math.round(parseInt(form.price) * 0.05).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between">
                    <span className="font-bold text-gray-900">You will receive</span>
                    <span className="font-bold text-green-600 text-lg">₹{Math.round(parseInt(form.price) * 0.95).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </motion.div>
            )}
            <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-xl p-4 mb-6">
              <p className="text-sm text-[#4338CA] font-semibold mb-2">Before you submit:</p>
              <ul className="space-y-1 text-xs text-[#5B3DF5]">
                {["Ticket will be verified by our team within 15 minutes",
                  "You will receive payment after the journey is completed",
                  "Do not cancel the ticket after listing it here",
                  "Fake listings will result in permanent account ban"].map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <CheckCircle size={12} className="mt-0.5 flex-shrink-0" /> {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-4 rounded-xl hover:border-[#5B3DF5] transition-all">
                Back
              </button>
              <button onClick={handleSubmit} disabled={!form.price || loading}
                className="flex-1 bg-[#5B3DF5] hover:bg-[#4930d4] disabled:opacity-50 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg">
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <>Submit Listing <ArrowRight size={18} /></>}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4 — Success (unchanged) */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: 2, duration: 0.5 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
              Listing Submitted!
            </h2>
            <p className="text-gray-500 mb-6">
              Your ticket has been submitted for review. We will verify it within 15 minutes and make it live!
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Train</span>
                <span className="font-semibold">{form.trainName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Route</span>
                <span className="font-semibold">{form.fromCode} → {form.toCode}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="font-semibold">{form.journeyDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Price</span>
                <span className="font-bold text-[#5B3DF5]">₹{parseInt(form.price).toLocaleString("en-IN")}</span>
              </div>
            </div>
                         <div className="flex gap-3">
  <button onClick={() => window.location.href = "/"}
    className="flex-1 bg-[#5B3DF5] text-white font-semibold py-3 rounded-xl hover:bg-[#4930d4] transition-all flex items-center justify-center gap-2">
    <ArrowRight size={18} /> Continue to Home
  </button>
  <button onClick={() => {
    setStep(1);
    setPnrVerified(null);
    setPnrError("");
    setForm({ pnr: "", trainNumber: "", trainName: "", from: "", fromCode: "", to: "", toCode: "",
      journeyDate: "", departureTime: "", arrivalTime: "", trainClass: "", coach: "", berth: "",
      seatType: "", passengerName: "", passengerAge: "", price: "" });
  }} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:border-[#5B3DF5] transition-all">
    List Another Ticket
  </button>
</div>
          </motion.div>
        )}

      </div>
    </div>
  );
}