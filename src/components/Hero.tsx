"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  // Parallax effect for image
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between min-h-[60vh] md:min-h-[70vh] w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 md:py-24">
      {/* Left: Editorial Heading */}
      <div className="flex-1 flex flex-col items-start justify-center z-10">
        <motion.h1
          className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight text-foreground"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.06,
              },
            },
          }}
        >
          {"Bloom Bag: The New Muse".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.04, 0.62, 0.23, 0.98],
                delay: i * 0.06,
              }}
              style={{ display: char === " " ? "inline-block" : undefined }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-foreground max-w-xl mb-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98], delay: 1.2 }}
        >
          A new icon for the modern muse. Discover the Bloom Bag—where minimalism meets luxury in every stitch.
        </motion.p>
      </div>
      {/* Right: Parallax Image */}
      <motion.div
        className="flex-1 flex items-center justify-center relative z-0"
        style={{ y }}
      >
        <img
          src="/images/bloom-bag-hero.png"
          alt="Bloom Bag"
          className="w-85 md:w-105 h-auto rounded-3xl shadow-2xl object-cover"
          style={{ boxShadow: "0 8px 48px 0 rgba(197,160,89,0.10)" }}
        />
      </motion.div>
    </section>
  );
}
