"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, BookOpen, Star } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  grade?: string;
  description?: string;
  highlights?: string[];
  color: string;
}

interface EducationCardsProps {
  educationData: EducationItem[];
}

const EducationCards = ({ educationData }: EducationCardsProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-4xl mx-auto">
        {educationData.map((education, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              y: -8,
              scale: 1.01,
              transition: { duration: 0.3 },
            }}
            className="group relative"
          >
            {/* Main Card */}
            <div className="relative bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-500 overflow-hidden">
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${education.color} opacity-0 group-hover:opacity-8 transition-opacity duration-500 rounded-2xl`}
              />

              <div className="flex flex-col sm:flex-row items-start sm:space-x-4 lg:space-x-6 space-y-4 sm:space-y-0">
                {/* Left side - Icon and basic info */}
                <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-start space-x-4 sm:space-x-0 w-full sm:w-auto">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${education.color} p-1 shadow-lg mb-0 sm:mb-4`}
                  >
                    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-md sm:rounded-lg flex items-center justify-center">
                      {index === 0 ? (
                        <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600 dark:text-blue-400" />
                      ) : index === 1 ? (
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-600 dark:text-purple-400" />
                      ) : (
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                  </motion.div>

                  {/* Timeline connector - hide on mobile, show on larger screens */}
                  {index < 2 && (
                    <div className="hidden sm:block w-0.5 h-12 sm:h-16 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600 ml-6 mt-2"></div>
                  )}
                </div>

                {/* Right side - Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 leading-tight">
                        {education.degree}
                      </h3>
                      <p className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 mb-2">
                        {education.institution}
                      </p>
                    </div>

                    <div className="sm:text-right sm:ml-4 mb-2 sm:mb-0">
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        {education.period}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3">
                    <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                    {education.location}
                  </div>

                  {education.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                      {education.description}
                    </p>
                  )}

                  {education.highlights && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                      {education.highlights.map((highlight, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          className="flex items-center text-xs text-gray-600 dark:text-gray-300"
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${education.color} mr-2 flex-shrink-0`}
                          />
                          <span className="truncate text-xs sm:text-sm">
                            {highlight}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Decorative corner accent */}
              <div
                className={`absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${education.color} opacity-5 rounded-bl-2xl sm:rounded-bl-3xl`}
              ></div>
            </div>

            {/* Progress indicator */}
            <motion.div
              className="absolute -top-1 -left-1 w-5 h-5 sm:w-6 sm:h-6"
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: 1, rotate: 360 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                type: "spring",
                damping: 15,
              }}
            >
              <div
                className={`w-full h-full rounded-full bg-gradient-to-r ${education.color} shadow-lg flex items-center justify-center`}
              >
                <span className="text-xs font-bold text-white">
                  {index + 1}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Connecting line for education timeline - hidden on mobile */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: "80%", opacity: 0.2 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="hidden sm:block absolute left-6 top-16 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500"
        style={{ zIndex: -1 }}
      />
    </motion.div>
  );
};

export default EducationCards;
