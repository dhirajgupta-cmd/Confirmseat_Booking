"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/lib/authContext";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | null;
  }
}

export default function LoginPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const recaptchaInitialized = useRef(false);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  // Already logged in → redirect
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  // Init reCAPTCHA once safely
  useEffect(() => {
    if (recaptchaInitialized.current) return;
    recaptchaInitialized.current = true;
    window.recaptchaVerifier = null;

    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
    } catch (e) {
      console.error("reCAPTCHA init error:", e);
    }

    return () => {
      try {
        window.recaptchaVerifier?.clear();
        window.recaptchaVerifier = null;
      } catch (_) {}
      recaptchaInitialized.current = false;
    };
  }, []);

  const getVerifier = (): RecaptchaVerifier => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
    }
    return window.recaptchaVerifier;
  };

  const handleSendOTP = async () => {
    if (phone.length !== 10) return;
    setLoading(true);
    setError("");

    try {
      const appVerifier = getVerifier();
      const result = await signInWithPhoneNumber(auth, `+91${phone}`, appVerifier);
      setConfirmationResult(result);
      setStep("otp");
    } catch (err) {
      console.error(err);
      try {
        window.recaptchaVerifier?.clear();
        window.recaptchaVerifier = null;
      } catch (_) {}
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6 || !confirmationResult) return;
    setLoading(true);
    setError("");

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // Check if user exists in Firestore
      const userSnap = await getDoc(doc(db, "users", user.uid));

      if (!userSnap.exists()) {
        // New user — send to register to complete profile
        router.push("/register");
      } else {
        // Existing user — go home
        router.push("/");
      }
    } catch (err: unknown) {
      console.error(err);
      const firebaseErr = err as { code?: string };
      if (firebaseErr.code === "auth/invalid-verification-code") {
        setError("Invalid OTP. Please check and try again.");
      } else if (firebaseErr.code === "auth/code-expired") {
        setError("OTP expired. Please go back and request a new one.");
      } else {
        setError("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Auth loading screen
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-[#5B3DF5]/20 border-t-[#5B3DF5] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">

      {/* Invisible reCAPTCHA — fixed so it stays in DOM */}
      <div id="recaptcha-container" style={{ position: "fixed", bottom: 0, right: 0, zIndex: -1 }} />

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
            <Image src="/logo.png" alt="ConfirmSeat" width={140} height={50}
              className="object-contain" style={{ width: "140px", height: "auto" }} />
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
              {step === "phone" ? "Welcome Back!" : "Verify OTP"}
            </h1>
            <p className="text-gray-500">
              {step === "phone"
                ? "Login to your ConfirmSeat account"
                : `OTP sent to +91 ${phone}`}
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
              <span className="text-red-500">⚠️</span>
              <p className="text-red-600 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Step 1 — Phone */}
          {step === "phone" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-3 bg-gray-50">
                    <span className="text-lg">🇮🇳</span>
                    <span className="text-sm font-semibold text-gray-700">+91</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter 10 digit number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                      setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
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
                {loading
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <> Send OTP <ArrowRight size={18} /> </>}
              </motion.button>
            </motion.div>
          )}

          {/* Step 2 — OTP */}
          {step === "otp" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Enter 6-digit OTP</label>
                <input
                  type="tel"
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleVerifyOTP()}
                  className="w-full border border-gray-200 rounded-xl px-4 py-4 text-center text-2xl font-bold tracking-widest focus:outline-none focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/10 transition-all"
                />
                <button
                  onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
                  className="text-sm text-[#5B3DF5] hover:underline mt-2 block"
                >
                  ← Change number
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6 || loading}
                className="w-full bg-[#5B3DF5] hover:bg-[#4930d4] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <> Verify & Login <ArrowRight size={18} /> </>}
              </motion.button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Did not receive OTP?{" "}
                <button onClick={handleSendOTP} disabled={loading}
                  className="text-[#5B3DF5] font-semibold hover:underline disabled:opacity-50">
                  Resend OTP
                </button>
              </p>
            </motion.div>
          )}

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-600">
            New to ConfirmSeat?{" "}
            <Link href="/register" className="text-[#5B3DF5] font-semibold hover:underline">
              Create Account
            </Link>
          </p>

          <div className="flex items-center justify-center gap-2 mt-8 text-xs text-gray-400">
            <ShieldCheck size={14} className="text-green-500" />
            Your data is 100% secure and encrypted
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE — Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#5B3DF5] to-[#7C4DFF] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-32 translate-y-32" />

        <div className="relative z-10 text-center text-white">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}
            className="text-8xl mb-8">🚄</motion.div>

          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            Your Seat. Confirmed.
          </h2>
          <p className="text-purple-200 text-lg mb-10 max-w-sm mx-auto">
            Join 50,000+ travelers who trust ConfirmSeat for safe and secure train ticket exchange.
          </p>

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

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["Escrow Protected", "KYC Verified", "Instant Delivery"].map((badge) => (
              <div key={badge} className="flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-2 rounded-full">
                <ShieldCheck size={12} /> {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
