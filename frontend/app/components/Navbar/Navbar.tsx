"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Buy Ticket", href: "/search" },
  { label: "Sell Ticket", href: "/sell" },
  { label: "Support", href: "/support" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, profile, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    router.push("/");
  };

  // First name only for display
  const firstName = profile?.name?.split(" ")[0] || "User";

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="ConfirmSeat"
              width={160}
              height={60}
              className="object-contain"
              style={{ width: "160px", height: "auto" }}
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-700 hover:text-[#5B3DF5] text-sm font-semibold tracking-wide transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5B3DF5] group-hover:w-full transition-all duration-200 rounded-full" />
              </Link>
            ))}
          </div>

          {/* Desktop — Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              // Skeleton loader
              <div className="w-24 h-9 bg-gray-100 rounded-xl animate-pulse" />
            ) : user ? (
              // ── Logged In ──
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-[#5B3DF5]/8 hover:bg-[#5B3DF5]/15 border border-[#5B3DF5]/20 text-[#5B3DF5] font-semibold text-sm px-4 py-2.5 rounded-xl transition-all duration-200"
                >
                  <div className="w-6 h-6 bg-[#5B3DF5] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {firstName[0].toUpperCase()}
                    </span>
                  </div>
                  {firstName}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-gray-50">
                        <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {profile?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {profile?.phone || user.phoneNumber}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                      >
                        <User size={15} />
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-medium transition-colors"
                      >
                        <LogOut size={15} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // ── Logged Out ──
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-[#5B3DF5] text-sm font-semibold tracking-wide transition-colors px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-[#5B3DF5] hover:bg-[#4930d4] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg tracking-wide"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-t border-gray-100 px-4 py-4 shadow-lg"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-3 text-gray-700 hover:text-[#5B3DF5] text-sm font-semibold tracking-wide border-b border-gray-50 transition-colors"
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4">
              {user ? (
                // Mobile — Logged In
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-1 py-2">
                    <div className="w-8 h-8 bg-[#5B3DF5] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {firstName[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{profile?.name}</p>
                      <p className="text-xs text-gray-400">{profile?.phone || user.phoneNumber}</p>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-2 w-full text-center border border-[#5B3DF5] text-[#5B3DF5] py-2.5 rounded-xl font-semibold text-sm"
                  >
                    <User size={15} className="ml-4" />
                    My Profile
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setIsMobileOpen(false); }}
                    className="w-full text-center border border-red-200 text-red-500 py-2.5 rounded-xl font-semibold text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                // Mobile — Logged Out
                <div className="flex gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex-1 text-center border border-[#5B3DF5] text-[#5B3DF5] py-2.5 rounded-xl font-semibold text-sm"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex-1 text-center bg-[#5B3DF5] text-white py-2.5 rounded-xl font-semibold text-sm"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
