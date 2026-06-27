"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Train } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Buy Ticket", href: "/search" },
  { label: "Sell Ticket", href: "/sell" },
  { label: "Support", href: "/support" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-md border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-5">
             <Image
  src="/logo.png"
  alt="ConfirmSeat"
  width={160}
  height={70}
  className="object-contain"
  style={{ width: "200px", height: "100px" }}
/>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:text-[#5B3DF5] text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            
            <Link
           href="/login"
           className="text-gray-700 hover:text-[#5B3DF5] text-sm font-medium transition-colors"
           >
           Login
             </Link>
              <Link
                href="/register"
                  className="bg-[#5B3DF5] hover:bg-[#4930d4] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                      >
               Get Started
                   </Link>
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
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-gray-100 px-4 py-4 shadow-lg"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-3 text-gray-700 hover:text-[#5B3DF5] font-medium border-b border-gray-50"
              onClick={() => setIsMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-4">
            <Link
              href="/login"
              className="flex-1 text-center border border-[#5B3DF5] text-[#5B3DF5] py-2.5 rounded-xl font-medium"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="flex-1 text-center bg-[#5B3DF5] text-white py-2.5 rounded-xl font-medium"
            >
              Sign Up
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}