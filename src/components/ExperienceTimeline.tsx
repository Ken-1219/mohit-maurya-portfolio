"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Briefcase,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  type: string;
  location: string;
  description: string[];
  technologies: string[];
  achievements?: string[];
}

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
}

const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Timeline Line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500 rounded-full transform md:-translate-x-1/2 opacity-30"></div>

      {/* Animated Timeline Line */}
      <motion.div
        className="absolute left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500 rounded-full transform md:-translate-x-1/2"
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      <div className="space-y-12">
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`relative flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-20">
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                whileInView={{ scale: 1, rotate: 360 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                className="relative"
              >
                {/* Outer Ring */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 shadow-lg">
                  <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                {/* Pulse Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-blue-500"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>

            {/* Experience Card */}
            <div
              className={`w-full md:w-5/12 ml-20 md:ml-0 ${
                index % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
              }`}
            >
              <motion.div
                layout
                whileHover={{ scale: 1.01, y: -4 }}
                transition={{ duration: 0.3 }}
                className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 relative overflow-hidden cursor-pointer"
                onClick={() => toggleExpanded(index)}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Collapsed Header */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full">
                            {experience.type}
                          </span>
                          {index === 0 && (
                            <span className="px-2 py-1 text-xs font-semibold bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full animate-pulse">
                              Current
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {experience.title}
                        </h3>

                        <p className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-2">
                          {experience.company}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2 text-gray-600 dark:text-gray-300 text-xs">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                            {experience.period}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                            {experience.location}
                          </div>
                        </div>
                      </div>

                      <div className="ml-4 flex-shrink-0">
                        <motion.div
                          animate={{
                            rotate: expandedIndex === index ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors"
                        >
                          <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                          {/* Description */}
                          <div className="mb-6">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm">
                              {experience.description[0]}
                            </p>

                            {/* Key Achievements */}
                            {experience.achievements && (
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                  <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                                  Key Achievements
                                </h4>
                                <ul className="space-y-2">
                                  {experience.achievements.map(
                                    (achievement, idx) => (
                                      <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start text-sm text-gray-600 dark:text-gray-300"
                                      >
                                        <ArrowRight className="w-3 h-3 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                                        {achievement}
                                      </motion.li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            )}

                            {/* Detailed Description */}
                            {experience.description.length > 1 && (
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                  Key Responsibilities
                                </h4>
                                <ul className="space-y-2">
                                  {experience.description
                                    .slice(1)
                                    .map((desc, idx) => (
                                      <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 + 0.2 }}
                                        className="flex items-start text-sm text-gray-600 dark:text-gray-300"
                                      >
                                        <ArrowRight className="w-3 h-3 mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                                        {desc}
                                      </motion.li>
                                    ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Technologies */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                              Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {experience.technologies.map((tech, techIdx) => (
                                <motion.span
                                  key={tech}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: techIdx * 0.05 }}
                                  whileHover={{ scale: 1.05 }}
                                  className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-700 dark:text-purple-300 rounded-full border border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600 transition-colors cursor-default"
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" />
              </motion.div>
            </div>

            {/* Journey Arrow (Desktop Only) */}
            {index < experiences.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.8 }}
                className="hidden md:block absolute left-1/2 transform -translate-x-1/2 mt-32"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <ArrowRight className="w-4 h-4 text-white transform rotate-90" />
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* End of Journey Marker */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: experiences.length * 0.2 + 1 }}
        className="flex justify-center mt-16"
      >
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-xl">
            <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-green-500"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <p className="text-center mt-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
            The Journey Continues...
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ExperienceTimeline;
