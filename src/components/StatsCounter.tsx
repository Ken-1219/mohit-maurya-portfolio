"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";

interface StatItem {
  id: string;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  color?: string;
}

interface StatsCounterProps {
  stats: StatItem[];
  className?: string;
}

const AnimatedCounter = ({
  value,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const displayed = useTransform(springValue, (latest) => {
    if (value % 1 === 0) {
      // Integer values
      return Math.round(latest).toLocaleString();
    } else {
      // Decimal values
      return latest.toFixed(1);
    }
  });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [motionValue, value, isInView, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{displayed}</motion.span>
      {suffix}
    </span>
  );
};

const StatsCounter = ({ stats, className = "" }: StatsCounterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`grid grid-cols-2 gap-6 max-w-2xl mx-auto ${className}`}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id}
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          className="relative group"
        >
          {/* Background Glow */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
              stat.color || "from-blue-500/10 to-purple-500/10"
            } blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          />

          {/* Main Card */}
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl min-h-[180px] flex flex-col justify-center">
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

            {/* Counter */}
            <motion.div
              className={`text-4xl xl:text-5xl font-bold mb-3 bg-gradient-to-r ${
                stat.color || "from-blue-600 to-purple-600"
              } bg-clip-text text-transparent relative z-10`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={
                isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }
              }
              transition={{
                delay: index * 0.1 + 0.3,
                duration: 0.6,
                type: "spring",
                damping: 15,
                stiffness: 400,
              }}
            >
              <AnimatedCounter
                value={stat.value}
                duration={stat.duration || 2}
                delay={stat.delay || index * 0.2}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </motion.div>

            {/* Label */}
            <motion.p
              className="text-sm font-semibold text-gray-600 dark:text-gray-300 relative z-10 uppercase tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                delay: index * 0.1 + 0.5,
                duration: 0.4,
              }}
            >
              {stat.label}
            </motion.p>

            {/* Floating Particles */}
            {Array.from({ length: 3 }).map((_, particleIndex) => (
              <motion.div
                key={particleIndex}
                className={`absolute w-1 h-1 rounded-full ${
                  stat.color?.includes("blue")
                    ? "bg-blue-400"
                    : stat.color?.includes("purple")
                      ? "bg-purple-400"
                      : stat.color?.includes("green")
                        ? "bg-green-400"
                        : "bg-blue-400"
                } opacity-0 group-hover:opacity-60`}
                style={{
                  left: `${20 + particleIndex * 30}%`,
                  top: `${10 + particleIndex * 20}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 2 + particleIndex * 0.5,
                  repeat: Infinity,
                  delay: particleIndex * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Pulse Effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0"
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsCounter;
