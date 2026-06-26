"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Send,
  Globe,
  Rss,
  Share2,
} from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Dispute Resolution", href: "/disputes" },
    { label: "Report Fraud", href: "/report" },
    { label: "Track Order", href: "/track" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "KYC Policy", href: "/kyc" },
  ],
};

const socialLinks = [
  { icon: Send, href: "#", label: "Twitter" },
  { icon: Rss, href: "#", label: "Instagram" },
  { icon: Globe, href: "#", label: "LinkedIn" },
  { icon: Share2, href: "#", label: "Facebook" },
];

const trustBadges = [
  "Razorpay Secured",
  "256-bit SSL",
  "RBI Compliant",
  "KYC Verified",
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="ConfirmSeat"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="text-white font-bold text-xl">ConfirmSeat</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              India's most trusted marketplace to buy and sell unused confirmed
              train tickets. Safe, fast and transparent.
            </p>

            {/* Contact */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Mail size={14} className="text-[#5B3DF5]" />
                <span>support@confirmseat.in</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={14} className="text-[#5B3DF5]" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={14} className="text-[#5B3DF5]" />
                <span>Bhopal, Madhya Pradesh, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 bg-gray-800 hover:bg-[#5B3DF5] rounded-xl flex items-center justify-center transition-all duration-200 group"
                  aria-label={social.label}
                >
                  <social.icon size={16} className="text-gray-400 group-hover:text-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-semibold mb-1">
                Stay Updated
              </h4>
              <p className="text-gray-400 text-sm">
                Get notified about new tickets on your favorite routes.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-[#5B3DF5]"
              />
              <button className="bg-[#5B3DF5] hover:bg-[#4930d4] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © 2025 ConfirmSeat. All rights reserved. Your Seat. Confirmed.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-full"
                >
                  <ShieldCheck size={12} className="text-[#22C55E]" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}