"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  ArrowDown,
  CreditCard,
  UserCheck,
  BadgeCheck,
} from "lucide-react";

const steps = [
  {
    icon: CreditCard,
    title: "Buyer Pays",
    subtitle: "Secure payment via Razorpay",
    color: "bg-blue-500",
  },
  {
    icon: Lock,
    title: "Escrow Holds Money",
    subtitle: "Funds locked safely until delivery",
    color: "bg-[#5B3DF5]",
  },
  {
    icon: UserCheck,
    title: "Ticket Delivered",
    subtitle: "Buyer receives ticket in 2-5 min",
    color: "bg-purple-500",
  },
  {
    icon: BadgeCheck,
    title: "Seller Gets Paid",
    subtitle: "After journey completion",
    color: "bg-[#22C55E]",
  },
];

const securityFeatures = [
  "256-bit SSL Encryption",
  "RBI Compliant Escrow",
  "Real-time Fraud Detection",
  "KYC Verified Users",
  "Instant Dispute Resolution",
  "Zero Seller Direct Payment",
];

export default function SecuritySection() {
  return (
    <section className="py-24 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-[#7C4DFF] uppercase tracking-widest mb-3">
            Bank-Grade Security
          </p>
          <h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Your Money is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B3DF5] to-[#7C4DFF]">
              Always Protected
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            We never let money go directly to the seller. Our escrow system
            ensures complete protection for every transaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Flow */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {steps.map((step, index) => (
              <div key={step.title}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-[#5B3DF5] transition-all duration-300"
                >
                  <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <step.icon size={22} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{step.title}</h4>
                    <p className="text-gray-400 text-sm">{step.subtitle}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                  </div>
                </motion.div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-2">
                    <ArrowDown size={20} className="text-gray-600" />
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Right — Shield Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {/* Shield */}
            <div className="bg-gradient-to-br from-[#5B3DF5] to-[#7C4DFF] rounded-3xl p-8 text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <ShieldCheck size={40} className="text-white" />
              </motion.div>
              <h3 className="text-white text-xl font-bold mb-2">
                Escrow Protected
              </h3>
              <p className="text-purple-200 text-sm">
                Money never leaves escrow until both parties are satisfied.
              </p>
            </div>

            {/* Security Features */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Lock size={18} className="text-[#5B3DF5]" />
                Security Features
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {securityFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-gray-400 text-sm"
                  >
                    <BadgeCheck size={14} className="text-[#22C55E] flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}