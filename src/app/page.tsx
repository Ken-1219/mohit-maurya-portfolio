"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Menu,
  X,
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  Calendar,
  Code,
  Briefcase,
  GraduationCap,
  Zap,
  Database,
  Globe,
  Server,
  Users,
  Award,
  ArrowRight,
  Download,
} from "lucide-react";
import ScrollToTop from "../components/ScrollToTop";
import TypewriterEffect from "../components/TypewriterEffect";
import ProjectCard from "../components/ProjectCard";
import StatsCounter from "../components/StatsCounter";

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
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "experience",
        "projects",
        "education",
        "skills",
        "contact",
      ];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              MM
            </motion.div>

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
                  className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                    activeSection === item.id
                      ? "text-blue-600 dark:text-blue-400"
                      : ""
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
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
              className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="px-4 py-2 space-y-2">
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
                    className="block w-full text-left px-3 py-2 text-base font-medium hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {item.label}
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
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-xl">
              MM
            </div>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Mohit Maurya
            </span>
          </motion.h1>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto h-16 flex items-center justify-center"
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

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </motion.button>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            className="flex justify-center space-x-6"
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
              { icon: Phone, href: "tel:+918882825731", label: "Phone" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.2, y: -2 }}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                I&apos;m a passionate Full Stack Developer and Founding Engineer
                at ContraVault AI, where I architected end-to-end solutions and
                improved feature accuracy from 43% to 94%. My expertise spans
                modern web technologies, cloud infrastructure, and scalable
                system design.
              </p>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                Currently pursuing B.Tech in ECE with IoT specialization from
                Netaji Subhas University of Technology. I have a strong
                foundation in both frontend and backend development, with
                extensive experience in React, Node.js, AWS, and modern
                development practices.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6">
                {[
                  { icon: MapPin, label: "New Delhi, India" },
                  { icon: Briefcase, label: "Founding Engineer" },
                  { icon: GraduationCap, label: "B.Tech ECE (IoT)" },
                  { icon: Award, label: "CGPA: 7.52" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <StatsCounter
              stats={[
                {
                  id: "experience",
                  value: 2,
                  label: "Years Experience",
                  suffix: "+",
                  color: "from-blue-600 to-blue-400",
                  duration: 2.5,
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
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                title: "Founding Engineer",
                company: "ContraVault AI",
                period: "December 2024 - Present",
                type: "Full-time",
                description: [
                  "Implemented Attribute-Based Access Control (ABAC) end-to-end, defining three unique user roles with precise access restrictions",
                  "Designed and optimized backend APIs with server-side caching and SSE streaming, enabling progressive and real-time updates",
                  "Managed AWS infrastructure including ECS for long-running APIs and autoscaling, along with Lambda, Step Functions, IAM, S3, and CloudWatch",
                  "Developed services in Python (FastAPI) and contributed to the frontend (Next.js + TypeScript)",
                  "Enhanced feature performance, improving accuracy from 43% to 94% by redesigning feature logic and optimizing implementation",
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
                ],
              },
              {
                title: "Full Stack Developer Intern",
                company: "Yirifi.ai",
                period: "June 2024 - November 2024",
                type: "Internship",
                description: [
                  "Engineered and optimized RESTful backend APIs using Express.js, integrating third-party services",
                  "Developed and deployed dynamic, responsive web interfaces with Next.js and Tailwind CSS",
                  "Maintained high code quality through peer code reviews, adherence to best practices, and implementation of automated unit tests",
                ],
                technologies: [
                  "Express.js",
                  "Next.js",
                  "Tailwind CSS",
                  "Node.js",
                  "REST APIs",
                ],
              },
            ].map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
                        {exp.company}
                      </p>
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mt-2">
                        {exp.type}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mt-4 lg:mt-0">
                      <Calendar className="w-4 h-4 mr-2" />
                      {exp.period}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {exp.description.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-gray-600 dark:text-gray-300"
                      >
                        <ArrowRight className="w-4 h-4 mt-0.5 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
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
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Education</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                degree: "B.Tech in ECE with specialization in IoT",
                institution: "Netaji Subhas University of Technology",
                period: "2021 - 2025",
                location: "New Delhi, India",
                grade: "CGPA: 7.52",
              },
              {
                degree: "Class XII",
                institution: "Govt Sarvodaya Co Ed Vidyalaya, Multan Nagar",
                period: "2021",
                location: "New Delhi, India",
                grade: "Percentage: 91.2%",
              },
              {
                degree: "Class X",
                institution: "Nathu Ram Convent Sr. Sec. School",
                period: "2019",
                location: "New Delhi, India",
                grade: "Percentage: 90.6%",
              },
            ].map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">
                      {edu.institution}
                    </p>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      {edu.location}
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0 lg:text-right">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      {edu.period}
                    </div>
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
                      {edu.grade}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                className="group bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${skillGroup.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <skillGroup.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {skillGroup.category}
                </h3>

                <div className="space-y-3">
                  {skillGroup.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skillIdx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + skillIdx * 0.05 }}
                      className="flex items-center justify-between group/skill"
                    >
                      <span className="text-gray-600 dark:text-gray-300 group-hover/skill:text-gray-900 dark:group-hover/skill:text-white transition-colors">
                        {skill}
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${skillGroup.color} opacity-0 group-hover/skill:opacity-100 transition-opacity`}
                      ></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              I&apos;m always interested in new opportunities and exciting
              projects. Let&apos;s connect and discuss how we can work together!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: Mail,
                title: "Email",
                info: "mohitmaurya78871@gmail.com",
                href: "mailto:mohitmaurya78871@gmail.com",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Phone,
                title: "Phone",
                info: "+91 888 282 5731",
                href: "tel:+918882825731",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Linkedin,
                title: "LinkedIn",
                info: "Connect with me",
                href: "https://www.linkedin.com/in/mohit-maurya-9a13a222a/",
                color: "from-blue-600 to-blue-800",
              },
              {
                icon: Github,
                title: "GitHub",
                info: "Check out my code",
                href: "https://github.com/Ken-1219",
                color: "from-gray-600 to-gray-800",
              },
            ].map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  contact.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${contact.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <contact.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {contact.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {contact.info}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to collaborate?</h3>
              <p className="mb-6 opacity-90">
                I&apos;m currently open to new opportunities and exciting
                projects.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:mohitmaurya78871@gmail.com"
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Send me a message</span>
              </motion.a>
            </div>
          </motion.div>
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
