"use client";

import { motion } from "framer-motion";
import { ArrowRight, Ticket, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 px-4 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#5B3DF5] via-[#6B4AF5] to-[#7C4DFF] rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/* Background Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-32 translate-y-32" />

          {/* Content */}
          <div className="relative z-10">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-white/20"
            >
              <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
              10,000+ Tickets Sold Successfully
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Ready to Buy or Sell
              <br />
              Your Train Ticket?
            </motion.h2>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-purple-200 text-lg mb-10 max-w-xl mx-auto"
            >
              Join 50,000+ travelers who trust ConfirmSeat for safe, fast and
              reliable train ticket exchange.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/search"
                className="flex items-center justify-center gap-2 bg-white text-[#5B3DF5] font-semibold px-8 py-4 rounded-2xl hover:bg-purple-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Ticket size={20} />
                Find Tickets Now
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/sell"
                className="flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
              >
                <TrendingUp size={20} />
                Start Selling
              </Link>
            </motion.div>

            {/* Trust Row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 mt-10 text-purple-200 text-sm"
            >
              <span>✓ No hidden charges</span>
              <span>✓ 100% Escrow Protected</span>
              <span>✓ Instant Ticket Delivery</span>
              <span>✓ KYC Verified Sellers</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}