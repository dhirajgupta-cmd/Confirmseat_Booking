"use client";

import { motion } from "framer-motion";
import {
  Upload,
  CreditCard,
  Ticket,
  BadgeCheck,
  ArrowDown,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Seller Lists Ticket",
    description:
      "Seller uploads their unused confirmed train ticket with all details. Our system verifies it instantly.",
    color: "bg-[#EEF2FF] text-[#5B3DF5]",
    border: "border-[#C7D2FE]",
    tag: "For Sellers",
    tagColor: "bg-[#EEF2FF] text-[#5B3DF5]",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Buyer Pays Securely",
    description:
      "Buyer makes a secure payment. Money goes into our escrow wallet — not directly to the seller.",
    color: "bg-[#F0FDF4] text-[#22C55E]",
    border: "border-[#BBF7D0]",
    tag: "For Buyers",
    tagColor: "bg-[#F0FDF4] text-[#22C55E]",
  },
  {
    icon: Ticket,
    step: "03",
    title: "Ticket Delivered Instantly",
    description:
      "Once payment is confirmed, the ticket is automatically released to the buyer within 2-5 minutes.",
    color: "bg-[#F3F0FF] text-[#7C4DFF]",
    border: "border-[#DDD6FE]",
    tag: "Instant",
    tagColor: "bg-[#F3F0FF] text-[#7C4DFF]",
  },
  {
    icon: BadgeCheck,
    step: "04",
    title: "Seller Gets Paid",
    description:
      "After the journey is completed, the escrow releases payment to the seller. Safe for everyone.",
    color: "bg-[#FFFBEB] text-[#F59E0B]",
    border: "border-[#FDE68A]",
    tag: "After Journey",
    tagColor: "bg-[#FFFBEB] text-[#F59E0B]",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-[#F8FAFC]" id="how-it-works">
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
            Simple Process
          </p>
          <h2
            className="text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B3DF5] to-[#7C4DFF]">
              ConfirmSeat
            </span>{" "}
            Works
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            A simple, secure and transparent process for both buyers and sellers.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#5B3DF5] to-[#7C4DFF] opacity-20 hidden lg:block transform -translate-x-1/2" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.step}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex-col`}
                >
                  {/* Card */}
                  <div className="flex-1">
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      className={`bg-white rounded-2xl p-8 border ${step.border} shadow-sm hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center flex-shrink-0`}>
                          <step.icon size={26} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${step.tagColor}`}>
                              {step.tag}
                            </span>
                            <span className="text-xs text-gray-400 font-semibold">
                              Step {step.step}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-500 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5B3DF5] to-[#7C4DFF] text-white font-bold text-xl flex items-center justify-center shadow-lg flex-shrink-0 z-10"
                  >
                    {step.step}
                  </motion.div>

                  {/* Empty space for alternating layout */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center my-2"
                  >
                    <ArrowDown
                      size={24}
                      className="text-[#5B3DF5] opacity-30"
                    />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}