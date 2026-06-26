"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is ConfirmSeat safe to use?",
    answer:
      "Yes, absolutely. ConfirmSeat uses an escrow payment system — your money is never sent directly to the seller. It is held safely until the ticket is delivered and verified. All sellers are KYC verified.",
  },
  {
    question: "How quickly will I receive the ticket after payment?",
    answer:
      "Once your payment is confirmed, the ticket is automatically released to you within 2-5 minutes. You will receive it directly on your registered email and inside your ConfirmSeat account.",
  },
  {
    question: "What happens if the ticket turns out to be fake?",
    answer:
      "ConfirmSeat verifies every ticket before listing. Our fraud detection system checks PNR status in real time. If any issue is found, your full payment is refunded immediately — no questions asked.",
  },
  {
    question: "When does the seller receive payment?",
    answer:
      "The seller receives payment only after the train journey is completed. This protects buyers from any last minute cancellations or fraud. It is a win-win system for everyone.",
  },
  {
    question: "Can I sell my ticket on ConfirmSeat?",
    answer:
      "Yes! Simply register, complete KYC verification, upload your ticket details and PDF, set your price and submit for review. Once verified, your listing goes live and buyers can purchase it.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We support all major payment methods including UPI, Credit Card, Debit Card, Net Banking and Wallets — all powered by Razorpay with 100% encryption.",
  },
  {
    question: "What if my travel plans change after listing?",
    answer:
      "You can cancel your listing anytime before a buyer purchases it. Once sold, cancellation is not allowed as the buyer has already paid. Please list only genuine unused tickets.",
  },
  {
    question: "Is there any fee for using ConfirmSeat?",
    answer:
      "ConfirmSeat charges a small platform fee of 5% from the seller's payout. Buyers pay the listed price with no hidden charges. This fee helps us maintain the platform and ensure security.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-[#5B3DF5] uppercase tracking-widest mb-3">
            Got Questions?
          </p>
          <h2
            className="text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B3DF5] to-[#7C4DFF]">
              Questions
            </span>
          </h2>
          <p className="text-gray-500 text-lg">
            Everything you need to know about ConfirmSeat.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "border-[#5B3DF5] shadow-md shadow-purple-100"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Question */}
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span
                  className={`font-semibold text-base transition-colors duration-200 ${
                    openIndex === index ? "text-[#5B3DF5]" : "text-gray-900"
                  }`}
                >
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
                      ? "bg-[#5B3DF5] text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {openIndex === index ? (
                    <Minus size={16} />
                  ) : (
                    <Plus size={16} />
                  )}
                </span>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}