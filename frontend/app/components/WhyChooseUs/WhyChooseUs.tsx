"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  UserCheck,
  AlertTriangle,
  Lock,
  HeadphonesIcon,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Escrow Protection",
    description:
      "Your money is held safely in escrow until the ticket is delivered and journey is complete. Zero risk.",
    color: "text-[#5B3DF5]",
    bg: "bg-[#EEF2FF]",
    border: "border-[#C7D2FE]",
  },
  {
    icon: UserCheck,
    title: "Verified Users Only",
    description:
      "Every seller goes through KYC verification. Bronze, Silver and Gold trust levels ensure safety.",
    color: "text-[#22C55E]",
    bg: "bg-[#F0FDF4]",
    border: "border-[#BBF7D0]",
  },
  {
    icon: Zap,
    title: "Instant Ticket Delivery",
    description:
      "Once payment is confirmed, ticket is automatically delivered to buyer within 2-5 minutes.",
    color: "text-[#7C4DFF]",
    bg: "bg-[#F3F0FF]",
    border: "border-[#DDD6FE]",
  },
  {
    icon: AlertTriangle,
    title: "Fraud Detection",
    description:
      "Our AI-powered fraud engine detects fake tickets, duplicate listings and suspicious activity in real time.",
    color: "text-[#F59E0B]",
    bg: "bg-[#FFFBEB]",
    border: "border-[#FDE68A]",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description:
      "Powered by Razorpay. UPI, Cards, Net Banking all supported. 100% encrypted transactions.",
    color: "text-[#0EA5E9]",
    bg: "bg-[#F0F9FF]",
    border: "border-[#BAE6FD]",
  },
  {
    icon: HeadphonesIcon,
    title: "24x7 Support",
    description:
      "Our team is available round the clock to resolve disputes, answer queries and ensure smooth experience.",
    color: "text-[#EC4899]",
    bg: "bg-[#FDF2F8]",
    border: "border-[#FBCFE8]",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-[#5B3DF5] uppercase tracking-widest mb-3">
            Why Us
          </p>
          <h2
            className="text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Everything You Need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B3DF5] to-[#7C4DFF]">
              Trust Us
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            We have built every feature with trust, safety and speed in mind.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`bg-white border ${feature.border} rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={26} className={feature.color} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-[#5B3DF5] to-[#7C4DFF] rounded-3xl p-8 text-center text-white"
        >
          <h3
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            India's Most Trusted Train Ticket Marketplace
          </h3>
          <p className="text-purple-200 mb-6">
            Join 50,000+ travelers who trust ConfirmSeat every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#5B3DF5] font-semibold px-8 py-3 rounded-xl hover:bg-purple-50 transition-all duration-200 shadow-lg">
              Find Tickets Now
            </button>
            <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white hover:text-[#5B3DF5] transition-all duration-200">
              Sell My Ticket
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}