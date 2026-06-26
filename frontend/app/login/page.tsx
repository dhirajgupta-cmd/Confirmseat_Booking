"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Train } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (phone.length !== 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE — Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-10">
            <Image
              src="/logo.png"
              alt="ConfirmSeat"
              width={140}
              height={50}
              className="object-contain"
              style={{ width: "140px", height: "auto" }}
            />
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <h1
              className="text-3xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {step === "phone" ? "Welcome Back!" : "Verify OTP"}
            </h1>
            <p className="text-gray-500">
              {step === "phone"
                ? "Login to your ConfirmSeat account"
                : `OTP sent to +91 ${phone}`}
            </p>
          </div>

          {/* Step 1 — Phone */}
          {step === "phone" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-3 bg-gray-50">
                    <span className="text-lg">🇮🇳</span>
                    <span className="text-sm font-semibold text-gray-700">+91</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter 10 digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/10 transition-all"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleSendOTP}
                disabled={phone.length !== 10 || loading}
                className="w-full bg-[#5B3DF5] hover:bg-[#4930d4] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send OTP
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* Step 2 — OTP */}
          {step === "otp" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter 6-digit OTP
                </label>
                <input
                  type="tel"
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-4 text-center text-2xl font-bold tracking-widest focus:outline-none focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/10 transition-all"
                />
                <button
                  onClick={() => setStep("phone")}
                  className="text-sm text-[#5B3DF5] hover:underline mt-2 block"
                >
                  Change number?
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6 || loading}
                className="w-full bg-[#5B3DF5] hover:bg-[#4930d4] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Verify & Login
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>

              {/* Resend */}
              <p className="text-center text-sm text-gray-500 mt-4">
                Did not receive OTP?{" "}
                <button className="text-[#5B3DF5] font-semibold hover:underline">
                  Resend OTP
                </button>
              </p>
            </motion.div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600">
            New to ConfirmSeat?{" "}
            <Link href="/register" className="text-[#5B3DF5] font-semibold hover:underline">
              Create Account
            </Link>
          </p>

          {/* Trust */}
          <div className="flex items-center justify-center gap-2 mt-8 text-xs text-gray-400">
            <ShieldCheck size={14} className="text-green-500" />
            Your data is 100% secure and encrypted
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE — Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#5B3DF5] to-[#7C4DFF] items-center justify-center p-12 relative overflow-hidden">

        {/* Background circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-32 translate-y-32" />

        <div className="relative z-10 text-center text-white">
          {/* Train Icon */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-8xl mb-8"
          >
            🚄
          </motion.div>

          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Your Seat. Confirmed.
          </h2>
          <p className="text-purple-200 text-lg mb-10 max-w-sm mx-auto">
            Join 50,000+ travelers who trust ConfirmSeat for safe and secure train ticket exchange.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: "50K+", label: "Happy Users" },
              { value: "10K+", label: "Tickets Sold" },
              { value: "4.9★", label: "User Rating" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-2xl p-4 border border-white/20">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-purple-200 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["Escrow Protected", "KYC Verified", "Instant Delivery"].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-2 rounded-full"
              >
                <ShieldCheck size={12} />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}