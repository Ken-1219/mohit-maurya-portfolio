"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Mail,
  Phone,
  Github,
  Linkedin,
  Code,
  Zap,
  Database,
  Globe,
  Server,
  Users,
  ArrowRight,
  Download,
} from "lucide-react";
import ScrollToTop from "../components/ScrollToTop";
import TypewriterEffect from "../components/TypewriterEffect";
import ProjectCard from "../components/ProjectCard";
import StatsCounter from "../components/StatsCounter";
import ExperienceTimeline from "../components/ExperienceTimeline";
import EducationCards from "../components/EducationCards";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    setMounted(true);

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = [
            "hero",
            "about",
            "experience",
            "projects",
            "education",
            "skills",
            "contact",
          ];

          // Find the section that's most visible in viewport
          let maxVisibleSection = "";
          let maxVisibleArea = 0;

          sections.forEach((section) => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              const viewportHeight = window.innerHeight;

              // Calculate visible area of this section
              const visibleTop = Math.max(0, rect.top);
              const visibleBottom = Math.min(viewportHeight, rect.bottom);
              const visibleArea = Math.max(0, visibleBottom - visibleTop);

              if (visibleArea > maxVisibleArea) {
                maxVisibleArea = visibleArea;
                maxVisibleSection = section;
              }
            }
          });

          if (maxVisibleSection && maxVisibleSection !== activeSection) {
            setActiveSection(maxVisibleSection);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      const sections = [
        "hero",
        "about",
        "experience",
        "projects",
        "education",
        "skills",
        "contact",
      ];

      const currentIndex = sections.indexOf(activeSection);

      if (e.key === "ArrowDown" && currentIndex < sections.length - 1) {
        e.preventDefault();
        scrollToSection(sections[currentIndex + 1]);
      } else if (e.key === "ArrowUp" && currentIndex > 0) {
        e.preventDefault();
        scrollToSection(sections[currentIndex - 1]);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          activeSection === "hero"
            ? "bg-transparent"
            : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: "hero", label: "Home" },
                { id: "about", label: "About" },
                { id: "experience", label: "Experience" },
                { id: "projects", label: "Projects" },
                { id: "education", label: "Education" },
                { id: "skills", label: "Skills" },
                { id: "contact", label: "Contact" },
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 relative ${
                    activeSection === "hero"
                      ? activeSection === item.id
                        ? "text-white font-semibold drop-shadow-lg"
                        : "text-white/90 hover:text-white drop-shadow-md"
                      : activeSection === item.id
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                className={`md:hidden p-3 -mr-2 touch-manipulation transition-colors duration-300 ${
                  activeSection === "hero"
                    ? "text-white hover:text-white/80 active:bg-white/10"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 active:bg-gray-100 dark:active:bg-gray-800"
                } rounded-lg`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <Menu className="w-7 h-7" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-t transition-all duration-300 ${
                activeSection === "hero"
                  ? "bg-black/80 backdrop-blur-md border-white/20"
                  : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
              }`}
            >
              <div className="px-4 py-4 space-y-1">
                {[
                  { id: "hero", label: "Home" },
                  { id: "about", label: "About" },
                  { id: "experience", label: "Experience" },
                  { id: "projects", label: "Projects" },
                  { id: "education", label: "Education" },
                  { id: "skills", label: "Skills" },
                  { id: "contact", label: "Contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 text-base font-medium transition-all duration-300 relative touch-manipulation rounded-lg ${
                      activeSection === "hero"
                        ? activeSection === item.id
                          ? "text-white font-semibold bg-white/15"
                          : "text-white/90 hover:text-white hover:bg-white/10 active:bg-white/15"
                        : activeSection === item.id
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 active:bg-gray-100 dark:active:bg-gray-800"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600 rounded-r" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-16 sm:pt-20"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-10 opacity-50">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Profile Image with Enhanced Design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative mb-8"
          >
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto">
              {/* Rotating border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 animate-spin-slow p-1">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900"></div>
              </div>

              {/* Avatar */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-2xl">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  MM
                </span>
              </div>

              {/* Status indicator */}
              {/* <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 animate-pulse"></div> */}
            </div>
          </motion.div>

          {/* Name with enhanced animation */}
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 tracking-tight px-2"
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
              initial={{ backgroundPosition: "200% center" }}
              animate={{ backgroundPosition: "-200% center" }}
              transition={{
                duration: 3,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Mohit Maurya
            </motion.span>
          </motion.h3>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto h-12 sm:h-16 flex items-center justify-center px-4"
          >
            <TypewriterEffect
              words={[
                "Full Stack Developer",
                "Founding Engineer",
                "Cloud Infrastructure Expert",
                "React & Next.js Specialist",
                "AWS Solutions Architect",
              ]}
              typeSpeed={80}
              deleteSpeed={60}
              pauseDuration={2000}
              className="font-semibold"
            />
          </motion.div>

          {/* Mission statement */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-8 sm:mb-12 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-4"
          >
            Crafting digital experiences that bridge innovation and
            functionality. Let&apos;s build something amazing together.
          </motion.p>

          {/* Enhanced CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4"
          >
            <motion.a
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all flex items-center space-x-2 sm:space-x-3 overflow-hidden w-full sm:w-auto justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Let&apos;s Connect</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgb(59, 130, 246)",
                color: "white",
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full font-semibold transition-all flex items-center space-x-2 sm:space-x-3 backdrop-blur-sm bg-white/10 hover:bg-blue-600 hover:border-blue-600 w-full sm:w-auto justify-center"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              <span>Download Resume</span>
            </motion.button>
          </motion.div>

          {/* Enhanced social links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
            className="flex justify-center space-x-4 sm:space-x-6 lg:space-x-8"
          >
            {[
              {
                icon: Github,
                href: "https://github.com/Ken-1219",
                label: "GitHub",
                color: "",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/mohit-maurya-9a13a222a/",
                label: "LinkedIn",
                color: "",
              },
              {
                icon: Mail,
                href: "mailto:mohitmaurya78871@gmail.com",
                label: "Email",
                color: "",
              },
              {
                icon: Phone,
                href: "tel:+918882825731",
                label: "Phone",
                color: "",
              },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                initial={{ opacity: 0, y: 20, rotate: -180 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.6 }}
                whileHover={{
                  scale: 1.3,
                  y: -8,
                  rotate: 5,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                }}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`group p-4 bg-gradient-to-r ${social.color} rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-800`}
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center text-gray-400 dark:text-gray-500"
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-1 h-3 bg-current rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div> */}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-4 sm:space-y-6"
            >
              <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                I&apos;m a passionate Full Stack Developer and Founding Engineer
                at ContraVault AI, where I architected end-to-end solutions and
                improved feature accuracy from 43% to 94%. My expertise spans
                modern web technologies, cloud infrastructure, and scalable
                system design.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                Currently pursuing B.Tech in ECE with IoT specialization from
                Netaji Subhas University of Technology. I have a strong
                foundation in both frontend and backend development, with
                extensive experience in React, Node.js, AWS, and modern
                development practices.
              </p>
            </motion.div>

            <StatsCounter
              stats={[
                {
                  id: "experience",
                  value: 1,
                  label: "Years Experience",
                  suffix: "+",
                  color: "from-blue-600 to-blue-400",
                  duration: 1.5,
                },
                {
                  id: "projects",
                  value: 10,
                  label: "Projects Completed",
                  suffix: "+",
                  color: "from-purple-600 to-purple-400",
                  duration: 2,
                  delay: 0.2,
                },
                {
                  id: "technologies",
                  value: 15,
                  label: "Technologies",
                  suffix: "+",
                  color: "from-indigo-600 to-indigo-400",
                  duration: 1.8,
                  delay: 0.4,
                },
                {
                  id: "accuracy",
                  value: 94,
                  label: "Feature Accuracy",
                  suffix: "%",
                  color: "from-green-600 to-green-400",
                  duration: 2.2,
                  delay: 0.6,
                },
              ]}
              className="grid grid-cols-2 gap-4 sm:gap-6 w-full mt-8 lg:mt-0"
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50"
      >
        <div className="w-full mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              My Journey
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl sm:max-w-2xl mx-auto px-4">
              From aspiring developer to founding engineer, here&apos;s my
              professional journey of growth, learning, and impact.
            </p>
          </motion.div>

          <ExperienceTimeline
            experiences={[
              {
                title: "Founding Engineer",
                company: "ContraVault AI",
                period: "December 2024 - Present",
                type: "Full-time",
                location: "Bengaluru, India (Onsite)",
                description: [
                  "Leading end-to-end development of AI-powered contract analysis platform, architecting scalable solutions that serve enterprise clients with complex legal document processing needs.",
                  "Implemented Attribute-Based Access Control (ABAC) end-to-end, defining three unique user roles with precise access restrictions",
                  "Designed and optimized backend APIs with server-side caching and SSE streaming, enabling progressive and real-time updates",
                  "Managed AWS infrastructure including ECS for long-running APIs and autoscaling, along with Lambda, Step Functions, IAM, S3, and CloudWatch",
                  "Developed services in Python (FastAPI) and contributed to the frontend (Next.js + TypeScript)",
                ],
                achievements: [
                  "Enhanced feature performance, improving accuracy from 43% to 94% by redesigning feature logic",
                  "Built credit-based free/paid access model with full integration",
                  "Established scalable AWS infrastructure supporting enterprise workloads",
                ],
                technologies: [
                  "Python",
                  "FastAPI",
                  "Next.js",
                  "TypeScript",
                  "AWS ECS",
                  "Lambda",
                  "S3",
                  "CloudWatch",
                  "Step Functions",
                ],
              },
              {
                title: "Full Stack Developer Intern",
                company: "Yirifi.ai",
                period: "June 2024 - November 2024",
                type: "Internship",
                location: "Remote",
                description: [
                  "Contributed to an AI-powered platform development, focusing on creating robust backend systems and intuitive user interfaces for machine learning applications.",
                  "Engineered and optimized RESTful backend APIs using Express.js, integrating third-party services",
                  "Developed and deployed dynamic, responsive web interfaces with Next.js and Tailwind CSS",
                  "Maintained high code quality through peer code reviews, adherence to best practices, and implementation of automated unit tests",
                ],
                achievements: [
                  "Successfully delivered multiple feature releases ahead of schedule",
                  "Improved application performance through API optimization",
                  "Mentored junior developers in best practices",
                ],
                technologies: [
                  "Express.js",
                  "Next.js",
                  "Tailwind CSS",
                  "Node.js",
                  "REST APIs",
                  "MongoDB",
                ],
              },
            ]}
          />
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <ProjectCard
              title="Anime Sphere"
              description="Full-stack platform for anime enthusiasts with features like search, favorites, trailers, and synopsis viewing. Integrated Firebase Authentication for secure user login."
              technologies={[
                "React",
                "Node.js",
                "Express.js",
                "MongoDB",
                "Firebase",
                "Redux Toolkit",
              ]}
              liveLink="https://anime-sphere-frontend.vercel.app/"
              githubLink="https://github.com/Ken-1219/anime-sphere"
              features={[
                "Firebase Authentication integration",
                "Redux Toolkit for state management",
                "Real-time search functionality",
                "Favorites and watchlist features",
              ]}
              index={0}
            />

            <ProjectCard
              title="mawesome"
              description="Fully responsive weather application with real-time data for any city, optimized for both desktop and mobile devices with glassmorphism design."
              technologies={[
                "React.js",
                "Express.js",
                "Context API",
                "Weather API",
              ]}
              liveLink="https://mawesome-web.vercel.app/"
              githubLink="https://github.com/Ken-1219/mawesome"
              features={[
                "Pin/unpin favorite cities",
                "Dynamic weather-based backgrounds",
                "Glassmorphism interface design",
                "Mobile-responsive layout",
              ]}
              index={1}
            />
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Education
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl sm:max-w-2xl mx-auto px-4">
              My academic journey has been focused on building a strong
              foundation in technology and engineering principles.
            </p>
          </motion.div>

          <EducationCards
            educationData={[
              {
                degree: "B.Tech in ECE with IoT Specialization",
                institution: "Netaji Subhas University of Technology",
                period: "2021 - 2025",
                location: "New Delhi, India",
                description:
                  "Comprehensive program combining Electronics & Communication Engineering with Internet of Things specialization, covering embedded systems, wireless communication, and smart device development.",
                highlights: [
                  "IoT Systems Design & Implementation",
                  "Embedded Systems Programming",
                  "Wireless Communication Protocols",
                  "Circuit Design & Analysis",
                ],
                color: "from-blue-500 to-cyan-500",
              },
              {
                degree: "Senior Secondary (XII)",
                institution: "Govt Sarvodaya Co Ed Vidyalaya",
                period: "2021",
                location: "New Delhi, India",
                description:
                  "Completed senior secondary education with focus on Physics, Chemistry, and Mathematics, building strong analytical and problem-solving foundation.",
                highlights: [
                  "Science Stream (PCM)",
                  "Strong Mathematical Foundation",
                  "Physics & Chemistry Excellence",
                  "Analytical Thinking Development",
                ],
                color: "from-purple-500 to-pink-500",
              },
              {
                degree: "Secondary (X)",
                institution: "Nathu Ram Convent Sr. Sec. School",
                period: "2019",
                location: "New Delhi, India",
                description:
                  "Completed secondary education with excellent academic performance, establishing fundamental knowledge across all subjects.",
                highlights: [
                  "All Subjects Excellence",
                  "Strong Academic Foundation",
                  "Consistent Performance",
                  "Holistic Development Focus",
                ],
                color: "from-indigo-500 to-purple-500",
              },
            ]}
          />
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl sm:max-w-2xl mx-auto px-4">
              A comprehensive overview of my technical expertise and the tools I
              use to build amazing digital experiences.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {[
              {
                category: "Programming",
                icon: Code,
                skills: ["C++", "Python", "TypeScript", "JavaScript (ES6+)"],
                color: "from-blue-500 to-cyan-500",
              },
              {
                category: "Frontend",
                icon: Globe,
                skills: [
                  "React.js",
                  "Next.js",
                  "Astro.js",
                  "Tailwind CSS",
                  "Socket.IO",
                ],
                color: "from-purple-500 to-pink-500",
              },
              {
                category: "Backend",
                icon: Server,
                skills: [
                  "Node.js",
                  "Express.js",
                  "REST APIs",
                  "FastAPI",
                  "Flask",
                ],
                color: "from-green-500 to-emerald-500",
              },
              {
                category: "Databases",
                icon: Database,
                skills: ["AWS DynamoDB", "PostgreSQL", "MySQL", "MongoDB"],
                color: "from-orange-500 to-red-500",
              },
              {
                category: "Cloud/DevOps",
                icon: Zap,
                skills: [
                  "AWS (ECS, Lambda, S3)",
                  "Step Functions",
                  "CloudWatch",
                  "Docker",
                ],
                color: "from-indigo-500 to-purple-500",
              },
              {
                category: "Soft Skills",
                icon: Users,
                skills: [
                  "Communication",
                  "Team Management",
                  "Leadership",
                  "Problem Solving",
                ],
                color: "from-pink-500 to-rose-500",
              },
            ].map((skillGroup, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-transparent"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skillGroup.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r ${skillGroup.color} flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform shadow-lg`}
                    >
                      <skillGroup.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {skillGroup.category}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                    {skillGroup.skills.map((skill, skillIdx) => (
                      <motion.div
                        key={skillIdx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 + skillIdx * 0.03 }}
                        whileHover={{ x: 4, scale: 1.02 }}
                        className="flex items-center group/skill cursor-default"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${skillGroup.color} mr-3 flex-shrink-0 group-hover/skill:scale-150 transition-transform`}
                        />
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 group-hover/skill:text-gray-900 dark:group-hover/skill:text-white transition-colors font-medium">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50"
      >
        <div className="max-w-6xl mx-auto w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl sm:max-w-2xl mx-auto px-4">
              Interested in collaborating or have questions about my work?
              I&apos;d be happy to discuss your project requirements.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Send Message
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
                  Please fill out the form below and I will respond within 24
                  hours.
                </p>

                <form className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                      placeholder="Brief project description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical text-sm sm:text-base min-h-[100px] sm:min-h-[120px]"
                      placeholder="Please provide details about your project requirements, timeline, and budget..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 px-6 rounded-md font-medium transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Direct Contact */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Email
                      </p>
                      <a
                        href="mailto:mohitmaurya78871@gmail.com"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        mohitmaurya78871@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Phone
                      </p>
                      <a
                        href="tel:+918882825731"
                        className="text-green-600 dark:text-green-400 hover:underline"
                      >
                        +91 888 282 5731
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Networks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                  Professional Networks
                </h3>

                <div className="space-y-4">
                  <a
                    href="https://www.linkedin.com/in/mohit-maurya-9a13a222a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        LinkedIn
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Professional profile
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://github.com/Ken-1219"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        GitHub
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Code portfolio
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Availability Status */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Available for New Projects
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Currently accepting new client projects and collaborations.
                  Typical response time: 24-48 hours.
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p>
                    <strong>Response Time:</strong> Within 24 hours
                  </p>
                  <p>
                    <strong>Time Zone:</strong> IST (UTC+5:30)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0"
            >
              © 2024 Mohit Maurya. All rights reserved.
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex space-x-6"
            >
              {[
                {
                  icon: Github,
                  href: "https://github.com/Ken-1219",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/mohit-maurya-9a13a222a/",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:mohitmaurya78871@gmail.com",
                  label: "Email",
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
