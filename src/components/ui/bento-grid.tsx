"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Animation variants for the container to stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Animation variants for each grid item
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

/**
 * Props for the BentoGridShowcase component.
 * Each prop represents a "slot" in the grid.
 */
interface BentoGridShowcaseProps {
  /** Slot 1: Top-left card (smaller) */
  item1: React.ReactNode;
  /** Slot 2: Top-right card (larger, spans 2 rows) */
  item2: React.ReactNode;
  /** Slot 3: Bottom-left card (smaller) */
  item3: React.ReactNode;
  /** Slot 4: Bottom card (full width) */
  item4: React.ReactNode;
  /** Optional class names for the grid container */
  className?: string;
}

/**
 * A responsive, animated bento grid layout component.
 * Creates an asymmetric layout with varied card sizes.
 */
export const BentoGridShowcase = ({
  item1,
  item2,
  item3,
  item4,
  className,
}: BentoGridShowcaseProps) => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        // Core grid layout: 1 col on mobile, 3 columns on desktop for bento effect
        "grid w-full grid-cols-1 gap-6 md:grid-cols-3",
        // Defines 3 explicit rows on medium screens and up
        "md:grid-rows-3",
        // Use minmax to ensure cards can grow but have a minimum height
        "auto-rows-[minmax(200px,auto)]",
        className
      )}
    >
      {/* Slot 1: Top-left - Small card (1 col, 1 row) */}
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
        {item1}
      </motion.div>

      {/* Slot 2: Top-right - Large card (2 cols, spans 2 rows) */}
      <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2">
        {item2}
      </motion.div>

      {/* Slot 3: Bottom-left - Small card (1 col, 1 row) */}
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
        {item3}
      </motion.div>

      {/* Slot 4: Bottom - Full width card (3 cols, 1 row) */}
      <motion.div variants={itemVariants} className="md:col-span-3 md:row-span-1">
        {item4}
      </motion.div>
    </motion.section>
  );
};