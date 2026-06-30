"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Find Ticket", href: "/search" },
  { label: "Transfer Booking", href: "/sell" },
  { label: "Support", href: "/support" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
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

  const firstName = profile?.name?.split(" ")[0] || "User";

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md border-b border-gray-100"
          : "bg-white md:bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-1 sm:gap-2">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo.png"
              alt="ConfirmSeat"
              width={160}
              height={60}
              priority
              className="object-contain w-[80px] xs:w-[95px] sm:w-[120px] md:w-[160px] h-auto"
            />
          </Link>

          {/* Nav Links — visible on ALL screen sizes */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-4 md:gap-8 overflow-x-auto scrollbar-hide min-w-0">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-700 hover:text-[#5B3DF5] text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide transition-colors duration-200 relative group whitespace-nowrap flex-shrink-0"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5B3DF5] group-hover:w-full transition-all duration-200 rounded-full hidden md:block" />
              </Link>
            ))}
          </div>

          {/* Auth — visible on ALL screen sizes */}
          <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-3 flex-shrink-0">
            {loading ? (
              <div className="w-16 sm:w-24 h-7 sm:h-9 bg-gray-100 rounded-xl animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 sm:gap-2 bg-[#5B3DF5]/8 hover:bg-[#5B3DF5]/15 border border-[#5B3DF5]/20 text-[#5B3DF5] font-semibold text-[9px] xs:text-[10px] sm:text-sm px-1.5 xs:px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-200 whitespace-nowrap"
                >
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-[#5B3DF5] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[8px] sm:text-xs font-bold">
                      {firstName[0]?.toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden xs:inline">{firstName}</span>
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 hidden sm:block ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-11 sm:top-12 w-48 sm:w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
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
                        <User size={15} /> My Profile
                      </Link>
                      <Link
                        href="/my-transfers"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                      >
                        🎫 My Transfers
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-medium transition-colors"
                      >
                        <LogOut size={15} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-[#5B3DF5] text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide transition-colors px-1 xs:px-1.5 sm:px-3 py-2 whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-[#5B3DF5] hover:bg-[#4930d4] text-white text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-semibold px-2 xs:px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-200 shadow-md hover:shadow-lg tracking-wide whitespace-nowrap"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
