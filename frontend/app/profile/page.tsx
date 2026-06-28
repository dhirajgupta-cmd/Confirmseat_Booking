"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  ShieldCheck,
  ShieldAlert,
  LogOut,
  Ticket,
  ShoppingBag,
  Calendar,
} from "lucide-react";
import { useAuth } from "@/lib/authContext";

export default function ProfilePage() {
  const { user, profile, loading, logout } = useAuth();
  const router = useRouter();

  // Protected — redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // Loading state
  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#5B3DF5]/20 border-t-[#5B3DF5] rounded-full animate-spin" />
          <p className="text-gray-500 text-sm font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const joinedDate = profile.createdAt
    ? new Date((profile.createdAt as { seconds: number }).seconds * 1000).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "N/A";

  const initials = profile.name
    ? profile.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto space-y-5">

        {/* ── Profile Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* Purple Header */}
          <div className="bg-gradient-to-r from-[#5B3DF5] to-[#7C4DFF] px-8 py-8">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center border-2 border-white/30">
                <span className="text-white text-3xl font-bold">{initials}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
                <p className="text-purple-200 text-sm mt-1">{profile.phone}</p>
                {/* Verified Badge */}
                <div className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  profile.isVerified
                    ? "bg-green-400/20 text-green-200"
                    : "bg-yellow-400/20 text-yellow-200"
                }`}>
                  {profile.isVerified
                    ? <><ShieldCheck size={12} /> KYC Verified</>
                    : <><ShieldAlert size={12} /> KYC Pending</>
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Info Fields */}
          <div className="px-8 py-6 space-y-5">

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-[#5B3DF5]/10 rounded-xl flex items-center justify-center">
                <User size={18} className="text-[#5B3DF5]" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Full Name</p>
                <p className="text-sm font-semibold text-gray-800">{profile.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-[#5B3DF5]/10 rounded-xl flex items-center justify-center">
                <Phone size={18} className="text-[#5B3DF5]" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Mobile Number</p>
                <p className="text-sm font-semibold text-gray-800">{profile.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-[#5B3DF5]/10 rounded-xl flex items-center justify-center">
                <Mail size={18} className="text-[#5B3DF5]" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Email Address</p>
                <p className="text-sm font-semibold text-gray-800">
                  {profile.email || (
                    <span className="text-gray-400 font-normal">Not provided</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-[#5B3DF5]/10 rounded-xl flex items-center justify-center">
                <Calendar size={18} className="text-[#5B3DF5]" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Member Since</p>
                <p className="text-sm font-semibold text-gray-800">{joinedDate}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Stats Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <Ticket size={22} className="text-[#5B3DF5]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{profile.listingsCount ?? 0}</p>
              <p className="text-xs text-gray-400 font-medium">Tickets Listed</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <ShoppingBag size={22} className="text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{profile.purchasesCount ?? 0}</p>
              <p className="text-xs text-gray-400 font-medium">Tickets Bought</p>
            </div>
          </div>
        </motion.div>

        {/* ── Actions ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-3"
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Quick Actions
          </h2>

          <button
            onClick={() => router.push("/sell")}
            className="w-full flex items-center gap-3 p-4 rounded-2xl border border-[#5B3DF5]/20 hover:bg-[#5B3DF5]/5 transition-all group"
          >
            <div className="w-10 h-10 bg-[#5B3DF5]/10 rounded-xl flex items-center justify-center group-hover:bg-[#5B3DF5]/20 transition-all">
              <Ticket size={18} className="text-[#5B3DF5]" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-800">List a Ticket</p>
              <p className="text-xs text-gray-400">Sell your confirmed train ticket</p>
            </div>
          </button>

          <button
            onClick={() => router.push("/search")}
            className="w-full flex items-center gap-3 p-4 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all group"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-all">
              <ShoppingBag size={18} className="text-gray-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-800">Browse Tickets</p>
              <p className="text-xs text-gray-400">Find confirmed tickets to buy</p>
            </div>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-4 rounded-2xl border border-red-100 hover:bg-red-50 transition-all group"
          >
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-all">
              <LogOut size={18} className="text-red-500" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-red-500">Logout</p>
              <p className="text-xs text-gray-400">Sign out of your account</p>
            </div>
          </button>
        </motion.div>

      </div>
    </div>
  );
}
