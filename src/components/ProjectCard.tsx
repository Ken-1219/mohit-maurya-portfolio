"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Eye, ArrowRight, Zap } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  image?: string;
  features?: string[];
  index: number;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  liveLink,
  githubLink,
  image,
  features = [],
  index,
}: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.6, -0.05, 0.01, 0.99],
      }}
      className="group relative"
    >
      <motion.div
        layout
        className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 h-full flex flex-col"
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        {/* Image Section */}
        {image && (
          <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{
                scale: imageLoaded ? 1 : 1.2,
                opacity: imageLoaded ? 1 : 0,
              }}
              transition={{ duration: 0.6 }}
              className="w-full h-full"
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                onLoad={() => setImageLoaded(true)}
              />
            </motion.div>

            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Action Buttons */}
            <motion.div
              className="absolute top-4 right-4 flex space-x-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isExpanded ? 1 : 0,
                scale: isExpanded ? 1 : 0.8,
              }}
              transition={{ duration: 0.2 }}
            >
              {liveLink && (
                <motion.a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                  aria-label="View live project"
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              )}
              {githubLink && (
                <motion.a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                  aria-label="View GitHub repository"
                >
                  <Github className="w-4 h-4" />
                </motion.a>
              )}
            </motion.div>

            {/* Live indicator */}
            {liveLink && (
              <motion.div
                className="absolute bottom-4 left-4 flex items-center space-x-2 text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  x: isExpanded ? 0 : -20,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Live</span>
              </motion.div>
            )}
          </div>
        )}

        {/* Content Section */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col">
          {/* Title */}
          <motion.h3
            className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
            layout
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
            layout
          >
            {description}
          </motion.p>

          {/* Features Section (Expandable) */}
          <motion.div
            layout
            animate={{
              height: isExpanded && features.length > 0 ? "auto" : 0,
              opacity: isExpanded && features.length > 0 ? 1 : 0,
            }}
            className="overflow-hidden mb-6"
          >
            {features.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-blue-500" />
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start text-sm text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-3 h-3 mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Technologies */}
          <motion.div className="mb-6 flex-1" layout>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, techIdx) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: techIdx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 text-sm bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-700 dark:text-purple-300 rounded-full border border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Action Links */}
          {(liveLink || githubLink) && (
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mt-auto"
              layout
            >
              {liveLink && (
                <motion.a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Live</span>
                </motion.a>
              )}
              {githubLink && (
                <motion.a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center space-x-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Code</span>
                </motion.a>
              )}
            </motion.div>
          )}
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          animate={{
            opacity: isExpanded ? 0.1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background:
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.15), transparent 70%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
