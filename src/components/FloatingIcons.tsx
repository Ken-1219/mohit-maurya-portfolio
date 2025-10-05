"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Globe,
  Server,
  Smartphone,
  Zap,
  Cloud,
  Cpu,
  Layers,
  GitBranch,
  Terminal,
  Palette,
} from "lucide-react";

interface FloatingIcon {
  id: number;
  Icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  duration: number;
  delay: number;
  color: string;
}

const FloatingIcons = () => {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const icons = useMemo(
    () => [
      { Icon: Code, color: "text-blue-500" },
      { Icon: Database, color: "text-green-500" },
      { Icon: Globe, color: "text-purple-500" },
      { Icon: Server, color: "text-orange-500" },
      { Icon: Smartphone, color: "text-pink-500" },
      { Icon: Zap, color: "text-yellow-500" },
      { Icon: Cloud, color: "text-cyan-500" },
      { Icon: Cpu, color: "text-red-500" },
      { Icon: Layers, color: "text-indigo-500" },
      { Icon: GitBranch, color: "text-teal-500" },
      { Icon: Terminal, color: "text-gray-500" },
      { Icon: Palette, color: "text-rose-500" },
    ],
    [],
  );

  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    setMounted(true);

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const generateFloatingIcons = () => {
      const newIcons: FloatingIcon[] = icons.map((iconData, index) => ({
        id: index,
        Icon: iconData.Icon,
        x: Math.random() * (dimensions.width - 100),
        y: Math.random() * (dimensions.height - 100),
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        color: iconData.color,
      }));

      setFloatingIcons(newIcons);
    };

    generateFloatingIcons();
  }, [dimensions, icons]);

  if (!mounted || floatingIcons.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingIcons.map((icon) => (
        <motion.div
          key={icon.id}
          className={`absolute ${icon.color} opacity-20 dark:opacity-10`}
          initial={{
            x: icon.x,
            y: icon.y,
            rotate: icon.rotation,
            scale: icon.scale,
          }}
          animate={{
            x: [
              icon.x,
              icon.x + (Math.random() - 0.5) * 200,
              icon.x + (Math.random() - 0.5) * 300,
              icon.x,
            ],
            y: [
              icon.y,
              icon.y + (Math.random() - 0.5) * 200,
              icon.y + (Math.random() - 0.5) * 300,
              icon.y,
            ],
            rotate: [icon.rotation, icon.rotation + 360],
            scale: [icon.scale, icon.scale * 1.2, icon.scale * 0.8, icon.scale],
          }}
          transition={{
            duration: icon.duration,
            delay: icon.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{
            scale: icon.scale * 1.5,
            opacity: 0.8,
            transition: { duration: 0.3 },
          }}
          style={{
            pointerEvents: "auto",
          }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <icon.Icon className="w-8 h-8 sm:w-12 sm:h-12 drop-shadow-lg" />
          </motion.div>
        </motion.div>
      ))}

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30 dark:opacity-20"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: [
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
            ],
            y: [
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
            ],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 25 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Gradient orbs */}
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={`orb-${index}`}
          className="absolute rounded-full blur-3xl opacity-10 dark:opacity-5"
          style={{
            background: `linear-gradient(45deg, ${
              ["#3b82f6", "#8b5cf6", "#ef4444", "#10b981", "#f59e0b"][index]
            }, transparent)`,
            width: Math.random() * 300 + 200,
            height: Math.random() * 300 + 200,
          }}
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: [
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
            ],
            y: [
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30 + Math.random() * 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingIcons;
