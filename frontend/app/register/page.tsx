"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, User, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | null;
  }
}

export default function RegisterPage() {
  const router = useRouter();
  const recaptchaInitialized = useRef(false);

  const [step, setStep] = useState<"details" | "otp">("details");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
  });

  // Init reCAPTCHA once — safely
  useEffect(() => {
    if (recaptchaInitialized.current) return;
    recaptchaInitialized.current = true;

    window.recaptchaVerifier = null;

    const initRecaptcha = () => {
      try {
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        }
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "invisible" }
        );
      } catch (e) {
        console.error("reCAPTCHA init error:", e);
      }
    };

    initRecaptcha();

    return () => {
      try {
        window.recaptchaVerifier?.clear();
        window.recaptchaVerifier = null;
      } catch (_) {}
      recaptchaInitialized.current = false;
    };
  }, []);

  const getVerifier = (): RecaptchaVerifier => {
    // Re-create if missing or cleared
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }
    return window.recaptchaVerifier;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // ── STEP 1: Send OTP ─────────────────────────────────────────────
  const handleSendOTP = async () => {
    if (!form.name.trim() || form.phone.length !== 10) return;
    setLoading(true);
    setError("");

    try {
      const appVerifier = getVerifier();
      const result = await signInWithPhoneNumber(auth, `+91${form.phone}`, appVerifier);
      setConfirmation(result);
      setStep("otp");
    } catch (err: unknown) {
      console.error(err);
      // Reset verifier on failure
      try {
        window.recaptchaVerifier?.clear();
        window.recaptchaVerifier = null;
      } catch (_) {}
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── STEP 2: Verify OTP + Save user ───────────────────────────────
  const handleVerify = async () => {
    if (form.otp.length !== 6 || !confirmation) return;
    setLoading(true);
    setError("");

    try {
      const result = await confirmation.confirm(form.otp);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: form.name.trim(),
          email: form.email.trim() || null,
          phone: user.phoneNumber,
          createdAt: serverTimestamp(),
          role: "user",
          isVerified: false,
          listingsCount: 0,
          purchasesCount: 0,
        });
      }

      router.push("/");
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

  // ── Resend OTP ────────────────────────────────────────────────────
  const handleResendOTP = async () => {
    setError("");
    setLoading(true);
    try {
      try {
        window.recaptchaVerifier?.clear();
        window.recaptchaVerifier = null;
      } catch (_) {}

      const appVerifier = getVerifier();
      const result = await signInWithPhoneNumber(auth, `+91${form.phone}`, appVerifier);
      setConfirmation(result);
      setForm((f) => ({ ...f, otp: "" }));
    } catch (err) {
      console.error(err);
      setError("Could not resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Invisible reCAPTCHA — MUST stay in DOM always */}
      <div
        id="recaptcha-container"
        style={{ position: "fixed", bottom: 0, right: 0, zIndex: -1 }}
      />

      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#5B3DF5] to-[#7C4DFF] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-32 translate-y-32" />

        <div className="relative z-10 text-center text-white">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-8xl mb-8"
          >
            🎫
          </motion.div>

          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            Start Your Journey!
          </h2>
          <p className="text-purple-200 text-lg mb-10 max-w-sm mx-auto">
            Create your free account and start buying or selling train tickets safely.
          </p>

          <div className="space-y-4 text-left max-w-xs mx-auto">
            {[
              { step: "01", title: "Create Account", desc: "Quick registration with mobile OTP" },
              { step: "02", title: "Complete KYC", desc: "Verify your identity for trust badge" },
              { step: "03", title: "Start Trading", desc: "Buy or sell tickets securely" },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl p-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-purple-200 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
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

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
              {step === "details" ? "Create Account" : "Verify Mobile"}
            </h1>
            <p className="text-gray-500">
              {step === "details"
                ? "Join 50,000+ travelers on ConfirmSeat"
                : `OTP sent to +91 ${form.phone}`}
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-center gap-2"
            >
              ⚠️ {error}
            </motion.div>
          )}

          {/* Step 1 */}
          {step === "details" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-3 bg-gray-50">
                    <span className="text-lg">🇮🇳</span>
                    <span className="text-sm font-semibold text-gray-700">+91</span>
                  </div>
                  <div className="relative flex-1">
                    <Phone size={16} className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="10 digit number"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
                      }
                      className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/10 transition-all"
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-[#5B3DF5] hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-[#5B3DF5] hover:underline">Privacy Policy</Link>.
              </p>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleSendOTP}
                disabled={!form.name.trim() || form.phone.length !== 10 || loading}
                className="w-full bg-[#5B3DF5] hover:bg-[#4930d4] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <> Send OTP <ArrowRight size={18} /> </>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* Step 2 */}
          {step === "otp" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Enter 6-digit OTP</label>
                <input
                  type="tel"
                  name="otp"
                  placeholder="• • • • • •"
                  value={form.otp}
                  onChange={(e) =>
                    setForm({ ...form, otp: e.target.value.replace(/\D/g, "").slice(0, 6) })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-4 text-center text-2xl font-bold tracking-widest focus:outline-none focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/10 transition-all"
                />
                <button
                  onClick={() => { setStep("details"); setError(""); setForm((f) => ({ ...f, otp: "" })); }}
                  className="text-sm text-[#5B3DF5] hover:underline mt-2 block"
                >
                  ← Go back & change details
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleVerify}
                disabled={form.otp.length !== 6 || loading}
                className="w-full bg-[#5B3DF5] hover:bg-[#4930d4] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <> Create Account <ArrowRight size={18} /> </>
                )}
              </motion.button>

              <p className="text-center text-sm text-gray-500">
                Did not receive OTP?{" "}
                <button
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-[#5B3DF5] font-semibold hover:underline disabled:opacity-50"
                >
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
            Already have an account?{" "}
            <Link href="/login" className="text-[#5B3DF5] font-semibold hover:underline">Login</Link>
          </p>

          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-400">
            <ShieldCheck size={14} className="text-green-500" />
            Your data is 100% secure and encrypted
          </div>
        </motion.div>
      </div>
    </div>
  );
}
