'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add cursor tracking
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference transition-opacity duration-300 ${
          isHovering || isClicking ? 'opacity-80' : 'opacity-100'
        }`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-full h-full bg-white rounded-full"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.8 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 400,
          }}
        />
      </motion.div>

      {/* Cursor Trail */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-40 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          x: cursorXSpring.get() - 8,
          y: cursorYSpring.get() - 8,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 200,
        }}
      >
        <motion.div
          className="w-full h-full border-2 border-white rounded-full"
          animate={{
            scale: isClicking ? 0.6 : isHovering ? 2 : 1,
            opacity: isHovering ? 0.6 : 0.4,
          }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 300,
          }}
        />
      </motion.div>

      {/* Click Ripple Effect */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-30"
          style={{
            x: cursorXSpring.get() - 16,
            y: cursorYSpring.get() - 16,
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="w-full h-full border border-blue-500 dark:border-blue-400 rounded-full mix-blend-difference" />
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;
